/**
 * DESIGN COMPILER — Core Ontology
 *
 * This is the canonical schema for the entire design system.
 * All data files in /src/data/ should conform to these types.
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │                     DEPENDENCY GRAPH                            │
 * │                                                                 │
 * │  PrimitiveToken ◄── SemanticToken ◄── ThemeOverride             │
 * │                            ▲                ▲                   │
 * │                     SemanticComponent     Theme                 │
 * │                            ▲          (materializes)            │
 * │                    InteractionToken           ▲                 │
 * │                            ▲                 │                  │
 * │                   BehavioralProfile ──────────┤                  │
 * │                            ▲                 │                  │
 * │                        BrandDNA ─────────────┘                  │
 * │                            │                                    │
 * │                      (informs)                                  │
 * │                            ▼                                    │
 * │                    AI Generation                                │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * Layer 0  PrimitiveToken      Raw values. No meaning.
 * Layer 1  SemanticToken       Named intentions. Maps to primitives.
 * Layer 2  InteractionToken    Motion, feedback, density primitives.
 * Layer 3  BehavioralProfile   Product personality archetypes.
 * Layer 4  BrandDNA            Specific brand identity. Blends profiles.
 * Layer 5  SemanticComponent   Meaningful component. Consumes tokens + profiles.
 * Layer 6  Pattern             Component compositions with product knowledge.
 * Layer 7  Theme               Color + mode materialization of Brand DNA.
 */

export type { PrimitiveToken, PrimitiveTokenCategory } from './primitive-token'

export type { SemanticToken, SemanticTokenGroup } from './semantic-token'

export type {
  InteractionToken,
  InteractionTokenGroup,
} from './interaction-token'

export type {
  BehavioralProfile,
  AnimationIntensity,
  FeedbackLevel,
  DecorationLevel,
  DensityLevel,
  GestureModel,
} from './behavioral-profile'

export type {
  BrandDNA,
  BehavioralBlend,
  MoodboardEntry,
} from './brand-dna'

export type {
  PrimitiveComponent,
  SemanticComponent,
  TokenDependency,
  AccessibilityRule,
  ContrastInfo,
} from './component'

export type { Pattern } from './pattern'

export type { Theme, ThemeOverride, ColorMode } from './theme'

export type {
  ResolutionContext,
  ComponentResolution,
  DNAResolution,
  ReasoningStep,
  ResolveComponent,
  ResolveDNA,
  ExplainComponentChoice,
} from './resolver'

// ── Graph Edge Types ──────────────────────────────────────────────────────────
// Explicit relationship types for graph traversal

export type GraphNodeType =
  | 'primitive-token'
  | 'semantic-token'
  | 'interaction-token'
  | 'behavioral-profile'
  | 'brand-dna'
  | 'primitive-component'
  | 'semantic-component'
  | 'pattern'
  | 'theme'

export type GraphEdgeType =
  | 'resolves'           // SemanticToken → PrimitiveToken
  | 'overrides'          // Theme → SemanticToken
  | 'selects'            // BehavioralProfile → InteractionToken
  | 'blends'             // BrandDNA → BehavioralProfile
  | 'materializes'       // BrandDNA → Theme
  | 'consumes'           // SemanticComponent → SemanticToken | InteractionToken
  | 'compatible-with'    // SemanticComponent ↔ BehavioralProfile
  | 'composes'           // Pattern → SemanticComponent
  | 'wraps'              // SemanticComponent → PrimitiveComponent

export type GraphEdge = {
  from: string           // Node id
  fromType: GraphNodeType
  to: string             // Node id
  toType: GraphNodeType
  relationship: GraphEdgeType
  weight?: number        // Used for BrandDNA → BehavioralProfile blend weights
}
