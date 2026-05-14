/**
 * INTERACTION STYLES
 *
 * Named behavioral personalities — compositions of Interaction Tokens.
 * An Interaction Style defines HOW a product feels to use:
 * its motion character, decoration philosophy, emotional tone, and density.
 *
 * Architecture:
 *   Interaction Tokens (primitive values)
 *     └── Interaction Styles (compositions of tokens)
 *           └── Brand Themes (opt-in to a style)
 *                 └── Components (inherit style behavior)
 *
 * Critical: Styles are NOT visual variants — they are behavioral identities.
 * The same Toggle looks different AND moves differently in Enterprise vs Cyber.
 */

export type DecorationLevel = 'none' | 'subtle' | 'glow' | 'particles'
export type FeedbackLevel   = 'restrained' | 'balanced' | 'expressive'
export type AnimationIntensity = 'instant' | 'minimal' | 'standard' | 'expressive' | 'cinematic'

export type InteractionStyle = {
  id: string
  name: string
  tagline: string
  personality: string        // one-line emotional description
  color: string              // accent for UI rendering

  // Token refs — maps to interaction token IDs
  motionRefs: string[]       // → interactionTokens IDs
  feedback: FeedbackLevel
  decoration: DecorationLevel
  density: 'compact' | 'normal' | 'relaxed'
  animationIntensity: AnimationIntensity
  gestureModel: 'keyboard-first' | 'pointer-first' | 'touch-first'

  // Context
  productFit: string[]       // e.g. ['b2b', 'saas', 'fintech']
  emotionalTone: string[]    // e.g. ['calm', 'productive']
  exampleProducts: string[]

  // Theme association
  themeIds: string[]
}

export type StartupDNA = {
  id: string
  name: string
  productType: 'b2b' | 'b2c' | 'b2b+b2c' | 'internal'
  platform: 'web' | 'mobile' | 'desktop' | 'cross-platform'
  recommendedStyleIds: string[]
  emotionalTone: string[]
  color: string
}

// ─────────────────────────────────────────────────────────────────────────────

export const interactionStyles: InteractionStyle[] = [
  {
    id: 'minimal',
    name: 'Minimal',
    tagline: 'The interface disappears.',
    personality: 'Zero decoration. Transitions so fast they feel instant. The UI never draws attention to itself.',
    color: '#6b6b6b',
    motionRefs: ['motion/instant', 'motion/quick'],
    feedback: 'restrained',
    decoration: 'none',
    density: 'compact',
    animationIntensity: 'instant',
    gestureModel: 'keyboard-first',
    productFit: ['developer-tools', 'cli', 'text-editor', 'admin'],
    emotionalTone: ['focused', 'efficient', 'invisible'],
    exampleProducts: ['Linear (no-motion mode)', 'GitHub (compact)', 'Raycast'],
    themeIds: [],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    tagline: 'Productive clarity.',
    personality: 'Subtle, fast transitions. No bounce, no spring. Every motion has purpose. The tool serves the work.',
    color: '#2563eb',
    motionRefs: ['motion/quick', 'motion/press', 'motion/instant'],
    feedback: 'restrained',
    decoration: 'none',
    density: 'compact',
    animationIntensity: 'minimal',
    gestureModel: 'keyboard-first',
    productFit: ['b2b', 'saas', 'fintech', 'healthcare', 'erp'],
    emotionalTone: ['calm', 'productive', 'trustworthy', 'structured'],
    exampleProducts: ['Salesforce', 'SAP', 'Notion (workspace)', 'Linear'],
    themeIds: ['brand-a'],
  },
  {
    id: 'premium',
    name: 'Premium',
    tagline: 'Fluid precision.',
    personality: 'iOS-inspired spring physics. Glass surfaces. Every interaction feels crafted. Expensive without trying.',
    color: '#007AFF',
    motionRefs: ['motion/spring', 'motion/smooth', 'motion/fade-in', 'motion/hover-lift'],
    feedback: 'balanced',
    decoration: 'subtle',
    density: 'relaxed',
    animationIntensity: 'expressive',
    gestureModel: 'touch-first',
    productFit: ['b2c', 'mobile', 'consumer', 'productivity'],
    emotionalTone: ['premium', 'fluid', 'alive', 'crafted'],
    exampleProducts: ['Apple iOS', 'Stripe', 'Linear', 'Arc Browser'],
    themeIds: ['brand-b'],
  },
  {
    id: 'playful',
    name: 'Playful',
    tagline: 'Joy in motion.',
    personality: 'Big spring overshoots, color celebrations, bouncy everything. The interface rewards interaction.',
    color: '#f59e0b',
    motionRefs: ['motion/spring', 'motion/fade-in', 'motion/hover-lift'],
    feedback: 'expressive',
    decoration: 'subtle',
    density: 'relaxed',
    animationIntensity: 'expressive',
    gestureModel: 'touch-first',
    productFit: ['b2c', 'gaming', 'education', 'social', 'onboarding'],
    emotionalTone: ['joyful', 'energetic', 'warm', 'rewarding'],
    exampleProducts: ['Duolingo', 'Headspace', 'Notion (consumer)', 'Lottie'],
    themeIds: [],
  },
  {
    id: 'cyber',
    name: 'Cyber',
    tagline: 'Digital pulse.',
    personality: 'Neon glow, floating particles, cinematic transitions. The interface feels like the future.',
    color: '#03e9f4',
    motionRefs: ['motion/spring', 'motion/smooth', 'motion/fade-in'],
    feedback: 'expressive',
    decoration: 'particles',
    density: 'normal',
    animationIntensity: 'cinematic',
    gestureModel: 'pointer-first',
    productFit: ['gaming', 'crypto', 'ai-consumer', 'metaverse'],
    emotionalTone: ['immersive', 'futuristic', 'intense', 'electric'],
    exampleProducts: ['Vercel (dark mode)', 'Raycast (dark)', 'crypto dashboards', 'gaming UIs'],
    themeIds: [],
  },
  {
    id: 'native-mobile',
    name: 'Native Mobile',
    tagline: 'Platform-first feel.',
    personality: 'Follows OS conventions exactly. Large touch targets, platform easing curves, haptic-ready timings.',
    color: '#34c759',
    motionRefs: ['motion/spring', 'motion/smooth', 'motion/press'],
    feedback: 'balanced',
    decoration: 'none',
    density: 'relaxed',
    animationIntensity: 'standard',
    gestureModel: 'touch-first',
    productFit: ['mobile', 'ios', 'android', 'pwa'],
    emotionalTone: ['familiar', 'native', 'accessible', 'smooth'],
    exampleProducts: ['iOS Settings', 'Android Material', 'React Native apps'],
    themeIds: [],
  },
]

// ─── Startup DNA ─────────────────────────────────────────────────────────────

export const startupDNAProfiles: StartupDNA[] = [
  {
    id: 'enterprise-saas',
    name: 'Enterprise SaaS',
    productType: 'b2b',
    platform: 'web',
    recommendedStyleIds: ['enterprise', 'minimal'],
    emotionalTone: ['productive', 'trustworthy', 'calm'],
    color: '#2563eb',
  },
  {
    id: 'consumer-mobile',
    name: 'Consumer Mobile App',
    productType: 'b2c',
    platform: 'mobile',
    recommendedStyleIds: ['premium', 'playful', 'native-mobile'],
    emotionalTone: ['joyful', 'fluid', 'alive'],
    color: '#007AFF',
  },
  {
    id: 'consumer-ai',
    name: 'Consumer AI Product',
    productType: 'b2c',
    platform: 'cross-platform',
    recommendedStyleIds: ['cyber', 'premium'],
    emotionalTone: ['immersive', 'futuristic', 'fluid'],
    color: '#03e9f4',
  },
  {
    id: 'dev-tools',
    name: 'Developer Tools',
    productType: 'b2b',
    platform: 'desktop',
    recommendedStyleIds: ['minimal', 'enterprise'],
    emotionalTone: ['focused', 'efficient', 'invisible'],
    color: '#6b6b6b',
  },
  {
    id: 'gaming',
    name: 'Gaming / Metaverse',
    productType: 'b2c',
    platform: 'web',
    recommendedStyleIds: ['cyber', 'playful'],
    emotionalTone: ['immersive', 'intense', 'rewarding'],
    color: '#f59e0b',
  },
]

// ─── Helpers ─────────────────────────────────────────────────────────────────

export function getInteractionStyle(id: string) {
  return interactionStyles.find(s => s.id === id)
}

export function getStyleForTheme(themeId: string) {
  return interactionStyles.find(s => s.themeIds.includes(themeId))
}

export function getRecommendedStyles(dnaId: string) {
  const dna = startupDNAProfiles.find(d => d.id === dnaId)
  if (!dna) return []
  return dna.recommendedStyleIds.map(id => getInteractionStyle(id)).filter(Boolean) as InteractionStyle[]
}

export const interactionStyleGroups = {
  productivity: ['minimal', 'enterprise'],
  consumer:     ['premium', 'playful', 'native-mobile'],
  immersive:    ['cyber'],
} as const
