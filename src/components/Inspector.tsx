'use client'

import { useDesignSystem } from '@/context/DesignSystemContext'
import { getComponent, componentDefs } from '@/data/components'
import { getPrimitive } from '@/data/primitives'
import { semanticTokens } from '@/data/semantic'
import { getPattern } from '@/data/patterns'
import { getTheme } from '@/data/themes'
import { getBestProfilesForComponent, getProfilesCompatibleWithComponent, getStyleForTheme } from '@/data/interactionStyles'
import { Check, Fingerprint } from 'lucide-react'

function CopyPill({ id, value }: { id: string; value: string }) {
  const { copiedId, copyValue } = useDesignSystem()
  const copied = copiedId === id
  return (
    <button
      className={`value-pill ${copied ? 'copied' : ''}`}
      onClick={() => copyValue(id, value)}
      title="Click to copy"
    >
      {copied ? <Check size={9} style={{ display: 'inline', marginRight: 3 }} /> : null}
      {value}
    </button>
  )
}

function WhereUsed({ semanticId }: { semanticId: string }) {
  const usedBy = componentDefs.filter(c =>
    c.tokenDeps.some(d => d.semanticRef === semanticId)
  )
  if (usedBy.length === 0) return <span style={{ color: 'var(--text-subtle)', fontSize: 11 }}>Not referenced</span>

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
      {usedBy.map(c => (
        <span key={c.id} className="chip default">{c.name}</span>
      ))}
    </div>
  )
}

function ComponentInspector({ id }: { id: string }) {
  const comp = getComponent(id)
  const { activeTheme } = useDesignSystem()
  if (!comp) return null

  function resolveDepValue(semanticRef: string, primitiveRef: string, fallback: string) {
    const override = activeTheme.overrides.find(o => o.semanticId === semanticRef)
    if (override) return override.value
    const prim = getPrimitive(primitiveRef)
    return prim?.value ?? fallback
  }

  const passCount = comp.accessibility.filter(a => a.passes).length

  return (
    <div>
      <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--border)' }}>
        <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 3 }}>{comp.name}</div>
        <div style={{ fontSize: 11.5, color: 'var(--text-muted)', lineHeight: 1.5 }}>{comp.description}</div>
      </div>

      <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border)' }}>
        <div className="inspector-label">Category</div>
        <span className="chip accent">{comp.category}</span>
      </div>

      <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border)' }}>
        <div className="inspector-label">Variants</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          {comp.variants.map(v => (
            <span key={v} className="chip default">{v}</span>
          ))}
        </div>
      </div>

      <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border)' }}>
        <div className="inspector-label">Token Dependencies</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {comp.tokenDeps.map(dep => {
            const resolvedValue = resolveDepValue(dep.semanticRef, dep.primitiveRef, dep.currentValue)
            return (
            <div key={dep.tokenId} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '5px 8px',
              background: 'var(--surface-mid)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border)',
            }}>
              <div>
                <div style={{ fontSize: 10.5, color: 'var(--text-muted)' }}>{dep.label}</div>
                <div style={{
                  fontSize: 11, fontFamily: 'JetBrains Mono, monospace',
                  color: 'var(--accent)', letterSpacing: '-0.01em',
                }}>
                  {dep.tokenId}
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                {resolvedValue !== 'transparent' && (
                  <div style={{
                    width: 12, height: 12, borderRadius: 3,
                    background: resolvedValue,
                    border: '1px solid rgba(255,255,255,0.1)',
                    flexShrink: 0,
                  }} />
                )}
                <CopyPill id={dep.tokenId} value={resolvedValue} />
              </div>
            </div>
            )
          })}
        </div>
      </div>

      <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border)' }}>
        <div className="inspector-label">Accessibility</div>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8,
        }}>
          <span className={`status-dot ${passCount === comp.accessibility.length ? 'pass' : 'warn'}`} />
          <span style={{ fontSize: 11.5 }}>
            {passCount}/{comp.accessibility.length} rules pass
          </span>
        </div>
        {comp.contrast && (
          <div style={{
            background: 'var(--surface-mid)', border: '1px solid var(--border)',
            borderRadius: 'var(--radius-md)', padding: '8px 10px', marginBottom: 6,
          }}>
            <div style={{ fontSize: 10, color: 'var(--text-subtle)', marginBottom: 4 }}>CONTRAST RATIO</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{
                fontSize: 18, fontWeight: 700,
                color: comp.contrast.level === 'AAA' ? 'var(--green)' : comp.contrast.level === 'AA' ? 'var(--yellow)' : 'var(--red)',
              }}>
                {comp.contrast.ratio}:1
              </span>
              <span className={`chip ${comp.contrast.level === 'AAA' ? 'green' : comp.contrast.level === 'AA' || comp.contrast.level === 'AA Large' ? 'yellow' : 'red'}`}>
                WCAG {comp.contrast.level}
              </span>
            </div>
            <div style={{ display: 'flex', gap: 4, marginTop: 6 }}>
              <div style={{ width: 14, height: 14, borderRadius: 3, background: comp.contrast.foreground, border: '1px solid rgba(255,255,255,0.1)' }} />
              <span style={{ fontSize: 10, color: 'var(--text-subtle)', fontFamily: 'monospace' }}>{comp.contrast.foreground}</span>
              <span style={{ fontSize: 10, color: 'var(--text-subtle)' }}>on</span>
              <div style={{ width: 14, height: 14, borderRadius: 3, background: comp.contrast.background, border: '1px solid rgba(255,255,255,0.1)' }} />
              <span style={{ fontSize: 10, color: 'var(--text-subtle)', fontFamily: 'monospace' }}>{comp.contrast.background}</span>
            </div>
          </div>
        )}
      </div>

      <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border)' }}>
        <div className="inspector-label" style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 8 }}>
          <Fingerprint size={10} />
          Behavioral Profile Compatibility
        </div>
        {(() => {
          const activeStyle = getStyleForTheme(activeTheme.id)
          const bestProfiles = getBestProfilesForComponent(id)
          const compatibleProfiles = getProfilesCompatibleWithComponent(id)
          const incompatibleCount = 7 - compatibleProfiles.length

          return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {activeStyle && (
                <div style={{
                  padding: '7px 10px',
                  background: 'var(--surface-mid)',
                  border: `1px solid ${activeStyle.color}40`,
                  borderRadius: 'var(--radius-md)',
                  borderLeft: `3px solid ${activeStyle.color}`,
                }}>
                  <div style={{ fontSize: 10, color: 'var(--text-subtle)', marginBottom: 3 }}>ACTIVE THEME PROFILE</div>
                  <div style={{ fontSize: 11.5, fontWeight: 600, color: activeStyle.color }}>{activeStyle.name}</div>
                  <div style={{ fontSize: 10.5, color: 'var(--text-muted)', marginTop: 2 }}>{activeStyle.tagline}</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3, marginTop: 5 }}>
                    {activeStyle.emotionalTone.map(t => (
                      <span key={t} style={{
                        fontSize: 9.5, padding: '1px 5px',
                        background: `${activeStyle.color}20`,
                        color: activeStyle.color,
                        borderRadius: 3,
                        border: `1px solid ${activeStyle.color}30`,
                      }}>{t}</span>
                    ))}
                  </div>
                </div>
              )}

              {bestProfiles.length > 0 && (
                <div>
                  <div style={{ fontSize: 9.5, color: 'var(--text-subtle)', marginBottom: 4, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    Best with
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                    {bestProfiles.map(p => (
                      <span key={p.id} style={{
                        fontSize: 10.5, padding: '2px 7px',
                        background: `${p.color}15`,
                        color: p.color,
                        border: `1px solid ${p.color}35`,
                        borderRadius: 4,
                        fontWeight: 500,
                      }}>{p.name}</span>
                    ))}
                  </div>
                </div>
              )}

              {incompatibleCount > 0 && (
                <div style={{ fontSize: 10.5, color: 'var(--text-subtle)' }}>
                  <span style={{ color: 'var(--red)', fontWeight: 600 }}>{incompatibleCount}</span> profile{incompatibleCount > 1 ? 's' : ''} avoid this component
                </div>
              )}
            </div>
          )
        })()}
      </div>

      <div style={{ padding: '12px 16px' }}>
        <div className="inspector-label">AI Semantic Intent</div>
        <p style={{ fontSize: 11.5, color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 8, fontStyle: 'italic' }}>
          &ldquo;{comp.aiRules.semanticIntent}&rdquo;
        </p>
        <div className="inspector-label">Max per screen</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          {Object.entries(comp.aiRules.maxPerScreen ?? {}).map(([k, v]) => (
            <div key={k} style={{
              fontSize: 11, background: 'var(--surface-mid)', border: '1px solid var(--border)',
              borderRadius: 'var(--radius-sm)', padding: '2px 7px',
              display: 'flex', gap: 4, alignItems: 'center',
            }}>
              <span style={{ color: 'var(--text-muted)' }}>{k}</span>
              <span style={{ fontWeight: 600, color: 'var(--accent)' }}>{v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function SemanticInspector({ group }: { group: string }) {
  const tokens = semanticTokens.filter(t => t.group === group)
  const { activeTheme } = useDesignSystem()
  return (
    <div>
      <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--border)' }}>
        <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 3, textTransform: 'capitalize' }}>
          {group}
        </div>
        <div style={{ fontSize: 11.5, color: 'var(--text-muted)' }}>
          {tokens.length} semantic tokens
        </div>
      </div>
      {tokens.slice(0, 6).map(t => {
        const override = activeTheme.overrides.find(o => o.semanticId === t.id)
        const prim = getPrimitive(override ? override.primitiveRef : t.primitiveRef)
        return (
          <div key={t.id} style={{ padding: '10px 16px', borderBottom: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              {prim && /^#/.test(prim.value) && (
                <div style={{
                  width: 14, height: 14, borderRadius: 3,
                  background: prim.value, border: '1px solid rgba(255,255,255,0.1)', flexShrink: 0,
                }} />
              )}
              <span style={{ fontSize: 11.5, fontFamily: 'monospace', color: 'var(--accent)' }}>{t.name}</span>
            </div>
            <div style={{ fontSize: 10.5, color: 'var(--text-subtle)', marginBottom: 4 }}>{t.description}</div>
            <div style={{ fontSize: 10, color: 'var(--text-subtle)', marginBottom: 4 }}>
              Primitive: <span style={{ fontFamily: 'monospace', color: 'var(--text-muted)' }}>{override?.primitiveRef ?? t.primitiveRef}</span>
            </div>
            <WhereUsed semanticId={t.id} />
          </div>
        )
      })}
    </div>
  )
}

function PatternInspector({ id }: { id: string }) {
  const pattern = getPattern(id)
  if (!pattern) return null
  return (
    <div>
      <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--border)' }}>
        <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 3 }}>{pattern.name}</div>
        <div style={{ fontSize: 11.5, color: 'var(--text-muted)' }}>{pattern.description}</div>
      </div>
      <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border)' }}>
        <div className="inspector-label">Semantic Purpose</div>
        <p style={{ fontSize: 11.5, color: 'var(--text-muted)', lineHeight: 1.5, fontStyle: 'italic' }}>
          &ldquo;{pattern.semanticPurpose}&rdquo;
        </p>
      </div>
      <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border)' }}>
        <div className="inspector-label">Uses Components</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          {pattern.components.map(c => (
            <span key={c} className="chip accent" style={{ textTransform: 'capitalize' }}>{c}</span>
          ))}
        </div>
      </div>
      <div style={{ padding: '12px 16px' }}>
        <div className="inspector-label">AI Constraints ({pattern.aiConstraints.length})</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {pattern.aiConstraints.map((rule, i) => (
            <div key={i} style={{
              display: 'flex', gap: 8, alignItems: 'flex-start',
              padding: '6px 8px', background: 'var(--surface-mid)',
              border: '1px solid var(--border)', borderRadius: 'var(--radius-md)',
            }}>
              <span className="status-dot pass" style={{ marginTop: 4 }} />
              <span style={{ fontSize: 11.5, lineHeight: 1.5, color: 'var(--text-muted)' }}>{rule}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function ThemeInspector({ id }: { id: string }) {
  const theme = getTheme(id)
  if (!theme) return null
  return (
    <div>
      <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--border)' }}>
        <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 3 }}>{theme.name}</div>
        <div style={{ fontSize: 11.5, color: 'var(--text-muted)' }}>{theme.description}</div>
      </div>
      <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border)' }}>
        <div className="inspector-label">Accent Color</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 20, height: 20, borderRadius: 4, background: theme.accentColor, border: '1px solid rgba(255,255,255,0.1)' }} />
          <span style={{ fontSize: 11.5, fontFamily: 'monospace', color: 'var(--text-muted)' }}>{theme.accentColor}</span>
        </div>
      </div>
      <div style={{ padding: '12px 16px' }}>
        <div className="inspector-label">Token Overrides ({theme.overrides.length})</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {theme.overrides.map(o => (
            <div key={o.semanticId} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '5px 8px', background: 'var(--surface-mid)',
              border: '1px solid var(--border)', borderRadius: 'var(--radius-md)',
            }}>
              <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--text)' }}>{o.semanticId}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <div style={{ width: 12, height: 12, borderRadius: 2, background: o.value, border: '1px solid rgba(255,255,255,0.1)' }} />
                <span style={{ fontSize: 10, fontFamily: 'monospace', color: 'var(--text-muted)' }}>{o.primitiveRef}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function Inspector() {
  const { selected } = useDesignSystem()

  return (
    <aside style={{
      width: 280,
      minWidth: 280,
      background: 'var(--surface)',
      borderLeft: '1px solid var(--border)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      flexShrink: 0,
    }}>
      <div style={{
        padding: '10px 16px',
        borderBottom: '1px solid var(--border)',
        fontSize: 10,
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        color: 'var(--text-subtle)',
        flexShrink: 0,
      }}>
        Inspector
      </div>

      <div style={{ flex: 1, overflowY: 'auto' }}>
        {!selected && (
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            height: 200, color: 'var(--text-subtle)', fontSize: 12,
          }}>
            Select an item to inspect
          </div>
        )}
        {selected?.type === 'component' && <ComponentInspector id={selected.id} />}
        {selected?.type === 'semantic' && <SemanticInspector group={selected.id} />}
        {selected?.type === 'pattern' && <PatternInspector id={selected.id} />}
        {selected?.type === 'theme' && <ThemeInspector id={selected.id} />}
      </div>
    </aside>
  )
}
