import type { BrandTheme } from '@/types'

// ── Radius scale reference ──────────────────────────────────────
// radius-none: 0px  | radius-sm: 4px  | radius-md: 6px
// radius-lg: 8px    | radius-xl: 12px | radius-2xl: 16px | radius-full: 9999px
//
// Each theme defines its own radius personality via semantic overrides:
//   radius/xs → radius/sm → radius/md → radius/lg → radius/xl → radius/full
//
// Example: Theme A (sharp) maps radius/md → radius-sm (4px)
//          Theme B (rounded) maps radius/md → radius-xl (12px)

const RADIUS_UTOPIA = [
  { semanticId: 'radius/xs',   primitiveRef: 'radius-sm',  value: '4px' },
  { semanticId: 'radius/sm',   primitiveRef: 'radius-md',  value: '6px' },
  { semanticId: 'radius/md',   primitiveRef: 'radius-lg',  value: '8px' },
  { semanticId: 'radius/lg',   primitiveRef: 'radius-xl',  value: '12px' },
  { semanticId: 'radius/xl',   primitiveRef: 'radius-2xl', value: '16px' },
  { semanticId: 'radius/full', primitiveRef: 'radius-full', value: '9999px' },
]

const RADIUS_SHARP = [
  { semanticId: 'radius/xs',   primitiveRef: 'radius-none', value: '0px' },
  { semanticId: 'radius/sm',   primitiveRef: 'radius-sm',   value: '4px' },
  { semanticId: 'radius/md',   primitiveRef: 'radius-sm',   value: '4px' },
  { semanticId: 'radius/lg',   primitiveRef: 'radius-md',   value: '6px' },
  { semanticId: 'radius/xl',   primitiveRef: 'radius-lg',   value: '8px' },
  { semanticId: 'radius/full', primitiveRef: 'radius-lg',   value: '8px' },
]

const RADIUS_ROUNDED = [
  { semanticId: 'radius/xs',   primitiveRef: 'radius-lg',   value: '8px' },
  { semanticId: 'radius/sm',   primitiveRef: 'radius-full', value: '9999px' },
  { semanticId: 'radius/md',   primitiveRef: 'radius-2xl',  value: '16px' },
  { semanticId: 'radius/lg',   primitiveRef: 'radius-full', value: '9999px' },
  { semanticId: 'radius/xl',   primitiveRef: 'radius-full', value: '9999px' },
  { semanticId: 'radius/full', primitiveRef: 'radius-full', value: '9999px' },
]

export const themes: BrandTheme[] = [
  {
    id: 'utopia',
    name: 'Utopia',
    description: 'Utopia Studio dark — terracotta accent on warm black. The canonical brand experience.',
    accentColor: '#CC5536',
    brandDNAId: 'notion-like',
    overrides: [
      { semanticId: 'bg/default',          primitiveRef: 'warm-900', value: '#0d0a0b' },
      { semanticId: 'bg/subtle',           primitiveRef: 'warm-800', value: '#0f0c0d' },
      { semanticId: 'bg/muted',            primitiveRef: 'warm-700', value: '#1a1416' },
      { semanticId: 'bg/emphasis',         primitiveRef: 'warm-0',   value: '#efeae8' },
      { semanticId: 'bg/brand',            primitiveRef: 'terra-500', value: '#CC5536' },
      { semanticId: 'bg/brand-subtle',     primitiveRef: 'terra-900', value: '#7a1f08' },
      { semanticId: 'bg/danger',           primitiveRef: 'red-600',  value: '#DC2626' },
      { semanticId: 'bg/danger-subtle',    primitiveRef: 'red-900',  value: '#7f1d1d' },
      { semanticId: 'bg/success-subtle',   primitiveRef: 'green-900', value: '#14532d' },
      { semanticId: 'surface/default',     primitiveRef: 'warm-700', value: '#1a1416' },
      { semanticId: 'surface/raised',      primitiveRef: 'warm-500', value: '#3c3235' },
      { semanticId: 'surface/overlay',     primitiveRef: 'warm-500', value: '#3c3235' },
      { semanticId: 'surface/sunken',      primitiveRef: 'warm-900', value: '#0d0a0b' },
      { semanticId: 'text/default',        primitiveRef: 'warm-0',   value: '#efeae8' },
      { semanticId: 'text/muted',          primitiveRef: 'warm-300', value: '#8f898b' },
      { semanticId: 'text/subtle',         primitiveRef: 'warm-400', value: '#635b5e' },
      { semanticId: 'text/brand',          primitiveRef: 'terra-300', value: '#d77a59' },
      { semanticId: 'text/danger',         primitiveRef: 'red-400',  value: '#f87171' },
      { semanticId: 'text/success',        primitiveRef: 'green-400', value: '#4ade80' },
      { semanticId: 'text/warning',        primitiveRef: 'yellow-400', value: '#facc15' },
      { semanticId: 'border/default',      primitiveRef: 'warm-600', value: '#1d1816' },
      { semanticId: 'border/strong',       primitiveRef: 'warm-500', value: '#3c3235' },
      { semanticId: 'border/brand',        primitiveRef: 'terra-500', value: '#CC5536' },
      { semanticId: 'interactive/default', primitiveRef: 'terra-500', value: '#CC5536' },
      { semanticId: 'interactive/hover',   primitiveRef: 'terra-300', value: '#d77a59' },
      { semanticId: 'interactive/active',  primitiveRef: 'terra-700', value: '#a8391e' },
      { semanticId: 'interactive/disabled', primitiveRef: 'warm-500', value: '#3c3235' },
      { semanticId: 'interactive/focus',   primitiveRef: 'terra-300', value: '#d77a59' },
      ...RADIUS_UTOPIA,
    ],
  },
  {
    id: 'light',
    name: 'Light',
    description: 'Warm light mode — terracotta accent on cream white.',
    accentColor: '#CC5536',
    brandDNAId: 'notion-like',
    overrides: [
      { semanticId: 'bg/default',          primitiveRef: 'warm-0',   value: '#efeae8' },
      { semanticId: 'bg/subtle',           primitiveRef: 'warm-100', value: '#e3e1e2' },
      { semanticId: 'bg/muted',            primitiveRef: 'warm-200', value: '#bdb7b9' },
      { semanticId: 'bg/brand',            primitiveRef: 'terra-500', value: '#CC5536' },
      { semanticId: 'bg/brand-subtle',     primitiveRef: 'terra-50',  value: '#f6e2d7' },
      { semanticId: 'surface/default',     primitiveRef: 'white',    value: '#ffffff' },
      { semanticId: 'surface/sunken',      primitiveRef: 'warm-100', value: '#e3e1e2' },
      { semanticId: 'text/default',        primitiveRef: 'warm-900', value: '#0d0a0b' },
      { semanticId: 'text/muted',          primitiveRef: 'warm-400', value: '#635b5e' },
      { semanticId: 'text/subtle',         primitiveRef: 'warm-300', value: '#8f898b' },
      { semanticId: 'text/brand',          primitiveRef: 'terra-500', value: '#CC5536' },
      { semanticId: 'border/default',      primitiveRef: 'warm-200', value: '#bdb7b9' },
      { semanticId: 'border/strong',       primitiveRef: 'warm-300', value: '#8f898b' },
      { semanticId: 'border/brand',        primitiveRef: 'terra-500', value: '#CC5536' },
      { semanticId: 'interactive/default', primitiveRef: 'terra-500', value: '#CC5536' },
      { semanticId: 'interactive/hover',   primitiveRef: 'terra-700', value: '#a8391e' },
      ...RADIUS_UTOPIA,
    ],
  },
  {
    id: 'dark',
    name: 'Dark',
    description: 'Pure dark mode — standard cool-neutral dark with blue accent.',
    accentColor: '#3b82f6',
    brandDNAId: 'linear-like',
    overrides: [
      { semanticId: 'bg/default',       primitiveRef: 'gray-950', value: '#030712' },
      { semanticId: 'bg/subtle',        primitiveRef: 'gray-900', value: '#111827' },
      { semanticId: 'bg/muted',         primitiveRef: 'gray-800', value: '#1f2937' },
      { semanticId: 'bg/brand',         primitiveRef: 'blue-500', value: '#3b82f6' },
      { semanticId: 'bg/brand-subtle',  primitiveRef: 'blue-950', value: '#172554' },
      { semanticId: 'surface/default',  primitiveRef: 'gray-900', value: '#111827' },
      { semanticId: 'surface/raised',   primitiveRef: 'gray-800', value: '#1f2937' },
      { semanticId: 'surface/overlay',  primitiveRef: 'gray-800', value: '#1f2937' },
      { semanticId: 'surface/sunken',   primitiveRef: 'gray-950', value: '#030712' },
      { semanticId: 'text/default',     primitiveRef: 'gray-50',  value: '#f9fafb' },
      { semanticId: 'text/muted',       primitiveRef: 'gray-400', value: '#9ca3af' },
      { semanticId: 'text/subtle',      primitiveRef: 'gray-600', value: '#4b5563' },
      { semanticId: 'text/brand',       primitiveRef: 'blue-400', value: '#60a5fa' },
      { semanticId: 'border/default',   primitiveRef: 'gray-800', value: '#1f2937' },
      { semanticId: 'border/strong',    primitiveRef: 'gray-700', value: '#374151' },
      { semanticId: 'border/brand',     primitiveRef: 'blue-500', value: '#3b82f6' },
      { semanticId: 'interactive/default', primitiveRef: 'blue-500', value: '#3b82f6' },
      { semanticId: 'interactive/hover',   primitiveRef: 'blue-400', value: '#60a5fa' },
      ...RADIUS_UTOPIA,
    ],
  },
  {
    id: 'brand-a',
    name: 'Brand A',
    description: 'Blue-first, sharp — corporate, trustworthy, enterprise SaaS. Minimal radius.',
    accentColor: '#2563eb',
    brandDNAId: 'stripe-like',
    overrides: [
      { semanticId: 'bg/brand',            primitiveRef: 'blue-600', value: '#2563eb' },
      { semanticId: 'bg/brand-subtle',     primitiveRef: 'blue-50',  value: '#eff6ff' },
      { semanticId: 'text/brand',          primitiveRef: 'blue-600', value: '#2563eb' },
      { semanticId: 'border/brand',        primitiveRef: 'blue-600', value: '#2563eb' },
      { semanticId: 'interactive/default', primitiveRef: 'blue-600', value: '#2563eb' },
      { semanticId: 'interactive/hover',   primitiveRef: 'blue-700', value: '#1d4ed8' },
      ...RADIUS_SHARP,
    ],
    direction: {
      moodWords: ['Precise', 'Trustworthy', 'Enterprise', 'Structured', 'Bold'],
      photography: 'Real-world photography — architectural interiors, product close-ups, professionals in context. High contrast, desaturated or cool-toned. No filters, no gradients. Grid layouts, data visualizations, B&W portraits.',
      motion: 'Linear or ease-out only. No spring, no bounce. Duration under 200ms for interactions. Transitions are purposeful and invisible — the UI should never draw attention to itself moving.',
      typography: 'Heavy weights (700–800) for headings. Tight letter-spacing. Clear hierarchy with strong contrast between levels. Mono for data/code. System-UI or Inter only.',
      assets: [
        // Add your own GIF/image URLs here. Example:
        // { url: 'https://media.giphy.com/media/xxx/giphy.gif', label: 'Data viz', type: 'gif' },
      ],
    },
  },
  {
    id: 'brand-b',
    name: 'Brand B',
    description: 'Apple-inspired — iOS blue, liquid glass, pill shapes. Clean, premium, alive.',
    accentColor: '#007AFF',
    brandDNAId: 'apple-like',
    direction: {
      moodWords: ['Fluid', 'Premium', 'Alive', 'Abstract', 'Tactile'],
      photography: 'Abstract and generative — fluid simulations, macro water/light refraction, CGI renders, mesh gradients. No real people. Colors should bleed, blend, and glow. Particle systems, soap bubble iridescence, frosted glass textures.',
      motion: 'Spring physics everywhere. Morphing shapes, liquid transitions, elements that feel alive. Overshoot slightly, settle gently. Parallax depth. Staggered reveals. Never abrupt — always fluid.',
      typography: 'Light weights (300–400) for body. Generous tracking. Large display text. SF Pro or Inter Light. Contrast through size and space, not weight.',
      assets: [
        // Add your own animated GIF/video URLs here. Examples:
        // { url: 'https://media.giphy.com/media/xxx/giphy.gif', label: 'Fluid sim', type: 'gif' },
        // { url: '/assets/mesh-gradient.gif', label: 'Mesh gradient', type: 'gif' },
        // { url: '/assets/particle-system.gif', label: 'Particles', type: 'gif' },
      ],
    },
    overrides: [
      { semanticId: 'bg/brand',            primitiveRef: 'ios-blue-500', value: '#007AFF' },
      { semanticId: 'bg/brand-subtle',     primitiveRef: 'ios-blue-50',  value: 'rgba(0,122,255,0.08)' },
      { semanticId: 'text/brand',          primitiveRef: 'ios-blue-500', value: '#007AFF' },
      { semanticId: 'border/brand',        primitiveRef: 'ios-blue-300', value: 'rgba(0,122,255,0.35)' },
      { semanticId: 'interactive/default', primitiveRef: 'ios-blue-500', value: '#007AFF' },
      { semanticId: 'interactive/hover',   primitiveRef: 'ios-blue-600', value: '#0066DD' },
      { semanticId: 'interactive/active',  primitiveRef: 'ios-blue-700', value: '#0055BB' },
      { semanticId: 'interactive/focus',   primitiveRef: 'ios-blue-300', value: 'rgba(0,122,255,0.40)' },
      // Liquid Glass overrides
      { semanticId: 'glass/surface',       primitiveRef: 'glass-white-72', value: 'rgba(255,255,255,0.72)' },
      { semanticId: 'glass/surface-thick', primitiveRef: 'glass-white-88', value: 'rgba(255,255,255,0.88)' },
      { semanticId: 'glass/border',        primitiveRef: 'glass-border-light', value: 'rgba(255,255,255,0.60)' },
      { semanticId: 'glass/vibrancy',      primitiveRef: 'glass-vibrancy', value: 'saturate(180%) blur(20px)' },
      ...RADIUS_ROUNDED,
    ],
  },
]

export function getTheme(id: string) {
  return themes.find(t => t.id === id)
}

export function resolveSemanticValue(semanticId: string, themeId: string): string | undefined {
  const theme = getTheme(themeId)
  if (!theme) return undefined
  const override = theme.overrides.find(o => o.semanticId === semanticId)
  return override?.value
}

/** Resolve a radius semantic token for a given theme, falling back to the semantic default */
export function resolveRadius(semanticRef: string, themeId: string): string {
  const resolved = resolveSemanticValue(semanticRef, themeId)
  if (resolved) return resolved
  // Fallback defaults
  const defaults: Record<string, string> = {
    'radius/xs': '4px', 'radius/sm': '6px', 'radius/md': '8px',
    'radius/lg': '12px', 'radius/xl': '16px', 'radius/full': '9999px',
  }
  return defaults[semanticRef] ?? '8px'
}
