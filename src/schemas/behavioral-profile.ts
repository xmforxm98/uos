/**
 * BEHAVIORAL PROFILE
 *
 * A reusable product personality — not a brand, but an archetype.
 * Defines HOW a product behaves, not what it looks like.
 *
 * Think of it as a template for product character:
 *   Enterprise → calm, structured, purposeful
 *   Premium    → fluid, crafted, spring physics
 *   Cyber      → electric, cinematic, particles
 *
 * Profiles are product-category-agnostic and reusable.
 * BrandDNA *blends* profiles to form a specific brand identity.
 *
 * Relationship:
 *   BehavioralProfile → selects → InteractionToken[]
 *   BehavioralProfile → compatible with → SemanticComponent[]
 *   BrandDNA → blends → BehavioralProfile[] (with weights)
 */

export type AnimationIntensity =
  | 'instant'      // <80ms, no easing — UI disappears
  | 'minimal'      // 80–150ms, linear or ease-out — subtle
  | 'standard'     // 150–250ms, ease-in-out — conventional
  | 'expressive'   // 250–450ms, spring or overshoot — personality
  | 'cinematic'    // 450ms+, staged choreography — immersive

export type FeedbackLevel = 'restrained' | 'balanced' | 'expressive'
export type DecorationLevel = 'none' | 'subtle' | 'glow' | 'particles'
export type DensityLevel = 'compact' | 'normal' | 'relaxed'
export type GestureModel = 'keyboard-first' | 'pointer-first' | 'touch-first'

export type BehavioralProfile = {
  /** Unique identifier e.g. "enterprise", "premium", "cyber" */
  id: string

  /** Display name */
  name: string

  /** One-line positioning statement */
  tagline: string

  /**
   * One-paragraph description of what this profile *feels* like to use.
   * Written from the user's perspective.
   */
  personality: string

  /** Brand color for UI representation */
  color: string

  // ── Motion definition ────────────────────────────────────────────────────
  motionProfile: {
    intensity: AnimationIntensity
    /** References to InteractionToken.id[] in the motion group */
    refs: string[]
  }

  // ── Behavior dimensions ──────────────────────────────────────────────────
  feedback: FeedbackLevel
  decoration: DecorationLevel
  density: DensityLevel
  gestureModel: GestureModel

  // ── Emotional character ──────────────────────────────────────────────────
  /**
   * Emotional qualities this profile conveys.
   * Used for Brand DNA matching and AI generation context.
   */
  emotionalTone: string[]

  // ── Component compatibility ───────────────────────────────────────────────
  componentCompatibility: {
    /** SemanticComponent.id[] — components that best express this profile */
    best: string[]
    /** SemanticComponent.id[] — components that feel wrong in this profile */
    avoid: string[]
  }

  // ── Usage guidance ───────────────────────────────────────────────────────
  usageGuidance: {
    useFor: string[]
    avoidFor: string[]
  }

  // ── Context ──────────────────────────────────────────────────────────────
  /** Product categories this profile naturally fits */
  productFit: string[]

  /** Real-world products that embody this profile */
  exampleProducts: string[]

  /** Theme IDs that have adopted this profile as their interaction identity */
  themeIds: string[]
}
