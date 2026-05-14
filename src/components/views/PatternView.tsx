'use client'

import { getPattern } from '@/data/patterns'
import { getComponent } from '@/data/components'
import { useDesignSystem } from '@/context/DesignSystemContext'
import { CheckCircle, Layers, Sparkles } from 'lucide-react'

export function PatternView({ id }: { id: string }) {
  const pattern = getPattern(id)
  const { setSelected } = useDesignSystem()

  if (!pattern) {
    return (
      <div style={{ padding: 32, color: 'var(--text-muted)' }}>Pattern not found.</div>
    )
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
            {pattern.name}
          </h1>
          <span className="chip purple">Pattern</span>
          <span className="chip default">{pattern.category}</span>
        </div>
        <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.5 }}>
          {pattern.description}
        </p>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Semantic purpose */}
          <div style={{
            background: 'var(--accent-subtle)', border: '1px solid rgba(91,110,247,0.2)',
            borderRadius: 'var(--radius-lg)', padding: '14px 16px',
            display: 'flex', gap: 12, alignItems: 'flex-start',
          }}>
            <Sparkles size={16} color="var(--accent)" style={{ flexShrink: 0, marginTop: 1 }} />
            <div>
              <div style={{ fontSize: 10, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, marginBottom: 4 }}>
                Semantic Purpose
              </div>
              <p style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.6 }}>
                {pattern.semanticPurpose}
              </p>
            </div>
          </div>

          {/* Component composition */}
          <div>
            <div style={{ fontSize: 11, color: 'var(--text-subtle)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
              <Layers size={12} />
              Component Composition
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 8 }}>
              {pattern.components.map(cId => {
                const comp = getComponent(cId)
                return (
                  <button
                    key={cId}
                    onClick={() => setSelected({ type: 'component', id: cId })}
                    style={{
                      background: 'var(--surface-mid)', border: '1px solid var(--border)',
                      borderRadius: 'var(--radius-lg)', padding: '12px 14px',
                      textAlign: 'left', cursor: 'pointer',
                      transition: 'all 100ms',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = 'var(--accent)'
                      e.currentTarget.style.background = 'var(--accent-subtle)'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = 'var(--border)'
                      e.currentTarget.style.background = 'var(--surface-mid)'
                    }}
                  >
                    <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text)', textTransform: 'capitalize', marginBottom: 3 }}>
                      {comp?.name ?? cId}
                    </div>
                    {comp && (
                      <div style={{ fontSize: 11, color: 'var(--text-subtle)' }}>{comp.category}</div>
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          {/* AI Constraints */}
          <div>
            <div style={{ fontSize: 11, color: 'var(--text-subtle)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
              <Sparkles size={12} />
              AI Generation Rules
              <span className="chip accent">{pattern.aiConstraints.length} constraints</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {pattern.aiConstraints.map((rule, i) => (
                <div key={i} style={{
                  display: 'flex', gap: 10, alignItems: 'flex-start',
                  padding: '10px 14px',
                  background: 'var(--green-subtle)', border: '1px solid rgba(45,213,120,0.2)',
                  borderRadius: 'var(--radius-md)',
                }}>
                  <CheckCircle size={13} color="var(--green)" style={{ flexShrink: 0, marginTop: 2 }} />
                  <span style={{ fontSize: 12.5, lineHeight: 1.5, color: 'var(--text)' }}>{rule}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
