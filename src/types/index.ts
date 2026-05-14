export type TokenCategory =
  | 'color'
  | 'spacing'
  | 'typography'
  | 'radius'
  | 'shadow'
  | 'motion'
  | 'opacity'

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
  previewType: 'button' | 'input' | 'card' | 'badge' | 'avatar' | 'toggle' | 'dialog' | 'select'
}

export type ThemeToken = {
  semanticId: string
  primitiveRef: string
  value: string
}

export type BrandTheme = {
  id: string
  name: string
  description: string
  accentColor: string
  overrides: ThemeToken[]
}

export type PatternDef = {
  id: string
  name: string
  category: string
  description: string
  components: string[]
  aiConstraints: string[]
  semanticPurpose: string
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
