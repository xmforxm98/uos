import type { BrandTheme } from '@/types'

export const themes: BrandTheme[] = [
  {
    id: 'light',
    name: 'Light',
    description: 'Default light theme — clean, high contrast, neutral',
    accentColor: '#2563eb',
    overrides: [],
  },
  {
    id: 'dark',
    name: 'Dark',
    description: 'Dark mode — reduced eye strain, modern aesthetic',
    accentColor: '#3b82f6',
    overrides: [
      { semanticId: 'bg/default',       primitiveRef: 'gray-950', value: '#030712' },
      { semanticId: 'bg/subtle',        primitiveRef: 'gray-900', value: '#111827' },
      { semanticId: 'bg/muted',         primitiveRef: 'gray-800', value: '#1f2937' },
      { semanticId: 'bg/emphasis',      primitiveRef: 'gray-50',  value: '#f9fafb' },
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
      { semanticId: 'text/danger',      primitiveRef: 'red-400',  value: '#f87171' },
      { semanticId: 'text/success',     primitiveRef: 'green-400', value: '#4ade80' },
      { semanticId: 'border/default',   primitiveRef: 'gray-800', value: '#1f2937' },
      { semanticId: 'border/strong',    primitiveRef: 'gray-700', value: '#374151' },
      { semanticId: 'border/brand',     primitiveRef: 'blue-500', value: '#3b82f6' },
      { semanticId: 'interactive/default', primitiveRef: 'blue-500', value: '#3b82f6' },
      { semanticId: 'interactive/hover',   primitiveRef: 'blue-400', value: '#60a5fa' },
    ],
  },
  {
    id: 'brand-a',
    name: 'Brand A',
    description: 'Blue-first brand — corporate, trustworthy, SaaS-default',
    accentColor: '#2563eb',
    overrides: [
      { semanticId: 'bg/brand',           primitiveRef: 'blue-600', value: '#2563eb' },
      { semanticId: 'bg/brand-subtle',    primitiveRef: 'blue-50',  value: '#eff6ff' },
      { semanticId: 'text/brand',         primitiveRef: 'blue-600', value: '#2563eb' },
      { semanticId: 'border/brand',       primitiveRef: 'blue-600', value: '#2563eb' },
      { semanticId: 'interactive/default', primitiveRef: 'blue-600', value: '#2563eb' },
      { semanticId: 'interactive/hover',   primitiveRef: 'blue-700', value: '#1d4ed8' },
    ],
  },
  {
    id: 'brand-b',
    name: 'Brand B',
    description: 'Purple-first brand — creative, innovative, product-led',
    accentColor: '#9333ea',
    overrides: [
      { semanticId: 'bg/brand',           primitiveRef: 'purple-600', value: '#9333ea' },
      { semanticId: 'bg/brand-subtle',    primitiveRef: 'purple-50',  value: '#faf5ff' },
      { semanticId: 'text/brand',         primitiveRef: 'purple-600', value: '#9333ea' },
      { semanticId: 'border/brand',       primitiveRef: 'purple-600', value: '#9333ea' },
      { semanticId: 'interactive/default', primitiveRef: 'purple-600', value: '#9333ea' },
      { semanticId: 'interactive/hover',   primitiveRef: 'purple-700', value: '#7e22ce' },
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
