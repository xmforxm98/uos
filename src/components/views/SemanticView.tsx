'use client'

import { useDesignSystem } from '@/context/DesignSystemContext'
import { getSemanticsByGroup } from '@/data/semantic'
import { getPrimitive } from '@/data/primitives'
import { componentDefs } from '@/data/components'

function whereUsedInComponents(semanticId: string) {
  return componentDefs.filter(c =>
    c.tokenDeps.some(d => d.semanticRef === semanticId)
  )
}

function TokenRow({ token, theme }: { token: ReturnType<typeof getSemanticsByGroup>[number]; theme: import('@/types').BrandTheme }) {
  const { copyValue, copiedId } = useDesignSystem()
  const override = theme.overrides.find(o => o.semanticId === token.id)
  const primitiveId = override ? override.primitiveRef : token.primitiveRef
  const primitive = getPrimitive(primitiveId)
  const value = override ? override.value : primitive?.value ?? ''
  const usedBy = whereUsedInComponents(token.id)

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '200px 1fr 140px 140px',
      alignItems: 'start',
      padding: '10px 12px',
      background: 'var(--surface-mid)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-lg)',
      gap: 12,
    }}>
      {/* Token name + description */}
      <div>
        <div style={{
          fontSize: 12, fontFamily: 'JetBrains Mono, monospace',
          color: 'var(--accent)', fontWeight: 500, letterSpacing: '-0.01em',
          marginBottom: 2,
        }}>
          {token.name}
        </div>
        <div style={{ fontSize: 11, color: 'var(--text-subtle)', lineHeight: 1.4 }}>
          {token.description}
        </div>
      </div>

      {/* Usage */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
        {token.usage.map(u => (
          <span key={u} style={{
            fontSize: 10.5, background: 'var(--surface-high)',
            border: '1px solid var(--border)', borderRadius: 4,
            padding: '1px 6px', color: 'var(--text-subtle)',
          }}>
            {u}
          </span>
        ))}
      </div>

      {/* Resolution chain */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <span style={{ fontSize: 10, color: 'var(--text-subtle)' }}>→</span>
          <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--text-muted)' }}>{primitiveId}</span>
        </div>
        {primitive && /^#/.test(primitive.value) && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <div style={{
              width: 14, height: 14, borderRadius: 3,
              background: value,
              border: '1px solid rgba(255,255,255,0.1)',
            }} />
            <button
              className={`value-pill ${copiedId === token.id ? 'copied' : ''}`}
              onClick={() => copyValue(token.id, value)}
              style={{ fontSize: 10.5 }}
            >
              {value}
            </button>
          </div>
        )}
        {primitive && !/^#/.test(primitive.value) && (
          <span style={{ fontSize: 10.5, fontFamily: 'monospace', color: 'var(--text-muted)' }}>
            {primitive.value}
          </span>
        )}
      </div>

      {/* Used by */}
      <div>
        {usedBy.length > 0 ? (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
            {usedBy.map(c => (
              <span key={c.id} className="chip accent" style={{ fontSize: 9.5 }}>{c.name}</span>
            ))}
          </div>
        ) : (
          <span style={{ fontSize: 10.5, color: 'var(--text-subtle)' }}>—</span>
        )}
      </div>
    </div>
  )
}

export function SemanticView({ group }: { group: string }) {
  const { activeTheme } = useDesignSystem()
  const tokens = getSemanticsByGroup(group)

  const groupDescriptions: Record<string, string> = {
    background: 'Backgrounds define the visual layers of the UI — from page base to elevated overlays.',
    text: 'Text tokens ensure consistent typography contrast across all themes and states.',
    border: 'Borders define structure, separation, and interactive affordance.',
    surface: 'Surfaces create depth and hierarchy for panels, cards, and overlays.',
    interactive: 'Interactive tokens govern the behavior of clickable and focusable elements.',
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
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <h1 style={{ fontSize: 18, fontWeight: 700, letterSpacing: '-0.02em', textTransform: 'capitalize' }}>
            {group}
          </h1>
          <span className="chip default">{tokens.length} tokens</span>
          <span className="chip purple">Semantic</span>
          <span style={{
            fontSize: 11, background: activeTheme.accentColor + '22',
            border: `1px solid ${activeTheme.accentColor}44`,
            color: activeTheme.accentColor,
            padding: '2px 7px', borderRadius: 99, fontWeight: 500,
          }}>
            {activeTheme.name} theme
          </span>
        </div>
        <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.5 }}>
          {groupDescriptions[group]}
        </p>
      </div>

      {/* Column headers */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '200px 1fr 140px 140px',
        padding: '8px 12px',
        gap: 12,
        background: 'var(--surface)',
        borderBottom: '1px solid var(--border)',
        flexShrink: 0,
        marginLeft: 24, marginRight: 24,
      }}>
        {['Token', 'Usage', 'Resolution', 'Used by'].map(h => (
          <div key={h} style={{
            fontSize: 10, fontWeight: 600, color: 'var(--text-subtle)',
            textTransform: 'uppercase', letterSpacing: '0.08em',
          }}>
            {h}
          </div>
        ))}
      </div>

      {/* Token rows */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '8px 24px 24px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {tokens.map(t => (
            <TokenRow key={t.id} token={t} theme={activeTheme} />
          ))}
        </div>
      </div>
    </div>
  )
}
