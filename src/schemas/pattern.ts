/**
 * PATTERN
 *
 * A reusable composition of semantic components.
 * Patterns encode product-level knowledge: not just "what components to use,"
 * but "why this arrangement makes sense for this context."
 *
 * Patterns are the bridge between component-level design and page-level design.
 * They are the unit AI uses when generating screen layouts.
 *
 * Relationship:
 *   Pattern → composes → SemanticComponent[]
 *   Pattern → constrained by → BrandDNA (via aiConstraints)
 *   Pattern → associated with → BehavioralProfile[]
 */

export type Pattern = {
  /** Unique identifier e.g. "auth-form", "data-table", "onboarding-step" */
  id: string

  /** Display name */
  name: string

  /** What this pattern does in a product */
  description: string

  /**
   * The semantic purpose of this pattern.
   * Why does this pattern exist? What problem does it solve?
   * Written from a product design perspective.
   */
  semanticPurpose: string

  /** SemanticComponent IDs that make up this pattern */
  components: string[]            // → SemanticComponent.id[]

  /** Which behavioral profiles this pattern feels right in */
  compatibleProfileIds: string[]  // → BehavioralProfile.id[]

  /**
   * AI constraints for this pattern.
   * Rules AI must follow when generating instances of this pattern.
   */
  aiConstraints: string[]
}
