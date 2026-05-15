/**
 * BRAND DNA DATA
 *
 * Concrete brand identities that blend BehavioralProfiles.
 * These are archetypes — real products can fork and customize.
 *
 * Each entry answers: "Why does this product feel the way it does?"
 */

import type { BrandDNA } from '@/schemas/brand-dna'

export const brandDNAProfiles: BrandDNA[] = [

  // ── Stripe-like ───────────────────────────────────────────────────────────
  {
    id: 'stripe-like',
    name: 'Stripe-like',
    tagline: 'Precision at every touch point.',
    color: '#635bff',
    behavioralBlend: [
      { profileId: 'enterprise', weight: 70, role: 'primary' },
      { profileId: 'premium',    weight: 30, role: 'secondary' },
    ],
    emotionalTone: ['precise', 'calm', 'premium', 'trustworthy'],
    visualLanguage: ['glass', 'subtle-depth', 'high-contrast', 'clean-type'],
    motionPhilosophy: ['purposeful', 'no-bounce', 'fast', 'restrained'],
    interactionPersonality: ['predictable', 'keyboard-first', 'never-surprising'],
    moodboard: [
      {
        id: 'stripe-checkout',
        label: 'Stripe checkout — precision under pressure',
        source: 'stripe.com',
        emotionalTone: ['precise', 'trustworthy', 'calm'],
        motionStyle: ['restrained', 'instant-feedback'],
        visualLanguage: ['white-space', 'subtle-border', 'clean-type'],
        density: 'relaxed',
      },
      {
        id: 'stripe-dashboard',
        label: 'Stripe dashboard — data without noise',
        source: 'dashboard.stripe.com',
        emotionalTone: ['structured', 'productive', 'technical'],
        motionStyle: ['minimal', 'purposeful'],
        visualLanguage: ['monochrome', 'grid-based', 'subtle-shadow'],
        density: 'compact',
      },
    ],
    compatibleThemeIds: ['brand-a', 'light'],
    aiPromptContext:
      'This product values precision and trust above all. Every interaction should feel intentional and fast. Nothing bounces. Nothing lingers. The UI disappears into the work. Use clean white space, subtle borders, and typography as the primary design tool. Financial or transactional contexts demand absolute clarity.',
    aiConstraints: [
      'Never use spring animations or bounce effects',
      'All transitions must complete in under 200ms',
      'No decorative elements — every visual must serve a function',
      'Primary actions must be unmistakably clear at a glance',
      'Error states must be immediate and specific',
    ],
  },

  // ── Linear-like ───────────────────────────────────────────────────────────
  {
    id: 'linear-like',
    name: 'Linear-like',
    tagline: 'Speed is a feature.',
    color: '#5e6ad2',
    behavioralBlend: [
      { profileId: 'minimal',    weight: 60, role: 'primary' },
      { profileId: 'enterprise', weight: 40, role: 'secondary' },
    ],
    emotionalTone: ['fast', 'focused', 'minimal', 'powerful'],
    visualLanguage: ['dark-surface', 'high-contrast', 'monochrome', 'dense-type'],
    motionPhilosophy: ['instant', 'keyboard-native', 'zero-waste'],
    interactionPersonality: ['keyboard-first', 'power-user', 'no-ceremony'],
    moodboard: [
      {
        id: 'linear-issue-view',
        label: 'Linear issue view — focused power',
        source: 'linear.app',
        emotionalTone: ['focused', 'fast', 'powerful'],
        motionStyle: ['instant', 'keyboard-driven'],
        visualLanguage: ['dark', 'high-contrast', 'compact'],
        density: 'compact',
      },
      {
        id: 'linear-command',
        label: 'Linear command palette — thought speed',
        source: 'linear.app',
        emotionalTone: ['instant', 'precise', 'powerful'],
        motionStyle: ['fade-in-quick', 'no-delay'],
        visualLanguage: ['overlay', 'monospace-hint', 'minimal-chrome'],
        density: 'compact',
      },
    ],
    compatibleThemeIds: ['dark', 'brand-a'],
    aiPromptContext:
      'Speed is the primary value. Every interaction must feel instantaneous — the interface is for power users who think faster than they click. Keyboard shortcuts are first-class citizens. Nothing should feel slow, ceremonial, or decorative. If an action can be done inline, never open a modal.',
    aiConstraints: [
      'Keyboard shortcuts must exist for all primary actions',
      'No modals where inline editing is possible',
      'Skeleton loading only — never use spinners for content',
      'Color is for meaning, never decoration',
      'Command palette must be accessible from anywhere',
    ],
  },

  // ── Discord-like ──────────────────────────────────────────────────────────
  {
    id: 'discord-like',
    name: 'Discord-like',
    tagline: 'Where your community lives.',
    color: '#5865f2',
    behavioralBlend: [
      { profileId: 'playful',       weight: 55, role: 'primary' },
      { profileId: 'ai-native',     weight: 25, role: 'secondary' },
      { profileId: 'native-mobile', weight: 20, role: 'accent' },
    ],
    emotionalTone: ['playful', 'social', 'reactive', 'youthful'],
    visualLanguage: ['vibrant-color', 'rounded-corners', 'avatar-heavy', 'status-indicators'],
    motionPhilosophy: ['spring', 'bouncy', 'reactive', 'immediate'],
    interactionPersonality: ['social-first', 'notification-rich', 'expressive'],
    moodboard: [
      {
        id: 'discord-server',
        label: 'Discord server view — social presence',
        source: 'discord.com',
        emotionalTone: ['social', 'playful', 'alive'],
        motionStyle: ['spring', 'reactive'],
        visualLanguage: ['rounded', 'avatar-heavy', 'dark-surface'],
        density: 'normal',
      },
      {
        id: 'discord-reactions',
        label: 'Discord emoji reactions — micro-joy',
        source: 'discord.com',
        emotionalTone: ['playful', 'expressive', 'warm'],
        motionStyle: ['spring-pop', 'bouncy'],
        visualLanguage: ['emoji', 'rounded-pill', 'vibrant'],
        density: 'relaxed',
      },
    ],
    compatibleThemeIds: ['dark'],
    aiPromptContext:
      'This product is about community and belonging. It should feel alive and social. Reactions, presence indicators, and status must be front and center. Spring animations make interactions feel warm and playful. Users should feel like they are in a space with other people — not a tool, but a place.',
    aiConstraints: [
      'Always show presence/status indicators where users exist',
      'Reactions and emoji must be accessible and expressive',
      'Notifications should be visible but not anxiety-inducing',
      'Color reinforces identity and status, not just structure',
      'Avatar stacks and online indicators are required in social contexts',
    ],
  },

  // ── Apple-like ────────────────────────────────────────────────────────────
  {
    id: 'apple-like',
    name: 'Apple-like',
    tagline: 'The detail is the product.',
    color: '#007aff',
    behavioralBlend: [
      { profileId: 'premium',       weight: 65, role: 'primary' },
      { profileId: 'native-mobile', weight: 35, role: 'secondary' },
    ],
    emotionalTone: ['soft', 'premium', 'spatial', 'cinematic'],
    visualLanguage: ['glass', 'blur-depth', 'soft-shadow', 'rounded-xl'],
    motionPhilosophy: ['spring-physics', 'cinematic', 'spatial', 'layered'],
    interactionPersonality: ['touch-native', 'haptic-ready', 'gesture-driven'],
    moodboard: [
      {
        id: 'ios-settings',
        label: 'iOS Settings — native clarity',
        source: 'apple.com/ios',
        emotionalTone: ['premium', 'soft', 'clear'],
        motionStyle: ['spring', 'cinematic'],
        visualLanguage: ['glass', 'blur', 'rounded'],
        density: 'relaxed',
      },
      {
        id: 'macos-glass',
        label: 'macOS vibrancy — spatial depth',
        source: 'apple.com/macos',
        emotionalTone: ['premium', 'spatial', 'crafted'],
        motionStyle: ['cinematic', 'layered'],
        visualLanguage: ['vibrancy', 'glass', 'blur-depth'],
        density: 'relaxed',
      },
    ],
    compatibleThemeIds: ['brand-b', 'light'],
    aiPromptContext:
      'Every detail is intentional. Glass surfaces, spring physics, and spatial depth create an experience that feels handcrafted. Touch gestures are the primary input model. The product should feel like it has weight and texture. Quality is communicated through restraint, not decoration — less visual noise, more physical honesty.',
    aiConstraints: [
      'Spring animations only — never linear easing for UI transitions',
      'Glass and blur effects reinforce spatial hierarchy, not decoration',
      'Touch targets minimum 44×44px at all times',
      'System font stack unless brand typography is explicitly defined',
      'Every animation must have a corresponding exit animation',
    ],
  },

  // ── Vercel-like ───────────────────────────────────────────────────────────
  {
    id: 'vercel-like',
    name: 'Vercel-like',
    tagline: 'Deploy with confidence.',
    color: '#000000',
    behavioralBlend: [
      { profileId: 'cyber',      weight: 40, role: 'primary' },
      { profileId: 'minimal',    weight: 35, role: 'secondary' },
      { profileId: 'enterprise', weight: 25, role: 'accent' },
    ],
    emotionalTone: ['dark', 'precise', 'developer', 'electric'],
    visualLanguage: ['dark-surface', 'high-contrast', 'monochrome', 'glow-accent'],
    motionPhilosophy: ['instant-primary', 'cinematic-secondary', 'no-fluff'],
    interactionPersonality: ['developer-first', 'terminal-adjacent', 'output-focused'],
    moodboard: [
      {
        id: 'vercel-dashboard',
        label: 'Vercel dashboard — dark precision',
        source: 'vercel.com',
        emotionalTone: ['precise', 'dark', 'electric'],
        motionStyle: ['instant', 'purposeful'],
        visualLanguage: ['dark', 'monochrome', 'glow-on-action'],
        density: 'compact',
      },
      {
        id: 'vercel-deploy',
        label: 'Vercel deploy log — terminal as UI',
        source: 'vercel.com',
        emotionalTone: ['technical', 'real-time', 'focused'],
        motionStyle: ['streaming', 'instant'],
        visualLanguage: ['monospace', 'dark', 'status-color'],
        density: 'compact',
      },
    ],
    compatibleThemeIds: ['dark'],
    aiPromptContext:
      'This is a tool for developers who demand precision and speed. Dark surfaces reduce eye strain during long sessions. Monochrome keeps focus on data and status. Glow accents signal important states. The terminal is a familiar reference point. Every interaction confirms or informs — nothing is decorative. Status must be unmistakable.',
    aiConstraints: [
      'Dark mode is default and primary — never design light-first',
      'Status indicators must be unmistakable: green=live, red=error, yellow=building',
      'Code and technical data must always use monospace fonts',
      'Deploy and publish actions must have explicit confirmation steps',
      'Real-time data (logs, builds) must stream — never full-page reload',
    ],
  },

  // ── Notion-like ───────────────────────────────────────────────────────────
  {
    id: 'notion-like',
    name: 'Notion-like',
    tagline: 'The tool that molds to your thinking.',
    color: '#000000',
    behavioralBlend: [
      { profileId: 'enterprise', weight: 50, role: 'primary' },
      { profileId: 'premium',    weight: 30, role: 'secondary' },
      { profileId: 'ai-native',  weight: 20, role: 'accent' },
    ],
    emotionalTone: ['calm', 'creative', 'structured', 'flexible'],
    visualLanguage: ['clean-white', 'minimal-chrome', 'content-first', 'subtle-hover'],
    motionPhilosophy: ['restrained', 'content-serving', 'subtle'],
    interactionPersonality: ['block-based', 'keyboard-friendly', 'contextual'],
    moodboard: [
      {
        id: 'notion-page',
        label: 'Notion page — content as chrome',
        source: 'notion.so',
        emotionalTone: ['calm', 'creative', 'focused'],
        motionStyle: ['subtle', 'restrained'],
        visualLanguage: ['white', 'minimal', 'typography-led'],
        density: 'relaxed',
      },
      {
        id: 'notion-database',
        label: 'Notion database — structured flexibility',
        source: 'notion.so',
        emotionalTone: ['structured', 'productive', 'powerful'],
        motionStyle: ['minimal', 'purposeful'],
        visualLanguage: ['table', 'clean', 'status-color'],
        density: 'normal',
      },
    ],
    compatibleThemeIds: ['light', 'utopia'],
    aiPromptContext:
      'The interface exists to serve the content, not itself. UI chrome should be invisible until needed. Block-based interaction means every element is editable in place. The product serves both personal notes and team wikis — it must feel equally at home for both. AI assistance should feel like a collaborator, not a feature.',
    aiConstraints: [
      'Interface chrome must fade on content focus — slash commands, hover menus only when needed',
      'Block-based editing means inline editing over modals, always',
      'Typography is the primary design tool — hierarchy through type, not color',
      'AI suggestions must be dismissible without disrupting flow',
      'Empty states must be inviting, not clinical',
    ],
  },

]

// ── Helpers ───────────────────────────────────────────────────────────────────

export function getBrandDNA(id: string) {
  return brandDNAProfiles.find(d => d.id === id)
}

export function getBrandDNAForTheme(themeId: string) {
  return brandDNAProfiles.find(d => d.compatibleThemeIds.includes(themeId))
}

export function getBrandDNAByPrimaryProfile(profileId: string) {
  return brandDNAProfiles.filter(d =>
    d.behavioralBlend.some(b => b.profileId === profileId && b.role === 'primary')
  )
}
