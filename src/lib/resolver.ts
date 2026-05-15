/**
 * RESOLVER ENGINE
 *
 * Traverses the dependency graph to answer:
 *   "Which component variant should I use for this brand?"
 *   "Why was this decision made?"
 *   "What does this Brand DNA mean in concrete terms?"
 *
 * Resolution order:
 *   BrandDNA
 *     → select primary BehavioralProfile (by weight)
 *     → match component compatibility
 *     → resolve InteractionTokens
 *     → produce ComponentResolution with full reasoning chain
 *
 * This is what makes the system AI-explainable, not just AI-usable.
 */

import { brandDNAProfiles, getBrandDNA } from '@/data/brandDNA'
import { interactionStyles } from '@/data/interactionStyles'
import { interactionTokens } from '@/data/interactions'
import { componentDefs } from '@/data/components'
import type { InteractionStyle } from '@/data/interactionStyles'
import type { ComponentDef } from '@/types'
import type {
  ResolutionContext,
  ComponentResolution,
  DNAResolution,
  ReasoningStep,
} from '@/schemas/resolver'

// ── Helpers ───────────────────────────────────────────────────────────────────

function getProfile(id: string): InteractionStyle | undefined {
  return interactionStyles.find(s => s.id === id)
}

function getToken(id: string) {
  return interactionTokens.find(t => t.id === id)
}

function getComponent(id: string): ComponentDef | undefined {
  return componentDefs.find(c => c.id === id)
}

// ── resolveComponent ──────────────────────────────────────────────────────────

/**
 * Resolve which behavioral profile and interaction tokens apply to a component
 * in a given Brand DNA + Theme context.
 *
 * Returns a full reasoning chain explaining every decision.
 */
export function resolveComponent(context: ResolutionContext): ComponentResolution {
  const dna = getBrandDNA(context.brandDNAId)
  if (!dna) throw new Error(`BrandDNA not found: "${context.brandDNAId}"`)

  const component = getComponent(context.componentId)
  if (!component) throw new Error(`Component not found: "${context.componentId}"`)

  const reasoning: ReasoningStep[] = []
  let step = 1

  // ── Step 1: Parse behavioral blend ─────────────────────────────────────────
  const blend = [...dna.behavioralBlend].sort((a, b) => b.weight - a.weight)
  const resolvedBlend = blend
    .map(b => ({ blend: b, profile: getProfile(b.profileId) }))
    .filter((x): x is { blend: typeof x.blend; profile: InteractionStyle } => x.profile != null)

  reasoning.push({
    step: step++,
    source: 'BrandDNA',
    sourceId: dna.id,
    decision: `Brand DNA resolved ${resolvedBlend.length} behavioral profiles`,
    value: resolvedBlend.map(x => `${x.profile.name} ${x.blend.weight}%`).join(' + '),
  })

  // ── Step 2: Select profile for this component ───────────────────────────────
  // Try primary first. If it avoids this component, walk down blend by weight.
  let selectedEntry = resolvedBlend[0]
  let fallbackUsed = false

  if (selectedEntry.profile.componentCompatibility.avoid.includes(context.componentId)) {
    const fallback = resolvedBlend
      .slice(1)
      .find(x => !x.profile.componentCompatibility.avoid.includes(context.componentId))

    if (fallback) {
      reasoning.push({
        step: step++,
        source: 'BehavioralProfile',
        sourceId: selectedEntry.profile.id,
        decision: `Primary profile (${selectedEntry.profile.name}) avoids "${context.componentId}" — selecting next compatible profile`,
        value: `${fallback.profile.name} (${fallback.blend.weight}%)`,
      })
      selectedEntry = fallback
      fallbackUsed = true
    }
  }

  const selectedProfile = selectedEntry.profile
  const isBestMatch = selectedProfile.componentCompatibility.best.includes(context.componentId)

  if (!fallbackUsed) {
    reasoning.push({
      step: step++,
      source: 'BehavioralProfile',
      sourceId: selectedProfile.id,
      decision: isBestMatch
        ? `Profile explicitly lists "${context.componentId}" as a best-fit component`
        : `Primary profile is compatible with "${context.componentId}"`,
      value: isBestMatch ? `${selectedProfile.name} (best match)` : `${selectedProfile.name} (compatible)`,
    })
  }

  // ── Step 3: Resolve interaction tokens ─────────────────────────────────────
  const tokenRefs = selectedProfile.motionRefs
  const resolvedTokens = tokenRefs
    .map(ref => getToken(ref))
    .filter((t): t is NonNullable<typeof t> => t != null)

  reasoning.push({
    step: step++,
    source: 'BehavioralProfile',
    sourceId: selectedProfile.id,
    decision: `Interaction tokens resolved from profile motion refs`,
    value: tokenRefs.join(', '),
  })

  // ── Step 4: Emotional alignment check ──────────────────────────────────────
  const dnaEmotions = new Set(dna.emotionalTone)
  const profileEmotions = selectedProfile.emotionalTone
  const alignedEmotions = profileEmotions.filter(e => dnaEmotions.has(e))

  reasoning.push({
    step: step++,
    source: 'BrandDNA',
    sourceId: dna.id,
    decision: alignedEmotions.length > 0
      ? `Emotional tone aligned: profile shares ${alignedEmotions.length} qualities with Brand DNA`
      : `Profile emotional tone partially aligned with Brand DNA`,
    value: alignedEmotions.length > 0
      ? alignedEmotions.join(', ')
      : `${selectedProfile.emotionalTone[0]} (closest match)`,
  })

  // ── Build summary ───────────────────────────────────────────────────────────
  const summary = [
    `${component.name}`,
    `→ ${selectedProfile.name} profile`,
    `(via ${dna.name}, ${selectedEntry.blend.weight}% weight`,
    isBestMatch ? ', best match)' : ', compatible)',
  ].join(' ')

  return {
    context,
    component: component as never,
    selectedProfile: selectedProfile as never,
    resolvedInteractionTokens: resolvedTokens as never,
    resolvedSemanticTokens: [],
    reasoning,
    summary,
  }
}

// ── resolveDNA ────────────────────────────────────────────────────────────────

/**
 * Resolve the full concrete meaning of a Brand DNA.
 * Returns the AI context string, best/avoid components, and recommended tokens.
 */
export function resolveDNA(brandDNAId: string): DNAResolution {
  const dna = getBrandDNA(brandDNAId)
  if (!dna) throw new Error(`BrandDNA not found: "${brandDNAId}"`)

  // Profiles sorted by weight
  const blend = [...dna.behavioralBlend].sort((a, b) => b.weight - a.weight)
  const resolvedProfiles = blend
    .map(b => getProfile(b.profileId))
    .filter((p): p is InteractionStyle => p != null)

  const primaryProfile = resolvedProfiles[0]
  const secondaryProfiles = resolvedProfiles.slice(1)

  // Merge interaction tokens from all profiles (union, weight-ordered)
  const seenTokenIds = new Set<string>()
  const recommendedTokens: ReturnType<typeof getToken>[] = []
  blend.forEach(b => {
    const profile = getProfile(b.profileId)
    if (!profile) return
    profile.motionRefs.forEach(ref => {
      if (!seenTokenIds.has(ref)) {
        seenTokenIds.add(ref)
        const token = getToken(ref)
        if (token) recommendedTokens.push(token)
      }
    })
  })

  // Best components = union of all profiles' best lists
  const bestIds = new Set<string>()
  const avoidIds = new Set<string>()
  blend.forEach(b => {
    const profile = getProfile(b.profileId)
    if (!profile) return
    profile.componentCompatibility.best.forEach(id => bestIds.add(id))
    profile.componentCompatibility.avoid.forEach(id => avoidIds.add(id))
  })
  // If any profile recommends it, remove from avoid
  bestIds.forEach(id => avoidIds.delete(id))

  const bestComponents = componentDefs.filter(c => bestIds.has(c.id))
  const avoidComponents = componentDefs.filter(c => avoidIds.has(c.id))

  // Build AI context
  const profileDescriptions = resolvedProfiles
    .map((p, i) => {
      const weight = blend[i]?.weight ?? 0
      return `${p.name} (${weight}%): ${p.personality}`
    })
    .join('\n')

  const aiContext = [
    dna.aiPromptContext,
    '',
    `Behavioral blend:`,
    profileDescriptions,
    '',
    `Emotional tone: ${dna.emotionalTone.join(', ')}`,
    `Visual language: ${dna.visualLanguage.join(', ')}`,
    `Motion philosophy: ${dna.motionPhilosophy.join(', ')}`,
    '',
    `AI constraints:`,
    ...dna.aiConstraints.map(c => `- ${c}`),
  ].join('\n')

  return {
    dna: dna as never,
    primaryProfile: primaryProfile as never,
    secondaryProfiles: secondaryProfiles as never,
    recommendedInteractionTokens: recommendedTokens.filter(Boolean) as never,
    bestComponents: bestComponents as never,
    avoidComponents: avoidComponents as never,
    aiContext,
  }
}

// ── explainComponentChoice ────────────────────────────────────────────────────

/**
 * Return just the reasoning chain for a component + brand DNA pair.
 * Used in Inspector panel "Behavioral Profile Compatibility" section.
 */
export function explainComponentChoice(
  componentId: string,
  brandDNAId: string
): ReasoningStep[] {
  try {
    const resolution = resolveComponent({ componentId, brandDNAId, themeId: '' })
    return resolution.reasoning
  } catch {
    return []
  }
}

// ── getCompatibleDNAForComponent ──────────────────────────────────────────────

/**
 * Find all Brand DNA profiles that are compatible with a given component.
 * A DNA is compatible if its primary profile doesn't avoid the component.
 */
export function getCompatibleDNAForComponent(componentId: string) {
  return brandDNAProfiles.filter(dna => {
    const primaryBlend = [...dna.behavioralBlend].sort((a, b) => b.weight - a.weight)[0]
    if (!primaryBlend) return false
    const profile = getProfile(primaryBlend.profileId)
    return profile && !profile.componentCompatibility.avoid.includes(componentId)
  })
}

// ── getBestDNAForComponent ────────────────────────────────────────────────────

/**
 * Find Brand DNA profiles where the primary profile explicitly recommends this component.
 */
export function getBestDNAForComponent(componentId: string) {
  return brandDNAProfiles.filter(dna => {
    const primaryBlend = [...dna.behavioralBlend].sort((a, b) => b.weight - a.weight)[0]
    if (!primaryBlend) return false
    const profile = getProfile(primaryBlend.profileId)
    return profile && profile.componentCompatibility.best.includes(componentId)
  })
}
