'use client'

import { useDesignSystem } from '@/context/DesignSystemContext'
import {
  primitiveColors, primitiveSpacing, primitiveRadius,
  primitiveTypography, primitiveMotion, primitiveShadows, primitiveGlass,
} from '@/data/primitives'
import { semanticTokens } from '@/data/semantic'
import { componentDefs } from '@/data/components'
import { interactionTokens, interactionProfiles } from '@/data/interactions'
import type { InteractionToken, InteractionProfile } from '@/data/interactions'
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

function LiquidGlassView() {
  const blurs = primitiveGlass.filter(t => t.id.startsWith('blur-'))
  const fills = primitiveGlass.filter(t => t.id.startsWith('glass-white') || t.id.startsWith('glass-dark'))
  const borders = primitiveGlass.filter(t => t.id.startsWith('glass-border'))
  const shadows = primitiveGlass.filter(t => t.id.startsWith('glass-shadow'))
  const special = primitiveGlass.filter(t => t.id === 'glass-vibrancy')

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>

      {/* Live demo */}
      <div>
        <div style={{ fontSize: 10, color: 'var(--text-subtle)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, marginBottom: 12 }}>
          Live Demo — Glass Cards
        </div>
        <div style={{
          borderRadius: 'var(--radius-xl)',
          overflow: 'hidden',
          position: 'relative',
          padding: '40px 32px',
          minHeight: 260,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 40%, #f093fb 80%, #4facfe 100%)',
          display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center', justifyContent: 'center',
        }}>
          {/* Decorative blobs */}
          <div style={{ position: 'absolute', width: 200, height: 200, borderRadius: '50%', background: 'rgba(255,200,100,0.35)', top: -40, right: -40, filter: 'blur(40px)' }} />
          <div style={{ position: 'absolute', width: 150, height: 150, borderRadius: '50%', background: 'rgba(100,200,255,0.3)', bottom: -30, left: 20, filter: 'blur(30px)' }} />

          {/* Card 1 — thin */}
          <div style={{
            background: 'rgba(255,255,255,0.35)',
            backdropFilter: 'saturate(180%) blur(16px)',
            WebkitBackdropFilter: 'saturate(180%) blur(16px)',
            border: '1px solid rgba(255,255,255,0.55)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.6)',
            borderRadius: 20, padding: '20px 24px', width: 200,
            position: 'relative', zIndex: 1,
          }}>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.75)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>glass/surface</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', marginBottom: 4 }}>$12,480</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)' }}>Revenue this week</div>
            <div style={{ marginTop: 14, display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(100,255,150,0.9)' }} />
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.85)', fontWeight: 500 }}>+8.4% vs last week</span>
            </div>
          </div>

          {/* Card 2 — thick */}
          <div style={{
            background: 'rgba(255,255,255,0.65)',
            backdropFilter: 'saturate(200%) blur(24px)',
            WebkitBackdropFilter: 'saturate(200%) blur(24px)',
            border: '1px solid rgba(255,255,255,0.75)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.85)',
            borderRadius: 20, padding: '20px 24px', width: 200,
            position: 'relative', zIndex: 1,
          }}>
            <div style={{ fontSize: 10, color: 'rgba(80,80,100,0.7)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>glass/surface-thick</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: '#1c1c1e', letterSpacing: '-0.03em', marginBottom: 4 }}>3,291</div>
            <div style={{ fontSize: 11, color: 'rgba(60,60,80,0.7)' }}>Active users</div>
            <div style={{ marginTop: 14, display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#007AFF' }} />
              <span style={{ fontSize: 11, color: '#007AFF', fontWeight: 500 }}>92 online now</span>
            </div>
          </div>

          {/* Pill chip */}
          <div style={{
            background: 'rgba(255,255,255,0.25)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.45)',
            borderRadius: 9999, padding: '8px 18px',
            display: 'flex', alignItems: 'center', gap: 8, position: 'relative', zIndex: 1,
          }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(100,255,150,0.9)', boxShadow: '0 0 8px rgba(100,255,150,0.8)' }} />
            <span style={{ fontSize: 12, fontWeight: 600, color: '#fff', letterSpacing: '-0.01em' }}>AI is generating…</span>
          </div>
        </div>
        <p style={{ fontSize: 11, color: 'var(--text-subtle)', marginTop: 8 }}>
          ↑ Background gradient visible through the glass — demonstrates true transparency with depth.
        </p>
      </div>

      {/* Blur scale */}
      <div>
        <div style={{ fontSize: 10, color: 'var(--text-subtle)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, marginBottom: 12 }}>
          Blur Scale — backdrop-filter values
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          {blurs.map(t => (
            <div key={t.id} style={{
              display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center',
              padding: 16, background: 'var(--surface-mid)', border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)', minWidth: 120,
            }}>
              <div style={{
                width: 64, height: 64, borderRadius: 12, position: 'relative', overflow: 'hidden',
                background: 'linear-gradient(135deg, #667eea, #f093fb)',
              }}>
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'rgba(255,255,255,0.5)',
                  backdropFilter: t.value,
                  WebkitBackdropFilter: t.value,
                  borderRadius: 12,
                }} />
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 11.5, fontFamily: 'monospace', color: 'var(--text)', fontWeight: 500, marginBottom: 2 }}>{t.name}</div>
                <CopyOnClick id={t.id} value={t.value} />
                {t.description && <div style={{ fontSize: 10, color: 'var(--text-subtle)', marginTop: 4 }}>{t.description}</div>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fill opacity */}
      <div>
        <div style={{ fontSize: 10, color: 'var(--text-subtle)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, marginBottom: 12 }}>
          Glass Fill Colors — background-color with opacity
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          {[...fills, ...borders].map(t => (
            <div key={t.id} style={{
              display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center',
              padding: '14px 16px', background: 'var(--surface-mid)', border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)', minWidth: 130,
            }}>
              {/* Color swatch on gradient */}
              <div style={{
                width: 56, height: 32, borderRadius: 8, position: 'relative', overflow: 'hidden',
                background: 'linear-gradient(90deg, #667eea, #f093fb)',
              }}>
                <div style={{
                  position: 'absolute', inset: 0,
                  background: t.value,
                  borderRadius: 8,
                }} />
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 10.5, fontFamily: 'monospace', color: 'var(--text)', marginBottom: 3 }}>{t.name}</div>
                <CopyOnClick id={t.id} value={t.value} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Shadows */}
      <div>
        <div style={{ fontSize: 10, color: 'var(--text-subtle)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, marginBottom: 12 }}>
          Glass Shadows — box-shadow with inner top highlight
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
          {shadows.map(t => (
            <div key={t.id} style={{
              display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center',
              padding: '20px', background: 'var(--surface-mid)', border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)', minWidth: 160,
            }}>
              <div style={{
                width: 72, height: 72, borderRadius: 16,
                background: 'rgba(255,255,255,0.75)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                boxShadow: t.value,
              }} />
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 11.5, fontFamily: 'monospace', color: 'var(--text)', marginBottom: 4 }}>{t.name}</div>
                <CopyOnClick id={t.id} value={t.value} />
                {t.description && <div style={{ fontSize: 10, color: 'var(--text-subtle)', marginTop: 4, maxWidth: 160 }}>{t.description}</div>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Vibrancy formula */}
      <div>
        <div style={{ fontSize: 10, color: 'var(--text-subtle)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, marginBottom: 12 }}>
          Vibrancy Formula — Apple&apos;s backdrop-filter secret
        </div>
        {special.map(t => (
          <div key={t.id} style={{
            padding: '16px 20px',
            background: 'var(--accent-subtle)', border: '1px solid var(--accent-border)',
            borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'flex-start', gap: 14,
          }}>
            <div style={{ fontSize: 20 }}>🍎</div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text)', marginBottom: 4 }}>
                {t.name}
              </div>
              <code style={{ fontSize: 12, fontFamily: 'monospace', color: 'var(--accent)', background: 'var(--accent-subtle)', padding: '2px 8px', borderRadius: 4 }}>
                backdrop-filter: {t.value}
              </code>
              <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 8, lineHeight: 1.6 }}>
                {t.description} — This is the formula Apple uses for macOS Menubar, iOS Navigation Bar, and every glass surface in visionOS.
                Apply to an element with a <code style={{ fontSize: 11, background: 'var(--surface-high)', padding: '1px 4px', borderRadius: 3 }}>rgba()</code> background that has transparency.
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* CSS snippet */}
      <div>
        <div style={{ fontSize: 10, color: 'var(--text-subtle)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, marginBottom: 10 }}>
          CSS Snippet — Copy-paste recipe
        </div>
        <div className="code-block">{`.glass-surface {
  background: rgba(255, 255, 255, 0.72);           /* glass/surface */
  backdrop-filter: saturate(180%) blur(20px);      /* glass/vibrancy */
  -webkit-backdrop-filter: saturate(180%) blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.60);     /* glass/border */
  box-shadow: 0 8px 32px rgba(0,0,0,0.10),
              inset 0 1px 0 rgba(255,255,255,0.65); /* glass/shadow */
  border-radius: 20px;
}

/* Dark mode */
.dark .glass-surface {
  background: rgba(28, 28, 30, 0.72);
  border: 1px solid rgba(255, 255, 255, 0.14);
}`}</div>
      </div>
    </div>
  )
}

// ─── Interaction Tokens View ─────────────────────────────────────────────────

const intensityMeta: Record<string, { label: string; chipClass: string; color: string }> = {
  none:       { label: 'none',       chipClass: 'default', color: 'var(--text-subtle)' },
  subtle:     { label: 'subtle',     chipClass: 'accent',  color: 'var(--accent)' },
  standard:   { label: 'standard',   chipClass: 'green',   color: 'var(--green)' },
  expressive: { label: 'expressive', chipClass: 'purple',  color: 'var(--purple)' },
}

const productFitMeta: Record<string, { color: string; bg: string }> = {
  all:  { color: 'var(--text-muted)', bg: 'var(--surface-high)' },
  b2b:  { color: '#2563eb', bg: 'rgba(37,99,235,0.08)' },
  b2c:  { color: '#007AFF', bg: 'rgba(0,122,255,0.08)' },
  'b2b+': { color: '#2563eb', bg: 'rgba(37,99,235,0.08)' },
  'b2c+': { color: '#007AFF', bg: 'rgba(0,122,255,0.08)' },
}

function MotionTokenCard({ token }: { token: InteractionToken }) {
  const [hovered, setHovered] = useState(false)
  const [pressed, setPressed] = useState(false)

  const isActive = token.id === 'motion/press' ? pressed : hovered
  const im = intensityMeta[token.intensity]
  const fm = productFitMeta[token.productFit] ?? productFitMeta.all

  const demoBoxStyle: React.CSSProperties = {
    width: 52,
    height: 52,
    flexShrink: 0,
    borderRadius: 10,
    background: isActive ? 'var(--accent)' : 'var(--surface-high)',
    border: `1.5px solid ${isActive ? 'var(--accent)' : 'var(--border-mid)'}`,
    cursor: 'pointer',
    transition: token.cssTransition ?? 'all 100ms',
    transform: isActive && token.cssTransform ? token.cssTransform : 'none',
    opacity: token.id === 'motion/fade-in' ? (isActive ? 1 : 0.15) : 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    userSelect: 'none',
  }

  return (
    <div style={{
      display: 'flex', alignItems: 'flex-start', gap: 14, padding: '14px 16px',
      background: 'var(--surface-mid)', border: '1px solid var(--border)',
      borderRadius: 'var(--radius-lg)', transition: 'border-color 120ms',
    }}>
      {/* Live demo box */}
      <div
        style={demoBoxStyle}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => { setHovered(false); setPressed(false) }}
        onMouseDown={() => setPressed(true)}
        onMouseUp={() => setPressed(false)}
        title="Hover / click to preview"
      >
        <div style={{
          width: 18, height: 18, borderRadius: 4,
          background: isActive ? 'rgba(255,255,255,0.4)' : 'var(--border-mid)',
          transition: 'inherit',
        }} />
      </div>

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 5, flexWrap: 'wrap' }}>
          <code style={{ fontSize: 12, fontWeight: 600, color: 'var(--text)', fontFamily: 'monospace' }}>
            {token.id}
          </code>
          <span className={`chip ${im.chipClass}`}>{im.label}</span>
          <span style={{
            fontSize: 9.5, fontWeight: 600, padding: '2px 6px', borderRadius: 99,
            background: fm.bg, color: fm.color,
          }}>
            {token.productFit}
          </span>
        </div>
        <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 8, lineHeight: 1.55 }}>
          {token.description}
        </p>
        {token.cssTransition && (
          <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginBottom: 8 }}>
            <code style={{ fontSize: 10.5, fontFamily: 'monospace', background: 'var(--surface-high)', border: '1px solid var(--border-mid)', color: 'var(--accent)', padding: '2px 7px', borderRadius: 4 }}>
              {token.cssTransition}
            </code>
            {token.cssTransform && (
              <code style={{ fontSize: 10.5, fontFamily: 'monospace', background: 'var(--surface-high)', border: '1px solid var(--border-mid)', color: 'var(--green)', padding: '2px 7px', borderRadius: 4 }}>
                {token.cssTransform}
              </code>
            )}
          </div>
        )}
        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
          {token.usage.map(u => (
            <span key={u} className="chip default" style={{ fontSize: 10 }}>{u}</span>
          ))}
        </div>
      </div>

      {/* Platform support */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4, flexShrink: 0, marginTop: 2 }}>
        {(Object.entries(token.platformSupport) as [string, string][]).map(([platform, support]) => (
          <div key={platform} style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
            <div style={{
              width: 6, height: 6, borderRadius: '50%',
              background: support === 'full' ? 'var(--green)' : support === 'partial' ? 'var(--yellow)' : 'var(--border-strong)',
              flexShrink: 0,
            }} />
            <span style={{ fontSize: 9.5, color: 'var(--text-subtle)', textTransform: 'capitalize' }}>{platform}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function FeedbackCard({ token }: { token: InteractionToken }) {
  const im = intensityMeta[token.intensity]
  const profileForToken = interactionProfiles.find(p => p.feedbackToken === token.id)
  const profileColor = profileForToken?.color ?? 'var(--text-muted)'

  return (
    <div style={{
      padding: '16px', background: 'var(--surface-mid)',
      border: `1.5px solid ${profileColor}33`,
      borderRadius: 'var(--radius-lg)', display: 'flex', flexDirection: 'column', gap: 10,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: profileColor, flexShrink: 0 }} />
        <code style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--text)', fontFamily: 'monospace' }}>
          {token.id}
        </code>
        <span className={`chip ${im.chipClass}`}>{im.label}</span>
      </div>
      <p style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.6 }}>
        {token.description}
      </p>
      <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
        {token.usage.map(u => (
          <span key={u} className="chip default" style={{ fontSize: 10 }}>{u}</span>
        ))}
      </div>
      {profileForToken && (
        <div style={{ fontSize: 10.5, color: 'var(--text-subtle)', marginTop: 2 }}>
          Used by <span style={{ color: profileColor, fontWeight: 600 }}>{profileForToken.name}</span> profile
        </div>
      )}
    </div>
  )
}

function DensityCard({ token }: { token: InteractionToken }) {
  const densityScales: Record<string, number[]> = {
    'density/compact': [4, 6, 8, 12, 16],
    'density/normal':  [8, 12, 16, 20, 28],
    'density/relaxed': [12, 20, 24, 32, 48],
  }
  const scale = densityScales[token.id] ?? [8, 12, 16, 20, 28]
  const profileForToken = interactionProfiles.find(p => p.densityToken === token.id)

  return (
    <div style={{
      display: 'flex', alignItems: 'flex-start', gap: 20, padding: '14px 16px',
      background: 'var(--surface-mid)', border: '1px solid var(--border)',
      borderRadius: 'var(--radius-lg)',
    }}>
      {/* Visual spacing bars */}
      <div style={{ display: 'flex', gap: 4, alignItems: 'flex-end', height: 48, flexShrink: 0 }}>
        {scale.map((px, i) => (
          <div key={i} style={{
            width: 10,
            height: Math.min(px * 0.85, 48),
            background: 'var(--accent)',
            borderRadius: 3,
            opacity: 0.5 + i * 0.1,
          }} />
        ))}
      </div>

      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5 }}>
          <code style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--text)', fontFamily: 'monospace' }}>
            {token.id}
          </code>
          {profileForToken && (
            <span style={{
              fontSize: 9.5, fontWeight: 600, padding: '2px 7px', borderRadius: 99,
              background: `${profileForToken.color}18`, color: profileForToken.color,
            }}>
              {profileForToken.name}
            </span>
          )}
        </div>
        <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 8, lineHeight: 1.55 }}>
          {token.description}
        </p>
        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
          {token.usage.map(u => (
            <span key={u} className="chip default" style={{ fontSize: 10 }}>{u}</span>
          ))}
        </div>

        {/* Platform support dots */}
        <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
          {(Object.entries(token.platformSupport) as [string, string][]).map(([platform, support]) => (
            <div key={platform} style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
              <div style={{
                width: 5, height: 5, borderRadius: '50%',
                background: support === 'full' ? 'var(--green)' : support === 'partial' ? 'var(--yellow)' : 'var(--border-strong)',
              }} />
              <span style={{ fontSize: 9.5, color: 'var(--text-subtle)', textTransform: 'capitalize' }}>{platform}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function InteractionProfileCard({ profile }: { profile: InteractionProfile }) {
  const tokenEntries: [string, string][] = [
    ['hover', profile.hoverToken],
    ['press', profile.pressToken],
    ['enter', profile.enterToken],
    ['exit', profile.exitToken],
  ]

  return (
    <div style={{
      padding: '18px', background: 'var(--surface-mid)',
      border: `2px solid ${profile.color}40`,
      borderRadius: 'var(--radius-lg)', display: 'flex', flexDirection: 'column', gap: 12,
    }}>
      {/* Header */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: profile.color, flexShrink: 0, boxShadow: `0 0 0 3px ${profile.color}25` }} />
          <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.01em' }}>
            {profile.name}
          </span>
        </div>
        <p style={{ fontSize: 11.5, color: 'var(--text-subtle)', fontStyle: 'italic', marginBottom: 4 }}>
          &ldquo;{profile.tagline}&rdquo;
        </p>
        <p style={{ fontSize: 11, color: 'var(--text-muted)' }}>{profile.persona}</p>
      </div>

      {/* Token assignments */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 5 }}>
        {tokenEntries.map(([label, tokenId]) => (
          <div key={label} style={{
            background: 'var(--surface-high)', borderRadius: 'var(--radius-md)',
            padding: '6px 10px',
          }}>
            <div style={{ fontSize: 9, color: 'var(--text-subtle)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 2 }}>
              {label}
            </div>
            <div style={{ fontSize: 10.5, color: 'var(--text)', fontFamily: 'monospace' }}>
              {tokenId.replace('motion/', '')}
            </div>
          </div>
        ))}
      </div>

      {/* Meta badges */}
      <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
        <span className="chip default">{profile.motion} motion</span>
        <span className="chip default">{profile.density}</span>
        <span className="chip default">{profile.gestureModel}</span>
      </div>

      {/* Theme association */}
      <div style={{ fontSize: 10.5, color: 'var(--text-subtle)', display: 'flex', gap: 4, flexWrap: 'wrap', alignItems: 'center' }}>
        <span>Themes:</span>
        {profile.themeIds.map(id => (
          <span key={id} style={{
            padding: '1px 6px', borderRadius: 99, fontSize: 10,
            background: `${profile.color}18`, color: profile.color, fontWeight: 600,
          }}>
            {id}
          </span>
        ))}
      </div>
    </div>
  )
}

function InteractionTokensView() {
  const motionTokens = interactionTokens.filter(t => t.group === 'motion')
  const feedbackTokens = interactionTokens.filter(t => t.group === 'feedback')
  const densityTokens = interactionTokens.filter(t => t.group === 'density')

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 44 }}>
      {/* Intro callout */}
      <div style={{
        background: 'var(--accent-subtle)', border: '1px solid var(--accent-border)',
        borderRadius: 'var(--radius-lg)', padding: '14px 18px',
      }}>
        <div style={{ fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--accent)', marginBottom: 6 }}>
          Behavioral Semantic Primitives
        </div>
        <p style={{ fontSize: 12.5, color: 'var(--text)', lineHeight: 1.65, margin: 0 }}>
          Interaction tokens define <em>how it feels</em> — not how it looks. They sit above primitive motion tokens
          and map interaction contexts (hover, press, enter, exit) to concrete CSS values.{' '}
          <span style={{ color: 'var(--text-muted)' }}>
            Components consume tokens. Profiles bundle tokens into B2B or B2C personalities.
            Gesture tokens and layout patterns are NOT here — this layer defines values, not behaviors.
          </span>
        </p>
      </div>

      {/* Interaction Profiles */}
      <div>
        <div className="inspector-label" style={{ marginBottom: 12 }}>
          Interaction Profiles — {interactionProfiles.length} profiles
        </div>
        <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 16, lineHeight: 1.6 }}>
          Profiles bundle tokens into cohesive behavioral personalities. Each theme maps to exactly one profile.
          Switch themes in the sidebar to see how interaction personality changes across B2B ↔ B2C.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {interactionProfiles.map(profile => (
            <InteractionProfileCard key={profile.id} profile={profile} />
          ))}
        </div>
      </div>

      {/* Motion Tokens */}
      <div>
        <div className="inspector-label" style={{ marginBottom: 12 }}>
          Motion Tokens — {motionTokens.length} tokens · hover the demo box to preview
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {motionTokens.map(token => (
            <MotionTokenCard key={token.id} token={token} />
          ))}
        </div>
      </div>

      {/* Feedback Tokens */}
      <div>
        <div className="inspector-label" style={{ marginBottom: 12 }}>
          Feedback Personalities — {feedbackTokens.length} tokens
        </div>
        <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 14, lineHeight: 1.6 }}>
          Feedback tokens define the overall interaction philosophy — how &ldquo;alive&rdquo; the UI feels.
          Not a CSS value, but a behavioral contract.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {feedbackTokens.map(token => (
            <FeedbackCard key={token.id} token={token} />
          ))}
        </div>
      </div>

      {/* Density Tokens */}
      <div>
        <div className="inspector-label" style={{ marginBottom: 12 }}>
          Density Scale — {densityTokens.length} tokens
        </div>
        <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 14, lineHeight: 1.6 }}>
          Density tokens control spacing intensity — how tight or generous the UI breathes.
          Compact for power users, relaxed for touch-first consumer experiences.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {densityTokens.map(token => (
            <DensityCard key={token.id} token={token} />
          ))}
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────

export function FoundationsView({ category }: { category: string }) {
  const titles: Record<string, string> = {
    color: 'Colors', spacing: 'Spacing', typography: 'Typography',
    radius: 'Border Radius', motion: 'Motion', shadow: 'Shadows', icons: 'Icons',
    glass: 'Liquid Glass', interaction: 'Interaction Tokens',
  }

  const subtitles: Record<string, string> = {
    color: 'Raw color primitives — the source values all semantic tokens reference.',
    spacing: 'Spacing scale — consistent distance values for padding, margin, and gap.',
    typography: 'Type scale — font sizes, weights, and families.',
    radius: 'Border radius scale — from sharp to fully rounded.',
    motion: 'Animation durations and easing curves.',
    shadow: 'Elevation shadows — from flat to floating.',
    icons: 'Lucide icon library — click any icon to copy the JSX.',
    glass: 'Frosted glass primitives — blur, opacity, border and shadow values for liquid glass surfaces.',
    interaction: 'Behavioral semantic primitives — motion, feedback, and density tokens that define how the UI feels.',
  }

  const totalCounts: Record<string, number> = {
    color: primitiveColors.length,
    spacing: primitiveSpacing.length,
    typography: primitiveTypography.length,
    radius: primitiveRadius.length,
    motion: primitiveMotion.length,
    shadow: primitiveShadows.length,
    icons: Object.values(ICON_CATEGORIES).flat().length,
    glass: primitiveGlass.length,
    interaction: interactionTokens.length,
  }

  const content: Record<string, React.ReactNode> = {
    color:       <ColorGrid tokens={primitiveColors} />,
    spacing:     <SpacingGrid tokens={primitiveSpacing} />,
    typography:  <TypographyList tokens={primitiveTypography} />,
    radius:      <RadiusGrid tokens={primitiveRadius} />,
    motion:      <MotionList tokens={primitiveMotion} />,
    shadow:      <ShadowGrid tokens={primitiveShadows} />,
    icons:       <IconsView />,
    glass:       <LiquidGlassView />,
    interaction: <InteractionTokensView />,
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
          {category === 'interaction' && <span className="chip accent">Behavioral</span>}
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
