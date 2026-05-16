'use client'

import { useDesignSystem } from '@/context/DesignSystemContext'
import { getComponent, componentDefs } from '@/data/components'
import { getPrimitive } from '@/data/primitives'
import { semanticTokens } from '@/data/semantic'
import { getPattern } from '@/data/patterns'
import { getTheme } from '@/data/themes'
import { getBestProfilesForComponent, getProfilesCompatibleWithComponent, getStyleForTheme } from '@/data/interactionStyles'
import { Check, Fingerprint } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'

function CopyPill({ id, value }: { id: string; value: string }) {
  const { copiedId, copyValue } = useDesignSystem()
  const copied = copiedId === id
  return (
    <Button
      variant="ghost"
      size="sm"
      className={cn('value-pill h-auto px-1.5 py-0.5 text-[10.5px]', copied ? 'copied' : '')}
      onClick={() => copyValue(id, value)}
      title="Click to copy"
    >
      {copied ? <Check size={9} className="inline mr-0.5" /> : null}
      {value}
    </Button>
  )
}

function WhereUsed({ semanticId }: { semanticId: string }) {
  const usedBy = componentDefs.filter(c =>
    c.tokenDeps.some(d => d.semanticRef === semanticId)
  )
  if (usedBy.length === 0) {
    return <span className="text-text-subtle text-[11px]">Not referenced</span>
  }

  return (
    <div className="flex flex-wrap gap-1">
      {usedBy.map(c => (
        <Badge key={c.id} variant="default">{c.name}</Badge>
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
      <div className="px-4 py-3.5 border-b border-border">
        <div className="text-[15px] font-semibold mb-0.5">{comp.name}</div>
        <div className="text-[11.5px] text-text-muted leading-relaxed">{comp.description}</div>
      </div>

      <div className="px-4 py-3 border-b border-border">
        <div className="inspector-label">Category</div>
        <Badge variant="accent">{comp.category}</Badge>
      </div>

      <div className="px-4 py-3 border-b border-border">
        <div className="inspector-label">Variants</div>
        <div className="flex flex-wrap gap-1">
          {comp.variants.map(v => (
            <Badge key={v} variant="default">{v}</Badge>
          ))}
        </div>
      </div>

      <div className="px-4 py-3 border-b border-border">
        <div className="inspector-label">Token Dependencies</div>
        <div className="flex flex-col gap-1.5">
          {comp.tokenDeps.map(dep => {
            const resolvedValue = resolveDepValue(dep.semanticRef, dep.primitiveRef, dep.currentValue)
            return (
              <div
                key={dep.tokenId}
                className="flex items-center justify-between px-2 py-1.5 bg-surface-mid rounded-md border border-border"
              >
                <div>
                  <div className="text-[10.5px] text-text-muted">{dep.label}</div>
                  <div className="text-[11px] font-mono text-accent tracking-tight">
                    {dep.tokenId}
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  {resolvedValue !== 'transparent' && (
                    <div
                      className="w-3 h-3 rounded-[3px] shrink-0 border border-white/10"
                      style={{ background: resolvedValue }}
                    />
                  )}
                  <CopyPill id={dep.tokenId} value={resolvedValue} />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="px-4 py-3 border-b border-border">
        <div className="inspector-label">Accessibility</div>
        <div className="flex items-center gap-1.5 mb-2">
          <span className={`status-dot ${passCount === comp.accessibility.length ? 'pass' : 'warn'}`} />
          <span className="text-[11.5px]">
            {passCount}/{comp.accessibility.length} rules pass
          </span>
        </div>
        {comp.contrast && (
          <div className="bg-surface-mid border border-border rounded-md px-2.5 py-2 mb-1.5">
            <div className="text-[10px] text-text-subtle mb-1 uppercase tracking-wide">CONTRAST RATIO</div>
            <div className="flex items-center gap-2">
              <span
                className="text-[18px] font-bold"
                style={{
                  color: comp.contrast.level === 'AAA'
                    ? 'var(--green)'
                    : comp.contrast.level === 'AA'
                      ? 'var(--yellow)'
                      : 'var(--red)',
                }}
              >
                {comp.contrast.ratio}:1
              </span>
              <Badge
                variant={
                  comp.contrast.level === 'AAA' ? 'green'
                    : comp.contrast.level === 'AA' || comp.contrast.level === 'AA Large' ? 'yellow'
                      : 'red'
                }
              >
                WCAG {comp.contrast.level}
              </Badge>
            </div>
            <div className="flex gap-1 mt-1.5 items-center">
              <div
                className="w-3.5 h-3.5 rounded-[3px] border border-white/10"
                style={{ background: comp.contrast.foreground }}
              />
              <span className="text-[10px] text-text-subtle font-mono">{comp.contrast.foreground}</span>
              <span className="text-[10px] text-text-subtle">on</span>
              <div
                className="w-3.5 h-3.5 rounded-[3px] border border-white/10"
                style={{ background: comp.contrast.background }}
              />
              <span className="text-[10px] text-text-subtle font-mono">{comp.contrast.background}</span>
            </div>
          </div>
        )}
      </div>

      <div className="px-4 py-3 border-b border-border">
        <div className="inspector-label flex items-center gap-1 mb-2">
          <Fingerprint size={10} />
          Behavioral Profile Compatibility
        </div>
        {(() => {
          const activeStyle = getStyleForTheme(activeTheme.id)
          const bestProfiles = getBestProfilesForComponent(id)
          const compatibleProfiles = getProfilesCompatibleWithComponent(id)
          const incompatibleCount = 7 - compatibleProfiles.length

          return (
            <div className="flex flex-col gap-2">
              {activeStyle && (
                <div
                  className="px-2.5 py-1.5 bg-surface-mid rounded-md"
                  style={{
                    border: `1px solid ${activeStyle.color}40`,
                    borderLeft: `3px solid ${activeStyle.color}`,
                  }}
                >
                  <div className="text-[10px] text-text-subtle mb-0.5 uppercase tracking-wide">ACTIVE THEME PROFILE</div>
                  <div className="text-[11.5px] font-semibold" style={{ color: activeStyle.color }}>{activeStyle.name}</div>
                  <div className="text-[10.5px] text-text-muted mt-0.5">{activeStyle.tagline}</div>
                  <div className="flex flex-wrap gap-0.5 mt-1">
                    {activeStyle.emotionalTone.map(t => (
                      <span
                        key={t}
                        className="text-[9.5px] px-1 py-px rounded-[3px]"
                        style={{
                          background: `${activeStyle.color}20`,
                          color: activeStyle.color,
                          border: `1px solid ${activeStyle.color}30`,
                        }}
                      >{t}</span>
                    ))}
                  </div>
                </div>
              )}

              {bestProfiles.length > 0 && (
                <div>
                  <div className="text-[9.5px] text-text-subtle mb-1 font-semibold uppercase tracking-[0.06em]">
                    Best with
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {bestProfiles.map(p => (
                      <span
                        key={p.id}
                        className="text-[10.5px] px-1.5 py-0.5 rounded font-medium"
                        style={{
                          background: `${p.color}15`,
                          color: p.color,
                          border: `1px solid ${p.color}35`,
                        }}
                      >{p.name}</span>
                    ))}
                  </div>
                </div>
              )}

              {incompatibleCount > 0 && (
                <div className="text-[10.5px] text-text-subtle">
                  <span className="text-red font-semibold">{incompatibleCount}</span>{' '}
                  profile{incompatibleCount > 1 ? 's' : ''} avoid this component
                </div>
              )}
            </div>
          )
        })()}
      </div>

      <div className="px-4 py-3">
        <div className="inspector-label">AI Semantic Intent</div>
        <p className="text-[11.5px] text-text-muted leading-relaxed mb-2 italic">
          &ldquo;{comp.aiRules.semanticIntent}&rdquo;
        </p>
        <div className="inspector-label">Max per screen</div>
        <div className="flex flex-wrap gap-1">
          {Object.entries(comp.aiRules.maxPerScreen ?? {}).map(([k, v]) => (
            <div
              key={k}
              className="text-[11px] bg-surface-mid border border-border rounded-sm px-1.5 py-0.5 flex gap-1 items-center"
            >
              <span className="text-text-muted">{k}</span>
              <span className="font-semibold text-accent">{v}</span>
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
      <div className="px-4 py-3.5 border-b border-border">
        <div className="text-[14px] font-semibold mb-0.5 capitalize">{group}</div>
        <div className="text-[11.5px] text-text-muted">{tokens.length} semantic tokens</div>
      </div>
      {tokens.slice(0, 6).map(t => {
        const override = activeTheme.overrides.find(o => o.semanticId === t.id)
        const prim = getPrimitive(override ? override.primitiveRef : t.primitiveRef)
        return (
          <div key={t.id} className="px-4 py-2.5 border-b border-border">
            <div className="flex items-center gap-2 mb-1">
              {prim && /^#/.test(prim.value) && (
                <div
                  className="w-3.5 h-3.5 rounded-[3px] shrink-0 border border-white/10"
                  style={{ background: prim.value }}
                />
              )}
              <span className="text-[11.5px] font-mono text-accent">{t.name}</span>
            </div>
            <div className="text-[10.5px] text-text-subtle mb-1">{t.description}</div>
            <div className="text-[10px] text-text-subtle mb-1">
              Primitive:{' '}
              <span className="font-mono text-text-muted">{override?.primitiveRef ?? t.primitiveRef}</span>
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
      <div className="px-4 py-3.5 border-b border-border">
        <div className="text-[14px] font-semibold mb-0.5">{pattern.name}</div>
        <div className="text-[11.5px] text-text-muted">{pattern.description}</div>
      </div>
      <div className="px-4 py-3 border-b border-border">
        <div className="inspector-label">Semantic Purpose</div>
        <p className="text-[11.5px] text-text-muted leading-relaxed italic">
          &ldquo;{pattern.semanticPurpose}&rdquo;
        </p>
      </div>
      <div className="px-4 py-3 border-b border-border">
        <div className="inspector-label">Uses Components</div>
        <div className="flex flex-wrap gap-1">
          {pattern.components.map(c => (
            <Badge key={c} variant="accent" className="capitalize">{c}</Badge>
          ))}
        </div>
      </div>
      <div className="px-4 py-3">
        <div className="inspector-label">AI Constraints ({pattern.aiConstraints.length})</div>
        <div className="flex flex-col gap-1.5">
          {pattern.aiConstraints.map((rule, i) => (
            <div
              key={i}
              className="flex gap-2 items-start px-2 py-1.5 bg-surface-mid border border-border rounded-md"
            >
              <span className="status-dot pass mt-1" />
              <span className="text-[11.5px] leading-relaxed text-text-muted">{rule}</span>
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
      <div className="px-4 py-3.5 border-b border-border">
        <div className="text-[14px] font-semibold mb-0.5">{theme.name}</div>
        <div className="text-[11.5px] text-text-muted">{theme.description}</div>
      </div>
      <div className="px-4 py-3 border-b border-border">
        <div className="inspector-label">Accent Color</div>
        <div className="flex items-center gap-2">
          <div
            className="w-5 h-5 rounded border border-white/10"
            style={{ background: theme.accentColor }}
          />
          <span className="text-[11.5px] font-mono text-text-muted">{theme.accentColor}</span>
        </div>
      </div>
      <div className="px-4 py-3">
        <div className="inspector-label">Token Overrides ({theme.overrides.length})</div>
        <div className="flex flex-col gap-1">
          {theme.overrides.map(o => (
            <div
              key={o.semanticId}
              className="flex items-center justify-between px-2 py-1.5 bg-surface-mid border border-border rounded-md"
            >
              <span className="text-[11px] font-mono text-text">{o.semanticId}</span>
              <div className="flex items-center gap-1.5">
                <div
                  className="w-3 h-3 rounded-[2px] border border-white/10"
                  style={{ background: o.value }}
                />
                <span className="text-[10px] font-mono text-text-muted">{o.primitiveRef}</span>
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
    <aside className="w-[280px] min-w-[280px] bg-surface border-l border-border overflow-hidden flex flex-col shrink-0">
      <div className="px-4 py-2.5 border-b border-border text-[10px] font-semibold uppercase tracking-[0.1em] text-text-subtle shrink-0">
        Inspector
      </div>

      <ScrollArea className="flex-1">
        {!selected && (
          <div className="flex items-center justify-center h-[200px] text-text-subtle text-xs">
            Select an item to inspect
          </div>
        )}
        {selected?.type === 'component' && <ComponentInspector id={selected.id} />}
        {selected?.type === 'semantic' && <SemanticInspector group={selected.id} />}
        {selected?.type === 'pattern' && <PatternInspector id={selected.id} />}
        {selected?.type === 'theme' && <ThemeInspector id={selected.id} />}
      </ScrollArea>
    </aside>
  )
}
