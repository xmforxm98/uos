/**
 * PROMPT SYNTHESIS ENGINE
 *
 * Derives agent prompts computationally from canonical trait data.
 * No hand-written strings. If you change a trait in PROFILE_TRAITS,
 * the generated prompt changes automatically.
 *
 * This is the key difference from the old approach:
 *   OLD: agentPrompt = manually written string (drifts from data)
 *   NEW: agentPrompt = synthesize(PROFILE_TRAITS[id]) (always in sync)
 */

import {
  PROFILE_TRAITS,
  MOTION_DESCRIPTIONS,
  DENSITY_DESCRIPTIONS,
  NAVIGATION_DESCRIPTIONS,
  VISUAL_DESCRIPTIONS,
  TYPOGRAPHY_DESCRIPTIONS,
  FEEDBACK_DESCRIPTIONS,
  MODALITY_DESCRIPTIONS,
  detectConflicts,
  profileSimilarity,
  type TraitProfile,
  type MotionTrait,
  type DensityTrait,
  type NavigationTrait,
} from '@/schemas/traits'

// ─────────────────────────────────────────────────────────────────────────────
// MOTION RULES
// Translates motion trait → concrete CSS/timing rules for AI coding prompts
// ─────────────────────────────────────────────────────────────────────────────

const MOTION_RULES: Record<MotionTrait, string[]> = {
  instant: [
    'Use 0–80ms duration, linear easing',
    'State changes are immediate — no perceived delay',
    'Avoid transform animations; opacity change is the maximum',
  ],
  restrained: [
    'Use 80–200ms duration, ease-out easing',
    'Never use spring, bounce, or overshoot',
    'Transitions are purposeful and invisible — the UI should never draw attention to itself moving',
  ],
  smooth: [
    'Use 200–400ms duration, ease-in-out easing',
    'Calm, considered transitions — not fast, not cinematic',
    'Avoid bounce; prefer gentle cubic-bezier(0.4, 0, 0.2, 1)',
  ],
  springy: [
    'Use spring physics: cubic-bezier(0.34, 1.56, 0.64, 1), 300–500ms',
    'Allow slight overshoot (5–10%) — elements settle, they don\'t snap',
    'Hover states should feel "alive" — slight lift, shadow expansion',
    'Press: scale(0.97) spring return',
  ],
  cinematic: [
    'Use cubic-bezier(0.23, 1, 0.32, 1), 400–800ms',
    'Fast in, exponential slow settle — commanding and precise',
    'Avoid spring bounce; this is deliberate, not playful',
  ],
  ambient: [
    'Use continuous gradient pulse for loading states (not spinners)',
    'Text streams in word-by-word at 600–1000ms smooth',
    'Active state: ambient glow that breathes (not flashes)',
    'Easing: cubic-bezier(0.4, 0, 0.2, 1) for all transitions',
  ],
}

// ─────────────────────────────────────────────────────────────────────────────
// DENSITY RULES
// ─────────────────────────────────────────────────────────────────────────────

const DENSITY_RULES: Record<DensityTrait, string[]> = {
  sparse: [
    'Internal padding: 24px+ for sections, 16px for items',
    'Use whitespace as the primary separator — no explicit dividers',
    'Remove all elements that don\'t communicate meaning',
    'Single column preferred; avoid multi-column grid',
  ],
  normal: [
    'Internal padding: 14–20px',
    'Card-first layout with breathing room between cards',
    'Progressive disclosure: summary → detail on interaction',
  ],
  compact: [
    'Internal padding: 8–12px',
    'Tabular layouts preferred over cards for data',
    'Show as much information as possible without scrolling',
    'Monospace numbers, tight grid alignment, sticky headers',
  ],
  layered: [
    'Human data takes primary layer, AI context sits beneath (subdued, italic)',
    'AI insight always shown, not hidden behind expand',
    'Secondary layer: 0.5–0.6 opacity, smaller font size (11px), italic',
  ],
}

// ─────────────────────────────────────────────────────────────────────────────
// NAVIGATION RULES
// ─────────────────────────────────────────────────────────────────────────────

const NAVIGATION_RULES: Record<NavigationTrait, string[]> = {
  sidebar: [
    'Left sidebar always visible (not collapsed by default)',
    'Width: 220–260px, fixed',
    'Hierarchy: workspace → project → section → item',
    'Active item: left border + background fill',
  ],
  topbar: [
    'Horizontal nav bar, 48–56px height',
    'Current section: underline or font weight difference',
    'No hamburger menu on desktop',
  ],
  'push-pop': [
    'Stack-based navigation: new screens slide in from right',
    'Back button: ‹ Text label (not just an arrow)',
    'Large Title (34px) collapses to standard (17px) on scroll',
  ],
  'tab-bar': [
    'Bottom tab bar, 5 items maximum',
    'Active tab: tinted icon + label',
    'Badge on icon for unread/notification count',
    'No hamburger; all sections accessible from tab bar',
  ],
  command: [
    '⌘K opens command palette as primary action surface',
    'Minimal or no persistent navigation chrome',
    'j/k arrow key navigation in lists',
    'Breadcrumbs only when depth > 2',
  ],
  conversational: [
    'Prompt bar bottom-anchored, always visible',
    'Placeholder: "Ask anything…" — never empty or generic',
    'Cards surface contextually — not via explicit navigation',
    'No sidebar; AI determines what content is relevant',
  ],
}

// ─────────────────────────────────────────────────────────────────────────────
// SYNTHESIS FUNCTIONS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Compact Agent Prompt
 * ~100 words. Paste at the top of any AI coding session.
 * Concise enough to fit in a system prompt or context window header.
 */
export function synthesizeCompactPrompt(profileId: string): string {
  const traits = PROFILE_TRAITS[profileId]
  if (!traits) return ''

  const lines = [
    `Behavioral profile: ${profileId}.`,
    `Motion: ${MOTION_DESCRIPTIONS[traits.motion]}.`,
    `Layout: ${DENSITY_DESCRIPTIONS[traits.density]}.`,
    `Navigation: ${NAVIGATION_DESCRIPTIONS[traits.navigation]}.`,
    `Visual: ${VISUAL_DESCRIPTIONS[traits.visual]}.`,
    `Typography: ${TYPOGRAPHY_DESCRIPTIONS[traits.typography]}.`,
    `Interaction: ${FEEDBACK_DESCRIPTIONS[traits.feedback]} feedback, ${MODALITY_DESCRIPTIONS[traits.modality]}.`,
  ]

  return lines.join('\n')
}

/**
 * Full Agent Context
 * ~300 words. Use as DESIGN.md or long-context system prompt.
 * Includes concrete implementation rules derived from canonical traits.
 * Pass doRules/dontRules from profileReferences for profile-specific constraints.
 */
export function synthesizeFullContext(
  profileId: string,
  name: string,
  semanticEssence: string,
  options?: { doRules?: string[]; dontRules?: string[] }
): string {
  const traits = PROFILE_TRAITS[profileId]
  if (!traits) return ''

  const conflicts = detectConflicts(traits)
  const conflictNote = conflicts.length > 0
    ? `\n## ⚠ Trait Conflicts\n${conflicts.map(c => `- ${c.traits.join(' + ')}: ${c.reason}`).join('\n')}`
    : ''

  const motionRules = MOTION_RULES[traits.motion].map(r => `- ${r}`).join('\n')
  const densityRules = DENSITY_RULES[traits.density].map(r => `- ${r}`).join('\n')
  const navRules = NAVIGATION_RULES[traits.navigation].map(r => `- ${r}`).join('\n')

  const doSection = options?.doRules?.length
    ? `\n## Do\n${options.doRules.map(r => `- ${r}`).join('\n')}`
    : ''

  const dontSection = options?.dontRules?.length
    ? `\n## Don't\n${options.dontRules.map(r => `- ${r}`).join('\n')}`
    : ''

  return `# ${name} — Behavioral Profile
> Generated from canonical trait taxonomy. Do not edit manually.

## Semantic Essence
"${semanticEssence}"

## Trait Address
motion: ${traits.motion} · density: ${traits.density} · navigation: ${traits.navigation}
visual: ${traits.visual} · typography: ${traits.typography}
feedback: ${traits.feedback} · modality: ${traits.modality}

## Motion
${motionRules}

## Layout
${densityRules}

## Navigation
${navRules}

## Visual
${VISUAL_DESCRIPTIONS[traits.visual]}

## Typography
${TYPOGRAPHY_DESCRIPTIONS[traits.typography]}

## Feedback
${FEEDBACK_DESCRIPTIONS[traits.feedback]}

## Primary Modality
${MODALITY_DESCRIPTIONS[traits.modality]}
${doSection}${dontSection}${conflictNote}`
}

/**
 * Profile Diff
 * Shows exactly where two profiles agree and diverge.
 * Used in "Compare" views and to explain why two profiles feel different.
 */
export function synthesizeDiff(profileIdA: string, profileIdB: string): string {
  const result = profileSimilarity(profileIdA, profileIdB)
  const scoreLabel = result.score >= 0.7 ? 'closely related' :
                     result.score >= 0.4 ? 'partially related' : 'distinct'

  const lines = [
    `${profileIdA} ↔ ${profileIdB}: ${scoreLabel} (${Math.round(result.score * 100)}% overlap)`,
    '',
    'Shared traits:',
    ...result.shared.map(t => `  ✓ ${t}`),
    '',
    'Different traits:',
    ...result.different.map(t => `  ↔ ${t}`),
  ]

  return lines.join('\n')
}

/**
 * Trait Sentence
 * One human-readable sentence describing a profile's behavioral character.
 * Used in tooltips, search results, and quick-reference chips.
 */
export function synthesizeOneLiner(profileId: string): string {
  const traits = PROFILE_TRAITS[profileId]
  if (!traits) return ''

  return `${traits.motion} motion · ${traits.density} density · ${traits.navigation} navigation · ${traits.visual} visual`
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPATIBILITY REASONING
// Given a set of traits, which profiles are compatible/incompatible?
// ─────────────────────────────────────────────────────────────────────────────

export function findCompatibleProfiles(
  requiredTraits: Partial<TraitProfile>
): string[] {
  return Object.entries(PROFILE_TRAITS)
    .filter(([, profile]) =>
      Object.entries(requiredTraits).every(
        ([dim, val]) => profile[dim as keyof TraitProfile] === val
      )
    )
    .map(([id]) => id)
}

/**
 * Example usage:
 *
 * findCompatibleProfiles({ motion: 'springy', modality: 'touch' })
 * → ['premium', 'playful', 'native-mobile']
 *
 * findCompatibleProfiles({ visual: 'flat', modality: 'keyboard' })
 * → ['enterprise', 'minimal']
 *
 * findCompatibleProfiles({ motion: 'instant', typography: 'mono' })
 * → ['minimal']
 */
