import type { PrimitiveToken } from '@/types'

export const primitiveColors: PrimitiveToken[] = [
  // ── Utopia Terracotta (Brand) ──────────────────────────
  { id: 'terra-50',  name: 'terra-50',  category: 'color', value: '#f6e2d7', description: 'Palest terracotta tint' },
  { id: 'terra-100', name: 'terra-100', category: 'color', value: '#f0c6af' },
  { id: 'terra-200', name: 'terra-200', category: 'color', value: '#e3a385' },
  { id: 'terra-300', name: 'terra-300', category: 'color', value: '#d77a59' },
  { id: 'terra-500', name: 'terra-500', category: 'color', value: '#CC5536', description: 'Utopia brand terracotta' },
  { id: 'terra-700', name: 'terra-700', category: 'color', value: '#a8391e' },
  { id: 'terra-900', name: 'terra-900', category: 'color', value: '#7a1f08' },

  // ── Utopia Warm Gray (UI Neutrals) ────────────────────
  { id: 'warm-0',   name: 'warm-0',   category: 'color', value: '#efeae8', description: 'Warm near-white' },
  { id: 'warm-100', name: 'warm-100', category: 'color', value: '#e3e1e2' },
  { id: 'warm-200', name: 'warm-200', category: 'color', value: '#bdb7b9' },
  { id: 'warm-300', name: 'warm-300', category: 'color', value: '#8f898b' },
  { id: 'warm-400', name: 'warm-400', category: 'color', value: '#635b5e' },
  { id: 'warm-500', name: 'warm-500', category: 'color', value: '#3c3235', description: 'Mid warm gray' },
  { id: 'warm-600', name: 'warm-600', category: 'color', value: '#1d1816' },
  { id: 'warm-700', name: 'warm-700', category: 'color', value: '#1a1416', description: 'Deep warm dark surface' },
  { id: 'warm-800', name: 'warm-800', category: 'color', value: '#0f0c0d' },
  { id: 'warm-900', name: 'warm-900', category: 'color', value: '#0d0a0b', description: 'Utopia background black' },

  // Blues
  { id: 'blue-50',  name: 'blue-50',  category: 'color', value: '#eff6ff', description: 'Lightest blue tint' },
  { id: 'blue-100', name: 'blue-100', category: 'color', value: '#dbeafe' },
  { id: 'blue-200', name: 'blue-200', category: 'color', value: '#bfdbfe' },
  { id: 'blue-300', name: 'blue-300', category: 'color', value: '#93c5fd' },
  { id: 'blue-400', name: 'blue-400', category: 'color', value: '#60a5fa' },
  { id: 'blue-500', name: 'blue-500', category: 'color', value: '#3b82f6' },
  { id: 'blue-600', name: 'blue-600', category: 'color', value: '#2563eb', description: 'Primary brand blue' },
  { id: 'blue-700', name: 'blue-700', category: 'color', value: '#1d4ed8' },
  { id: 'blue-800', name: 'blue-800', category: 'color', value: '#1e40af' },
  { id: 'blue-900', name: 'blue-900', category: 'color', value: '#1e3a8a' },
  { id: 'blue-950', name: 'blue-950', category: 'color', value: '#172554' },

  // Grays
  { id: 'gray-0',   name: 'gray-0',   category: 'color', value: '#ffffff', description: 'Pure white' },
  { id: 'gray-50',  name: 'gray-50',  category: 'color', value: '#f9fafb' },
  { id: 'gray-100', name: 'gray-100', category: 'color', value: '#f3f4f6' },
  { id: 'gray-200', name: 'gray-200', category: 'color', value: '#e5e7eb' },
  { id: 'gray-300', name: 'gray-300', category: 'color', value: '#d1d5db' },
  { id: 'gray-400', name: 'gray-400', category: 'color', value: '#9ca3af' },
  { id: 'gray-500', name: 'gray-500', category: 'color', value: '#6b7280' },
  { id: 'gray-600', name: 'gray-600', category: 'color', value: '#4b5563' },
  { id: 'gray-700', name: 'gray-700', category: 'color', value: '#374151' },
  { id: 'gray-800', name: 'gray-800', category: 'color', value: '#1f2937' },
  { id: 'gray-900', name: 'gray-900', category: 'color', value: '#111827' },
  { id: 'gray-950', name: 'gray-950', category: 'color', value: '#030712', description: 'Near black' },

  // Reds
  { id: 'red-50',  name: 'red-50',  category: 'color', value: '#fef2f2' },
  { id: 'red-100', name: 'red-100', category: 'color', value: '#fee2e2' },
  { id: 'red-200', name: 'red-200', category: 'color', value: '#fecaca' },
  { id: 'red-400', name: 'red-400', category: 'color', value: '#f87171' },
  { id: 'red-500', name: 'red-500', category: 'color', value: '#ef4444' },
  { id: 'red-600', name: 'red-600', category: 'color', value: '#dc2626', description: 'Danger / destructive' },
  { id: 'red-700', name: 'red-700', category: 'color', value: '#b91c1c' },
  { id: 'red-900', name: 'red-900', category: 'color', value: '#7f1d1d' },

  // Greens
  { id: 'green-50',  name: 'green-50',  category: 'color', value: '#f0fdf4' },
  { id: 'green-100', name: 'green-100', category: 'color', value: '#dcfce7' },
  { id: 'green-200', name: 'green-200', category: 'color', value: '#bbf7d0' },
  { id: 'green-400', name: 'green-400', category: 'color', value: '#4ade80' },
  { id: 'green-500', name: 'green-500', category: 'color', value: '#22c55e' },
  { id: 'green-600', name: 'green-600', category: 'color', value: '#16a34a', description: 'Success state' },
  { id: 'green-700', name: 'green-700', category: 'color', value: '#15803d' },
  { id: 'green-900', name: 'green-900', category: 'color', value: '#14532d' },

  // Yellows
  { id: 'yellow-50',  name: 'yellow-50',  category: 'color', value: '#fefce8' },
  { id: 'yellow-100', name: 'yellow-100', category: 'color', value: '#fef9c3' },
  { id: 'yellow-400', name: 'yellow-400', category: 'color', value: '#facc15' },
  { id: 'yellow-500', name: 'yellow-500', category: 'color', value: '#eab308', description: 'Warning state' },
  { id: 'yellow-600', name: 'yellow-600', category: 'color', value: '#ca8a04' },
  { id: 'yellow-900', name: 'yellow-900', category: 'color', value: '#713f12' },

  // Purples
  { id: 'purple-50',  name: 'purple-50',  category: 'color', value: '#faf5ff' },
  { id: 'purple-100', name: 'purple-100', category: 'color', value: '#f3e8ff' },
  { id: 'purple-400', name: 'purple-400', category: 'color', value: '#c084fc' },
  { id: 'purple-500', name: 'purple-500', category: 'color', value: '#a855f7' },
  { id: 'purple-600', name: 'purple-600', category: 'color', value: '#9333ea', description: 'Brand B accent' },
  { id: 'purple-700', name: 'purple-700', category: 'color', value: '#7e22ce' },
  { id: 'purple-900', name: 'purple-900', category: 'color', value: '#581c87' },

  // iOS Blue (Apple / Brand B)
  { id: 'ios-blue-50',  name: 'ios-blue-50',  category: 'color', value: '#e8f1ff', description: 'Lightest Apple blue tint' },
  { id: 'ios-blue-100', name: 'ios-blue-100', category: 'color', value: '#c3d9ff' },
  { id: 'ios-blue-300', name: 'ios-blue-300', category: 'color', value: '#6aabff' },
  { id: 'ios-blue-500', name: 'ios-blue-500', category: 'color', value: '#007AFF', description: 'Apple iOS blue' },
  { id: 'ios-blue-600', name: 'ios-blue-600', category: 'color', value: '#0066DD' },
  { id: 'ios-blue-700', name: 'ios-blue-700', category: 'color', value: '#0055BB' },
  { id: 'ios-blue-900', name: 'ios-blue-900', category: 'color', value: '#003380' },

  // Transparent
  { id: 'transparent', name: 'transparent', category: 'color', value: 'transparent' },
  { id: 'white',        name: 'white',       category: 'color', value: '#ffffff' },
  { id: 'black',        name: 'black',       category: 'color', value: '#000000' },
]

export const primitiveSpacing: PrimitiveToken[] = [
  { id: 'space-0',   name: 'space-0',   category: 'spacing', value: '0px' },
  { id: 'space-0.5', name: 'space-0.5', category: 'spacing', value: '2px' },
  { id: 'space-1',   name: 'space-1',   category: 'spacing', value: '4px' },
  { id: 'space-1.5', name: 'space-1.5', category: 'spacing', value: '6px' },
  { id: 'space-2',   name: 'space-2',   category: 'spacing', value: '8px' },
  { id: 'space-2.5', name: 'space-2.5', category: 'spacing', value: '10px' },
  { id: 'space-3',   name: 'space-3',   category: 'spacing', value: '12px' },
  { id: 'space-4',   name: 'space-4',   category: 'spacing', value: '16px' },
  { id: 'space-5',   name: 'space-5',   category: 'spacing', value: '20px' },
  { id: 'space-6',   name: 'space-6',   category: 'spacing', value: '24px' },
  { id: 'space-8',   name: 'space-8',   category: 'spacing', value: '32px' },
  { id: 'space-10',  name: 'space-10',  category: 'spacing', value: '40px' },
  { id: 'space-12',  name: 'space-12',  category: 'spacing', value: '48px' },
  { id: 'space-16',  name: 'space-16',  category: 'spacing', value: '64px' },
  { id: 'space-20',  name: 'space-20',  category: 'spacing', value: '80px' },
  { id: 'space-24',  name: 'space-24',  category: 'spacing', value: '96px' },
]

export const primitiveRadius: PrimitiveToken[] = [
  { id: 'radius-none', name: 'radius-none', category: 'radius', value: '0px' },
  { id: 'radius-sm',   name: 'radius-sm',   category: 'radius', value: '4px' },
  { id: 'radius-md',   name: 'radius-md',   category: 'radius', value: '6px' },
  { id: 'radius-lg',   name: 'radius-lg',   category: 'radius', value: '8px' },
  { id: 'radius-xl',   name: 'radius-xl',   category: 'radius', value: '12px' },
  { id: 'radius-2xl',  name: 'radius-2xl',  category: 'radius', value: '16px' },
  { id: 'radius-full', name: 'radius-full', category: 'radius', value: '9999px' },
]

export const primitiveTypography: PrimitiveToken[] = [
  { id: 'font-sans',  name: 'font-sans',  category: 'typography', value: 'Inter, system-ui, sans-serif' },
  { id: 'font-mono',  name: 'font-mono',  category: 'typography', value: 'JetBrains Mono, Fira Code, monospace' },
  { id: 'text-xs',    name: 'text-xs',    category: 'typography', value: '11px / 16px' },
  { id: 'text-sm',    name: 'text-sm',    category: 'typography', value: '13px / 20px' },
  { id: 'text-base',  name: 'text-base',  category: 'typography', value: '14px / 22px' },
  { id: 'text-md',    name: 'text-md',    category: 'typography', value: '16px / 24px' },
  { id: 'text-lg',    name: 'text-lg',    category: 'typography', value: '18px / 28px' },
  { id: 'text-xl',    name: 'text-xl',    category: 'typography', value: '20px / 30px' },
  { id: 'text-2xl',   name: 'text-2xl',   category: 'typography', value: '24px / 32px' },
  { id: 'text-3xl',   name: 'text-3xl',   category: 'typography', value: '30px / 36px' },
  { id: 'font-regular', name: 'font-regular', category: 'typography', value: '400' },
  { id: 'font-medium',  name: 'font-medium',  category: 'typography', value: '500' },
  { id: 'font-semibold',name: 'font-semibold', category: 'typography', value: '600' },
  { id: 'font-bold',    name: 'font-bold',     category: 'typography', value: '700' },
]

export const primitiveShadows: PrimitiveToken[] = [
  { id: 'shadow-none', name: 'shadow-none', category: 'shadow', value: 'none' },
  { id: 'shadow-sm',   name: 'shadow-sm',   category: 'shadow', value: '0 1px 2px rgba(0,0,0,0.05)' },
  { id: 'shadow-md',   name: 'shadow-md',   category: 'shadow', value: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)' },
  { id: 'shadow-lg',   name: 'shadow-lg',   category: 'shadow', value: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)' },
  { id: 'shadow-xl',   name: 'shadow-xl',   category: 'shadow', value: '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)' },
]

export const primitiveMotion: PrimitiveToken[] = [
  { id: 'duration-instant', name: 'duration-instant', category: 'motion', value: '0ms' },
  { id: 'duration-fast',    name: 'duration-fast',    category: 'motion', value: '100ms' },
  { id: 'duration-normal',  name: 'duration-normal',  category: 'motion', value: '200ms' },
  { id: 'duration-slow',    name: 'duration-slow',    category: 'motion', value: '300ms' },
  { id: 'duration-slower',  name: 'duration-slower',  category: 'motion', value: '500ms' },
  { id: 'ease-linear',      name: 'ease-linear',      category: 'motion', value: 'linear' },
  { id: 'ease-in',          name: 'ease-in',          category: 'motion', value: 'cubic-bezier(0.4, 0, 1, 1)' },
  { id: 'ease-out',         name: 'ease-out',         category: 'motion', value: 'cubic-bezier(0, 0, 0.2, 1)' },
  { id: 'ease-in-out',      name: 'ease-in-out',      category: 'motion', value: 'cubic-bezier(0.4, 0, 0.2, 1)' },
  { id: 'ease-spring',      name: 'ease-spring',      category: 'motion', value: 'cubic-bezier(0.34, 1.56, 0.64, 1)' },
]

// ── Liquid Glass Primitives ───────────────────────────────────
export const primitiveGlass: PrimitiveToken[] = [
  // Blur levels
  { id: 'blur-sm',  name: 'blur-sm',  category: 'glass', value: 'blur(8px)',  description: 'Subtle frost — barely visible blur' },
  { id: 'blur-md',  name: 'blur-md',  category: 'glass', value: 'blur(16px)', description: 'Standard glass blur' },
  { id: 'blur-lg',  name: 'blur-lg',  category: 'glass', value: 'blur(24px)', description: 'Deep frosted glass' },
  { id: 'blur-xl',  name: 'blur-xl',  category: 'glass', value: 'blur(40px)', description: 'Heavy glass — maximum blur' },
  // Glass fill colors (opacity variants)
  { id: 'glass-white-40', name: 'glass-white-40', category: 'glass', value: 'rgba(255,255,255,0.40)', description: 'Light translucent — subtle frost' },
  { id: 'glass-white-60', name: 'glass-white-60', category: 'glass', value: 'rgba(255,255,255,0.60)', description: 'Medium light glass' },
  { id: 'glass-white-72', name: 'glass-white-72', category: 'glass', value: 'rgba(255,255,255,0.72)', description: 'Standard light glass surface — Apple navbars' },
  { id: 'glass-white-88', name: 'glass-white-88', category: 'glass', value: 'rgba(255,255,255,0.88)', description: 'Thick light glass — popovers, modals' },
  { id: 'glass-dark-50',  name: 'glass-dark-50',  category: 'glass', value: 'rgba(28,28,30,0.50)',   description: 'Dark glass — medium opacity' },
  { id: 'glass-dark-72',  name: 'glass-dark-72',  category: 'glass', value: 'rgba(28,28,30,0.72)',   description: 'Thick dark glass surface' },
  // Glass borders
  { id: 'glass-border-light', name: 'glass-border-light', category: 'glass', value: 'rgba(255,255,255,0.60)', description: 'Glass border for light surfaces — inner white edge' },
  { id: 'glass-border-dark',  name: 'glass-border-dark',  category: 'glass', value: 'rgba(255,255,255,0.14)', description: 'Glass border for dark surfaces' },
  // Glass shadow
  { id: 'glass-shadow-sm', name: 'glass-shadow-sm', category: 'glass', value: '0 4px 16px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.55)', description: 'Subtle glass shadow with top highlight' },
  { id: 'glass-shadow-md', name: 'glass-shadow-md', category: 'glass', value: '0 8px 32px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.60)', description: 'Standard glass shadow — Apple cards' },
  { id: 'glass-shadow-lg', name: 'glass-shadow-lg', category: 'glass', value: '0 20px 60px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.65)', description: 'Elevated glass shadow — floating panels' },
  // Vibrancy formula
  { id: 'glass-vibrancy', name: 'glass-vibrancy', category: 'glass', value: 'saturate(180%) blur(20px)', description: 'Apple vibrancy formula — saturate + blur for backdrop-filter' },
]

export const allPrimitives = [
  ...primitiveColors,
  ...primitiveSpacing,
  ...primitiveRadius,
  ...primitiveTypography,
  ...primitiveShadows,
  ...primitiveMotion,
  ...primitiveGlass,
]

export function getPrimitive(id: string) {
  return allPrimitives.find(t => t.id === id)
}
