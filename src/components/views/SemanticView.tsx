'use client'

import { useDesignSystem } from '@/context/DesignSystemContext'
import { getSemanticsByGroup } from '@/data/semantic'
import { getPrimitive } from '@/data/primitives'
import { componentDefs } from '@/data/components'
import { Badge } from '@/components/ui/badge'

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
    <div
      className="grid items-start bg-surface-mid border border-border rounded-lg gap-3 px-3 py-2.5"
      style={{ gridTemplateColumns: '200px 1fr 140px 140px' }}
    >
      {/* Token name + description */}
      <div>
        <div
          className="text-accent font-medium"
          style={{ fontSize: 12, fontFamily: 'JetBrains Mono, monospace', letterSpacing: '-0.01em', marginBottom: 2 }}
        >
          {token.name}
        </div>
        <div className="text-text-subtle" style={{ fontSize: 11, lineHeight: 1.4 }}>
          {token.description}
        </div>
      </div>

      {/* Usage */}
      <div className="flex flex-wrap gap-1">
        {token.usage.map(u => (
          <span
            key={u}
            className="bg-surface-high border border-border text-text-subtle rounded"
            style={{ fontSize: 10.5, padding: '1px 6px' }}
          >
            {u}
          </span>
        ))}
      </div>

      {/* Resolution chain */}
      <div className="flex flex-col gap-0.5">
        <div className="flex items-center gap-1">
          <span className="text-text-subtle" style={{ fontSize: 10 }}>→</span>
          <span className="text-text-muted" style={{ fontSize: 11, fontFamily: 'monospace' }}>{primitiveId}</span>
        </div>
        {primitive && /^#/.test(primitive.value) && (
          <div className="flex items-center gap-1.5">
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
          <span className="text-text-muted" style={{ fontSize: 10.5, fontFamily: 'monospace' }}>
            {primitive.value}
          </span>
        )}
      </div>

      {/* Used by */}
      <div>
        {usedBy.length > 0 ? (
          <div className="flex flex-wrap gap-0.5">
            {usedBy.map(c => (
              <span key={c.id} className="chip accent" style={{ fontSize: 9.5 }}>{c.name}</span>
            ))}
          </div>
        ) : (
          <span className="text-text-subtle" style={{ fontSize: 10.5 }}>—</span>
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
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="px-6 pt-4 pb-3.5 border-b border-border shrink-0 bg-surface">
        <div className="flex items-center gap-2 mb-1">
          <h1 className="text-lg font-bold capitalize" style={{ letterSpacing: '-0.02em' }}>
            {group}
          </h1>
          <Badge variant="default">{tokens.length} tokens</Badge>
          <Badge variant="purple">Semantic</Badge>
          <span
            className="font-medium"
            style={{
              fontSize: 11,
              background: activeTheme.accentColor + '22',
              border: `1px solid ${activeTheme.accentColor}44`,
              color: activeTheme.accentColor,
              padding: '2px 7px', borderRadius: 99,
            }}
          >
            {activeTheme.name} theme
          </span>
        </div>
        <p className="text-text-muted" style={{ fontSize: 13, lineHeight: 1.5 }}>
          {groupDescriptions[group]}
        </p>
      </div>

      {/* Column headers */}
      <div
        className="grid bg-surface border-b border-border shrink-0 mx-6 gap-3 px-3 py-2"
        style={{ gridTemplateColumns: '200px 1fr 140px 140px' }}
      >
        {['Token', 'Usage', 'Resolution', 'Used by'].map(h => (
          <div key={h} className="text-text-subtle font-semibold uppercase" style={{ fontSize: 10, letterSpacing: '0.08em' }}>
            {h}
          </div>
        ))}
      </div>

      {/* Token rows */}
      <div className="flex-1 overflow-y-auto px-6 pt-2 pb-6">
        <div className="flex flex-col gap-1.5">
          {tokens.map(t => (
            <TokenRow key={t.id} token={t} theme={activeTheme} />
          ))}
        </div>
      </div>
    </div>
  )
}
