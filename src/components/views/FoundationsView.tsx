'use client'

import { useDesignSystem } from '@/context/DesignSystemContext'
import {
  primitiveColors, primitiveSpacing, primitiveRadius,
  primitiveTypography, primitiveMotion, primitiveShadows,
} from '@/data/primitives'
import { semanticTokens } from '@/data/semantic'
import { componentDefs } from '@/data/components'
import type { PrimitiveToken } from '@/types'
import * as LucideIcons from 'lucide-react'
import { useState } from 'react'

function whereUsed(id: string) {
  const inSemantic = semanticTokens.filter(t =>
    t.primitiveRef === id || t.darkRef === id
  ).map(t => t.name)
  const inComponent = componentDefs
    .flatMap(c => c.tokenDeps)
    .filter(d => d.primitiveRef === id)
    .map(d => d.tokenId)
  return { semantic: inSemantic, component: inComponent }
}

function CopyOnClick({ id, value }: { id: string; value: string }) {
  const { copiedId, copyValue } = useDesignSystem()
  const copied = copiedId === id
  return (
    <button
      onClick={() => copyValue(id, value)}
      className={`value-pill ${copied ? 'copied' : ''}`}
      title={copied ? 'Copied!' : `Copy ${value}`}
    >
      {copied ? '✓ ' : ''}{value}
    </button>
  )
}

function ColorGrid({ tokens }: { tokens: PrimitiveToken[] }) {
  const { setSelected } = useDesignSystem()
  const groups: Record<string, PrimitiveToken[]> = {}
  tokens.forEach(t => {
    const group = t.name.split('-')[0]
    if (!groups[group]) groups[group] = []
    groups[group].push(t)
  })

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {Object.entries(groups).map(([group, toks]) => (
        <div key={group}>
          <div style={{ fontSize: 11, color: 'var(--text-subtle)', fontWeight: 600, textTransform: 'capitalize', letterSpacing: '0.05em', marginBottom: 10 }}>
            {group}
          </div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {toks.map(t => {
              const used = whereUsed(t.id)
              const totalRefs = used.semantic.length + used.component.length
              return (
                <div key={t.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                  <div
                    title={`${t.name}\n${t.value}${t.description ? '\n' + t.description : ''}${totalRefs > 0 ? '\n↑ ' + totalRefs + ' refs' : ''}`}
                    onClick={() => setSelected({ type: 'primitive', id: t.id })}
                    style={{
                      width: 40, height: 40, borderRadius: 8,
                      background: t.value,
                      border: '1px solid var(--border)',
                      cursor: 'pointer', position: 'relative',
                      transition: 'transform 100ms, box-shadow 100ms',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.transform = 'scale(1.08)'
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.transform = 'scale(1)'
                      e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.12)'
                    }}
                  >
                    {totalRefs > 0 && (
                      <div style={{
                        position: 'absolute', top: -4, right: -4,
                        width: 14, height: 14, borderRadius: '50%',
                        background: 'var(--accent)', fontSize: 8, fontWeight: 700,
                        color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        border: '1.5px solid var(--background)',
                      }}>
                        {totalRefs > 9 ? '9+' : totalRefs}
                      </div>
                    )}
                  </div>
                  <div style={{ fontSize: 8.5, color: 'var(--text-subtle)', textAlign: 'center', maxWidth: 40, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {t.name.includes('-') ? t.name.split('-').slice(1).join('-') : t.name}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}

function SpacingGrid({ tokens }: { tokens: PrimitiveToken[] }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      {tokens.map(t => (
        <div key={t.id} style={{
          display: 'flex', alignItems: 'center', gap: 14,
          padding: '8px 12px', background: 'var(--surface-mid)',
          border: '1px solid var(--border)', borderRadius: 'var(--radius-md)',
          transition: 'background 80ms',
        }}>
          <div style={{ width: 48, display: 'flex', alignItems: 'center' }}>
            <div style={{
              height: 14, width: Math.min(parseInt(t.value) / 1.5 || 2, 48),
              background: 'var(--accent)', borderRadius: 2, minWidth: 2,
            }} />
          </div>
          <span style={{ fontSize: 12, fontFamily: 'monospace', color: 'var(--text)', minWidth: 90 }}>{t.name}</span>
          <span style={{ fontSize: 11.5, fontFamily: 'monospace', color: 'var(--text-muted)', minWidth: 40 }}>{t.value}</span>
          <CopyOnClick id={t.id} value={t.value} />
        </div>
      ))}
    </div>
  )
}

function ShadowGrid({ tokens }: { tokens: PrimitiveToken[] }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
      {tokens.map(t => (
        <div key={t.id} style={{
          display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center',
          padding: '20px', background: 'var(--surface-mid)',
          border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)',
          minWidth: 140,
        }}>
          <div style={{
            width: 64, height: 64,
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-md)',
            boxShadow: t.value === 'none' ? 'none' : t.value,
          }} />
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 12, fontFamily: 'monospace', color: 'var(--text)', marginBottom: 2 }}>{t.name}</div>
            <CopyOnClick id={t.id} value={t.value} />
          </div>
        </div>
      ))}
    </div>
  )
}

function RadiusGrid({ tokens }: { tokens: PrimitiveToken[] }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
      {tokens.map(t => (
        <div key={t.id} style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center' }}>
          <div style={{
            width: 56, height: 56,
            background: 'var(--accent-subtle)',
            border: '2px solid var(--accent)',
            borderRadius: t.value,
          }} />
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--text)', marginBottom: 2 }}>{t.name}</div>
            <div style={{ fontSize: 10.5, color: 'var(--text-subtle)' }}>{t.value}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

function TypographyList({ tokens }: { tokens: PrimitiveToken[] }) {
  const sizes = tokens.filter(t => t.name.startsWith('text-'))
  const fonts = tokens.filter(t => t.name.startsWith('font-') && !t.name.includes('sans') && !t.name.includes('mono'))
  const families = tokens.filter(t => t.name.includes('sans') || t.name.includes('mono'))

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <div style={{ fontSize: 10, color: 'var(--text-subtle)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, marginBottom: 12 }}>Type Scale</div>
        <div style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
          {sizes.map((t, i) => {
            const [size, lineH] = t.value.split('/')
            return (
              <div key={t.id} style={{
                display: 'flex', alignItems: 'center', gap: 16,
                padding: '10px 16px',
                borderBottom: i < sizes.length - 1 ? '1px solid var(--border)' : 'none',
                background: i % 2 === 0 ? 'var(--surface-mid)' : 'transparent',
              }}>
                <span style={{ fontSize: parseInt(size), lineHeight: 1, color: 'var(--text)', minWidth: 140, fontWeight: 500 }}>
                  The quick brown fox
                </span>
                <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--accent)', minWidth: 60 }}>{t.name}</span>
                <span style={{ fontSize: 10.5, fontFamily: 'monospace', color: 'var(--text-muted)' }}>{size}</span>
                <span style={{ fontSize: 10, color: 'var(--text-subtle)' }}>/ {lineH?.trim()} lh</span>
                <CopyOnClick id={t.id} value={size} />
              </div>
            )
          })}
        </div>
      </div>
      <div>
        <div style={{ fontSize: 10, color: 'var(--text-subtle)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, marginBottom: 10 }}>Font Weight</div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {fonts.map(t => (
            <div key={t.id} style={{
              padding: '14px 18px', background: 'var(--surface-mid)',
              border: '1px solid var(--border)', borderRadius: 'var(--radius-md)',
            }}>
              <div style={{ fontSize: 20, fontWeight: parseInt(t.value), color: 'var(--text)', marginBottom: 6 }}>Aa</div>
              <div style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--accent)' }}>{t.name}</div>
              <div style={{ fontSize: 10, color: 'var(--text-subtle)', marginTop: 2 }}>{t.value}</div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <div style={{ fontSize: 10, color: 'var(--text-subtle)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, marginBottom: 10 }}>Font Families</div>
        {families.map(t => (
          <div key={t.id} style={{
            padding: '14px 16px', background: 'var(--surface-mid)',
            border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', marginBottom: 8,
          }}>
            <div style={{ fontSize: 15, fontFamily: t.id.includes('mono') ? 'monospace' : 'sans-serif', marginBottom: 6, color: 'var(--text)' }}>
              {t.id.includes('mono') ? 'const value = "Hello World"' : 'The quick brown fox jumps over the lazy dog.'}
            </div>
            <div style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--accent)' }}>{t.name}</div>
            <div style={{ fontSize: 10, color: 'var(--text-subtle)', marginTop: 2 }}>{t.value}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function MotionList({ tokens }: { tokens: PrimitiveToken[] }) {
  const durations = tokens.filter(t => t.name.startsWith('duration-'))
  const easings = tokens.filter(t => t.name.startsWith('ease-'))
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <div style={{ fontSize: 10, color: 'var(--text-subtle)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, marginBottom: 10 }}>Duration</div>
        {durations.map(t => (
          <div key={t.id} style={{
            display: 'flex', alignItems: 'center', gap: 14,
            padding: '8px 12px', background: 'var(--surface-mid)',
            border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', marginBottom: 4,
          }}>
            <div style={{ width: 100, height: 4, background: 'var(--border)', borderRadius: 2, overflow: 'hidden' }}>
              <div style={{
                height: '100%', background: 'var(--accent)', borderRadius: 2,
                width: `${Math.min((parseInt(t.value) / 500) * 100, 100)}%`,
              }} />
            </div>
            <span style={{ fontSize: 12, fontFamily: 'monospace', color: 'var(--text)', minWidth: 120 }}>{t.name}</span>
            <span style={{ fontSize: 11.5, fontFamily: 'monospace', color: 'var(--text-muted)' }}>{t.value}</span>
            <CopyOnClick id={t.id} value={t.value} />
          </div>
        ))}
      </div>
      <div>
        <div style={{ fontSize: 10, color: 'var(--text-subtle)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, marginBottom: 10 }}>Easing</div>
        {easings.map(t => (
          <div key={t.id} style={{
            padding: '10px 14px', background: 'var(--surface-mid)',
            border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', marginBottom: 4,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
              <span style={{ fontSize: 12, fontFamily: 'monospace', color: 'var(--text)', fontWeight: 500 }}>{t.name}</span>
              <CopyOnClick id={t.id} value={t.value} />
            </div>
            <div style={{ fontSize: 10.5, fontFamily: 'monospace', color: 'var(--text-subtle)' }}>{t.value}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Icon library ─────────────────────────────────────────────────
const ICON_CATEGORIES: Record<string, string[]> = {
  'Navigation': ['Home', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'ChevronLeft', 'ChevronRight', 'ChevronUp', 'ChevronDown', 'ChevronsLeft', 'ChevronsRight', 'Menu', 'MoreHorizontal', 'MoreVertical', 'ExternalLink', 'Link', 'Link2'],
  'Actions': ['Plus', 'Minus', 'X', 'Check', 'Search', 'Filter', 'SortAsc', 'SortDesc', 'Edit', 'Edit2', 'Edit3', 'Trash', 'Trash2', 'Copy', 'Clipboard', 'Download', 'Upload', 'Share', 'Share2', 'RefreshCw', 'RotateCcw', 'Save', 'Send'],
  'Status': ['Info', 'AlertCircle', 'AlertTriangle', 'CheckCircle', 'XCircle', 'HelpCircle', 'Loader', 'Loader2', 'Clock', 'Timer', 'Zap', 'ZapOff', 'Shield', 'ShieldCheck', 'ShieldAlert'],
  'Media': ['Image', 'Video', 'Music', 'Film', 'Camera', 'Mic', 'MicOff', 'Volume', 'Volume2', 'VolumeX', 'Play', 'Pause', 'Square', 'SkipBack', 'SkipForward', 'Maximize', 'Minimize'],
  'Data': ['BarChart', 'BarChart2', 'LineChart', 'PieChart', 'TrendingUp', 'TrendingDown', 'Activity', 'Database', 'Table', 'Grid', 'List', 'Columns', 'Layers', 'Package'],
  'Communication': ['Mail', 'MessageCircle', 'MessageSquare', 'Bell', 'BellOff', 'Phone', 'PhoneCall', 'PhoneOff', 'AtSign', 'Hash', 'User', 'Users', 'UserPlus', 'UserMinus', 'UserCheck'],
  'Files': ['File', 'FileText', 'FilePlus', 'FileMinus', 'FileCode', 'Folder', 'FolderOpen', 'FolderPlus', 'Archive', 'Paperclip', 'Bookmark', 'BookmarkPlus', 'Tag', 'Tags'],
  'Design': ['Palette', 'Brush', 'Pen', 'PenTool', 'Crop', 'Scissors', 'Sliders', 'Sliders2', 'Circle', 'Triangle', 'Hexagon', 'Star', 'Heart', 'Shapes'],
  'Misc': ['Settings', 'Settings2', 'Globe', 'Map', 'MapPin', 'Calendar', 'CalendarDays', 'Sun', 'Moon', 'Sunrise', 'Cloud', 'CloudRain', 'Eye', 'EyeOff', 'Lock', 'Unlock', 'Key', 'Code', 'Terminal', 'Cpu', 'Wifi'],
}

function IconsView() {
  const [query, setQuery] = useState('')
  const [copied, setCopied] = useState<string | null>(null)

  function copyIcon(name: string) {
    navigator.clipboard.writeText(`<${name} size={16} />`).catch(() => {})
    setCopied(name)
    setTimeout(() => setCopied(null), 1500)
  }

  const filtered = query.trim()
    ? Object.fromEntries(
        Object.entries(ICON_CATEGORIES).map(([cat, icons]) => [
          cat, icons.filter(n => n.toLowerCase().includes(query.toLowerCase()))
        ]).filter(([, icons]) => (icons as string[]).length > 0)
      )
    : ICON_CATEGORIES

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Search */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        background: 'var(--surface-mid)', border: '1px solid var(--border)',
        borderRadius: 'var(--radius-md)', padding: '7px 12px',
        maxWidth: 320,
      }}>
        <LucideIcons.Search size={13} color="var(--text-subtle)" />
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Filter icons..."
          style={{ background: 'none', border: 'none', outline: 'none', color: 'var(--text)', fontSize: 12.5, width: '100%' }}
        />
        {query && (
          <button onClick={() => setQuery('')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-subtle)', display: 'flex' }}>
            <LucideIcons.X size={12} />
          </button>
        )}
      </div>

      {(Object.entries(filtered) as [string, string[]][]).map(([category, iconNames]) => (
        <div key={category}>
          <div style={{ fontSize: 11, color: 'var(--text-subtle)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>
            {category} <span style={{ color: 'var(--text-subtle)', fontWeight: 400 }}>({iconNames.length})</span>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
            {iconNames.map(name => {
              const Icon = (LucideIcons as unknown as Record<string, React.ComponentType<{ size?: number }>>)[name]
              if (!Icon) return null
              const isCopied = copied === name
              return (
                <button
                  key={name}
                  onClick={() => copyIcon(name)}
                  title={`${name} — click to copy`}
                  style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 5,
                    width: 68, padding: '10px 6px',
                    background: isCopied ? 'var(--accent-subtle)' : 'var(--surface-mid)',
                    border: `1px solid ${isCopied ? 'var(--accent-border)' : 'var(--border)'}`,
                    borderRadius: 'var(--radius-md)',
                    cursor: 'pointer',
                    color: isCopied ? 'var(--accent)' : 'var(--text-muted)',
                    transition: 'all 80ms',
                  }}
                  onMouseEnter={e => {
                    if (!isCopied) {
                      e.currentTarget.style.background = 'var(--surface-high)'
                      e.currentTarget.style.color = 'var(--text)'
                      e.currentTarget.style.borderColor = 'var(--border-mid)'
                    }
                  }}
                  onMouseLeave={e => {
                    if (!isCopied) {
                      e.currentTarget.style.background = 'var(--surface-mid)'
                      e.currentTarget.style.color = 'var(--text-muted)'
                      e.currentTarget.style.borderColor = 'var(--border)'
                    }
                  }}
                >
                  <Icon size={16} />
                  <span style={{ fontSize: 9, textAlign: 'center', lineHeight: 1.2, maxWidth: 60, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {isCopied ? 'Copied!' : name}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}

export function FoundationsView({ category }: { category: string }) {
  const titles: Record<string, string> = {
    color: 'Colors', spacing: 'Spacing', typography: 'Typography',
    radius: 'Border Radius', motion: 'Motion', shadow: 'Shadows', icons: 'Icons',
  }

  const subtitles: Record<string, string> = {
    color: 'Raw color primitives — the source values all semantic tokens reference.',
    spacing: 'Spacing scale — consistent distance values for padding, margin, and gap.',
    typography: 'Type scale — font sizes, weights, and families.',
    radius: 'Border radius scale — from sharp to fully rounded.',
    motion: 'Animation durations and easing curves.',
    shadow: 'Elevation shadows — from flat to floating.',
    icons: 'Lucide icon library — click any icon to copy the JSX.',
  }

  const totalCounts: Record<string, number> = {
    color: primitiveColors.length,
    spacing: primitiveSpacing.length,
    typography: primitiveTypography.length,
    radius: primitiveRadius.length,
    motion: primitiveMotion.length,
    shadow: primitiveShadows.length,
    icons: Object.values(ICON_CATEGORIES).flat().length,
  }

  const content: Record<string, React.ReactNode> = {
    color:      <ColorGrid tokens={primitiveColors} />,
    spacing:    <SpacingGrid tokens={primitiveSpacing} />,
    typography: <TypographyList tokens={primitiveTypography} />,
    radius:     <RadiusGrid tokens={primitiveRadius} />,
    motion:     <MotionList tokens={primitiveMotion} />,
    shadow:     <ShadowGrid tokens={primitiveShadows} />,
    icons:      <IconsView />,
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      <div style={{
        padding: '16px 24px 14px',
        borderBottom: '1px solid var(--border)',
        flexShrink: 0,
        background: 'var(--surface)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <h1 style={{ fontSize: 18, fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text)' }}>
            {titles[category] ?? category}
          </h1>
          <span className="chip default">{totalCounts[category] ?? '—'} {category === 'icons' ? 'icons' : 'tokens'}</span>
          <span className="chip accent">Primitive</span>
        </div>
        <p style={{ fontSize: 13, color: 'var(--text-muted)', margin: 0 }}>
          {subtitles[category] ?? 'Raw values — the source primitives that semantic tokens reference.'}
        </p>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px' }}>
        {content[category] ?? (
          <div style={{ color: 'var(--text-muted)' }}>No content for {category}</div>
        )}
      </div>
    </div>
  )
}
