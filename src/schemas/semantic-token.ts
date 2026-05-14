/**
 * SEMANTIC TOKEN
 *
 * A named intention that maps to a PrimitiveToken.
 * Semantic tokens carry meaning — they describe *purpose*, not value.
 * Themes override semantic tokens to change how the system looks.
 *
 * Examples:
 *   color/interactive/default  → primitiveRef: "color/blue-500"
 *   color/text/primary         → primitiveRef: "color/gray-900"
 *   spacing/component/padding  → primitiveRef: "spacing/4"
 *
 * Relationship:
 *   SemanticToken → (1) PrimitiveToken
 *   Theme → overrides → SemanticToken
 */

export type SemanticTokenGroup =
  | 'background'
  | 'text'
  | 'border'
  | 'surface'
  | 'interactive'
  | 'radius'
  | 'shadow'
  | 'glass'
  | 'feedback'

export type SemanticToken = {
  /** Unique identifier. Convention: "{group}/{role}" e.g. "color/interactive/default" */
  id: string

  /** Human-readable name */
  name: string

  /** Semantic group — what area of the system this token belongs to */
  group: SemanticTokenGroup

  /** Human description of the token's purpose */
  description: string

  /** Reference to the default PrimitiveToken */
  primitiveRef: string   // → PrimitiveToken.id

  /** Resolved CSS value (computed at runtime from primitiveRef or theme override) */
  resolvedValue?: string
}
