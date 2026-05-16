/**
 * REFERENCE INTELLIGENCE
 *
 * Structured the same way designers actually work:
 *   Brand Essence → Reference Collection → Trait Extraction → Behavioral Rules → AI Context
 *
 * Goes one layer deeper than Refero Styles (visual taste extraction):
 *   We add behavioral resolution — WHY this motion, WHY this density,
 *   HOW this maps to component choices.
 */

export type ProfileReference = {
  name: string
  url: string
  description: string
  /** Why this belongs here — trait:value pairs readable by AI */
  traits: string[]
  category: 'product' | 'motion' | 'inspiration'
}

export type ExtractedTraits = {
  motion: string
  density: string
  navigation: string
  visualLanguage: string
  typography: string
}

export type ProfileReferenceData = {
  profileId: string
  /** One-sentence brand essence. "Obsidian developer terminal…" style. */
  semanticEssence: string
  summary: string
  extractedTraits: ExtractedTraits
  doRules: string[]
  dontRules: string[]
  references: ProfileReference[]
  /**
   * agentPrompt and designMd are NOT stored here.
   * They are computed at runtime by traitSynthesis.ts from canonical trait data.
   * Single source of truth: PROFILE_TRAITS in schemas/traits.ts
   */
}

// ─────────────────────────────────────────────────────────────────────────────

export const profileReferences: ProfileReferenceData[] = [

  // ── Enterprise ─────────────────────────────────────────────────────────────
  {
    profileId: 'enterprise',
    semanticEssence: 'Focused productivity infrastructure — dense, fast, predictable. The interface disappears.',
    summary: 'Products where the UI is invisible scaffolding. Trust is built through consistency, not delight.',
    extractedTraits: {
      motion:        'restrained · max 180ms · ease-out only · no spring',
      density:       'compact · tabular data · 8–12px internal padding',
      navigation:    'hierarchical left sidebar · workspace-first · keyboard nav',
      visualLanguage:'border-driven · monochrome · badges not fills · no decoration',
      typography:    'medium-heavy (500–700) · tight tracking · mono for numbers',
    },
    doRules: [
      'Use tabular layouts for data-heavy views',
      'Keyboard shortcuts as first-class navigation (⌘K, j/k)',
      'Status badges with color text, not color fills',
      'Monospace for all numerical and code data',
      'Left sidebar always visible — never collapsed by default',
    ],
    dontRules: [
      'Cinematic transitions or spring bounce',
      'Bottom tab navigation (mobile pattern)',
      'Glow effects or neon accents',
      'Cards where tables would communicate more',
      'Decorative loading animations',
    ],
    references: [
      {
        name: 'Linear',
        url: 'https://linear.app',
        description: 'Keyboard-first project management. Sub-100ms interactions, sidebar hierarchy, zero decoration. The gold standard for enterprise motion.',
        traits: ['motion:instant', 'nav:sidebar', 'density:compact', 'keyboard:first-class'],
        category: 'product',
      },
      {
        name: 'Stripe Dashboard',
        url: 'https://dashboard.stripe.com',
        description: 'Dense tabular data, clear status hierarchy, trust through predictability. Every interaction has exactly one outcome.',
        traits: ['motion:restrained', 'density:compact', 'tables:primary', 'trust:high'],
        category: 'product',
      },
      {
        name: 'GitHub',
        url: 'https://github.com',
        description: 'Developer-first, information-dense. No animation for data. Badges and chips for status. Sidebar navigation with deep hierarchy.',
        traits: ['motion:none', 'density:compact', 'status:badge', 'nav:sidebar'],
        category: 'product',
      },
      {
        name: 'Vercel Dashboard',
        url: 'https://vercel.com/dashboard',
        description: 'Dark, technical, confident. Monospace numbers. Status dots. Deployment logs. Minimal chrome, maximum information.',
        traits: ['motion:subtle', 'density:compact', 'mono:numbers', 'dark:technical'],
        category: 'product',
      },
      {
        name: 'Figma',
        url: 'https://figma.com',
        description: 'Panel-based workspace, deep keyboard shortcut model. Sidebar-to-canvas-to-sidebar navigation. Professional density.',
        traits: ['nav:panel', 'keyboard:deep', 'workspace:professional', 'density:high'],
        category: 'product',
      },
      {
        name: 'Notion',
        url: 'https://notion.so',
        description: 'Focused writing mode with collapsible sidebar. Block-level structure. Quiet, non-intrusive transitions.',
        traits: ['motion:quiet', 'nav:collapsible-sidebar', 'focus:writing', 'density:normal'],
        category: 'product',
      },
    ],
  },

  // ── Minimal ────────────────────────────────────────────────────────────────
  {
    profileId: 'minimal',
    semanticEssence: 'Radical reduction — every element that remains is intentional. Space amplifies signal.',
    summary: 'Products where restraint is the feature. Removing is the design act.',
    extractedTraits: {
      motion:        'invisible · max 80ms · linear easing · no transforms',
      density:       'ultra-sparse · generous margins · zero chrome',
      navigation:    'slim top bar or none · keyboard-first · ⌘K only',
      visualLanguage:'monochrome · zero decoration · text over icons · no shadows',
      typography:    'monospace · single weight (400) · contrast through size only',
    },
    doRules: [
      'Remove all decoration — if it doesn\'t communicate, remove it',
      'Text labels over icons everywhere',
      'Monospace typography for all content',
      'Keyboard shortcuts replace UI menus',
      'Whitespace as the primary layout element',
    ],
    dontRules: [
      'Gradients or color fills',
      'Drop shadows or elevation',
      'Hover animations (color shift only, max 80ms)',
      'Icon-based navigation',
      'Cards with visual chrome',
    ],
    references: [
      {
        name: 'iA Writer',
        url: 'https://ia.net/writer',
        description: 'The canonical minimal product. One font, one size, one purpose. Zero decoration. The interface disappears so the writing remains.',
        traits: ['decoration:none', 'motion:none', 'focus:single', 'typography:mono'],
        category: 'product',
      },
      {
        name: 'Bear',
        url: 'https://bear.app',
        description: 'Markdown editor with sidebar list. Restrained transitions. No icons in navigation — text labels only.',
        traits: ['motion:minimal', 'nav:slim-sidebar', 'text:primary', 'decoration:subtle'],
        category: 'product',
      },
      {
        name: 'Things 3',
        url: 'https://culturedcode.com/things',
        description: 'Every pixel earned. Sidebar with no chrome, clean list rows, no gradients. Single-weight typography.',
        traits: ['spacing:generous', 'decoration:none', 'nav:sidebar', 'color:system'],
        category: 'product',
      },
      {
        name: 'Logseq',
        url: 'https://logseq.com',
        description: 'Outline-first knowledge base. Bullet indentation is the only navigation. Keyboard everything.',
        traits: ['nav:outline', 'keyboard:first-class', 'decoration:none', 'motion:instant'],
        category: 'product',
      },
      {
        name: 'Craft',
        url: 'https://www.craft.do',
        description: 'Document-first editor. Clean block structure. Calm, confident spacing. No unnecessary controls.',
        traits: ['spacing:calm', 'hierarchy:clear', 'motion:gentle', 'chrome:low'],
        category: 'product',
      },
      {
        name: 'Obsidian',
        url: 'https://obsidian.md',
        description: 'Markdown-first knowledge system. Pure text interface, no visual noise. Keyboard graph navigation.',
        traits: ['text:pure', 'keyboard:primary', 'decoration:zero', 'nav:graph'],
        category: 'product',
      },
    ],
  },

  // ── Premium ────────────────────────────────────────────────────────────────
  {
    profileId: 'premium',
    semanticEssence: 'Spring physics and generous whitespace — every interaction has physical weight and intention.',
    summary: 'Products where craft is visible. Delight lives in the details most users won\'t notice consciously.',
    extractedTraits: {
      motion:        'spring · cubic-bezier(0.34,1.56,0.64,1) · 350–500ms · gentle overshoot',
      density:       'generous · card-first · 16–24px padding · progressive disclosure',
      navigation:    'iOS large title + bottom tabs · sheet overlays · back gesture',
      visualLanguage:'elevated surfaces · layered shadows · blur overlays · depth cues',
      typography:    'SF Pro / Inter · light-to-semibold (300–600) · large display text',
    },
    doRules: [
      'Spring physics on all primary interactions (hover, press, enter)',
      'Large display titles (34px+) for section headers',
      'Elevated card surfaces with layered shadows',
      'Blur overlays for sheets and modals',
      'Bottom tab bar for primary navigation',
    ],
    dontRules: [
      'Linear easing (feels dead)',
      'Flat button styles with no elevation',
      'Dense tables instead of cards',
      'Fixed sidebar navigation (mobile-hostile)',
      'Sharp corners — use 12px+ radius throughout',
    ],
    references: [
      {
        name: 'Apple HIG',
        url: 'https://developer.apple.com/design',
        description: 'The source. Large titles, spring physics, material blur, generous whitespace. Every pixel reviewed by a VP of Design.',
        traits: ['motion:spring', 'nav:large-title', 'blur:material', 'spacing:generous'],
        category: 'product',
      },
      {
        name: 'Raycast',
        url: 'https://raycast.com',
        description: 'Command palette done with premium care. Spring animations, instant keyboard response, depth through shadow layering.',
        traits: ['motion:spring', 'keyboard:instant', 'shadow:layered', 'depth:elevated'],
        category: 'product',
      },
      {
        name: 'Framer',
        url: 'https://framer.com',
        description: 'Design tool that embodies its own philosophy. Fluid layout, spring transitions, premium card surfaces.',
        traits: ['motion:fluid', 'layout:dynamic', 'cards:elevated', 'brand:premium'],
        category: 'product',
      },
      {
        name: 'Arc Browser',
        url: 'https://arc.net',
        description: 'Browser with a soul. Spring sidebar, morphing transitions, alive hover states. Restraint + delight.',
        traits: ['motion:spring', 'transitions:morphing', 'hover:alive', 'depth:real'],
        category: 'product',
      },
      {
        name: 'Cron / Notion Calendar',
        url: 'https://cron.com',
        description: 'Calendar with iOS-quality feel on desktop. Spring transitions, blur overlays, native depth cues.',
        traits: ['motion:spring', 'blur:overlay', 'depth:layered', 'feel:native'],
        category: 'product',
      },
      {
        name: 'Luma',
        url: 'https://lu.ma',
        description: 'Event platform with Apple-quality cards, generous whitespace, subtle blur. Premium without being flashy.',
        traits: ['cards:premium', 'spacing:generous', 'blur:subtle', 'typography:large'],
        category: 'product',
      },
    ],
  },

  // ── Playful ────────────────────────────────────────────────────────────────
  {
    profileId: 'playful',
    semanticEssence: 'Joy is the feature — interactions celebrate progress, personality is everywhere.',
    summary: 'Products that feel human. Every milestone is worth celebrating. Emotion is not a side effect.',
    extractedTraits: {
      motion:        'spring bounce · 300ms · cubic-bezier(0.34,1.56,0.64,1) · celebratory',
      density:       'generous · card-first · large progress numbers · emoji as data',
      navigation:    'gradient header · emoji bottom tabs · gesture-forward · max 2 levels',
      visualLanguage:'warm gradients · vivid fills · rounded pills (9999px) · color-rich',
      typography:    'rounded sans (Plus Jakarta) · 700–800 weight · warm headline colors',
    },
    doRules: [
      'Celebrate milestones — confetti, animation, color shift on completion',
      'Emoji as functional UI elements (status, nav, progress)',
      'Gradient backgrounds for section headers',
      'Progress expressed as large bold numbers, not just bars',
      'Spring bounce on enter/exit — overshoot is intentional',
    ],
    dontRules: [
      'Flat monochrome UI (kills personality)',
      'Compact enterprise tables',
      'Linear easing (feels boring)',
      'Traditional sidebar navigation',
      'Plain text status labels without emoji',
    ],
    references: [
      {
        name: 'Duolingo',
        url: 'https://duolingo.com',
        description: 'Mastered joy-driven UI. Character reactions, streak animations, confetti, progress celebration. Every action gets a micro-reward.',
        traits: ['feedback:expressive', 'reward:every-action', 'character:personality', 'motion:spring'],
        category: 'product',
      },
      {
        name: 'Headspace',
        url: 'https://headspace.com',
        description: 'Warm, rounded, friendly. Illustrated characters, soft color palette, gentle bounce animations. Approachable by design.',
        traits: ['shape:rounded', 'color:warm', 'illustration:primary', 'motion:gentle'],
        category: 'product',
      },
      {
        name: 'Robinhood',
        url: 'https://robinhood.com',
        description: 'Confetti on first trade. Progress celebrations. Made finance feel human and fun for the first time.',
        traits: ['celebration:explicit', 'confetti:milestone', 'color:gradient', 'emotion:positive'],
        category: 'product',
      },
      {
        name: 'Lottiefiles',
        url: 'https://lottiefiles.com',
        description: 'Motion-forward brand. Animated illustrations, playful loading states, personality in every interaction.',
        traits: ['animation:illustrative', 'loading:animated', 'brand:playful', 'motion:expressive'],
        category: 'product',
      },
      {
        name: 'Cosmos',
        url: 'https://cosmos.so',
        description: 'Visual board meets social discovery. Colorful, reference-heavy, personality-first layout. Creative community energy.',
        traits: ['layout:masonry', 'visual:primary', 'community:social', 'color:vivid'],
        category: 'product',
      },
      {
        name: 'Superhuman',
        url: 'https://superhuman.com',
        description: 'Speed + delight together. Keyboard-first with expressive feedback. Streaks, celebrations, progress momentum.',
        traits: ['keyboard:fast', 'feedback:expressive', 'streak:motivated', 'motion:spring'],
        category: 'product',
      },
    ],
  },

  // ── Cyber ──────────────────────────────────────────────────────────────────
  {
    profileId: 'cyber',
    semanticEssence: 'Command interface — dark, electric, precise. Glow marks the active system state.',
    summary: 'Products with cinematic presence. The UI is a control surface, not a friendly app.',
    extractedTraits: {
      motion:        'cinematic · cubic-bezier(0.23,1,0.32,1) · 400–800ms · slow precise settle',
      density:       'dense-dark · monospace data · uppercase labels · wide letter-spacing',
      navigation:    'floating icon strip · command palette (⌘K) · context panel on select',
      visualLanguage:'deep dark (#030308) · neon glow on active · angular corners · neon borders',
      typography:    'monospace · ALL CAPS labels · dim default · neon active · brightness hierarchy',
    },
    doRules: [
      'Glow on active state — not just color, actual box-shadow glow',
      'ALL CAPS labels with 0.1em+ letter-spacing for system text',
      'Monospace for all data and labels',
      'Thin neon border on buttons (no fill)',
      'Status through glow intensity, not just color',
    ],
    dontRules: [
      'Light mode or light backgrounds',
      'Spring bounce (feels unstable in command interfaces)',
      'Rounded corners — use 2–4px maximum',
      'Color-filled buttons (use neon border only)',
      'Playful typography or emoji',
    ],
    references: [
      {
        name: 'Arc Browser',
        url: 'https://arc.net',
        description: 'Dark mode with personality. Floating sidebar, command bar, neon-adjacent highlights. Feels like operating a spaceship.',
        traits: ['nav:floating', 'motion:cinematic', 'depth:dark', 'personality:strong'],
        category: 'product',
      },
      {
        name: 'Razer Synapse',
        url: 'https://www.razer.com/synapse',
        description: 'RGB configurator with dark panel UI, neon accent colors, HUD-style status displays.',
        traits: ['color:neon', 'theme:dark', 'hud:style', 'decoration:glow'],
        category: 'product',
      },
      {
        name: 'Vercel (dark)',
        url: 'https://vercel.com',
        description: 'Terminal energy with polish. Dark backgrounds, monospace data, deployment status with glow indicators.',
        traits: ['dark:deep', 'mono:data', 'status:glow', 'energy:terminal'],
        category: 'product',
      },
      {
        name: 'Spline',
        url: 'https://spline.design',
        description: '3D design tool. Dark canvas, floating panels, glowing selection handles. Interface as a design HUD.',
        traits: ['panel:floating', 'canvas:dark', 'glow:selection', 'spatial:ui'],
        category: 'product',
      },
      {
        name: 'Clerk Dashboard',
        url: 'https://dashboard.clerk.com',
        description: 'Dark-first developer dashboard. Monospace data, neon status indicators, terminal-adjacent color language.',
        traits: ['dark:developer', 'mono:primary', 'status:neon', 'brand:technical'],
        category: 'product',
      },
      {
        name: 'Planetscale',
        url: 'https://planetscale.com',
        description: 'Database dashboard with cinematic dark presence. Graph visualizations, neon query highlights, command-first interface.',
        traits: ['dark:cinematic', 'graph:neon', 'query:highlighted', 'command:primary'],
        category: 'product',
      },
    ],
  },

  // ── Native Mobile ──────────────────────────────────────────────────────────
  {
    profileId: 'native-mobile',
    semanticEssence: 'Platform-native muscle memory — iOS conventions followed precisely, zero friction.',
    summary: 'Products that respect the platform. Custom only when it\'s better. Swipe is navigation.',
    extractedTraits: {
      motion:        'iOS spring · 300–400ms · UIKit stiffness:300 damping:30',
      density:       'table-view rows · 44px tap targets · inset-grouped · system separators',
      navigation:    'nav bar + large title · bottom tab bar (max 5) · push/pop · back text label',
      visualLanguage:'system grey backgrounds · iOS tint color · 0.5px separators · blur overlays',
      typography:    '-apple-system (SF Pro) · large title 34px bold · body 17px regular',
    },
    doRules: [
      'Navigation bar with Large Title (collapses on scroll)',
      'Back button: text label (‹ Label), not just an arrow',
      'Inset grouped table view for all list content',
      'Bottom tab bar for primary navigation (max 5 items)',
      '44px minimum tap target on all interactive elements',
    ],
    dontRules: [
      'Custom navigation patterns that differ from iOS expectations',
      'Card layouts where table views communicate better',
      'Custom physics that mismatch UIKit spring feel',
      'Bottom sheets as primary navigation',
      'Tap targets smaller than 44px',
    ],
    references: [
      {
        name: 'Apple iOS HIG',
        url: 'https://developer.apple.com/design/human-interface-guidelines/ios',
        description: 'The canonical reference. Navigation bars, table views, tab bars, system typography. Shaped mobile UX entirely.',
        traits: ['nav:ios-standard', 'tables:inset', 'spring:ios', 'typography:sf-pro'],
        category: 'product',
      },
      {
        name: 'Things 3',
        url: 'https://culturedcode.com/things',
        description: 'Best-in-class iOS task management. Native nav bars, inset grouped tables, spring transitions. iOS-native without being generic.',
        traits: ['nav:ios-nav-bar', 'tables:inset-grouped', 'motion:ios-spring', 'polish:exceptional'],
        category: 'product',
      },
      {
        name: 'Fantastical',
        url: 'https://flexibits.com/fantastical',
        description: 'Calendar with native-first interactions. System fonts, native segmented controls, swipe gestures throughout.',
        traits: ['gestures:swipe', 'controls:native', 'font:system', 'interaction:physical'],
        category: 'product',
      },
      {
        name: 'Apollo',
        url: 'https://apolloapp.io',
        description: 'Beloved Reddit client. Pure iOS patterns executed to perfection. Every swipe, every transition matched system behavior.',
        traits: ['nav:push', 'swipe:back', 'transitions:ios', 'gestures:full'],
        category: 'product',
      },
      {
        name: 'Darkroom',
        url: 'https://darkroom.co',
        description: 'Photo editor with premium native feel. Contextual toolbars, gesture-driven, custom but platform-consistent.',
        traits: ['toolbar:contextual', 'gestures:pinch-zoom', 'feel:native-premium', 'controls:custom'],
        category: 'product',
      },
      {
        name: 'Reeder',
        url: 'https://reederapp.com',
        description: 'RSS reader that mastered iOS transitions. Swipe to read, swipe to archive, full-gesture navigation.',
        traits: ['gestures:primary', 'transitions:push', 'swipe:action', 'polish:ios'],
        category: 'product',
      },
    ],
  },

  // ── AI Native ──────────────────────────────────────────────────────────────
  {
    profileId: 'ai-native',
    semanticEssence: 'Context flows, AI speaks first — the prompt bar is navigation, prediction replaces menus.',
    summary: 'Products where AI is the interface. Context is ambient. Intent replaces navigation.',
    extractedTraits: {
      motion:        'streaming reveals · 600–1000ms smooth · ambient pulse · no spinner',
      density:       'medium · AI insight layer beneath human data · progressive by confidence',
      navigation:    'prompt bar (bottom, always) · contextual cards · no deep menus',
      visualLanguage:'deep dark · purple accent (#8b5cf6) · ambient glow · gradient cards',
      typography:    'clean sans for data · italic/subdued for AI context · 1.7+ line-height for AI',
    },
    doRules: [
      'Prompt bar always visible at bottom — this IS the primary navigation',
      'AI insight layer beneath every human data point (italic, subdued)',
      'Streaming text reveals for generated content',
      'Ambient glow/pulse instead of spinner — "the system is thinking"',
      'AI-phrased status: "trending above forecast" not just "Active"',
    ],
    dontRules: [
      'Static content without AI context layer',
      'Traditional menu-driven navigation',
      'Abrupt cuts or instant state changes (stream everything)',
      'Generic spinners',
      'Generic status labels — AI should interpret them',
    ],
    references: [
      {
        name: 'Perplexity',
        url: 'https://perplexity.ai',
        description: 'AI-first search. Conversational input as primary navigation, streaming responses, context cards. The query IS the interface.',
        traits: ['input:conversational', 'streaming:primary', 'context:ambient', 'nav:query'],
        category: 'product',
      },
      {
        name: 'Cursor',
        url: 'https://cursor.sh',
        description: 'AI-native IDE. Inline suggestions, ambient AI context panel, ⌘K as primary action surface.',
        traits: ['suggestion:inline', 'context:ambient', 'palette:ai-first', 'integration:deep'],
        category: 'product',
      },
      {
        name: 'v0 by Vercel',
        url: 'https://v0.dev',
        description: 'Natural language to UI. Prompt bar at center, streaming code generation, iterative refinement loop.',
        traits: ['input:prompt', 'streaming:code', 'iteration:conversational', 'output:live'],
        category: 'product',
      },
      {
        name: 'Krea AI',
        url: 'https://krea.ai',
        description: 'Real-time AI image generation. Live canvas, ambient generation feedback, latent space exploration.',
        traits: ['generation:realtime', 'feedback:ambient', 'canvas:live', 'presence:ai-visible'],
        category: 'product',
      },
      {
        name: 'Notion AI',
        url: 'https://notion.so/product/ai',
        description: 'AI embedded in document context. Inline actions, selection-triggered suggestions, streaming generation in place.',
        traits: ['ai:contextual', 'trigger:selection', 'streaming:inline', 'ambient:low'],
        category: 'product',
      },
      {
        name: 'Linear Asks',
        url: 'https://linear.app',
        description: 'Natural language issue search. Context-aware AI that understands workspace state. Zero-UI AI query interface.',
        traits: ['query:natural-language', 'context:workspace', 'ai:zero-ui', 'intent:inferred'],
        category: 'product',
      },
    ],
  },
]

export function getProfileReferences(profileId: string): ProfileReferenceData | undefined {
  return profileReferences.find(r => r.profileId === profileId)
}
