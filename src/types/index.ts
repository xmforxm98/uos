export type TokenCategory =
  | 'color'
  | 'spacing'
  | 'typography'
  | 'radius'
  | 'shadow'
  | 'motion'
  | 'opacity'
  | 'glass'

export type PrimitiveToken = {
  id: string
  name: string
  category: TokenCategory
  value: string
  description?: string
}

export type SemanticToken = {
  id: string
  name: string
  group: string
  primitiveRef: string
  darkRef?: string
  description: string
  usage: string[]
  responsive?: Record<string, string>
}

export type ComponentState = {
  name: string
  description: string
  tokenOverrides?: Record<string, string>
}

export type AccessibilityRule = {
  rule: string
  wcag?: string
  level?: 'A' | 'AA' | 'AAA'
  passes: boolean
  detail?: string
}

export type ContrastInfo = {
  ratio: number
  level: 'Fail' | 'AA' | 'AA Large' | 'AAA'
  foreground: string
  background: string
}

export type AIRule = {
  useWhen: string[]
  avoidWhen: string[]
  maxPerScreen?: Record<string, number>
  preferredPlacements?: string[]
  semanticIntent: string
  promptHints?: string[]
}

export type ComponentTokenDef = {
  tokenId: string
  label: string
  semanticRef: string
  primitiveRef: string
  currentValue: string
}

export type ComponentDef = {
  id: string
  name: string
  category: string
  description: string
  variants: string[]
  states: ComponentState[]
  tokenDeps: ComponentTokenDef[]
  accessibility: AccessibilityRule[]
  contrast?: ContrastInfo
  aiRules: AIRule
  codeExample: string
  previewType: 'button' | 'input' | 'card' | 'badge' | 'avatar' | 'toggle' | 'dialog' | 'select' | 'checkbox' | 'slider' | 'progress' | 'table' | 'calendar' | 'accordion' | 'tabs' | 'menubar' | 'navigation' | 'breadcrumb' | 'pagination' | 'tooltip' | 'popover' | 'alert' | 'separator' | 'skeleton' | 'dropdown' | 'hover-card' | 'carousel' | 'resizable' | 'toggle-group'

  // ── Schema v2 additions ────────────────────────────────────────
  /** What this component DOES semantically — not what it is structurally */
  semanticRole?: string
  /** InteractionToken IDs this component consumes */
  interactionTokenRefs?: string[]
  /** BehavioralProfile IDs this component is compatible with */
  compatibleProfileIds?: string[]
  /** When to use / avoid (mirrors aiRules.useWhen/avoidWhen at schema level) */
  usageRules?: { useWhen: string[]; avoidWhen: string[] }
}

export type ThemeToken = {
  semanticId: string
  primitiveRef: string
  value: string
}

export type ThemeDirectionAsset = {
  url: string        // GIF / image URL — can be external CDN or /public path
  label: string
  type?: 'gif' | 'img'
}

export type ThemeDirection = {
  moodWords: string[]
  photography: string           // photography/imagery direction note
  motion: string                // motion & animation direction note
  typography: string            // type direction note
  // Add animated GIFs or images here — they render in the Direction mood board
  assets: ThemeDirectionAsset[]
}

export type BrandTheme = {
  id: string
  name: string
  description: string
  accentColor: string
  overrides: ThemeToken[]
  direction?: ThemeDirection
  /** Optional reference to the Brand DNA this theme implements */
  brandDNAId?: string
}

export type PatternDef = {
  id: string
  name: string
  category: string
  description: string
  components: string[]
  aiConstraints: string[]
  semanticPurpose: string
  /** BehavioralProfile IDs this pattern feels right in */
  compatibleProfileIds?: string[]
}

export type NavItem = {
  id: string
  label: string
  icon: string
  children?: NavItem[]
}

export type SelectedItem =
  | { type: 'primitive'; id: string }
  | { type: 'semantic'; id: string }
  | { type: 'component'; id: string }
  | { type: 'theme'; id: string }
  | { type: 'pattern'; id: string }
  | null
