'use client'

import { useState } from 'react'
import { CheckCircle, XCircle, ChevronRight, Copy, Check } from 'lucide-react'
import { ComponentPreview } from '@/components/ComponentPreview'
import { TokenChain } from '@/components/TokenChain'
import { useDesignSystem } from '@/context/DesignSystemContext'
import { getComponent } from '@/data/components'

const TABS = ['Preview', 'Token Deps', 'Accessibility', 'AI Rules', 'Code'] as const
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div>
              <div style={{ fontSize: 11, color: 'var(--text-subtle)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>
                Component Preview · {component.variants.length} variants
              </div>
              <ComponentPreview component={component} />
            </div>

            <div>
              <div style={{ fontSize: 11, color: 'var(--text-subtle)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>
                States
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 8 }}>
                {component.states.map(s => (
                  <div key={s.name} style={{
                    background: 'var(--surface-mid)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '10px 12px',
                  }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text)', marginBottom: 3 }}>
                      {s.name}
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--text-subtle)', lineHeight: 1.4 }}>
                      {s.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>
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
