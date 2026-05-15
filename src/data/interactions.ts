/**
 * INTERACTION TOKENS
 *
 * Behavioral semantic primitives — the "how it feels" layer of the design system.
 * These are NOT component-level implementations.
 * They are reusable interaction values that components CONSUME.
 *
 * Critical note: gesture tokens (swipe/drag) and navigation patterns
 * (stacked/workspace) are NOT interaction tokens — they are platform
 * implementation details and layout patterns respectively.
 * Tokens define VALUES (duration, easing, intensity), not behaviors.
 */

export type InteractionToken = {
  id: string
  name: string
  group: 'motion' | 'feedback' | 'density'
  // Primitive refs
  durationRef?: string       // → duration-fast, duration-normal, etc.
  easingRef?: string         // → ease-out, ease-spring, etc.
  // Resolved CSS shorthand for direct use
  cssTransition?: string     // e.g. 'all 100ms cubic-bezier(0,0,0.2,1)'
  cssTransform?: string      // e.g. 'translateY(-3px) scale(1.01)'
  // Metadata
  description: string
  usage: string[]
  intensity: 'none' | 'subtle' | 'standard' | 'expressive'
  platformSupport: {
    desktop: 'full' | 'partial' | 'none'
    mobile: 'full' | 'partial' | 'none'
    touch: 'full' | 'partial' | 'none'
  }
  productFit: 'all' | 'b2b' | 'b2c' | 'b2b+' | 'b2c+'
  /**
   * Emotional qualities this token conveys.
   * Used by resolver to match tokens to Brand DNA emotional intent.
   */
  emotionalQualities: string[]
}

export type InteractionProfile = {
  id: string
  name: string
  tagline: string
  persona: string              // Who uses this product type
  motion: 'minimal' | 'standard' | 'expressive'
  density: 'compact' | 'normal' | 'relaxed'
  gestureModel: 'keyboard-first' | 'pointer-first' | 'touch-first'
  // Token assignments
  hoverToken: string
  pressToken: string
  enterToken: string
  exitToken: string
  feedbackToken: string
  densityToken: string
  // Theme association
  themeIds: string[]
  color: string               // for UI rendering
}

// ── Motion Tokens ──────────────────────────────────────────────
// Semantic layer on top of primitive motion tokens.
// Maps interaction contexts to duration + easing pairs.

export const interactionTokens: InteractionToken[] = [

  // ── Motion group ────────────────────────────────────────────
  {
    id: 'motion/instant',
    name: 'motion/instant',
    group: 'motion',
    durationRef: 'duration-instant',
    easingRef: 'ease-linear',
    cssTransition: 'all 0ms linear',
    description: 'No animation — immediate state change. For critical feedback where delay would cause confusion.',
    usage: ['Loading state swap', 'Error flash', 'Skeleton→content swap'],
    intensity: 'none',
    platformSupport: { desktop: 'full', mobile: 'full', touch: 'full' },
    productFit: 'all',
    emotionalQualities: ['decisive', 'reliable', 'no-nonsense'],
  },
  {
    id: 'motion/quick',
    name: 'motion/quick',
    group: 'motion',
    durationRef: 'duration-fast',
    easingRef: 'ease-out',
    cssTransition: 'all 100ms cubic-bezier(0,0,0.2,1)',
    description: 'Fast, precise. For interactive micro-states — feels responsive without distracting.',
    usage: ['Button hover/focus', 'Toggle', 'Checkbox', 'Input focus ring', 'Badge color swap'],
    intensity: 'subtle',
    platformSupport: { desktop: 'full', mobile: 'full', touch: 'partial' },
    productFit: 'b2b+',
    emotionalQualities: ['responsive', 'snappy', 'professional'],
  },
  {
    id: 'motion/hover-lift',
    name: 'motion/hover-lift',
    group: 'motion',
    durationRef: 'duration-fast',
    easingRef: 'ease-out',
    cssTransition: 'transform 120ms cubic-bezier(0,0,0.2,1), box-shadow 120ms cubic-bezier(0,0,0.2,1)',
    cssTransform: 'translateY(-3px)',
    description: 'Subtle upward lift with shadow elevation on hover. Creates depth without drama.',
    usage: ['Cards', 'List items', 'Interactive tiles', 'Preview thumbnails'],
    intensity: 'subtle',
    platformSupport: { desktop: 'full', mobile: 'none', touch: 'none' },
    productFit: 'all',
    emotionalQualities: ['depth', 'interactive', 'inviting'],
  },
  {
    id: 'motion/press',
    name: 'motion/press',
    group: 'motion',
    durationRef: 'duration-fast',
    easingRef: 'ease-in',
    cssTransition: 'transform 80ms cubic-bezier(0.4,0,1,1)',
    cssTransform: 'scale(0.97)',
    description: 'Slight scale-down on press/active. Confirms physical action. Essential for primary CTAs.',
    usage: ['All clickable elements', 'Button :active', 'Icon button press', 'Tap target'],
    intensity: 'subtle',
    platformSupport: { desktop: 'full', mobile: 'full', touch: 'full' },
    productFit: 'all',
    emotionalQualities: ['physical', 'tactile', 'confirming'],
  },
  {
    id: 'motion/spring',
    name: 'motion/spring',
    group: 'motion',
    durationRef: 'duration-normal',
    easingRef: 'ease-spring',
    cssTransition: 'all 300ms cubic-bezier(0.34,1.56,0.64,1)',
    cssTransform: 'scale(1.04)',
    description: 'Spring physics — slight overshoot then settles. Feels alive. Signature of expressive brands.',
    usage: ['Mobile menus', 'Expanding cards', 'Tooltip appear', 'Drawer open', 'Success confirm'],
    intensity: 'expressive',
    platformSupport: { desktop: 'partial', mobile: 'full', touch: 'full' },
    productFit: 'b2c+',
    emotionalQualities: ['alive', 'playful', 'energetic'],
  },
  {
    id: 'motion/smooth',
    name: 'motion/smooth',
    group: 'motion',
    durationRef: 'duration-slow',
    easingRef: 'ease-in-out',
    cssTransition: 'all 300ms cubic-bezier(0.4,0,0.2,1)',
    description: 'Deliberate, premium. For large UI transitions that need to feel intentional.',
    usage: ['Page transitions', 'Modal open/close', 'Sidebar slide', 'Sheet', 'Overlay fade'],
    intensity: 'standard',
    platformSupport: { desktop: 'full', mobile: 'full', touch: 'full' },
    productFit: 'all',
    emotionalQualities: ['premium', 'deliberate', 'polished'],
  },
  {
    id: 'motion/fade-in',
    name: 'motion/fade-in',
    group: 'motion',
    durationRef: 'duration-normal',
    easingRef: 'ease-out',
    cssTransition: 'opacity 200ms cubic-bezier(0,0,0.2,1), transform 200ms cubic-bezier(0,0,0.2,1)',
    cssTransform: 'translateY(8px)',
    description: 'Content entering the viewport — fade + subtle rise. Clean, not dramatic.',
    usage: ['Dropdown open', 'Popover', 'Toast appear', 'Search results', 'List stagger'],
    intensity: 'subtle',
    platformSupport: { desktop: 'full', mobile: 'full', touch: 'full' },
    productFit: 'all',
    emotionalQualities: ['gentle', 'welcoming', 'clean'],
  },

  // ── Feedback group ──────────────────────────────────────────
  // Interaction personality bundles — map product type to motion philosophy.
  {
    id: 'feedback/productive',
    name: 'feedback/productive',
    group: 'feedback',
    description: 'Minimal motion, function-first. Interaction confirms but never distracts. The tool disappears; the work remains.',
    usage: ['Enterprise SaaS', 'B2B tools', 'Data-heavy apps', 'Professional software'],
    intensity: 'none',
    platformSupport: { desktop: 'full', mobile: 'partial', touch: 'partial' },
    productFit: 'b2b',
    emotionalQualities: ['focused', 'efficient', 'invisible'],
  },
  {
    id: 'feedback/expressive',
    name: 'feedback/expressive',
    group: 'feedback',
    description: 'Spring + overshoot. Interaction feels alive, tactile, delightful. The interface has personality.',
    usage: ['Consumer apps', 'Mobile B2C', 'Creative tools', 'Social platforms'],
    intensity: 'expressive',
    platformSupport: { desktop: 'partial', mobile: 'full', touch: 'full' },
    productFit: 'b2c',
    emotionalQualities: ['joyful', 'alive', 'rewarding'],
  },
  {
    id: 'feedback/balanced',
    name: 'feedback/balanced',
    group: 'feedback',
    description: 'Standard motion — purposeful without being sterile. Works across most contexts.',
    usage: ['General web apps', 'Marketing sites', 'Cross-audience products'],
    intensity: 'standard',
    platformSupport: { desktop: 'full', mobile: 'full', touch: 'full' },
    productFit: 'all',
    emotionalQualities: ['neutral', 'comfortable', 'universal'],
  },

  // ── Density group ───────────────────────────────────────────
  {
    id: 'density/compact',
    name: 'density/compact',
    group: 'density',
    description: 'Tight spacing, smaller touch targets. Optimized for keyboard + pointer. Maximum information density.',
    usage: ['Enterprise dashboards', 'Data tables', 'Admin UIs', 'Dev tools'],
    intensity: 'none',
    platformSupport: { desktop: 'full', mobile: 'none', touch: 'none' },
    productFit: 'b2b',
    emotionalQualities: ['efficient', 'powerful', 'information-rich'],
  },
  {
    id: 'density/normal',
    name: 'density/normal',
    group: 'density',
    description: 'Standard spacing. Works everywhere. The safe default for mixed audiences.',
    usage: ['General SaaS', 'Web apps', 'Mixed audiences'],
    intensity: 'none',
    platformSupport: { desktop: 'full', mobile: 'full', touch: 'partial' },
    productFit: 'all',
    emotionalQualities: ['balanced', 'accessible', 'universal'],
  },
  {
    id: 'density/relaxed',
    name: 'density/relaxed',
    group: 'density',
    description: 'Generous spacing, large touch targets. Optimized for touch. Breathable, premium feel.',
    usage: ['Mobile apps', 'Consumer products', 'Onboarding flows', 'Marketing'],
    intensity: 'none',
    platformSupport: { desktop: 'partial', mobile: 'full', touch: 'full' },
    productFit: 'b2c',
    emotionalQualities: ['breathable', 'premium', 'touch-friendly'],
  },
]

// ── Interaction Profiles ──────────────────────────────────────
// A profile bundles interaction tokens into a cohesive behavioral personality.
// Themes opt-in to a profile — components consume the profile's token references.

export const interactionProfiles: InteractionProfile[] = [
  {
    id: 'productive',
    name: 'Productive',
    tagline: 'The tool disappears. The work remains.',
    persona: 'B2B Enterprise · Desktop-first · Power users',
    motion: 'minimal',
    density: 'compact',
    gestureModel: 'keyboard-first',
    hoverToken: 'motion/quick',
    pressToken: 'motion/press',
    enterToken: 'motion/quick',
    exitToken: 'motion/instant',
    feedbackToken: 'feedback/productive',
    densityToken: 'density/compact',
    themeIds: ['brand-a'],
    color: '#2563eb',
  },
  {
    id: 'expressive',
    name: 'Expressive',
    tagline: 'The interface is alive.',
    persona: 'B2C Consumer · Mobile-first · Touch & gesture',
    motion: 'expressive',
    density: 'relaxed',
    gestureModel: 'touch-first',
    hoverToken: 'motion/hover-lift',
    pressToken: 'motion/spring',
    enterToken: 'motion/fade-in',
    exitToken: 'motion/smooth',
    feedbackToken: 'feedback/expressive',
    densityToken: 'density/relaxed',
    themeIds: ['brand-b'],
    color: '#007AFF',
  },
  {
    id: 'balanced',
    name: 'Balanced',
    tagline: 'Purposeful without being sterile.',
    persona: 'General Web · Cross-platform · Mixed audience',
    motion: 'standard',
    density: 'normal',
    gestureModel: 'pointer-first',
    hoverToken: 'motion/hover-lift',
    pressToken: 'motion/press',
    enterToken: 'motion/fade-in',
    exitToken: 'motion/smooth',
    feedbackToken: 'feedback/balanced',
    densityToken: 'density/normal',
    themeIds: ['utopia', 'light', 'dark'],
    color: '#CC5536',
  },
]

export function getInteractionToken(id: string) {
  return interactionTokens.find(t => t.id === id)
}

export function getInteractionProfile(id: string) {
  return interactionProfiles.find(p => p.id === id)
}

export function getProfileForTheme(themeId: string) {
  return interactionProfiles.find(p => p.themeIds.includes(themeId))
}

export const interactionGroups = ['motion', 'feedback', 'density'] as const
