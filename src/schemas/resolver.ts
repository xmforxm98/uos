/**
 * RESOLVER ENGINE — Interfaces
 *
 * The resolver traverses the dependency graph to answer questions like:
 *   "Which toggle variant should I use for this brand?"
 *   "Why was this component selected?"
 *   "What interaction tokens apply here?"
 *
 * This is what makes the system AI-explainable, not just AI-usable.
 * Every decision the system makes should be traceable back through the graph.
 *
 * Resolution order:
 *   BrandDNA
 *     → select primary BehavioralProfile (by weight)
 *     → match component compatibility
 *     → resolve InteractionTokens
 *     → resolve SemanticTokens (via active Theme)
 *     → produce ComponentResolution
 */

import type { SemanticComponent } from './component'
import type { BehavioralProfile } from './behavioral-profile'
import type { InteractionToken } from './interaction-token'
import type { SemanticToken } from './semantic-token'
import type { BrandDNA } from './brand-dna'
import type { Theme } from './theme'

// ── Resolution Context ────────────────────────────────────────────────────────

/**
 * The inputs needed to resolve any component decision.
 */
export type ResolutionContext = {
  brandDNAId: string      // → BrandDNA.id
  themeId: string         // → Theme.id
  componentId: string     // → SemanticComponent.id
  screen?: string         // e.g. 'dashboard', 'onboarding', 'settings'
}

// ── Resolution Results ────────────────────────────────────────────────────────

/**
 * A single reasoning step in the resolution chain.
 * The full chain answers "why was this decision made?"
 */
export type ReasoningStep = {
  step: number
  source: string          // e.g. "BrandDNA", "BehavioralProfile", "InteractionToken"
  sourceId: string
  decision: string        // Human-readable explanation of what was decided
  value: string           // The actual value selected
}

/**
 * The complete result of resolving a component for a given context.
 * Every field is traceable — the reasoning chain explains each decision.
 */
export type ComponentResolution = {
  context: ResolutionContext

  // What was resolved
  component: SemanticComponent
  selectedProfile: BehavioralProfile
  resolvedInteractionTokens: InteractionToken[]
  resolvedSemanticTokens: SemanticToken[]

  // The "why" chain — ordered list of decisions
  reasoning: ReasoningStep[]

  /**
   * One-sentence summary for display.
   * e.g. "Toggle uses Enterprise profile because Brand DNA is 70% Enterprise,
   *       which favors restrained motion and keyboard-first interaction."
   */
  summary: string
}

// ── DNA Resolution ────────────────────────────────────────────────────────────

/**
 * Result of resolving what a Brand DNA *means* in concrete terms.
 * Used for AI generation context.
 */
export type DNAResolution = {
  dna: BrandDNA

  // Resolved behavioral blend (sorted by weight, primary first)
  primaryProfile: BehavioralProfile
  secondaryProfiles: BehavioralProfile[]

  // Merged interaction tokens from all profiles (weighted)
  recommendedInteractionTokens: InteractionToken[]

  // Components that best express this DNA
  bestComponents: SemanticComponent[]

  // Components to avoid for this DNA
  avoidComponents: SemanticComponent[]

  /**
   * Full AI generation context string.
   * Combines DNA.aiPromptContext with resolved profile personalities.
   * Ready to prepend to any AI generation prompt.
   */
  aiContext: string
}

// ── Resolver Function Signatures ──────────────────────────────────────────────

/**
 * Resolve a specific component for a brand + theme context.
 * This is the primary entry point for AI-driven component selection.
 */
export type ResolveComponent = (
  context: ResolutionContext
) => ComponentResolution

/**
 * Resolve the full meaning of a Brand DNA.
 * Used when generating new screens or features for a brand.
 */
export type ResolveDNA = (
  brandDNAId: string,
  themeId: string
) => DNAResolution

/**
 * Explain why a specific component was chosen.
 * Used for the Inspector panel "Behavioral Profile Compatibility" section.
 */
export type ExplainComponentChoice = (
  componentId: string,
  brandDNAId: string
) => ReasoningStep[]
