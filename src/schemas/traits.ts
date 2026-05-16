/**
 * CANONICAL TRAIT TAXONOMY
 *
 * Problem this solves:
 *   Before this file, traits were free-form strings scattered across reference
 *   cards and profile descriptions, with no shared vocabulary:
 *
 *     motion:none · motion:minimal · motion:quiet · motion:spring
 *     motion:fluid · motion:ios-spring · motion:gentle · motion:instant
 *
 *   All mean subtly different things. None map to each other. AI reasoning
 *   over this data is inconsistent.
 *
 * Design principles:
 *   1. ORTHOGONAL dimensions — each captures a different aspect of UX behavior
 *   2. EXHAUSTIVE canonical values — every real design choice fits somewhere
 *   3. FLAT hierarchy — no nesting. Values within a dimension are mutually exclusive.
 *   4. BEHAVIOR not outcome — "springy" not "premium". Cause, not effect.
 *   5. NORMALIZABLE — alias map converts free-form strings to canonical values
 *
 * 7 dimensions × 4–6 values = the behavioral address space of any interface.
 */

// ─────────────────────────────────────────────────────────────────────────────
// DIMENSION 1: MOTION
// How transitions and state changes communicate timing and character.
// Axis: urgency ←→ presence
// ─────────────────────────────────────────────────────────────────────────────

export type MotionTrait =
  | 'instant'     // 0–80ms, linear or none. Signal without perceptible delay.
                  // Examples: Linear, iA Writer, terminal UIs
  | 'restrained'  // 80–200ms, ease-out. Functional, purposeful, invisible.
                  // Examples: Stripe, GitHub, Figma
  | 'smooth'      // 200–400ms, ease-in-out. Considered and calm.
                  // Examples: Notion, Bear, Craft
  | 'springy'     // 300–600ms, cubic-bezier overshoot (0.34,1.56,0.64,1). Alive.
                  // Examples: iOS, Raycast, Arc, Framer
  | 'cinematic'   // 400–1000ms, cubic-bezier(0.23,1,0.32,1). Slow, precise settle.
                  // Examples: Cyber UIs, gaming dashboards, Spline
  | 'ambient'     // Continuous, generative, pulsing. Not triggered — always present.
                  // Examples: Perplexity, Krea AI, loading states in AI tools

// ─────────────────────────────────────────────────────────────────────────────
// DIMENSION 2: DENSITY
// How much information is present and how tightly it is packed.
// Axis: sparse ←→ layered
// ─────────────────────────────────────────────────────────────────────────────

export type DensityTrait =
  | 'sparse'    // Ultra-minimal. Whitespace is the primary design element.
                // Examples: iA Writer, Obsidian, Logseq
  | 'normal'    // Balanced. Card-first. Standard 16–24px rhythm.
                // Examples: Notion, iOS apps, consumer products
  | 'compact'   // Information-dense. Tabular. 8–12px padding. Every pixel earns its place.
                // Examples: Linear, Stripe, GitHub, Vercel
  | 'layered'   // Multiple tiers of information. Human data + AI context beneath.
                // Examples: Perplexity, Cursor, Notion AI

// ─────────────────────────────────────────────────────────────────────────────
// DIMENSION 3: NAVIGATION
// How users move through the product's information architecture.
// Axis: structural ←→ intentional
// ─────────────────────────────────────────────────────────────────────────────

export type NavigationTrait =
  | 'sidebar'         // Left sidebar, hierarchical, always visible.
                      // Examples: Linear, Figma, Notion, GitHub
  | 'topbar'          // Horizontal nav bar. Flat structure, section-switching.
                      // Examples: Stripe, Bear, most web apps
  | 'push-pop'        // Stack-based drill-down. Back gesture. iOS-native.
                      // Examples: iOS apps, Things 3, Fantastical
  | 'tab-bar'         // Bottom tabs. Parallel sections. Mobile-primary.
                      // Examples: iOS tab bar, Duolingo, Robinhood
  | 'command'         // Keyboard-first. ⌘K as primary. Minimal persistent chrome.
                      // Examples: Linear, Raycast, Vercel, Cyber UIs
  | 'conversational'  // Prompt-driven. No persistent nav. Intent replaces structure.
                      // Examples: Perplexity, Claude, v0, Cursor

// ─────────────────────────────────────────────────────────────────────────────
// DIMENSION 4: VISUAL
// How surfaces are treated and how depth/light/color is used.
// Axis: flat ←→ expressive
// ─────────────────────────────────────────────────────────────────────────────

export type VisualTrait =
  | 'flat'       // No elevation. Border-driven surfaces. Monochrome hierarchy.
                 // Examples: GitHub, Stripe, iA Writer, Minimal UIs
  | 'elevated'   // Shadows, depth, card surfaces. Layered spatial model.
                 // Examples: iOS, Raycast, Framer, consumer SaaS
  | 'glass'      // Blur, translucency, vibrancy. Material depth through light.
                 // Examples: iOS overlays, Arc sidebar, macOS panels
  | 'glow'       // Dark backgrounds + neon light as active state signal.
                 // Examples: Razer Synapse, Arc (dark), Spline, Vercel dark
  | 'editorial'  // Typography-as-design. Layout decisions are the visual statement.
                 // Examples: iA Writer, Linear changelog, Vercel marketing

// ─────────────────────────────────────────────────────────────────────────────
// DIMENSION 5: TYPOGRAPHY
// The weight and personality character of the type system.
// Axis: data ←→ expressive
// ─────────────────────────────────────────────────────────────────────────────

export type TypographyTrait =
  | 'mono'       // Monospace throughout. Data-first, code-adjacent, terminal feel.
                 // Examples: Linear (data), Vercel, iA Writer, Cyber UIs
  | 'light'      // Weight 300–400. Hierarchy through scale and space, not weight.
                 // Examples: iOS SF Pro, Apple HIG, Framer, premium apps
  | 'balanced'   // Weight 400–600. Readable. System-UI adjacent.
                 // Examples: Notion, Stripe, most SaaS products
  | 'heavy'      // Weight 600–800. Bold expression. Numbers are loud.
                 // Examples: Duolingo, Robinhood, consumer mobile

// ─────────────────────────────────────────────────────────────────────────────
// DIMENSION 6: FEEDBACK
// How the system responds to user action and communicates state.
// Axis: silent ←→ generative
// ─────────────────────────────────────────────────────────────────────────────

export type FeedbackTrait =
  | 'silent'      // Minimal visual response. State changes quietly.
                  // Examples: iA Writer, Obsidian, terminal UIs
  | 'functional'  // Clear state communication. Color, badges, status — no decoration.
                  // Examples: Linear, Stripe, GitHub, Figma
  | 'expressive'  // Micro-animation, celebration, emotional resonance.
                  // Examples: Duolingo, Headspace, Robinhood, Raycast
  | 'generative'  // AI-inferred context. Predictive, streaming, anticipatory.
                  // Examples: Perplexity, Cursor, Notion AI, v0

// ─────────────────────────────────────────────────────────────────────────────
// DIMENSION 7: MODALITY
// The primary input model — how users primarily interact.
// Axis: structural ←→ natural
// ─────────────────────────────────────────────────────────────────────────────

export type ModalityTrait =
  | 'keyboard'        // Shortcuts, ⌘K, j/k. Click as fallback.
                      // Examples: Linear, Raycast, Figma, GitHub
  | 'pointer'         // Hover states, precision click. Keyboard as enhancement.
                      // Examples: Stripe, most desktop SaaS
  | 'touch'           // Gesture-first. Swipe navigation. 44px tap targets.
                      // Examples: iOS apps, Duolingo, mobile-first products
  | 'conversational'  // Prompt-driven. Natural language replaces UI navigation.
                      // Examples: Perplexity, Claude, v0, Cursor

// ─────────────────────────────────────────────────────────────────────────────
// COMPOSITE TYPE
// The full behavioral address of an interface.
// Two profiles with the same TraitProfile are behaviorally equivalent.
// ─────────────────────────────────────────────────────────────────────────────

export type TraitProfile = {
  motion:     MotionTrait
  density:    DensityTrait
  navigation: NavigationTrait
  visual:     VisualTrait
  typography: TypographyTrait
  feedback:   FeedbackTrait
  modality:   ModalityTrait
}

// ─────────────────────────────────────────────────────────────────────────────
// NORMALIZATION MAPS
// Converts free-form strings (from reference card tags, user input, etc.)
// to canonical values. Any string not in this map should fail validation.
// ─────────────────────────────────────────────────────────────────────────────

export const MOTION_ALIASES: Record<string, MotionTrait> = {
  // → instant
  'instant': 'instant', 'fast': 'instant', 'snappy': 'instant',
  'immediate': 'instant', 'motion:none': 'instant', 'none': 'instant',

  // → restrained
  'restrained': 'restrained', 'motion:restrained': 'restrained',
  'minimal-motion': 'restrained', 'subtle': 'restrained',
  'motion:subtle': 'restrained', 'motion:minimal': 'restrained',
  'motion:quiet': 'restrained',

  // → smooth
  'smooth': 'smooth', 'considered': 'smooth', 'calm': 'smooth',
  'deliberate': 'smooth', 'gentle': 'smooth', 'motion:gentle': 'smooth',
  'motion:smooth': 'smooth',

  // → springy
  'springy': 'springy', 'spring': 'springy', 'bounce': 'springy',
  'alive': 'springy', 'tactile': 'springy', 'fluid': 'springy',
  'motion:spring': 'springy', 'motion:fluid': 'springy',
  'motion:ios-spring': 'springy', 'spring:ios': 'springy',
  'transitions:morphing': 'springy', 'transitions:ios': 'springy',

  // → cinematic
  'cinematic': 'cinematic', 'dramatic': 'cinematic', 'commanding': 'cinematic',
  'slow': 'cinematic', 'precise': 'cinematic',
  'motion:cinematic': 'cinematic',

  // → ambient
  'ambient': 'ambient', 'pulsing': 'ambient', 'streaming': 'ambient',
  'generative': 'ambient', 'breathing': 'ambient', 'continuous': 'ambient',
}

export const DENSITY_ALIASES: Record<string, DensityTrait> = {
  // → sparse
  'sparse': 'sparse', 'ultra-sparse': 'sparse', 'breathable': 'sparse',
  'spacious': 'sparse', 'minimal-content': 'sparse',

  // → normal
  'normal': 'normal', 'balanced': 'normal', 'standard': 'normal',
  'density:normal': 'normal', 'density:medium': 'normal',

  // → compact
  'compact': 'compact', 'dense': 'compact', 'density:compact': 'compact',
  'information-rich': 'compact', 'tabular': 'compact', 'density:high': 'compact',
  'tight': 'compact',

  // → layered
  'layered': 'layered', 'ai-layered': 'layered', 'contextual': 'layered',
  'multi-tier': 'layered',
}

export const NAVIGATION_ALIASES: Record<string, NavigationTrait> = {
  // → sidebar
  'sidebar': 'sidebar', 'nav:sidebar': 'sidebar', 'nav:collapsible-sidebar': 'sidebar',
  'workspace': 'sidebar', 'hierarchical': 'sidebar', 'nav:panel': 'sidebar',
  'left-nav': 'sidebar',

  // → topbar
  'topbar': 'topbar', 'top-bar': 'topbar', 'nav:topbar': 'topbar',
  'horizontal-nav': 'topbar', 'nav:slim-sidebar': 'topbar',
  'breadcrumb': 'topbar',

  // → push-pop
  'push-pop': 'push-pop', 'nav:push': 'push-pop', 'drill-down': 'push-pop',
  'nav:ios-nav-bar': 'push-pop', 'nav:ios-standard': 'push-pop',
  'ios-nav': 'push-pop', 'nav:large-title': 'push-pop',

  // → tab-bar
  'tab-bar': 'tab-bar', 'bottom-tabs': 'tab-bar', 'tabs': 'tab-bar',
  'nav:tabs': 'tab-bar', 'parallel-sections': 'tab-bar',

  // → command
  'command': 'command', 'command-palette': 'command', 'keyboard-first': 'command',
  '⌘K': 'command', 'nav:floating': 'command', 'nav:outline': 'command',

  // → conversational
  'conversational': 'conversational', 'prompt-driven': 'conversational',
  'nav:query': 'conversational', 'ai-driven': 'conversational',
  'intent-based': 'conversational',
}

export const VISUAL_ALIASES: Record<string, VisualTrait> = {
  // → flat
  'flat': 'flat', 'border-driven': 'flat', 'monochrome': 'flat',
  'no-elevation': 'flat', 'decoration:none': 'flat', 'dark:technical': 'flat',

  // → elevated
  'elevated': 'elevated', 'cards:elevated': 'elevated', 'depth:elevated': 'elevated',
  'shadow': 'elevated', 'cards:premium': 'elevated', 'shadow:layered': 'elevated',
  'depth:layered': 'elevated', 'depth:real': 'elevated',

  // → glass
  'glass': 'glass', 'blur': 'glass', 'translucent': 'glass', 'vibrancy': 'glass',
  'blur:material': 'glass', 'blur:overlay': 'glass', 'blur:subtle': 'glass',
  'frosted': 'glass',

  // → glow
  'glow': 'glow', 'neon': 'glow', 'dark-neon': 'glow', 'color:neon': 'glow',
  'decoration:glow': 'glow', 'status:glow': 'glow', 'glow:selection': 'glow',
  'dark:deep': 'glow', 'dark:developer': 'glow', 'dark:cinematic': 'glow',
  'hud:style': 'glow',

  // → editorial
  'editorial': 'editorial', 'typography-driven': 'editorial',
  'layout-as-design': 'editorial', 'type-driven': 'editorial',
}

export const TYPOGRAPHY_ALIASES: Record<string, TypographyTrait> = {
  // → mono
  'mono': 'mono', 'monospace': 'mono', 'code': 'mono', 'terminal': 'mono',
  'typography:mono': 'mono', 'mono:data': 'mono', 'mono:primary': 'mono',
  'mono:numbers': 'mono', 'typography:sf-mono': 'mono',

  // → light
  'light': 'light', 'thin': 'light', 'weight-300': 'light', 'weight-400': 'light',
  'typography:large': 'light', 'font:system': 'light', 'sf-pro-light': 'light',
  'typography:sf-pro': 'light',

  // → balanced
  'balanced': 'balanced', 'readable': 'balanced', 'standard': 'balanced',
  'system-ui': 'balanced', 'weight-500': 'balanced',

  // → heavy
  'heavy': 'heavy', 'bold': 'heavy', 'weight-700': 'heavy', 'weight-800': 'heavy',
  'display-heavy': 'heavy', 'expressive-type': 'heavy',
}

export const FEEDBACK_ALIASES: Record<string, FeedbackTrait> = {
  // → silent
  'silent': 'silent', 'invisible': 'silent', 'no-feedback': 'silent',
  'quiet': 'silent', 'restrained-feedback': 'silent',

  // → functional
  'functional': 'functional', 'badge': 'functional', 'state-change': 'functional',
  'status:badge': 'functional', 'status:neon': 'functional',

  // → expressive
  'expressive': 'expressive', 'celebrate': 'expressive', 'confetti': 'expressive',
  'feedback:expressive': 'expressive', 'micro-animation': 'expressive',
  'celebration:explicit': 'expressive', 'reward:every-action': 'expressive',

  // → generative
  'generative': 'generative', 'ai-context': 'generative', 'streaming-feedback': 'generative',
  'predictive': 'generative', 'context:ambient': 'generative',
  'suggestion:inline': 'generative',
}

export const MODALITY_ALIASES: Record<string, ModalityTrait> = {
  // → keyboard
  'keyboard': 'keyboard', 'keyboard-first': 'keyboard',
  'keyboard:first-class': 'keyboard', 'keyboard:deep': 'keyboard',
  'keyboard:instant': 'keyboard', 'keyboard:fast': 'keyboard',
  'keyboard:primary': 'keyboard', 'shortcut-first': 'keyboard',

  // → pointer
  'pointer': 'pointer', 'hover-driven': 'pointer', 'click-first': 'pointer',
  'mouse': 'pointer', 'desktop': 'pointer',

  // → touch
  'touch': 'touch', 'gesture': 'touch', 'swipe': 'touch',
  'touch-first': 'touch', 'gestures:swipe': 'touch', 'gestures:full': 'touch',
  'gestures:primary': 'touch', 'gestures:pinch-zoom': 'touch',
  'interaction:physical': 'touch',

  // → conversational
  'conversational': 'conversational', 'prompt-driven': 'conversational',
  'input:conversational': 'conversational', 'input:prompt': 'conversational',
  'voice-text': 'conversational', 'nlp': 'conversational',
}

// ─────────────────────────────────────────────────────────────────────────────
// NORMALIZATION FUNCTION
// Converts any free-form trait string to its canonical dimension value.
// Returns undefined if the trait is unrecognized (caller decides how to handle).
// ─────────────────────────────────────────────────────────────────────────────

type AllTraitMaps = {
  motion:     typeof MOTION_ALIASES
  density:    typeof DENSITY_ALIASES
  navigation: typeof NAVIGATION_ALIASES
  visual:     typeof VISUAL_ALIASES
  typography: typeof TYPOGRAPHY_ALIASES
  feedback:   typeof FEEDBACK_ALIASES
  modality:   typeof MODALITY_ALIASES
}

const ALL_MAPS: AllTraitMaps = {
  motion:     MOTION_ALIASES,
  density:    DENSITY_ALIASES,
  navigation: NAVIGATION_ALIASES,
  visual:     VISUAL_ALIASES,
  typography: TYPOGRAPHY_ALIASES,
  feedback:   FEEDBACK_ALIASES,
  modality:   MODALITY_ALIASES,
}

export function normalizeMotion(raw: string): MotionTrait | undefined {
  return MOTION_ALIASES[raw.toLowerCase()]
}

export function normalizeTrait<D extends keyof AllTraitMaps>(
  dimension: D,
  raw: string
): TraitProfile[D] | undefined {
  return (ALL_MAPS[dimension] as Record<string, TraitProfile[D]>)[raw.toLowerCase()]
}

// ─────────────────────────────────────────────────────────────────────────────
// CANONICAL PROFILE MAPPING
// The behavioral address of each profile in canonical trait space.
// This is the single source of truth for what each profile IS.
// Everything else (agent prompts, compatibility checks) derives from this.
// ─────────────────────────────────────────────────────────────────────────────

export const PROFILE_TRAITS: Record<string, TraitProfile> = {
  enterprise: {
    motion:     'restrained',
    density:    'compact',
    navigation: 'sidebar',
    visual:     'flat',
    typography: 'balanced',
    feedback:   'functional',
    modality:   'keyboard',
  },
  minimal: {
    motion:     'instant',
    density:    'sparse',
    navigation: 'command',
    visual:     'flat',
    typography: 'mono',
    feedback:   'silent',
    modality:   'keyboard',
  },
  premium: {
    motion:     'springy',
    density:    'normal',
    navigation: 'push-pop',
    visual:     'glass',
    typography: 'light',
    feedback:   'expressive',
    modality:   'touch',
  },
  playful: {
    motion:     'springy',
    density:    'normal',
    navigation: 'tab-bar',
    visual:     'elevated',
    typography: 'heavy',
    feedback:   'expressive',
    modality:   'touch',
  },
  cyber: {
    motion:     'cinematic',
    density:    'compact',
    navigation: 'command',
    visual:     'glow',
    typography: 'mono',
    feedback:   'functional',
    modality:   'keyboard',
  },
  'native-mobile': {
    motion:     'springy',
    density:    'normal',
    navigation: 'push-pop',
    visual:     'glass',
    typography: 'balanced',
    feedback:   'functional',
    modality:   'touch',
  },
  'ai-native': {
    motion:     'ambient',
    density:    'layered',
    navigation: 'conversational',
    visual:     'glow',
    typography: 'light',
    feedback:   'generative',
    modality:   'conversational',
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// PROFILE SIMILARITY
// Compute how many dimensions two profiles share.
// Enables: "if you like Enterprise, you might relate to Minimal" reasoning.
// ─────────────────────────────────────────────────────────────────────────────

export function profileSimilarity(a: string, b: string): { score: number; shared: string[]; different: string[] } {
  const ta = PROFILE_TRAITS[a]
  const tb = PROFILE_TRAITS[b]
  if (!ta || !tb) return { score: 0, shared: [], different: [] }

  const dimensions = Object.keys(ta) as (keyof TraitProfile)[]
  const shared: string[] = []
  const different: string[] = []

  for (const dim of dimensions) {
    if (ta[dim] === tb[dim]) {
      shared.push(`${dim}:${ta[dim]}`)
    } else {
      different.push(`${dim}: ${ta[dim]} ↔ ${tb[dim]}`)
    }
  }

  return {
    score: shared.length / dimensions.length,
    shared,
    different,
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// TRAIT CONFLICT DETECTION
// Some trait combinations are contradictory or incoherent.
// Returns a list of conflicts if any exist.
// ─────────────────────────────────────────────────────────────────────────────

type TraitConflict = { traits: string[]; reason: string }

export function detectConflicts(profile: TraitProfile): TraitConflict[] {
  const conflicts: TraitConflict[] = []

  // sparse density + compact density → contradiction (shouldn't occur, but validate)
  if (profile.density === 'sparse' && profile.navigation === 'sidebar') {
    conflicts.push({
      traits: ['density:sparse', 'navigation:sidebar'],
      reason: 'Sparse density rarely coexists with persistent sidebar (sidebar takes space, undermining sparseness)',
    })
  }

  if (profile.motion === 'ambient' && profile.modality === 'keyboard') {
    conflicts.push({
      traits: ['motion:ambient', 'modality:keyboard'],
      reason: 'Ambient motion suggests AI-driven flow; keyboard modality suggests deliberate command. Usually incompatible.',
    })
  }

  if (profile.visual === 'flat' && profile.feedback === 'expressive') {
    conflicts.push({
      traits: ['visual:flat', 'feedback:expressive'],
      reason: 'Flat visual language and expressive feedback are in tension. Expressive feedback needs surfaces to animate.',
    })
  }

  if (profile.typography === 'heavy' && profile.visual === 'flat') {
    conflicts.push({
      traits: ['typography:heavy', 'visual:flat'],
      reason: 'Heavy typography on flat surfaces creates visual imbalance. Flat systems typically use balanced or light weight.',
    })
  }

  if (profile.density === 'sparse' && profile.feedback === 'expressive') {
    conflicts.push({
      traits: ['density:sparse', 'feedback:expressive'],
      reason: 'Sparse design philosophy conflicts with expressive feedback — if space is the signal, celebrating events breaks the contract.',
    })
  }

  return conflicts
}

// ─────────────────────────────────────────────────────────────────────────────
// HUMAN-READABLE DESCRIPTIONS
// Used in prompt synthesis and UI rendering.
// ─────────────────────────────────────────────────────────────────────────────

export const MOTION_DESCRIPTIONS: Record<MotionTrait, string> = {
  instant:    'near-zero duration, state changes are immediate signals',
  restrained: 'max 180ms, ease-out, functional — never draws attention',
  smooth:     '200–400ms, ease-in-out, considered and calm',
  springy:    '300–600ms, spring overshoot, physically alive and tactile',
  cinematic:  '400–1000ms, slow precise settle, commanding presence',
  ambient:    'continuous pulse or stream — not triggered, always present',
}

export const DENSITY_DESCRIPTIONS: Record<DensityTrait, string> = {
  sparse:  'ultra-sparse, whitespace as primary design element, 24px+ margins',
  normal:  'balanced card-first layout, 16–24px internal padding',
  compact: 'information-dense, tabular, 8–12px padding, every pixel earns its place',
  layered: 'human data + AI insight beneath, progressive by confidence',
}

export const NAVIGATION_DESCRIPTIONS: Record<NavigationTrait, string> = {
  sidebar:        'hierarchical left sidebar, always visible, workspace-first',
  topbar:         'horizontal nav bar, flat structure, section-switching',
  'push-pop':     'stack-based drill-down, back gesture, iOS-native conventions',
  'tab-bar':      'bottom tabs, parallel sections, mobile-primary',
  command:        '⌘K as primary, minimal persistent chrome, keyboard-first',
  conversational: 'prompt-driven, AI determines what surfaces, intent-based',
}

export const VISUAL_DESCRIPTIONS: Record<VisualTrait, string> = {
  flat:      'no elevation, border-driven surfaces, monochrome hierarchy',
  elevated:  'layered shadows, card surfaces, depth through light',
  glass:     'blur and translucency, material depth, iOS-quality overlay',
  glow:      'dark background, neon light as active state signal',
  editorial: 'typography as primary design element, layout is the visual statement',
}

export const TYPOGRAPHY_DESCRIPTIONS: Record<TypographyTrait, string> = {
  mono:     'monospace throughout, data-first, terminal-adjacent',
  light:    'weight 300–400, hierarchy through scale and space',
  balanced: 'weight 400–600, standard readable, system-UI adjacent',
  heavy:    'weight 600–800, bold expression, numbers are loud',
}

export const FEEDBACK_DESCRIPTIONS: Record<FeedbackTrait, string> = {
  silent:     'minimal response, state changes quietly, no decoration',
  functional: 'clear state communication via color, badges, status indicators',
  expressive: 'micro-animation, celebration, emotional resonance',
  generative: 'AI-inferred context, streaming, predictive and anticipatory',
}

export const MODALITY_DESCRIPTIONS: Record<ModalityTrait, string> = {
  keyboard:        'shortcuts and ⌘K first-class, click as fallback',
  pointer:         'hover states and precision click, keyboard as enhancement',
  touch:           'gesture-first, swipe navigation, 44px minimum tap targets',
  conversational:  'prompt-driven, natural language replaces UI navigation',
}
