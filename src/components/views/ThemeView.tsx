'use client'

import { useState } from 'react'
import { getTheme } from '@/data/themes'
import { getPrimitive } from '@/data/primitives'
import { getSemanticToken, semanticTokens } from '@/data/semantic'
import { useDesignSystem } from '@/context/DesignSystemContext'

/* ── Brand A: Precision grid animated canvas ──────────────────── */
function BrandADirectionCanvas() {
  const cols = 12
  const rows = 8
  return (
    <div style={{
      position: 'relative', borderRadius: 4, overflow: 'hidden',
      background: '#f8faff', border: '1px solid #e2e8f0',
      height: 220, width: '100%',
    }}>
      {/* Grid lines */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.18 }}>
        {Array.from({ length: cols + 1 }).map((_, i) => (
          <line key={`v${i}`}
            x1={`${(i / cols) * 100}%`} y1="0"
            x2={`${(i / cols) * 100}%`} y2="100%"
            stroke="#1e40af" strokeWidth="1"
          />
        ))}
        {Array.from({ length: rows + 1 }).map((_, i) => (
          <line key={`h${i}`}
            x1="0" y1={`${(i / rows) * 100}%`}
            x2="100%" y2={`${(i / rows) * 100}%`}
            stroke="#1e40af" strokeWidth="1"
          />
        ))}
      </svg>

      {/* Scanner line */}
      <div style={{
        position: 'absolute', left: 0, right: 0, height: 2,
        background: 'linear-gradient(90deg, transparent, #2563eb, #60a5fa, #2563eb, transparent)',
        animation: 'scanline 3s linear infinite',
        boxShadow: '0 0 20px 4px rgba(37,99,235,0.3)',
      }} />

      {/* Data cells — blinking */}
      {[
        { x: 1, y: 1, w: 3, h: 1, delay: '0s' },
        { x: 5, y: 1, w: 2, h: 1, delay: '0.4s' },
        { x: 8, y: 1, w: 3, h: 1, delay: '0.2s' },
        { x: 1, y: 3, w: 5, h: 2, delay: '0.6s' },
        { x: 7, y: 3, w: 4, h: 2, delay: '0.1s' },
        { x: 1, y: 6, w: 2, h: 1, delay: '0.8s' },
        { x: 4, y: 6, w: 4, h: 1, delay: '0.3s' },
        { x: 9, y: 6, w: 2, h: 1, delay: '0.5s' },
      ].map((c, i) => (
        <div key={i} style={{
          position: 'absolute',
          left: `calc(${(c.x / cols) * 100}% + 3px)`,
          top: `calc(${(c.y / rows) * 100}% + 3px)`,
          width: `calc(${(c.w / cols) * 100}% - 6px)`,
          height: `calc(${(c.h / rows) * 100}% - 6px)`,
          background: i % 3 === 0 ? 'rgba(37,99,235,0.12)' : i % 3 === 1 ? 'rgba(37,99,235,0.06)' : 'rgba(37,99,235,0.09)',
          border: '1px solid rgba(37,99,235,0.25)',
          animation: `gridpulse 2.5s ease-in-out ${c.delay} infinite`,
          borderRadius: 0,
        }} />
      ))}

      {/* Labels */}
      <div style={{
        position: 'absolute', top: 8, left: 8,
        fontSize: 10, fontFamily: 'monospace', fontWeight: 700,
        color: '#2563eb', letterSpacing: '0.12em',
        animation: 'gridpulse 2s ease-in-out infinite',
      }}>BRAND A — PRECISION GRID</div>

      {/* Crosshair */}
      <div style={{
        position: 'absolute', right: 16, bottom: 16,
        width: 28, height: 28, border: '2px solid #2563eb',
        borderRadius: 0, opacity: 0.5,
      }}>
        <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: 1, background: '#2563eb' }} />
        <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 1, background: '#2563eb' }} />
      </div>
    </div>
  )
}

/* ── Brand B: Fluid blob / mesh gradient canvas ───────────────── */
function BrandBDirectionCanvas() {
  return (
    <div style={{
      position: 'relative', borderRadius: 20, overflow: 'hidden',
      height: 220, width: '100%',
      background: '#0a0a1a',
    }}>
      {/* Animated blobs */}
      <div style={{
        position: 'absolute', width: 220, height: 220,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,122,255,0.7) 0%, transparent 70%)',
        top: -60, left: -40,
        filter: 'blur(40px)',
        animation: 'blob-a 7s ease-in-out infinite',
      }} />
      <div style={{
        position: 'absolute', width: 200, height: 200,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(120,80,255,0.65) 0%, transparent 70%)',
        bottom: -60, right: -20,
        filter: 'blur(35px)',
        animation: 'blob-b 9s ease-in-out infinite',
      }} />
      <div style={{
        position: 'absolute', width: 160, height: 160,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,210,190,0.55) 0%, transparent 70%)',
        top: 20, right: 40,
        filter: 'blur(30px)',
        animation: 'blob-c 11s ease-in-out infinite',
      }} />
      <div style={{
        position: 'absolute', width: 140, height: 140,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,100,180,0.45) 0%, transparent 70%)',
        bottom: 10, left: 60,
        filter: 'blur(28px)',
        animation: 'blob-a 8s ease-in-out 1.5s infinite',
      }} />

      {/* Floating glass card */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        background: 'rgba(255,255,255,0.12)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        border: '1px solid rgba(255,255,255,0.25)',
        borderRadius: 20,
        padding: '16px 24px',
        minWidth: 180,
        boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.35)',
        animation: 'float-card 4s ease-in-out infinite',
        textAlign: 'center',
      }}>
        <div style={{
          fontSize: 22, fontWeight: 300, color: '#fff',
          letterSpacing: '0.04em',
          background: 'linear-gradient(90deg, #fff, #a0c4ff, #fff)',
          backgroundSize: '200% auto',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          animation: 'shimmer 3s linear infinite',
        }}>Brand B</div>
        <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.55)', letterSpacing: '0.1em', marginTop: 4 }}>
          FLUID · ALIVE · GLASS
        </div>
      </div>

      {/* Noise overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'0.04\'/%3E%3C/svg%3E")',
        opacity: 0.6,
        pointerEvents: 'none',
      }} />
    </div>
  )
}

/* ── Utopia Direction Canvas ──────────────────────────────────── */
function UtopiaDirectionCanvas() {
  return (
    <div style={{
      position: 'relative', borderRadius: 12, overflow: 'hidden',
      height: 220, width: '100%',
      background: '#0d0a0b',
    }}>
      <div style={{
        position: 'absolute', width: 300, height: 300,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(204,85,54,0.5) 0%, transparent 65%)',
        top: -80, left: -60, filter: 'blur(50px)',
        animation: 'blob-a 10s ease-in-out infinite',
      }} />
      <div style={{
        position: 'absolute', width: 200, height: 200,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(215,122,89,0.3) 0%, transparent 70%)',
        bottom: -40, right: -20, filter: 'blur(40px)',
        animation: 'blob-b 12s ease-in-out infinite',
      }} />
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
      }}>
        <div style={{
          fontSize: 28, fontWeight: 700, color: '#CC5536',
          letterSpacing: '-0.03em',
          textShadow: '0 0 40px rgba(204,85,54,0.6)',
        }}>Utopia</div>
        <div style={{ fontSize: 10, color: '#635b5e', letterSpacing: '0.15em', marginTop: 6 }}>
          WARM · EDITORIAL · ARTISANAL
        </div>
      </div>
    </div>
  )
}

/* ── Generic Direction Canvas ─────────────────────────────────── */
function GenericDirectionCanvas({ accentColor, name }: { accentColor: string; name: string }) {
  return (
    <div style={{
      position: 'relative', borderRadius: 8, overflow: 'hidden',
      height: 160, width: '100%',
      background: `linear-gradient(135deg, ${accentColor}18 0%, ${accentColor}05 100%)`,
      border: `1px solid ${accentColor}22`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{
        fontSize: 20, fontWeight: 700, color: accentColor,
        letterSpacing: '-0.02em', opacity: 0.4,
      }}>{name}</div>
    </div>
  )
}

/* ── Direction tab ────────────────────────────────────────────── */
function DirectionTab({ themeId, accentColor }: { themeId: string; accentColor: string }) {
  const theme = getTheme(themeId)
  const dir = theme?.direction

  const canvas: Record<string, React.ReactNode> = {
    'brand-a': <BrandADirectionCanvas />,
    'brand-b': <BrandBDirectionCanvas />,
    'utopia':  <UtopiaDirectionCanvas />,
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Animated canvas */}
      <div>
        <div style={{ fontSize: 10, color: 'var(--text-subtle)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, marginBottom: 10 }}>
          Visual Direction
        </div>
        {canvas[themeId] ?? <GenericDirectionCanvas accentColor={accentColor} name={theme?.name ?? ''} />}
      </div>

      {dir ? (
        <>
          {/* Mood words */}
          <div>
            <div style={{ fontSize: 10, color: 'var(--text-subtle)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, marginBottom: 10 }}>
              Mood
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {dir.moodWords.map((w, i) => (
                <div key={w} style={{
                  padding: '6px 14px',
                  borderRadius: themeId === 'brand-b' ? 9999 : themeId === 'brand-a' ? 2 : 8,
                  background: i === 0 ? accentColor : 'var(--surface-mid)',
                  color: i === 0 ? '#fff' : 'var(--text)',
                  border: i === 0 ? 'none' : '1px solid var(--border-mid)',
                  fontSize: 12.5, fontWeight: i === 0 ? 600 : 400,
                  letterSpacing: themeId === 'brand-a' ? '0.06em' : '-0.01em',
                }}>
                  {w}
                </div>
              ))}
            </div>
          </div>

          {/* Direction notes */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              { label: '📷  Photography', text: dir.photography },
              { label: '✦  Motion',       text: dir.motion },
              { label: 'Aa  Typography',  text: dir.typography },
            ].map(({ label, text }) => (
              <div key={label} style={{
                padding: '14px 16px',
                background: 'var(--surface-mid)', border: '1px solid var(--border)',
                borderRadius: themeId === 'brand-b' ? 16 : themeId === 'brand-a' ? 2 : 10,
                gridColumn: label.includes('Typography') ? '1 / -1' : undefined,
              }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 7, letterSpacing: '0.04em' }}>{label}</div>
                <div style={{ fontSize: 12.5, color: 'var(--text)', lineHeight: 1.65 }}>{text}</div>
              </div>
            ))}
          </div>

          {/* GIF / Asset board */}
          <div>
            <div style={{ fontSize: 10, color: 'var(--text-subtle)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, marginBottom: 6 }}>
              Asset Board — GIFs &amp; Images
            </div>
            {dir.assets.length === 0 ? (
              <div style={{
                padding: '20px 20px',
                background: 'var(--surface-mid)', border: '2px dashed var(--border-mid)',
                borderRadius: themeId === 'brand-b' ? 16 : themeId === 'brand-a' ? 2 : 10,
                textAlign: 'center',
              }}>
                <div style={{ fontSize: 20, marginBottom: 8 }}>🎞</div>
                <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text)', marginBottom: 4 }}>
                  Add GIF / image references here
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.6, maxWidth: 400, margin: '0 auto' }}>
                  Open <code style={{ background: 'var(--surface-high)', padding: '1px 5px', borderRadius: 3, fontSize: 11 }}>src/data/themes.ts</code> and add URLs to the <code style={{ background: 'var(--surface-high)', padding: '1px 5px', borderRadius: 3, fontSize: 11 }}>direction.assets[]</code> array for this theme.
                </div>
                <div className="code-block" style={{ marginTop: 14, textAlign: 'left', fontSize: 11 }}>{`direction: {
  assets: [
    { url: 'https://media.giphy.com/xxx.gif', label: 'Fluid sim', type: 'gif' },
    { url: '/public/assets/motion-ref.gif',   label: 'Motion ref', type: 'gif' },
    { url: 'https://cdn.example.com/img.jpg', label: 'Photography', type: 'img' },
  ]
}`}</div>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 12 }}>
                {dir.assets.map((a, i) => (
                  <div key={i} style={{
                    borderRadius: themeId === 'brand-b' ? 16 : themeId === 'brand-a' ? 2 : 10,
                    overflow: 'hidden', border: '1px solid var(--border)',
                    background: 'var(--surface-mid)',
                  }}>
                    <img
                      src={a.url}
                      alt={a.label}
                      style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', display: 'block' }}
                    />
                    <div style={{ padding: '8px 10px', fontSize: 11, color: 'var(--text-muted)' }}>{a.label}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      ) : (
        <div style={{
          padding: '20px', background: 'var(--surface-mid)',
          border: '1px solid var(--border)', borderRadius: 10,
          fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6,
        }}>
          No design direction defined for this theme yet. Add a <code style={{ background: 'var(--surface-high)', padding: '1px 5px', borderRadius: 3, fontSize: 11 }}>direction</code> field in <code style={{ background: 'var(--surface-high)', padding: '1px 5px', borderRadius: 3, fontSize: 11 }}>src/data/themes.ts</code> to unlock this tab.
        </div>
      )}
    </div>
  )
}

/* ── Main ThemeView ────────────────────────────────────────────── */
type Tab = 'overview' | 'direction' | 'overrides'

export function ThemeView({ id }: { id: string }) {
  const theme = getTheme(id)
  const { setActiveThemeId, activeTheme } = useDesignSystem()
  const [tab, setTab] = useState<Tab>('overview')

  if (!theme) return null
  const isActive = activeTheme.id === id

  const overridesByGroup: Record<string, typeof theme.overrides> = {}
  theme.overrides.forEach(o => {
    const sem = getSemanticToken(o.semanticId)
    const group = sem?.group ?? 'other'
    if (!overridesByGroup[group]) overridesByGroup[group] = []
    overridesByGroup[group].push(o)
  })

  const tabs: { id: Tab; label: string }[] = [
    { id: 'overview',   label: 'Overview' },
    { id: 'direction',  label: 'Direction' },
    { id: 'overrides',  label: `Token Overrides` },
  ]

  const hasDirction = !!theme.direction

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{
        padding: '16px 24px 0',
        borderBottom: '1px solid var(--border)',
        flexShrink: 0,
        background: 'var(--surface)',
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 8 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <div style={{
                width: 18, height: 18, borderRadius: id === 'brand-b' ? 9999 : id === 'brand-a' ? 2 : 5,
                background: theme.accentColor,
                boxShadow: `0 0 12px ${theme.accentColor}66`,
              }} />
              <h1 style={{ fontSize: 18, fontWeight: 700, letterSpacing: '-0.02em' }}>
                {theme.name}
              </h1>
              <span className="chip default">{theme.overrides.length} overrides</span>
              {isActive && <span className="chip green">Active</span>}
              {hasDirction && <span className="chip accent">Direction ✓</span>}
            </div>
            <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>{theme.description}</p>
          </div>
          <button
            onClick={() => setActiveThemeId(id)}
            style={{
              padding: '7px 14px', borderRadius: 'var(--radius-md)', flexShrink: 0,
              border: isActive ? 'none' : '1px solid var(--border)',
              background: isActive ? 'var(--green-subtle)' : 'var(--surface-mid)',
              color: isActive ? 'var(--green)' : 'var(--text)',
              fontSize: 12.5, fontWeight: 500, cursor: 'pointer',
              transition: 'all 100ms',
            }}
          >
            {isActive ? '✓ Active' : 'Set Active'}
          </button>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 2 }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              padding: '7px 14px', fontSize: 12.5, fontWeight: 500,
              border: 'none', cursor: 'pointer',
              borderBottom: `2px solid ${tab === t.id ? 'var(--accent)' : 'transparent'}`,
              background: 'transparent',
              color: tab === t.id ? 'var(--accent)' : 'var(--text-muted)',
              transition: 'color 100ms, border-color 100ms',
            }}>{t.label}</button>
          ))}
        </div>
      </div>

      {/* Tab body */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px' }}>

        {/* ── Overview ── */}
        {tab === 'overview' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Accent swatch */}
            <div style={{
              background: `linear-gradient(135deg, ${theme.accentColor}20, ${theme.accentColor}08)`,
              border: `1px solid ${theme.accentColor}33`,
              borderRadius: 'var(--radius-xl)', padding: '20px',
              display: 'flex', alignItems: 'center', gap: 16,
            }}>
              <div style={{
                width: 52, height: 52,
                borderRadius: id === 'brand-b' ? 9999 : id === 'brand-a' ? 2 : 12,
                background: theme.accentColor,
                boxShadow: `0 0 28px ${theme.accentColor}55`,
              }} />
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', marginBottom: 3 }}>
                  Accent: {theme.accentColor}
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                  {theme.overrides.length} semantic tokens overridden
                </div>
              </div>
              {/* Mini radius personality */}
              <div style={{ marginLeft: 'auto', display: 'flex', gap: 8, alignItems: 'center' }}>
                {[4, 8, 14, 22].map((r, i) => {
                  const actualR = id === 'brand-b' ? (i < 2 ? 9999 : 16) : id === 'brand-a' ? 0 : r
                  return (
                    <div key={r} style={{
                      width: 28 + i * 4, height: 28 + i * 4,
                      borderRadius: actualR,
                      background: `${theme.accentColor}${22 + i * 18}`,
                      border: `1.5px solid ${theme.accentColor}55`,
                    }} />
                  )
                })}
                <span style={{ fontSize: 10, color: 'var(--text-subtle)', marginLeft: 4 }}>
                  {id === 'brand-b' ? 'pill/full' : id === 'brand-a' ? 'sharp/0' : 'utopia'}
                </span>
              </div>
            </div>

            {/* Token group summary */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
              {Object.entries(overridesByGroup).map(([group, overrides]) => (
                <div key={group} style={{
                  padding: '12px 14px', background: 'var(--surface-mid)',
                  border: '1px solid var(--border)', borderRadius: 'var(--radius-md)',
                  cursor: 'pointer', transition: 'border-color 100ms',
                }}
                  onClick={() => setTab('overrides')}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
                >
                  <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text)', textTransform: 'capitalize', marginBottom: 3 }}>{group}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-subtle)' }}>{overrides.length} overrides</div>
                  <div style={{ display: 'flex', gap: 3, marginTop: 8, flexWrap: 'wrap' }}>
                    {overrides.slice(0, 6).map(o => (
                      /^#|^rgba/.test(o.value) ? (
                        <div key={o.semanticId} style={{
                          width: 12, height: 12, borderRadius: 2,
                          background: o.value, border: '1px solid rgba(255,255,255,0.1)',
                        }} />
                      ) : null
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Direction ── */}
        {tab === 'direction' && (
          <DirectionTab themeId={id} accentColor={theme.accentColor} />
        )}

        {/* ── Token Overrides ── */}
        {tab === 'overrides' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {theme.overrides.length === 0 ? (
              <div style={{
                background: 'var(--surface-mid)', border: '1px solid var(--border)',
                borderRadius: 'var(--radius-lg)', padding: '20px',
              }}>
                <div style={{ fontSize: 13, color: 'var(--text)', marginBottom: 6 }}>Base theme — no overrides</div>
                <p style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.6 }}>
                  All semantic tokens resolve to their primitive definitions directly.
                </p>
              </div>
            ) : (
              Object.entries(overridesByGroup).map(([group, overrides]) => (
                <div key={group}>
                  <div style={{
                    fontSize: 11, color: 'var(--text-subtle)', fontWeight: 600,
                    textTransform: 'capitalize', letterSpacing: '0.05em', marginBottom: 8,
                    display: 'flex', alignItems: 'center', gap: 6,
                  }}>
                    <span>{group}</span>
                    <span className="chip default" style={{ fontSize: 9.5 }}>{overrides.length}</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    {overrides.map(o => {
                      const sem = getSemanticToken(o.semanticId)
                      const lightPrim = getPrimitive(sem?.primitiveRef ?? '')
                      return (
                        <div key={o.semanticId} style={{
                          display: 'grid', gridTemplateColumns: '1fr auto auto',
                          alignItems: 'center', gap: 12,
                          padding: '7px 12px', background: 'var(--surface-mid)',
                          border: '1px solid var(--border)', borderRadius: 'var(--radius-md)',
                        }}>
                          <span style={{ fontSize: 12, fontFamily: 'monospace', color: 'var(--text)' }}>
                            {o.semanticId}
                          </span>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                            {lightPrim && /^#/.test(lightPrim.value) && (
                              <div style={{ width: 12, height: 12, borderRadius: 2, background: lightPrim.value, border: '1px solid rgba(255,255,255,0.1)', flexShrink: 0 }} />
                            )}
                            <span style={{ fontSize: 10.5, fontFamily: 'monospace', color: 'var(--text-subtle)' }}>
                              {sem?.primitiveRef ?? '—'}
                            </span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                            <span style={{ fontSize: 12, color: 'var(--accent)' }}>→</span>
                            {/^#|^rgba/.test(o.value) && (
                              <div style={{ width: 12, height: 12, borderRadius: 2, background: o.value, border: '1px solid rgba(255,255,255,0.1)', flexShrink: 0 }} />
                            )}
                            <span style={{ fontSize: 10.5, fontFamily: 'monospace', color: 'var(--accent)' }}>
                              {o.primitiveRef}
                            </span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  )
}
