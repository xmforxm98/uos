/**
 * THEME
 *
 * The color + mode materialization layer.
 * A theme answers: "What do the semantic tokens resolve to in this context?"
 *
 * Themes are the IMPLEMENTATION layer, not the identity layer.
 * They do NOT define brand personality — that's BrandDNA's job.
 *
 * A theme can implement one or more Brand DNA identities.
 * e.g. "Brand A Dark" is a dark-mode materialization of the "Enterprise" Brand DNA.
 *
 * Relationship:
 *   Theme → overrides → SemanticToken[] (with PrimitiveToken values)
 *   Theme → implements → BrandDNA (optional)
 */

export type ColorMode = 'light' | 'dark' | 'auto'

export type ThemeOverride = {
  /** The semantic token being overridden */
  semanticId: string     // → SemanticToken.id

  /** The primitive token to use instead of the default */
  primitiveRef: string   // → PrimitiveToken.id

  /** Resolved CSS value (for display) */
  value: string
}

export type Theme = {
  /** Unique identifier e.g. "brand-a", "dark", "utopia" */
  id: string

  /** Display name */
  name: string

  /** Short description of this theme's character */
  description: string

  /** Light/dark mode */
  mode: ColorMode

  /** Primary accent color (for UI representation) */
  accentColor: string

  /** Token overrides that define this theme */
  overrides: ThemeOverride[]

  /**
   * Optional reference to the Brand DNA this theme implements.
   * If set, this theme's token choices should reinforce that DNA's identity.
   */
  brandDNAId?: string    // → BrandDNA.id
}
