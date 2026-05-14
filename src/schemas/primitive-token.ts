/**
 * PRIMITIVE TOKEN
 *
 * The atomic unit of the design system.
 * Raw values — no semantic meaning attached yet.
 * These are the leaves of the dependency graph.
 *
 * Examples:
 *   color/blue-500   → "#3b82f6"
 *   spacing/4        → "16px"
 *   radius/md        → "8px"
 */

export type PrimitiveTokenCategory =
  | 'color'
  | 'spacing'
  | 'typography'
  | 'radius'
  | 'shadow'
  | 'motion'
  | 'opacity'
  | 'z-index'

export type PrimitiveToken = {
  /** Unique identifier. Convention: "{category}/{scale}" e.g. "color/blue-500" */
  id: string

  /** Human-readable name */
  label: string

  /** The raw CSS value */
  value: string

  /** Token category */
  category: PrimitiveTokenCategory

  /** Optional scale position (for ordered scales: xs, sm, md, lg, xl...) */
  scale?: string

  /** Optional group within category (e.g. "blue", "gray" within "color") */
  group?: string
}
