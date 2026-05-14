'use client'

import { useDesignSystem } from '@/context/DesignSystemContext'
import {
  primitiveColors, primitiveSpacing, primitiveRadius,
  primitiveTypography, primitiveMotion, primitiveShadows,
} from '@/data/primitives'
import { semanticTokens } from '@/data/semantic'
import { componentDefs } from '@/data/components'
import type { PrimitiveToken } from '@/types'

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
      {copied ? '✓' : ''}{value}
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {Object.entries(groups).map(([group, toks]) => (
        <div key={group}>
          <div style={{
            fontSize: 11, color: 'var(--text-subtle)', fontWeight: 600,
            textTransform: 'capitalize', letterSpacing: '0.05em', marginBottom: 8,
          }}>
            {group}
          </div>
          <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
            {toks.map(t => {
              const used = whereUsed(t.id)
              const totalRefs = used.semantic.length + used.component.length
              return (
                <div key={t.id}>
                  <div
                    title={`${t.name} · ${t.value}${t.description ? '\n' + t.description : ''}${totalRefs > 0 ? '\nReferenced ' + totalRefs + ' times' : ''}`}
                    onClick={() => setSelected({ type: 'primitive', id: t.id })}
                    style={{
                      width: 36, height: 36, borderRadius: 6,
                      background: t.value,
                      border: '1px solid rgba(255,255,255,0.08)',
                      cursor: 'pointer',
                      position: 'relative',
                      transition: 'transform 100ms',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.1)')}
                    onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                  >
                    {totalRefs > 0 && (
                      <div style={{
                        position: 'absolute', top: -3, right: -3,
                        width: 12, height: 12, borderRadius: '50%',
                        background: 'var(--accent)', fontSize: 7.5, fontWeight: 700,
                        color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        border: '1.5px solid var(--bg)',
                      }}>
                        {totalRefs > 9 ? '9+' : totalRefs}
                      </div>
                    )}
                  </div>
                  <div style={{ fontSize: 8.5, color: 'var(--text-subtle)', marginTop: 3, textAlign: 'center', maxWidth: 36 }}>
                    {t.name.split('-')[1]}
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      {tokens.map(t => (
        <div key={t.id} style={{
          display: 'flex', alignItems: 'center', gap: 12,
          padding: '6px 10px', background: 'var(--surface-mid)',
          border: '1px solid var(--border)', borderRadius: 'var(--radius-md)',
        }}>
          <div style={{
            height: 16, width: parseInt(t.value) / 2 || 1,
            background: 'var(--accent)', borderRadius: 2,
            minWidth: 2, maxWidth: 100, flexShrink: 0,
          }} />
          <span style={{ fontSize: 12, fontFamily: 'monospace', color: 'var(--text)', minWidth: 80 }}>{t.name}</span>
          <span style={{ fontSize: 11.5, fontFamily: 'monospace', color: 'var(--text-muted)', minWidth: 40 }}>{t.value}</span>
          <CopyOnClick id={t.id} value={t.value} />
        </div>
      ))}
    </div>
  )
}

function RadiusGrid({ tokens }: { tokens: PrimitiveToken[] }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
      {tokens.map(t => (
        <div key={t.id} style={{
          display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center',
        }}>
          <div style={{
            width: 48, height: 48,
            background: 'var(--accent-subtle)',
            border: '2px solid var(--accent)',
            borderRadius: t.value,
          }} />
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--text)' }}>{t.name}</div>
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div>
        <div style={{ fontSize: 10, color: 'var(--text-subtle)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, marginBottom: 10 }}>
          Type Scale
        </div>
        {sizes.map(t => {
          const [size] = t.value.split('/')
          return (
            <div key={t.id} style={{
              display: 'flex', alignItems: 'baseline', gap: 12,
              padding: '8px 0', borderBottom: '1px solid var(--border)',
            }}>
              <span style={{ fontSize: parseInt(size), lineHeight: 1, color: 'var(--text)', minWidth: 120 }}>
                {t.name}
              </span>
              <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--text-muted)' }}>{t.value}</span>
              <CopyOnClick id={t.id} value={size} />
            </div>
          )
        })}
      </div>
      <div>
        <div style={{ fontSize: 10, color: 'var(--text-subtle)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, marginBottom: 10 }}>
          Font Weight
        </div>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {fonts.map(t => (
            <div key={t.id} style={{
              padding: '10px 14px', background: 'var(--surface-mid)',
              border: '1px solid var(--border)', borderRadius: 'var(--radius-md)',
            }}>
              <div style={{ fontSize: 16, fontWeight: parseInt(t.value), color: 'var(--text)', marginBottom: 4 }}>
                Aa
              </div>
              <div style={{ fontSize: 10.5, fontFamily: 'monospace', color: 'var(--text-muted)' }}>{t.name}</div>
              <div style={{ fontSize: 10, color: 'var(--text-subtle)' }}>{t.value}</div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <div style={{ fontSize: 10, color: 'var(--text-subtle)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, marginBottom: 10 }}>
          Font Families
        </div>
        {families.map(t => (
          <div key={t.id} style={{
            padding: '10px 12px', background: 'var(--surface-mid)',
            border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', marginBottom: 6,
          }}>
            <div style={{ fontSize: 12, fontFamily: t.id.includes('mono') ? 'monospace' : 'sans-serif', marginBottom: 3 }}>
              The quick brown fox jumped.
            </div>
            <div style={{ fontSize: 10.5, fontFamily: 'monospace', color: 'var(--text-muted)' }}>{t.name}</div>
            <div style={{ fontSize: 10, color: 'var(--text-subtle)' }}>{t.value}</div>
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div>
        <div style={{ fontSize: 10, color: 'var(--text-subtle)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, marginBottom: 8 }}>
          Duration
        </div>
        {durations.map(t => (
          <div key={t.id} style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '7px 10px', background: 'var(--surface-mid)',
            border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', marginBottom: 4,
          }}>
            <div style={{
              height: 3, background: 'var(--accent)', borderRadius: 2,
              width: `${Math.min(parseInt(t.value) / 5, 100)}px`, minWidth: 4,
              transition: `width ${t.value}`,
            }} />
            <span style={{ fontSize: 12, fontFamily: 'monospace', color: 'var(--text)', minWidth: 100 }}>{t.name}</span>
            <span style={{ fontSize: 11.5, fontFamily: 'monospace', color: 'var(--text-muted)' }}>{t.value}</span>
            <CopyOnClick id={t.id} value={t.value} />
          </div>
        ))}
      </div>
      <div>
        <div style={{ fontSize: 10, color: 'var(--text-subtle)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, marginBottom: 8 }}>
          Easing
        </div>
        {easings.map(t => (
          <div key={t.id} style={{
            padding: '8px 12px', background: 'var(--surface-mid)',
            border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', marginBottom: 4,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
              <span style={{ fontSize: 12, fontFamily: 'monospace', color: 'var(--text)' }}>{t.name}</span>
              <CopyOnClick id={t.id} value={t.value} />
            </div>
            <div style={{ fontSize: 10.5, fontFamily: 'monospace', color: 'var(--text-subtle)' }}>{t.value}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function FoundationsView({ category }: { category: string }) {
  const titles: Record<string, string> = {
    color: 'Colors', spacing: 'Spacing', typography: 'Typography',
    radius: 'Border Radius', motion: 'Motion', shadow: 'Shadows',
  }

  const content: Record<string, React.ReactNode> = {
    color:      <ColorGrid tokens={primitiveColors} />,
    spacing:    <SpacingGrid tokens={primitiveSpacing} />,
    typography: <TypographyList tokens={primitiveTypography} />,
    radius:     <RadiusGrid tokens={primitiveRadius} />,
    motion:     <MotionList tokens={primitiveMotion} />,
    shadow:     <SpacingGrid tokens={primitiveShadows} />,
  }

  const counts: Record<string, number> = {
    color: primitiveColors.length,
    spacing: primitiveSpacing.length,
    typography: primitiveTypography.length,
    radius: primitiveRadius.length,
    motion: primitiveMotion.length,
    shadow: primitiveShadows.length,
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
          <h1 style={{ fontSize: 18, fontWeight: 700, letterSpacing: '-0.02em' }}>
            {titles[category] ?? category}
          </h1>
          <span className="chip default">{counts[category]} tokens</span>
          <span className="chip accent">Primitive</span>
        </div>
        <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>
          Raw values — the source primitives that semantic tokens reference.
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
