/**
 * INTERACTION TOKEN
 *
 * Defines the motion, feedback, and density primitives of the system.
 * These are the atomic units of behavior — not visual style, but *feel*.
 *
 * Three groups:
 *   motion   → timing + easing (how things move)
 *   feedback → sensory response intensity (how things react)
 *   density  → spatial compression (how things are spaced)
 *
 * Relationship:
 *   InteractionToken ← selected by → BehavioralProfile
 *   InteractionToken ← consumed by → SemanticComponent
 */

export type InteractionTokenGroup = 'motion' | 'feedback' | 'density'

export type InteractionToken = {
  /** Unique identifier. Convention: "{group}/{name}" e.g. "motion/spring" */
  id: string

  /** Human-readable name */
  label: string

  /** Which behavioral group this token belongs to */
  group: InteractionTokenGroup

  /** One-line description of what this token *feels* like */
  feel: string

  // ── Motion-specific ────────────────────────────────────────────────────────
  /** Duration in milliseconds (motion tokens only) */
  duration?: number

  /** CSS easing function */
  easing?: string

  /** Complete CSS transition string e.g. "all 150ms cubic-bezier(...)" */
  cssTransition?: string

  /** CSS transform applied during the interaction */
  cssTransform?: string

  // ── Feedback-specific ──────────────────────────────────────────────────────
  /** Feedback intensity level */
  intensity?: 'low' | 'medium' | 'high'

  // ── Density-specific ──────────────────────────────────────────────────────
  /** CSS padding value */
  padding?: string

  /** CSS gap value */
  gap?: string

  /** Line height multiplier */
  lineHeight?: number

  // ── Semantic qualities ────────────────────────────────────────────────────
  /**
   * Emotional qualities this token conveys.
   * Used by AI to match token to brand intent.
   * e.g. ['alive', 'physical', 'satisfying']
   */
  emotionalQualities: string[]
}
