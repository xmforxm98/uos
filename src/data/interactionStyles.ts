/**
 * INTERACTION STYLES → renamed to: Behavioral Profiles
 *
 * Behavioral Profiles are NOT style galleries — they are product behavior identities.
 * Each profile defines:
 *   - motion character (timing, easing philosophy)
 *   - emotional tone (how the product feels to use)
 *   - UX rhythm (density, pacing, feedback intensity)
 *   - interaction philosophy (what gets decorated, what stays quiet)
 *   - component compatibility (which components express this identity best)
 *
 * Architecture:
 *   Interaction Tokens (primitive values: duration, easing, cssTransition)
 *     └── Behavioral Profiles (compositions of tokens = product personality)
 *           └── Brand Themes (adopt a profile)
 *                 └── Components (inherit behavioral identity)
 */

export type DecorationLevel = 'none' | 'subtle' | 'glow' | 'particles'
export type FeedbackLevel   = 'restrained' | 'balanced' | 'expressive'
export type AnimationIntensity = 'instant' | 'minimal' | 'standard' | 'expressive' | 'cinematic'

export type InteractionStyle = {
  id: string
  name: string
  tagline: string
  personality: string        // One-line emotional description
  color: string

  // Token refs → interactionTokens IDs
  motionRefs: string[]
  feedback: FeedbackLevel
  decoration: DecorationLevel
  density: 'compact' | 'normal' | 'relaxed'
  animationIntensity: AnimationIntensity
  gestureModel: 'keyboard-first' | 'pointer-first' | 'touch-first'

  // Context
  productFit: string[]
  emotionalTone: string[]
  exampleProducts: string[]

  // Usage guidance
  usageGuidance: {
    useFor: string[]
    avoidFor: string[]
  }

  // Component compatibility
  componentCompatibility: {
    best: string[]    // component IDs that express this profile best
    avoid: string[]   // components where this profile feels wrong
  }

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
    personality: 'Zero decoration. Transitions so fast they feel instant. The UI never draws attention to itself — only the content matters.',
    color: '#6b6b6b',
    motionRefs: ['motion/instant', 'motion/quick'],
    feedback: 'restrained',
    decoration: 'none',
    density: 'compact',
    animationIntensity: 'instant',
    gestureModel: 'keyboard-first',
    productFit: ['developer-tools', 'cli', 'text-editor', 'admin'],
    emotionalTone: ['focused', 'efficient', 'invisible', 'precise'],
    exampleProducts: ['Linear (no-motion mode)', 'GitHub (compact)', 'Raycast'],
    usageGuidance: {
      useFor: ['Developer tools', 'Power user apps', 'CLI companions', 'Admin panels'],
      avoidFor: ['Consumer onboarding', 'Marketing sites', 'Emotional products'],
    },
    componentCompatibility: {
      best: ['input', 'badge', 'toggle'],
      avoid: ['card'],
    },
    themeIds: [],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    tagline: 'Productive clarity.',
    personality: 'Subtle, fast transitions. No bounce, no spring. Every motion has purpose. The tool serves the work — never the other way around.',
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
    usageGuidance: {
      useFor: ['B2B SaaS', 'Fintech dashboards', 'Enterprise admin panels', 'Data-heavy apps'],
      avoidFor: ['Consumer gaming', 'Creative tools', 'Onboarding flows'],
    },
    componentCompatibility: {
      best: ['button', 'input', 'toggle', 'badge'],
      avoid: [],
    },
    themeIds: ['brand-a'],
  },
  {
    id: 'premium',
    name: 'Premium',
    tagline: 'Fluid precision.',
    personality: 'iOS-inspired spring physics. Glass surfaces. Every interaction feels handcrafted. Expensive without trying — quality you feel before you see.',
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
    usageGuidance: {
      useFor: ['Consumer mobile apps', 'Premium SaaS', 'Brand-forward products'],
      avoidFor: ['Dense data tables', 'Legacy enterprise tools'],
    },
    componentCompatibility: {
      best: ['button', 'card', 'toggle', 'avatar'],
      avoid: [],
    },
    themeIds: ['brand-b'],
  },
  {
    id: 'playful',
    name: 'Playful',
    tagline: 'Joy in motion.',
    personality: 'Big spring overshoots, color celebrations, bouncy everything. The interface rewards interaction — every click should make someone smile.',
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
    usageGuidance: {
      useFor: ['Gaming apps', 'Education products', 'Onboarding flows', 'Consumer social'],
      avoidFor: ['Financial dashboards', 'Medical tools', 'Enterprise admin'],
    },
    componentCompatibility: {
      best: ['toggle', 'button', 'badge'],
      avoid: ['input'],
    },
    themeIds: [],
  },
  {
    id: 'cyber',
    name: 'Cyber',
    tagline: 'Digital pulse.',
    personality: 'Neon glow, floating particles, cinematic transitions. The interface feels like the future — every action has weight and consequence.',
    color: '#03e9f4',
    motionRefs: ['motion/spring', 'motion/smooth', 'motion/fade-in'],
    feedback: 'expressive',
    decoration: 'particles',
    density: 'normal',
    animationIntensity: 'cinematic',
    gestureModel: 'pointer-first',
    productFit: ['gaming', 'crypto', 'ai-consumer', 'metaverse'],
    emotionalTone: ['immersive', 'futuristic', 'intense', 'electric'],
    exampleProducts: ['Vercel (dark)', 'Raycast', 'Crypto dashboards', 'Gaming UIs'],
    usageGuidance: {
      useFor: ['Gaming / metaverse', 'Crypto / Web3', 'Immersive AI products', 'Dark-mode-first apps'],
      avoidFor: ['Healthcare', 'Financial advisory', 'B2B productivity tools'],
    },
    componentCompatibility: {
      best: ['toggle', 'button', 'badge'],
      avoid: ['input', 'card'],
    },
    themeIds: [],
  },
  {
    id: 'native-mobile',
    name: 'Native Mobile',
    tagline: 'Platform-first feel.',
    personality: 'Follows OS conventions exactly. Large touch targets, platform easing curves, haptic-ready timings. Users feel at home before they learn.',
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
    usageGuidance: {
      useFor: ['Mobile-first products', 'PWAs', 'Cross-platform native apps'],
      avoidFor: ['Desktop-only tools', 'Data-dense dashboards'],
    },
    componentCompatibility: {
      best: ['toggle', 'button', 'input'],
      avoid: [],
    },
    themeIds: [],
  },
  {
    id: 'ai-native',
    name: 'AI Native',
    tagline: 'The interface thinks with you.',
    personality: 'Streaming text, generative surfaces, context-aware transitions. Motion reflects computation state — loading feels alive, not dead. The UI breathes with the model.',
    color: '#a855f7',
    motionRefs: ['motion/fade-in', 'motion/smooth', 'motion/spring'],
    feedback: 'balanced',
    decoration: 'subtle',
    density: 'relaxed',
    animationIntensity: 'expressive',
    gestureModel: 'pointer-first',
    productFit: ['ai-consumer', 'llm-products', 'generative-tools', 'ai-b2b'],
    emotionalTone: ['intelligent', 'fluid', 'contextual', 'trustworthy'],
    exampleProducts: ['ChatGPT', 'Claude', 'Perplexity', 'Cursor', 'Notion AI'],
    usageGuidance: {
      useFor: ['AI chat interfaces', 'Generative creative tools', 'LLM-powered products', 'Smart assistants'],
      avoidFor: ['Static data tables', 'Simple CRUD forms', 'Legacy enterprise'],
    },
    componentCompatibility: {
      best: ['input', 'avatar', 'badge', 'card'],
      avoid: [],
    },
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
    recommendedStyleIds: ['ai-native', 'premium'],
    emotionalTone: ['intelligent', 'fluid', 'trustworthy'],
    color: '#a855f7',
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
  {
    id: 'b2b-ai',
    name: 'B2B AI Product',
    productType: 'b2b',
    platform: 'web',
    recommendedStyleIds: ['ai-native', 'enterprise'],
    emotionalTone: ['intelligent', 'trustworthy', 'productive'],
    color: '#a855f7',
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

export function getProfilesCompatibleWithComponent(componentId: string): InteractionStyle[] {
  return interactionStyles.filter(s =>
    !s.componentCompatibility.avoid.includes(componentId)
  )
}

export function getBestProfilesForComponent(componentId: string): InteractionStyle[] {
  return interactionStyles.filter(s =>
    s.componentCompatibility.best.includes(componentId)
  )
}
