/**
 * BRAND DNA
 *
 * The "why" layer. Defines a product's emotional identity — not what it looks like,
 * but what it *means* and how it *feels* to use.
 *
 * Brand DNA answers the question:
 *   "Why does this product feel the way it does?"
 *
 * It is NOT a theme (themes are color implementations).
 * It is NOT a behavioral profile (profiles are archetypes).
 * Brand DNA is a *specific blend* of profiles + emotional intent for one product.
 *
 * Example:
 *   Stripe DNA = Enterprise 70% + Premium 30%
 *     → emotionalTone: ['precise', 'calm', 'premium']
 *     → visualLanguage: ['glass', 'subtle-depth', 'high-contrast']
 *     → motionPhilosophy: ['purposeful', 'no-bounce', 'fast']
 *
 * Relationship:
 *   BrandDNA → blends → BehavioralProfile[] (weighted)
 *   BrandDNA → materializes as → Theme[]
 *   BrandDNA → constrains → SemanticComponent selection
 *   BrandDNA → informs → AI generation context
 */

// ── Moodboard ────────────────────────────────────────────────────────────────

/**
 * A semantic reference — not just an image, but a tagged observation.
 * Images are optional; the semantic tags ARE the moodboard entry.
 * This is what makes moodboards AI-readable.
 */
export type MoodboardEntry = {
  id: string

  /** Human description e.g. "Stripe checkout — precision under pressure" */
  label: string

  /** Optional image URL or local path */
  imageUrl?: string

  /** Where this reference comes from */
  source?: string

  /** Emotional qualities observed in this reference */
  emotionalTone: string[]         // ['precise', 'premium', 'calm']

  /** Motion characteristics observed */
  motionStyle: string[]           // ['restrained', 'purposeful', 'instant']

  /** Visual language observed */
  visualLanguage: string[]        // ['glass', 'subtle-shadow', 'monochrome']

  /** UI density observed */
  density: 'compact' | 'normal' | 'relaxed'

  /** Optional interaction type observed */
  interactionType?: string        // 'hover-lift', 'press-scale', 'fade-in'
}

// ── Behavioral Blend ─────────────────────────────────────────────────────────

/**
 * A weighted reference to a BehavioralProfile.
 * Brands rarely are 100% one profile — they blend.
 *
 * Rule: weights in a BrandDNA should sum to 100.
 * Rule: exactly one entry should have role: 'primary'.
 */
export type BehavioralBlend = {
  /** Reference to BehavioralProfile.id */
  profileId: string

  /**
   * How much of this profile is present (0–100).
   * Primary is typically 50–80, secondary 20–50, accent < 20.
   */
  weight: number

  /** The role this profile plays in the blend */
  role: 'primary' | 'secondary' | 'accent'
}

// ── Brand DNA ────────────────────────────────────────────────────────────────

export type BrandDNA = {
  /** Unique identifier e.g. "stripe-like", "discord-like", "my-startup" */
  id: string

  /** Display name e.g. "Stripe-like", "My Startup" */
  name: string

  /** One-line brand positioning */
  tagline: string

  /** Brand color for UI representation */
  color: string

  // ── Behavioral composition ─────────────────────────────────────────────
  /**
   * The profile blend that defines this brand's interaction identity.
   * Weights should sum to 100. One must be role: 'primary'.
   */
  behavioralBlend: BehavioralBlend[]

  // ── Emotional dimensions ───────────────────────────────────────────────
  /**
   * How this brand *feels* to users.
   * Shared vocabulary with BehavioralProfile.emotionalTone.
   * More specific — these are *this brand's* qualities.
   */
  emotionalTone: string[]         // ['precise', 'calm', 'premium']

  /**
   * What the visual surface communicates.
   * Describes texture, depth, material character.
   */
  visualLanguage: string[]        // ['glass', 'soft-shadow', 'high-contrast']

  /**
   * The philosophy behind how things move.
   * Not specific tokens — the *intent* behind motion choices.
   */
  motionPhilosophy: string[]      // ['restrained', 'purposeful', 'no-bounce']

  /**
   * How the interface responds to the user.
   * The personality of interaction.
   */
  interactionPersonality: string[] // ['predictable', 'keyboard-first', 'never-surprising']

  // ── Moodboard ─────────────────────────────────────────────────────────
  /** Semantic reference images. AI reads the tags, not the images. */
  moodboard: MoodboardEntry[]

  // ── Connections ────────────────────────────────────────────────────────
  /** Theme IDs that implement this DNA's visual character */
  compatibleThemeIds: string[]    // → Theme.id[]

  // ── AI Layer ──────────────────────────────────────────────────────────
  /**
   * Single-paragraph context for AI generation.
   * When AI generates UI for this brand, this string is prepended to the prompt.
   * Should describe feel, not implementation.
   *
   * Example:
   * "This product values precision and trust above all.
   *  Every interaction should feel intentional and fast.
   *  Nothing bounces. Nothing lingers. The UI disappears into the work."
   */
  aiPromptContext: string

  /**
   * Hard constraints for AI generation.
   * Rules the AI must never violate for this brand.
   */
  aiConstraints: string[]
}
