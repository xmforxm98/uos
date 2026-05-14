'use client'

import { Copy, Check } from 'lucide-react'
import { useDesignSystem } from '@/context/DesignSystemContext'
import { getSemanticToken } from '@/data/semantic'
import { getPrimitive } from '@/data/primitives'
import type { ComponentTokenDef } from '@/types'

function isColor(value: string) {
  return /^#|^rgb|^hsl|^transparent/.test(value)
}

function ColorDot({ value }: { value: string }) {
  if (!isColor(value) || value === 'transparent') {
    return (
      <div style={{
        width: 14, height: 14, borderRadius: 3, flexShrink: 0,
        border: '1px dashed var(--border-strong)',
        background: 'transparent',
      }} />
    )
  }
  return (
    <div style={{
      width: 14, height: 14, borderRadius: 3, flexShrink: 0,
      background: value,
      border: '1px solid rgba(255,255,255,0.1)',
      boxShadow: '0 0 0 1px rgba(0,0,0,0.3)',
    }} />
  )
}

function ChainRow({
  level, label, tokenId, value, role
}: {
  level: number; label: string; tokenId: string; value: string; role?: string
}) {
  const { copiedId, copyValue } = useDesignSystem()
  const copied = copiedId === tokenId

  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 8,
      paddingLeft: level * 18,
      paddingTop: 5, paddingBottom: 5,
      position: 'relative',
    }}>
      {level > 0 && (
        <div style={{
          position: 'absolute',
          left: level * 18 - 10,
          top: 0, bottom: 0,
          width: 1,
          background: 'var(--border-mid)',
        }} />
      )}
      {level > 0 && (
        <div style={{
          position: 'absolute',
          left: level * 18 - 10,
          top: '50%',
          width: 8,
          height: 1,
          background: 'var(--border-mid)',
        }} />
      )}

      <ColorDot value={value} />

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
          <span
            className="font-mono"
            style={{
              fontSize: level === 0 ? 12 : 11,
              color: level === 0 ? 'var(--accent)' : level === 1 ? 'var(--text)' : 'var(--text-muted)',
              fontWeight: level === 0 ? 600 : 400,
              letterSpacing: '-0.01em',
            }}
          >
            {tokenId}
          </span>
          {role && (
            <span style={{ fontSize: 10, color: 'var(--text-subtle)' }}>{role}</span>
          )}
        </div>
        <div style={{ fontSize: 10, color: 'var(--text-subtle)', lineHeight: 1.3 }}>{label}</div>
      </div>

      <button
        onClick={() => copyValue(tokenId, value)}
        title={copied ? 'Copied!' : `Copy "${value}"`}
        style={{
          background: copied ? 'var(--green-subtle)' : 'transparent',
          border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: 3,
          padding: '2px 6px', borderRadius: 'var(--radius-sm)',
          color: copied ? 'var(--green)' : 'var(--text-subtle)',
          fontSize: 10.5,
          transition: 'all 80ms',
          fontFamily: 'JetBrains Mono, monospace',
          flexShrink: 0,
        }}
      >
        {copied ? <Check size={10} /> : <Copy size={10} />}
        <span style={{ maxWidth: 80, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {value}
        </span>
      </button>
    </div>
  )
}

export function TokenChain({ dep }: { dep: ComponentTokenDef }) {
  const { activeTheme } = useDesignSystem()
  const themeOverride = activeTheme.overrides.find(o => o.semanticId === dep.semanticRef)
  const resolvedPrimitiveRef = themeOverride?.primitiveRef ?? dep.primitiveRef
  const primitive = getPrimitive(resolvedPrimitiveRef)
  const semantic = getSemanticToken(dep.semanticRef)
  const resolvedValue = themeOverride?.value ?? primitive?.value ?? dep.currentValue

  return (
    <div style={{
      background: 'var(--surface-mid)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
    }}>
      <div style={{
        padding: '8px 12px',
        borderBottom: '1px solid var(--border)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <span style={{ fontSize: 10, color: 'var(--text-subtle)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          {dep.label}
        </span>
        <span className="chip default">{dep.tokenId.split('/').pop()}</span>
      </div>
      <div style={{ padding: '6px 12px' }}>
        {/* Level 0: Component token */}
        <ChainRow
          level={0}
          label="Component token"
          tokenId={dep.tokenId}
          value={resolvedValue}
          role="component"
        />
        {/* Level 1: Semantic token */}
        {dep.semanticRef !== 'transparent' && (
          <ChainRow
            level={1}
            label={semantic?.description ?? 'Semantic token'}
            tokenId={dep.semanticRef}
            value={resolvedValue}
            role="semantic"
          />
        )}
        {/* Level 2: Primitive token */}
        {resolvedPrimitiveRef !== 'transparent' && (
          <ChainRow
            level={2}
            label={primitive?.description ?? `Primitive: ${resolvedPrimitiveRef}`}
            tokenId={resolvedPrimitiveRef}
            value={resolvedValue}
            role="primitive"
          />
        )}
      </div>
    </div>
  )
}
