'use client'

import { getTheme } from '@/data/themes'
import { getPrimitive } from '@/data/primitives'
import { getSemanticToken, semanticTokens } from '@/data/semantic'
import { useDesignSystem } from '@/context/DesignSystemContext'

export function ThemeView({ id }: { id: string }) {
  const theme = getTheme(id)
  const { setActiveThemeId, activeTheme } = useDesignSystem()
  if (!theme) return null

  const isActive = activeTheme.id === id

  const overridesByGroup: Record<string, typeof theme.overrides> = {}
  theme.overrides.forEach(o => {
    const sem = getSemanticToken(o.semanticId)
    const group = sem?.group ?? 'other'
    if (!overridesByGroup[group]) overridesByGroup[group] = []
    overridesByGroup[group].push(o)
  })

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      <div style={{
        padding: '16px 24px 14px',
        borderBottom: '1px solid var(--border)',
        flexShrink: 0,
        background: 'var(--surface)',
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <div style={{
                width: 20, height: 20, borderRadius: 5,
                background: theme.accentColor, border: '1px solid rgba(255,255,255,0.1)',
              }} />
              <h1 style={{ fontSize: 18, fontWeight: 700, letterSpacing: '-0.02em' }}>
                {theme.name}
              </h1>
              <span className="chip default">{theme.overrides.length} overrides</span>
              {isActive && <span className="chip green">Active</span>}
            </div>
            <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>{theme.description}</p>
          </div>
          <button
            onClick={() => setActiveThemeId(id)}
            style={{
              padding: '7px 14px', borderRadius: 'var(--radius-md)',
              border: isActive ? 'none' : '1px solid var(--border)',
              background: isActive ? 'var(--green-subtle)' : 'var(--surface-mid)',
              color: isActive ? 'var(--green)' : 'var(--text)',
              fontSize: 12.5, fontWeight: 500, cursor: 'pointer',
              transition: 'all 100ms',
            }}
          >
            {isActive ? '✓ Active Theme' : 'Set Active'}
          </button>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px' }}>
        {theme.overrides.length === 0 ? (
          <div>
            <div style={{
              background: 'var(--surface-mid)', border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)', padding: '20px 20px',
              marginBottom: 20,
            }}>
              <div style={{ fontSize: 13, color: 'var(--text)', marginBottom: 6 }}>
                Base theme — no overrides
              </div>
              <p style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.6 }}>
                This is the default light theme. All semantic tokens resolve to their primitive definitions directly.
                Other themes override specific tokens to change the appearance.
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
              {semanticTokens.slice(0, 16).map(t => {
                const prim = getPrimitive(t.primitiveRef)
                return (
                  <div key={t.id} style={{
                    padding: '10px', background: 'var(--surface-mid)',
                    border: '1px solid var(--border)', borderRadius: 'var(--radius-md)',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                      {prim && /^#/.test(prim.value) && (
                        <div style={{ width: 12, height: 12, borderRadius: 2, background: prim.value, border: '1px solid rgba(255,255,255,0.1)', flexShrink: 0 }} />
                      )}
                      <span style={{ fontSize: 10, fontFamily: 'monospace', color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {t.name}
                      </span>
                    </div>
                    <div style={{ fontSize: 9.5, color: 'var(--text-subtle)', fontFamily: 'monospace' }}>
                      {t.primitiveRef}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Accent preview */}
            <div style={{
              background: `linear-gradient(135deg, ${theme.accentColor}22, ${theme.accentColor}08)`,
              border: `1px solid ${theme.accentColor}44`,
              borderRadius: 'var(--radius-xl)',
              padding: '20px',
              display: 'flex', alignItems: 'center', gap: 16,
            }}>
              <div style={{
                width: 48, height: 48, borderRadius: 12,
                background: theme.accentColor,
                border: '2px solid rgba(255,255,255,0.1)',
                boxShadow: `0 0 24px ${theme.accentColor}66`,
              }} />
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', marginBottom: 3 }}>
                  Accent: {theme.accentColor}
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                  {theme.overrides.length} semantic tokens overridden from light base
                </div>
              </div>
            </div>

            {/* Override table by group */}
            {Object.entries(overridesByGroup).map(([group, overrides]) => (
              <div key={group}>
                <div style={{
                  fontSize: 11, color: 'var(--text-subtle)', fontWeight: 600,
                  textTransform: 'capitalize', letterSpacing: '0.05em', marginBottom: 8,
                  display: 'flex', alignItems: 'center', gap: 6,
                }}>
                  <span style={{ textTransform: 'capitalize' }}>{group}</span>
                  <span className="chip default" style={{ fontSize: 9.5 }}>{overrides.length}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  {overrides.map(o => {
                    const sem = getSemanticToken(o.semanticId)
                    const lightPrim = getPrimitive(sem?.primitiveRef ?? '')
                    return (
                      <div key={o.semanticId} style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr auto auto',
                        alignItems: 'center',
                        gap: 12,
                        padding: '8px 12px',
                        background: 'var(--surface-mid)',
                        border: '1px solid var(--border)',
                        borderRadius: 'var(--radius-md)',
                      }}>
                        <span style={{ fontSize: 12, fontFamily: 'monospace', color: 'var(--text)' }}>
                          {o.semanticId}
                        </span>
                        {/* Light base value */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                          {lightPrim && /^#/.test(lightPrim.value) && (
                            <div style={{ width: 12, height: 12, borderRadius: 2, background: lightPrim.value, border: '1px solid rgba(255,255,255,0.1)', flexShrink: 0 }} />
                          )}
                          <span style={{ fontSize: 10.5, fontFamily: 'monospace', color: 'var(--text-subtle)' }}>
                            {sem?.primitiveRef ?? '—'}
                          </span>
                        </div>
                        {/* Arrow + override value */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                          <span style={{ fontSize: 12, color: 'var(--accent)' }}>→</span>
                          <div style={{ width: 12, height: 12, borderRadius: 2, background: o.value, border: '1px solid rgba(255,255,255,0.1)', flexShrink: 0 }} />
                          <span style={{ fontSize: 10.5, fontFamily: 'monospace', color: 'var(--accent)' }}>
                            {o.primitiveRef}
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
