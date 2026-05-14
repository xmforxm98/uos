/**
 * COMPONENT SCHEMAS
 *
 * Two distinct layers:
 *
 * PrimitiveComponent
 *   The raw building block. No semantic meaning, no brand identity.
 *   Just structure, variants, and API surface.
 *   e.g. "A rectangle that can be on or off."
 *
 * SemanticComponent
 *   The meaningful version. Knows WHY it exists, HOW it should behave,
 *   and WHICH profiles it belongs in.
 *   e.g. "A binary state controller for persistent user preferences."
 *
 * Relationship:
 *   SemanticComponent → wraps → PrimitiveComponent
 *   SemanticComponent → consumes → SemanticToken[]
 *   SemanticComponent → consumes → InteractionToken[]
 *   SemanticComponent → compatible with → BehavioralProfile[]
 *   SemanticComponent → composed into → Pattern[]
 */

// ── Primitive Component ──────────────────────────────────────────────────────

export type PrimitiveComponent = {
  /** Unique identifier e.g. "toggle", "button", "input" */
  id: string

  /** Display name */
  name: string

  /**
   * Structural description — what this component IS, not what it means.
   * No brand language.
   */
  structureDescription: string    // "A pressable element with two visual states."

  /** Available structural variants */
  variants: string[]              // ['default', 'sm', 'lg', 'icon-only']

  /** HTML element this renders as */
  htmlElement: string             // 'button', 'input', 'div'

  /** ARIA role */
  ariaRole: string                // 'switch', 'button', 'textbox'
}

// ── Accessibility ─────────────────────────────────────────────────────────────

export type AccessibilityRule = {
  rule: string
  passes: boolean
  note?: string
}

export type ContrastInfo = {
  ratio: number
  level: 'A' | 'AA' | 'AA Large' | 'AAA' | 'Fail'
  foreground: string
  background: string
}

// ── Token Dependency ──────────────────────────────────────────────────────────

export type TokenDependency = {
  /** Internal identifier for this dependency */
  tokenId: string

  /** Human label e.g. "Background", "Border Color" */
  label: string

  /** Which semantic token this maps to */
  semanticRef: string             // → SemanticToken.id

  /** Fallback primitive reference */
  primitiveRef: string            // → PrimitiveToken.id

  /** Resolved value at runtime */
  currentValue: string
}

// ── Semantic Component ────────────────────────────────────────────────────────

export type SemanticComponent = {
  /** Unique identifier — same as PrimitiveComponent.id */
  id: string

  /** Reference to the underlying primitive */
  primitiveComponentId: string    // → PrimitiveComponent.id

  /** Display name */
  name: string

  /** UI category */
  category: string

  /**
   * The semantic role of this component — what it DOES in a UI, not what it IS.
   * e.g. "binary state controller", "action trigger", "data input field"
   */
  semanticRole: string

  /**
   * Full description of the component's meaning in the system.
   * Written from a product design perspective.
   */
  description: string

  /** Available semantic variants (can differ from primitive variants) */
  variants: string[]

  // ── Token connections ───────────────────────────────────────────────────
  /** Visual token dependencies (color, spacing, radius...) */
  tokenDeps: TokenDependency[]

  /** Direct interaction token references */
  interactionTokenRefs: string[]  // → InteractionToken.id[]

  // ── Profile compatibility ───────────────────────────────────────────────
  /**
   * Which behavioral profiles this component expresses well.
   * Populated by BehavioralProfile.componentCompatibility.
   */
  compatibleProfileIds: string[]  // → BehavioralProfile.id[]

  // ── Usage rules ─────────────────────────────────────────────────────────
  usageRules: {
    useWhen: string[]
    avoidWhen: string[]
  }

  // ── Accessibility ────────────────────────────────────────────────────────
  accessibility: {
    rules: AccessibilityRule[]
    contrast?: ContrastInfo
    wcagLevel: 'A' | 'AA' | 'AAA'
  }

  // ── AI layer ─────────────────────────────────────────────────────────────
  aiRules: {
    /**
     * One sentence describing the *intent* of this component for AI generation.
     * Used to constrain when AI should/shouldn't use this component.
     */
    semanticIntent: string

    /** Maximum instances per screen per context */
    maxPerScreen?: Record<string, number>

    /** Situations AI must never use this component for */
    neverUseFor?: string[]
  }
}
