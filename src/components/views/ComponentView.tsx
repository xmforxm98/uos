'use client'

import { useState } from 'react'
import { CheckCircle, XCircle, ChevronRight, Copy, Check, MousePointer2 } from 'lucide-react'
import { ComponentPreview } from '@/components/ComponentPreview'
import { TokenChain } from '@/components/TokenChain'
import { useDesignSystem } from '@/context/DesignSystemContext'
import { getComponent } from '@/data/components'
import { getProfileForTheme, getInteractionToken, interactionProfiles } from '@/data/interactions'
import { interactionStyles, getStyleForTheme } from '@/data/interactionStyles'
import { ToggleStyleGallery } from '@/components/styleVariants/ToggleVariants'

const TABS = ['Preview', 'Token Deps', 'Accessibility', 'AI Rules', 'Interaction', 'Styles', 'Code'] as const
type Tab = typeof TABS[number]

function CodeBlock({ code }: { code: string }) {
  const { copiedId, copyValue } = useDesignSystem()
  const id = 'code-block'
  const copied = copiedId === id

  const highlighted = code
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/('.*?')/g, '<span style="color:#98c379">$1</span>')
    .replace(/(".*?")/g, '<span style="color:#98c379">$1</span>')
    .replace(/\b(import|from|const|export|function|return|async|await|true|false|null|undefined)\b/g, '<span style="color:#c678dd">$1</span>')
    .replace(/(&lt;\/?[A-Z][a-zA-Z]*)/g, '<span style="color:#61afef">$1</span>')
    .replace(/(&lt;\/[a-z]+&gt;|&lt;[a-z]+)/g, '<span style="color:#e06c75">$1</span>')
    .replace(/(\/\/.*)/g, '<span style="color:#5c6370">$1</span>')

  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={() => copyValue(id, code)}
        style={{
          position: 'absolute', top: 10, right: 10, zIndex: 1,
          background: copied ? 'var(--green-subtle)' : 'var(--surface-high)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-md)',
          padding: '4px 8px', cursor: 'pointer',
          color: copied ? 'var(--green)' : 'var(--text-muted)',
          fontSize: 11, display: 'flex', gap: 4, alignItems: 'center',
          transition: 'all 100ms',
        }}
      >
        {copied ? <Check size={10} /> : <Copy size={10} />}
        {copied ? 'Copied' : 'Copy'}
      </button>
      <div
        className="code-block"
        dangerouslySetInnerHTML={{ __html: highlighted }}
      />
    </div>
  )
}

// ─── Interaction Tab ──────────────────────────────────────────────────────────

function LiveMotionDemo({ tokenId, label }: { tokenId: string; label: string }) {
  const [active, setActive] = useState(false)
  const [pressed, setPressed] = useState(false)
  const token = getInteractionToken(tokenId)
  if (!token) return null

  const isActive = tokenId.includes('press') ? pressed : active

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'center' }}>
      <div style={{ fontSize: 9.5, color: 'var(--text-subtle)', textTransform: 'uppercase', letterSpacing: '0.07em', fontWeight: 600 }}>
        {label}
      </div>
      <div
        onMouseEnter={() => setActive(true)}
        onMouseLeave={() => { setActive(false); setPressed(false) }}
        onMouseDown={() => setPressed(true)}
        onMouseUp={() => setPressed(false)}
        style={{
          width: 56,
          height: 36,
          borderRadius: 8,
          background: isActive ? 'var(--accent)' : 'var(--surface-high)',
          border: `1.5px solid ${isActive ? 'var(--accent)' : 'var(--border-mid)'}`,
          cursor: 'pointer',
          transition: token.cssTransition ?? 'all 100ms',
          transform: isActive && token.cssTransform ? token.cssTransform : 'none',
          opacity: tokenId === 'motion/fade-in' ? (isActive ? 1 : 0.2) : 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          userSelect: 'none',
        }}
        title={`${label}: ${token.id}`}
      >
        <div style={{
          width: 16, height: 16, borderRadius: 4,
          background: isActive ? 'rgba(255,255,255,0.35)' : 'var(--border-mid)',
          transition: 'inherit',
          flexShrink: 0,
        }} />
      </div>
      <code style={{ fontSize: 9.5, color: 'var(--text-subtle)', fontFamily: 'monospace', textAlign: 'center', maxWidth: 80, wordBreak: 'break-all' }}>
        {tokenId.replace('motion/', '').replace('feedback/', '').replace('density/', '')}
      </code>
    </div>
  )
}

function InteractionTab({ componentId: _componentId }: { componentId: string }) {
  const { activeTheme } = useDesignSystem()
  const profile = getProfileForTheme(activeTheme.id)

  if (!profile) {
    return <div style={{ color: 'var(--text-muted)', fontSize: 13 }}>No interaction profile for theme {activeTheme.id}</div>
  }

  const tokenRows: { label: string; tokenId: string; description: string }[] = [
    { label: 'Hover', tokenId: profile.hoverToken, description: 'Applied on :hover — defines how the element responds to cursor proximity.' },
    { label: 'Press', tokenId: profile.pressToken, description: 'Applied on :active/:mousedown — physical confirmation of click.' },
    { label: 'Enter', tokenId: profile.enterToken, description: 'Applied when element enters viewport / mounts — entrance animation.' },
    { label: 'Exit',  tokenId: profile.exitToken,  description: 'Applied when element leaves / unmounts — exit animation.' },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Profile banner */}
      <div style={{
        background: `${profile.color}12`,
        border: `1.5px solid ${profile.color}40`,
        borderRadius: 'var(--radius-lg)',
        padding: '16px 18px',
        display: 'flex', alignItems: 'flex-start', gap: 14,
      }}>
        <MousePointer2 size={20} color={profile.color} style={{ flexShrink: 0, marginTop: 2 }} />
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5 }}>
            <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.01em' }}>
              {profile.name} Profile
            </span>
            <span style={{
              fontSize: 10, fontWeight: 600, padding: '2px 8px', borderRadius: 99,
              background: `${profile.color}18`, color: profile.color,
            }}>
              {activeTheme.name}
            </span>
          </div>
          <p style={{ fontSize: 12.5, color: 'var(--text-muted)', marginBottom: 8, lineHeight: 1.6 }}>
            <em style={{ color: 'var(--text)' }}>&ldquo;{profile.tagline}&rdquo;</em> — {profile.persona}
          </p>
          <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
            <span className="chip default">{profile.motion} motion</span>
            <span className="chip default">{profile.density} density</span>
            <span className="chip default">{profile.gestureModel}</span>
          </div>
        </div>
      </div>

      {/* Live demo row */}
      <div>
        <div style={{ fontSize: 11, color: 'var(--text-subtle)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 14 }}>
          Live Demos — hover / click each box
        </div>
        <div style={{
          display: 'flex', gap: 20, flexWrap: 'wrap',
          padding: '20px 24px',
          background: 'var(--surface-mid)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)',
          alignItems: 'flex-end',
        }}>
          {tokenRows.map(row => (
            <LiveMotionDemo key={row.label} tokenId={row.tokenId} label={row.label} />
          ))}
        </div>
      </div>

      {/* Token breakdown table */}
      <div>
        <div style={{ fontSize: 11, color: 'var(--text-subtle)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>
          Token Breakdown
        </div>
        <div style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
          {/* Header */}
          <div style={{
            display: 'grid', gridTemplateColumns: '70px 180px 1fr',
            background: 'var(--surface-mid)', borderBottom: '1px solid var(--border)',
            padding: '8px 14px', gap: 12,
          }}>
            {['State', 'Token', 'CSS Value'].map(h => (
              <div key={h} style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-subtle)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>
                {h}
              </div>
            ))}
          </div>
          {tokenRows.map((row, i) => {
            const token = getInteractionToken(row.tokenId)
            return (
              <div key={row.label} style={{
                display: 'grid', gridTemplateColumns: '70px 180px 1fr',
                padding: '10px 14px', gap: 12,
                borderBottom: i < tokenRows.length - 1 ? '1px solid var(--border)' : 'none',
                background: i % 2 === 0 ? 'transparent' : 'var(--surface-mid)',
                alignItems: 'start',
              }}>
                <div style={{
                  fontSize: 11.5, fontWeight: 600, color: 'var(--text)',
                  padding: '2px 0',
                }}>
                  {row.label}
                </div>
                <code style={{
                  fontSize: 11.5, fontFamily: 'monospace', color: profile.color,
                  background: `${profile.color}10`, padding: '2px 8px', borderRadius: 4,
                  alignSelf: 'start',
                }}>
                  {row.tokenId}
                </code>
                <div>
                  {token?.cssTransition && (
                    <code style={{ fontSize: 10.5, fontFamily: 'monospace', color: 'var(--text-muted)', display: 'block' }}>
                      transition: {token.cssTransition}
                    </code>
                  )}
                  {token?.cssTransform && (
                    <code style={{ fontSize: 10.5, fontFamily: 'monospace', color: 'var(--green)', display: 'block', marginTop: 2 }}>
                      transform: {token.cssTransform}
                    </code>
                  )}
                  {!token?.cssTransition && !token?.cssTransform && (
                    <span style={{ fontSize: 11, color: 'var(--text-subtle)' }}>
                      {token?.description ?? '—'}
                    </span>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* All profiles reference */}
      <div>
        <div style={{ fontSize: 11, color: 'var(--text-subtle)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>
          All Profiles — switch theme to change
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {interactionProfiles.map(p => (
            <div key={p.id} style={{
              flex: 1,
              padding: '12px 14px',
              background: p.id === profile.id ? `${p.color}12` : 'var(--surface-mid)',
              border: `1.5px solid ${p.id === profile.id ? p.color + '50' : 'var(--border)'}`,
              borderRadius: 'var(--radius-lg)',
              opacity: p.id === profile.id ? 1 : 0.6,
              transition: 'all 120ms',
            }}>
              <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 4 }}>
                <div style={{ width: 7, height: 7, borderRadius: '50%', background: p.color }} />
                <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)' }}>{p.name}</span>
                {p.id === profile.id && <span style={{ fontSize: 9, color: p.color, fontWeight: 600 }}>ACTIVE</span>}
              </div>
              <div style={{ fontSize: 10.5, color: 'var(--text-muted)' }}>{p.persona.split('·')[0].trim()}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Styles Tab ───────────────────────────────────────────────────────────────

function StylesTab({ componentId }: { componentId: string }) {
  const { activeTheme } = useDesignSystem()
  const activeStyle = getStyleForTheme(activeTheme.id)

  const isToggle = componentId === 'toggle'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Active style banner */}
      <div style={{
        padding: '14px 16px',
        background: activeStyle ? `${activeStyle.color}10` : 'var(--surface-mid)',
        border: `1.5px solid ${activeStyle ? activeStyle.color + '40' : 'var(--border)'}`,
        borderRadius: 'var(--radius-lg)',
        display: 'flex', alignItems: 'center', gap: 12,
      }}>
        {activeStyle ? (
          <>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: activeStyle.color, flexShrink: 0, boxShadow: `0 0 8px ${activeStyle.color}60` }} />
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 2 }}>
                Active Style: <span style={{ color: activeStyle.color }}>{activeStyle.name}</span>
                <span style={{ fontWeight: 400, color: 'var(--text-muted)', marginLeft: 8, fontSize: 12 }}>via {activeTheme.name} theme</span>
              </div>
              <div style={{ fontSize: 11.5, color: 'var(--text-muted)', fontStyle: 'italic' }}>
                &ldquo;{activeStyle.tagline}&rdquo;
              </div>
            </div>
          </>
        ) : (
          <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
            No interaction style assigned to <strong>{activeTheme.name}</strong> theme yet.
            Switch to Brand A or Brand B to see style assignment.
          </div>
        )}
      </div>

      {/* Style compatibility matrix */}
      <div>
        <div style={{ fontSize: 11, color: 'var(--text-subtle)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>
          All Interaction Styles — compatibility matrix
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {interactionStyles.map(style => {
            const isActive = activeStyle?.id === style.id
            return (
              <div key={style.id} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '10px 14px',
                background: isActive ? `${style.color}0e` : 'var(--surface-mid)',
                border: `1.5px solid ${isActive ? style.color + '50' : 'var(--border)'}`,
                borderRadius: 'var(--radius-md)',
                borderLeft: `3px solid ${style.color}`,
              }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: style.color, flexShrink: 0 }} />
                <span style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--text)', width: 110 }}>{style.name}</span>
                <div style={{ display: 'flex', gap: 5, flex: 1, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 10, padding: '1px 6px', borderRadius: 99, background: 'var(--surface-high)', color: 'var(--text-muted)', fontFamily: 'monospace' }}>
                    {style.animationIntensity}
                  </span>
                  <span style={{ fontSize: 10, padding: '1px 6px', borderRadius: 99, background: 'var(--surface-high)', color: 'var(--text-muted)' }}>
                    {style.decoration} deco
                  </span>
                  <span style={{ fontSize: 10, padding: '1px 6px', borderRadius: 99, background: 'var(--surface-high)', color: 'var(--text-muted)' }}>
                    {style.feedback}
                  </span>
                </div>
                {isActive && (
                  <span style={{ fontSize: 9.5, fontWeight: 700, color: style.color, background: `${style.color}15`, padding: '2px 8px', borderRadius: 99 }}>
                    ACTIVE
                  </span>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Toggle: full live gallery */}
      {isToggle && (
        <div>
          <div style={{ fontSize: 11, color: 'var(--text-subtle)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>
            Toggle · Live Style Variants · click to interact
          </div>
          <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 14, lineHeight: 1.6 }}>
            Same component, 6 behavioral identities. Motion, decoration, and personality change entirely based on the active Interaction Style.
          </p>
          <ToggleStyleGallery />
        </div>
      )}

      {!isToggle && (
        <div style={{
          padding: '16px',
          background: 'var(--surface-mid)', border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)',
          fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.6,
        }}>
          💡 Full style variant gallery available for <strong>Toggle</strong> — the reference component for behavioral identity.
          More components (Button, Input, Card) will follow as the system evolves.
          See <strong>Interaction Styles → Gallery</strong> in the sidebar for the full showcase.
        </div>
      )}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────

export function ComponentView({ id }: { id: string }) {
  const [tab, setTab] = useState<Tab>('Preview')
  const component = getComponent(id)

  if (!component) {
    return (
      <div style={{ padding: 32, color: 'var(--text-muted)' }}>
        Component not found: {id}
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{
        padding: '16px 24px 14px',
        borderBottom: '1px solid var(--border)',
        flexShrink: 0,
        background: 'var(--surface)',
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <h1 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.02em' }}>
                {component.name}
              </h1>
              <span className="chip accent">{component.category}</span>
              {component.contrast && (
                <span className={`chip ${component.contrast.level === 'AAA' ? 'green' : 'yellow'}`}>
                  WCAG {component.contrast.level}
                </span>
              )}
            </div>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', maxWidth: 520, lineHeight: 1.6 }}>
              {component.description}
            </p>
          </div>
          <div style={{ display: 'flex', gap: 4, flexShrink: 0 }}>
            {component.states.map(s => (
              <span key={s.name} className="chip default" title={s.description}>
                {s.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="tab-bar">
        {TABS.map(t => (
          <button key={t} className={`tab ${tab === t ? 'active' : ''}`} onClick={() => setTab(t)}>
            {t}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px' }}>
        {tab === 'Preview' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
            {/* Live interactive preview */}
            <div>
              <div style={{ fontSize: 11, color: 'var(--text-subtle)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>
                Live Preview · hover, focus, click to interact
              </div>
              <ComponentPreview component={component} />
            </div>

            {/* States / Variants table */}
            <div>
              <div style={{ fontSize: 11, color: 'var(--text-subtle)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>
                States & Variants
              </div>
              <div style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
                {/* Header */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '130px 1fr 1fr 1fr',
                  background: 'var(--surface-mid)',
                  borderBottom: '1px solid var(--border)',
                  padding: '8px 14px',
                  gap: 12,
                }}>
                  {['State', 'Description', 'Trigger', 'Token change'].map(h => (
                    <div key={h} style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-subtle)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>{h}</div>
                  ))}
                </div>
                {/* Rows */}
                {component.states.map((s, i) => {
                  const stateColors: Record<string, string> = {
                    default: 'var(--text)',
                    hover: 'var(--accent)',
                    active: 'var(--accent)',
                    focus: 'var(--yellow)',
                    disabled: 'var(--text-subtle)',
                    loading: 'var(--purple)',
                    error: 'var(--red)',
                    success: 'var(--green)',
                    checked: 'var(--green)',
                    indeterminate: 'var(--yellow)',
                  }
                  const stateTriggers: Record<string, string> = {
                    default: 'Initial / resting',
                    hover: ':hover — mouse over',
                    active: ':active — mouse down',
                    focus: ':focus-visible — keyboard nav',
                    disabled: '[disabled] attribute',
                    loading: 'async operation',
                    error: 'validation fail',
                    success: 'validation pass',
                    checked: '[checked] state',
                    indeterminate: 'partial selection',
                  }
                  const stateTokens: Record<string, string> = {
                    default: 'bg/brand → accent',
                    hover: 'bg/brand → accent-hover',
                    active: 'transform: scale(0.97)',
                    focus: 'box-shadow: focus-ring',
                    disabled: 'opacity: 0.45',
                    loading: 'pointer-events: none',
                    error: 'border → red, bg → red-subtle',
                    success: 'border → green',
                    checked: 'bg → accent',
                    indeterminate: 'bg → surface-high',
                  }
                  const dotColor = stateColors[s.name] ?? 'var(--text-muted)'
                  return (
                    <div key={s.name} style={{
                      display: 'grid',
                      gridTemplateColumns: '130px 1fr 1fr 1fr',
                      padding: '10px 14px', gap: 12,
                      borderBottom: i < component.states.length - 1 ? '1px solid var(--border)' : 'none',
                      background: i % 2 === 0 ? 'transparent' : 'var(--surface-mid)',
                      alignItems: 'start',
                      transition: 'background 80ms',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                        <div style={{ width: 7, height: 7, borderRadius: '50%', background: dotColor, flexShrink: 0 }} />
                        <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text)', fontFamily: 'monospace' }}>{s.name}</span>
                      </div>
                      <div style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.5 }}>{s.description}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-subtle)', fontFamily: 'monospace' }}>
                        {stateTriggers[s.name] ?? '—'}
                      </div>
                      <div style={{ fontSize: 11, color: 'var(--text-subtle)', fontFamily: 'monospace' }}>
                        {stateTokens[s.name] ?? '—'}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Variants row */}
            {component.variants.length > 0 && (
              <div>
                <div style={{ fontSize: 11, color: 'var(--text-subtle)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>
                  Variants ({component.variants.length})
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {component.variants.map(v => (
                    <div key={v} style={{
                      padding: '6px 12px',
                      background: 'var(--surface-mid)',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius-md)',
                      fontSize: 12, color: 'var(--text)', fontFamily: 'monospace',
                    }}>
                      {v}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {tab === 'Token Deps' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ fontSize: 11, color: 'var(--text-subtle)', marginBottom: 4, lineHeight: 1.6 }}>
              Each token traces from <span style={{ color: 'var(--accent)', fontFamily: 'monospace' }}>component</span>
              {' → '}<span style={{ color: 'var(--text)' }}>semantic</span>
              {' → '}<span style={{ color: 'var(--text-muted)' }}>primitive</span>
            </div>
            {component.tokenDeps.map(dep => (
              <TokenChain key={dep.tokenId} dep={dep} />
            ))}
          </div>
        )}

        {tab === 'Accessibility' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {component.contrast && (
              <div style={{
                background: 'var(--surface-mid)', border: '1px solid var(--border)',
                borderRadius: 'var(--radius-lg)', padding: '16px',
                display: 'flex', alignItems: 'center', gap: 16, marginBottom: 4,
              }}>
                <div>
                  <div style={{ fontSize: 10, color: 'var(--text-subtle)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>
                    Color Contrast
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                    <span style={{
                      fontSize: 28, fontWeight: 800, letterSpacing: '-0.03em',
                      color: component.contrast.level === 'AAA' ? 'var(--green)' : component.contrast.level.startsWith('AA') ? 'var(--yellow)' : 'var(--red)',
                    }}>
                      {component.contrast.ratio}:1
                    </span>
                    <span className={`chip ${component.contrast.level === 'AAA' ? 'green' : 'yellow'}`}>
                      {component.contrast.level}
                    </span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{
                      width: 32, height: 32, borderRadius: 6,
                      background: component.contrast.foreground, border: '1px solid rgba(255,255,255,0.1)',
                      marginBottom: 4,
                    }} />
                    <div style={{ fontSize: 9, fontFamily: 'monospace', color: 'var(--text-subtle)' }}>
                      {component.contrast.foreground}
                    </div>
                  </div>
                  <div style={{ fontSize: 18, color: 'var(--text-subtle)' }}>on</div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{
                      width: 32, height: 32, borderRadius: 6,
                      background: component.contrast.background, border: '1px solid rgba(255,255,255,0.1)',
                      marginBottom: 4,
                    }} />
                    <div style={{ fontSize: 9, fontFamily: 'monospace', color: 'var(--text-subtle)' }}>
                      {component.contrast.background}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {component.accessibility.map((rule, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'flex-start', gap: 10,
                padding: '10px 12px',
                background: rule.passes ? 'var(--green-subtle)' : 'var(--red-subtle)',
                border: `1px solid ${rule.passes ? 'rgba(45,213,120,0.2)' : 'rgba(245,101,101,0.2)'}`,
                borderRadius: 'var(--radius-lg)',
              }}>
                <div style={{ flexShrink: 0, marginTop: 1 }}>
                  {rule.passes
                    ? <CheckCircle size={14} color="var(--green)" />
                    : <XCircle size={14} color="var(--red)" />
                  }
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12.5, color: 'var(--text)', lineHeight: 1.4 }}>{rule.rule}</div>
                  {rule.detail && (
                    <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 3 }}>{rule.detail}</div>
                  )}
                  {rule.wcag && (
                    <div style={{ fontSize: 10.5, color: 'var(--text-subtle)', marginTop: 2 }}>
                      WCAG {rule.wcag} · Level {rule.level}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'AI Rules' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Semantic intent */}
            <div style={{
              background: 'var(--accent-subtle)', border: '1px solid rgba(91,110,247,0.2)',
              borderRadius: 'var(--radius-lg)', padding: '14px 16px',
            }}>
              <div style={{ fontSize: 10, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, marginBottom: 6 }}>
                Semantic Intent
              </div>
              <p style={{ fontSize: 13.5, color: 'var(--text)', lineHeight: 1.6 }}>
                {component.aiRules.semanticIntent}
              </p>
            </div>

            {/* Use when */}
            <div>
              <div style={{ fontSize: 11, color: 'var(--green)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
                <span className="status-dot pass" />
                Use when
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                {component.aiRules.useWhen.map((rule, i) => (
                  <div key={i} style={{
                    display: 'flex', gap: 8, padding: '7px 10px',
                    background: 'var(--green-subtle)', border: '1px solid rgba(45,213,120,0.15)',
                    borderRadius: 'var(--radius-md)',
                  }}>
                    <ChevronRight size={12} color="var(--green)" style={{ flexShrink: 0, marginTop: 2 }} />
                    <span style={{ fontSize: 12, lineHeight: 1.5 }}>{rule}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Avoid when */}
            <div>
              <div style={{ fontSize: 11, color: 'var(--red)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
                <span className="status-dot fail" />
                Avoid when
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                {component.aiRules.avoidWhen.map((rule, i) => (
                  <div key={i} style={{
                    display: 'flex', gap: 8, padding: '7px 10px',
                    background: 'var(--red-subtle)', border: '1px solid rgba(245,101,101,0.15)',
                    borderRadius: 'var(--radius-md)',
                  }}>
                    <XCircle size={12} color="var(--red)" style={{ flexShrink: 0, marginTop: 2 }} />
                    <span style={{ fontSize: 12, lineHeight: 1.5 }}>{rule}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Max per screen */}
            {component.aiRules.maxPerScreen && (
              <div>
                <div style={{ fontSize: 11, color: 'var(--text-subtle)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>
                  Max per screen
                </div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {Object.entries(component.aiRules.maxPerScreen).map(([variant, max]) => (
                    <div key={variant} style={{
                      background: 'var(--surface-mid)', border: '1px solid var(--border)',
                      borderRadius: 'var(--radius-md)', padding: '8px 14px',
                      textAlign: 'center',
                    }}>
                      <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--accent)', letterSpacing: '-0.03em' }}>{max}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>{variant}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Prompt hints */}
            {component.aiRules.promptHints && (
              <div>
                <div style={{ fontSize: 11, color: 'var(--text-subtle)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>
                  Generation Hints
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                  {component.aiRules.promptHints.map((hint, i) => (
                    <div key={i} style={{
                      fontSize: 12, padding: '6px 10px',
                      background: 'var(--surface-mid)', border: '1px solid var(--border)',
                      borderRadius: 'var(--radius-md)', color: 'var(--text-muted)',
                      lineHeight: 1.5,
                    }}>
                      💡 {hint}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {tab === 'Interaction' && (
          <InteractionTab componentId={id} />
        )}

        {tab === 'Styles' && (
          <StylesTab componentId={id} />
        )}

        {tab === 'Code' && (
          <div>
            <div style={{ fontSize: 11, color: 'var(--text-subtle)', marginBottom: 12, lineHeight: 1.6 }}>
              Usage examples for <span style={{ color: 'var(--text)', fontFamily: 'monospace' }}>{component.name}</span> component.
            </div>
            <CodeBlock code={component.codeExample} />
          </div>
        )}
      </div>
    </div>
  )
}
