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
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'

const TABS = ['Preview', 'Token Deps', 'Accessibility', 'AI Rules', 'Interaction', 'Styles', 'Code'] as const
type Tab = typeof TABS[number]

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[11px] text-text-subtle font-semibold uppercase tracking-[0.08em] mb-[10px]">
      {children}
    </div>
  )
}

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
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => copyValue(id, code)}
        className={cn(
          'absolute top-2.5 right-2.5 z-10 h-auto px-2 py-1 text-[11px] gap-1',
          copied
            ? 'bg-green-subtle text-green border border-border'
            : 'bg-surface-high text-text-muted border border-border'
        )}
      >
        {copied ? <Check size={10} /> : <Copy size={10} />}
        {copied ? 'Copied' : 'Copy'}
      </Button>
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
    <div className="flex flex-col gap-1.5 items-center">
      <div className="text-[9.5px] text-text-subtle uppercase tracking-[0.07em] font-semibold">
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
      <code className="text-[9.5px] text-text-subtle font-mono text-center max-w-[80px] break-all">
        {tokenId.replace('motion/', '').replace('feedback/', '').replace('density/', '')}
      </code>
    </div>
  )
}

function InteractionTab({ componentId: _componentId }: { componentId: string }) {
  const { activeTheme } = useDesignSystem()
  const profile = getProfileForTheme(activeTheme.id)

  if (!profile) {
    return <div className="text-text-muted text-[13px]">No interaction profile for theme {activeTheme.id}</div>
  }

  const tokenRows: { label: string; tokenId: string; description: string }[] = [
    { label: 'Hover', tokenId: profile.hoverToken, description: 'Applied on :hover — defines how the element responds to cursor proximity.' },
    { label: 'Press', tokenId: profile.pressToken, description: 'Applied on :active/:mousedown — physical confirmation of click.' },
    { label: 'Enter', tokenId: profile.enterToken, description: 'Applied when element enters viewport / mounts — entrance animation.' },
    { label: 'Exit',  tokenId: profile.exitToken,  description: 'Applied when element leaves / unmounts — exit animation.' },
  ]

  return (
    <div className="flex flex-col gap-6">
      {/* Profile banner */}
      <div
        className="rounded-[var(--radius-lg)] p-4 flex items-start gap-3.5"
        style={{
          background: `${profile.color}12`,
          border: `1.5px solid ${profile.color}40`,
        }}
      >
        <MousePointer2 size={20} color={profile.color} className="shrink-0 mt-0.5" />
        <div>
          <div className="flex items-center gap-2 mb-[5px]">
            <span className="text-[15px] font-bold text-text tracking-[-0.01em]">
              {profile.name} Profile
            </span>
            <span
              className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
              style={{ background: `${profile.color}18`, color: profile.color }}
            >
              {activeTheme.name}
            </span>
          </div>
          <p className="text-[12.5px] text-text-muted mb-2 leading-relaxed">
            <em className="text-text">&ldquo;{profile.tagline}&rdquo;</em> — {profile.persona}
          </p>
          <div className="flex gap-[5px] flex-wrap">
            <Badge variant="default">{profile.motion} motion</Badge>
            <Badge variant="default">{profile.density} density</Badge>
            <Badge variant="default">{profile.gestureModel}</Badge>
          </div>
        </div>
      </div>

      {/* Live demo row */}
      <div>
        <SectionLabel>Live Demos — hover / click each box</SectionLabel>
        <Card>
          <CardContent className="flex gap-5 flex-wrap p-5 items-end">
            {tokenRows.map(row => (
              <LiveMotionDemo key={row.label} tokenId={row.tokenId} label={row.label} />
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Token breakdown table */}
      <div>
        <SectionLabel>Token Breakdown</SectionLabel>
        <div className="border border-border rounded-[var(--radius-lg)] overflow-hidden">
          {/* Header */}
          <div className="grid bg-surface-mid border-b border-border px-3.5 py-2 gap-3"
            style={{ gridTemplateColumns: '70px 180px 1fr' }}>
            {['State', 'Token', 'CSS Value'].map(h => (
              <div key={h} className="text-[10px] font-semibold text-text-subtle uppercase tracking-[0.07em]">
                {h}
              </div>
            ))}
          </div>
          {tokenRows.map((row, i) => {
            const token = getInteractionToken(row.tokenId)
            return (
              <div
                key={row.label}
                className={cn(
                  'grid px-3.5 py-2.5 gap-3 items-start',
                  i < tokenRows.length - 1 ? 'border-b border-border' : '',
                  i % 2 === 0 ? 'bg-transparent' : 'bg-surface-mid'
                )}
                style={{ gridTemplateColumns: '70px 180px 1fr' }}
              >
                <div className="text-[11.5px] font-semibold text-text py-0.5">
                  {row.label}
                </div>
                <code
                  className="text-[11.5px] font-mono px-2 py-0.5 rounded self-start"
                  style={{ color: profile.color, background: `${profile.color}10` }}
                >
                  {row.tokenId}
                </code>
                <div>
                  {token?.cssTransition && (
                    <code className="text-[10.5px] font-mono text-text-muted block">
                      transition: {token.cssTransition}
                    </code>
                  )}
                  {token?.cssTransform && (
                    <code className="text-[10.5px] font-mono text-green block mt-0.5">
                      transform: {token.cssTransform}
                    </code>
                  )}
                  {!token?.cssTransition && !token?.cssTransform && (
                    <span className="text-[11px] text-text-subtle">
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
        <SectionLabel>All Profiles — switch theme to change</SectionLabel>
        <div className="flex gap-2">
          {interactionProfiles.map(p => (
            <div
              key={p.id}
              className="flex-1 p-3 rounded-[var(--radius-lg)] transition-all duration-[120ms]"
              style={{
                background: p.id === profile.id ? `${p.color}12` : 'var(--surface-mid)',
                border: `1.5px solid ${p.id === profile.id ? p.color + '50' : 'var(--border)'}`,
                opacity: p.id === profile.id ? 1 : 0.6,
              }}
            >
              <div className="flex gap-1.5 items-center mb-1">
                <div className="w-[7px] h-[7px] rounded-full shrink-0" style={{ background: p.color }} />
                <span className="text-[12px] font-bold text-text">{p.name}</span>
                {p.id === profile.id && (
                  <span className="text-[9px] font-semibold" style={{ color: p.color }}>ACTIVE</span>
                )}
              </div>
              <div className="text-[10.5px] text-text-muted">{p.persona.split('·')[0].trim()}</div>
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
    <div className="flex flex-col gap-6">
      {/* Active style banner */}
      <div
        className="px-4 py-3.5 rounded-[var(--radius-lg)] flex items-center gap-3"
        style={{
          background: activeStyle ? `${activeStyle.color}10` : 'var(--surface-mid)',
          border: `1.5px solid ${activeStyle ? activeStyle.color + '40' : 'var(--border)'}`,
        }}
      >
        {activeStyle ? (
          <>
            <div
              className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{ background: activeStyle.color, boxShadow: `0 0 8px ${activeStyle.color}60` }}
            />
            <div>
              <div className="text-[13px] font-bold text-text mb-0.5">
                Active Style:{' '}
                <span style={{ color: activeStyle.color }}>{activeStyle.name}</span>
                <span className="font-normal text-text-muted ml-2 text-[12px]">via {activeTheme.name} theme</span>
              </div>
              <div className="text-[11.5px] text-text-muted italic">
                &ldquo;{activeStyle.tagline}&rdquo;
              </div>
            </div>
          </>
        ) : (
          <div className="text-[12px] text-text-muted">
            No interaction style assigned to <strong>{activeTheme.name}</strong> theme yet.
            Switch to Brand A or Brand B to see style assignment.
          </div>
        )}
      </div>

      {/* Style compatibility matrix */}
      <div>
        <SectionLabel>All Interaction Styles — compatibility matrix</SectionLabel>
        <div className="flex flex-col gap-1.5">
          {interactionStyles.map(style => {
            const isActive = activeStyle?.id === style.id
            return (
              <div
                key={style.id}
                className="flex items-center gap-3 px-3.5 py-2.5 rounded-[var(--radius-md)] transition-all duration-[120ms]"
                style={{
                  background: isActive ? `${style.color}0e` : 'var(--surface-mid)',
                  border: `1.5px solid ${isActive ? style.color + '50' : 'var(--border)'}`,
                  borderLeft: `3px solid ${style.color}`,
                }}
              >
                <div className="w-2 h-2 rounded-full shrink-0" style={{ background: style.color }} />
                <span className="text-[12.5px] font-bold text-text w-[110px]">{style.name}</span>
                <div className="flex gap-[5px] flex-1 flex-wrap">
                  <span className="text-[10px] px-1.5 py-px rounded-full bg-surface-high text-text-muted font-mono">
                    {style.animationIntensity}
                  </span>
                  <span className="text-[10px] px-1.5 py-px rounded-full bg-surface-high text-text-muted">
                    {style.decoration} deco
                  </span>
                  <span className="text-[10px] px-1.5 py-px rounded-full bg-surface-high text-text-muted">
                    {style.feedback}
                  </span>
                </div>
                {isActive && (
                  <span
                    className="text-[9.5px] font-bold px-2 py-0.5 rounded-full"
                    style={{ color: style.color, background: `${style.color}15` }}
                  >
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
          <SectionLabel>Toggle · Live Style Variants · click to interact</SectionLabel>
          <p className="text-[12px] text-text-muted mb-3.5 leading-relaxed">
            Same component, 6 behavioral identities. Motion, decoration, and personality change entirely based on the active Interaction Style.
          </p>
          <ToggleStyleGallery />
        </div>
      )}

      {!isToggle && (
        <Card>
          <CardContent className="p-4 text-[12px] text-text-muted leading-relaxed">
            💡 Full style variant gallery available for <strong>Toggle</strong> — the reference component for behavioral identity.
            More components (Button, Input, Card) will follow as the system evolves.
            See <strong>Interaction Styles → Gallery</strong> in the sidebar for the full showcase.
          </CardContent>
        </Card>
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
      <div className="p-8 text-text-muted">
        Component not found: {id}
      </div>
    )
  }

  return (
    <Tabs
      value={tab}
      onValueChange={(v) => setTab(v as Tab)}
      className="flex flex-col h-full overflow-hidden"
    >
      {/* Header */}
      <div className="px-6 pt-4 pb-3.5 border-b border-border shrink-0 bg-surface">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-[18px] font-bold text-text tracking-[-0.02em]">
                {component.name}
              </h1>
              <Badge variant="accent">{component.category}</Badge>
              {component.contrast && (
                <Badge variant={component.contrast.level === 'AAA' ? 'green' : 'yellow'}>
                  WCAG {component.contrast.level}
                </Badge>
              )}
            </div>
            <p className="text-[13px] text-text-muted max-w-[520px] leading-relaxed">
              {component.description}
            </p>
          </div>
          <div className="flex gap-1 shrink-0">
            {component.states.map(s => (
              <Badge key={s.name} variant="default" title={s.description}>
                {s.name}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <TabsList className="tab-bar rounded-none border-b border-border shrink-0 h-auto justify-start px-6 bg-surface">
        {TABS.map(t => (
          <TabsTrigger key={t} value={t} className="tab">
            {t}
          </TabsTrigger>
        ))}
      </TabsList>

      {/* Tab content */}
      <ScrollArea className="flex-1">
        <div className="p-6">
          <TabsContent value="Preview" className="mt-0">
            <div className="flex flex-col gap-7">
              {/* Live interactive preview */}
              <div>
                <SectionLabel>Live Preview · hover, focus, click to interact</SectionLabel>
                <ComponentPreview component={component} />
              </div>

              {/* States / Variants table */}
              <div>
                <SectionLabel>States &amp; Variants</SectionLabel>
                <div className="border border-border rounded-[var(--radius-lg)] overflow-hidden">
                  {/* Header */}
                  <div
                    className="grid bg-surface-mid border-b border-border px-3.5 py-2 gap-3"
                    style={{ gridTemplateColumns: '130px 1fr 1fr 1fr' }}
                  >
                    {['State', 'Description', 'Trigger', 'Token change'].map(h => (
                      <div key={h} className="text-[10px] font-semibold text-text-subtle uppercase tracking-[0.07em]">{h}</div>
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
                      <div
                        key={s.name}
                        className={cn(
                          'grid px-3.5 py-2.5 gap-3 items-start transition-colors duration-[80ms]',
                          i < component.states.length - 1 ? 'border-b border-border' : '',
                          i % 2 === 0 ? 'bg-transparent' : 'bg-surface-mid'
                        )}
                        style={{ gridTemplateColumns: '130px 1fr 1fr 1fr' }}
                      >
                        <div className="flex items-center gap-[7px]">
                          <div className="w-[7px] h-[7px] rounded-full shrink-0" style={{ background: dotColor }} />
                          <span className="text-[12px] font-semibold text-text font-mono">{s.name}</span>
                        </div>
                        <div className="text-[12px] text-text-muted leading-snug">{s.description}</div>
                        <div className="text-[11px] text-text-subtle font-mono">
                          {stateTriggers[s.name] ?? '—'}
                        </div>
                        <div className="text-[11px] text-text-subtle font-mono">
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
                  <SectionLabel>Variants ({component.variants.length})</SectionLabel>
                  <div className="flex flex-wrap gap-2">
                    {component.variants.map(v => (
                      <div
                        key={v}
                        className="px-3 py-1.5 bg-surface-mid border border-border rounded-[var(--radius-md)] text-[12px] text-text font-mono"
                      >
                        {v}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="Token Deps" className="mt-0">
            <div className="flex flex-col gap-2.5">
              <div className="text-[11px] text-text-subtle mb-1 leading-relaxed">
                Each token traces from{' '}
                <span className="text-accent font-mono">component</span>
                {' → '}
                <span className="text-text">semantic</span>
                {' → '}
                <span className="text-text-muted">primitive</span>
              </div>
              {component.tokenDeps.map(dep => (
                <TokenChain key={dep.tokenId} dep={dep} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="Accessibility" className="mt-0">
            <div className="flex flex-col gap-2">
              {component.contrast && (
                <Card className="mb-1">
                  <CardContent className="p-4 flex items-center gap-4">
                    <div>
                      <div className="text-[10px] text-text-subtle uppercase tracking-[0.08em] mb-1.5">
                        Color Contrast
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span
                          className="text-[28px] font-extrabold tracking-[-0.03em]"
                          style={{
                            color: component.contrast.level === 'AAA'
                              ? 'var(--green)'
                              : component.contrast.level.startsWith('AA')
                              ? 'var(--yellow)'
                              : 'var(--red)',
                          }}
                        >
                          {component.contrast.ratio}:1
                        </span>
                        <Badge variant={component.contrast.level === 'AAA' ? 'green' : 'yellow'}>
                          {component.contrast.level}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex gap-2.5 items-center">
                      <div className="text-center">
                        <div
                          className="w-8 h-8 rounded-[6px] mb-1 border border-white/10"
                          style={{ background: component.contrast.foreground }}
                        />
                        <div className="text-[9px] font-mono text-text-subtle">
                          {component.contrast.foreground}
                        </div>
                      </div>
                      <div className="text-[18px] text-text-subtle">on</div>
                      <div className="text-center">
                        <div
                          className="w-8 h-8 rounded-[6px] mb-1 border border-white/10"
                          style={{ background: component.contrast.background }}
                        />
                        <div className="text-[9px] font-mono text-text-subtle">
                          {component.contrast.background}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {component.accessibility.map((rule, i) => (
                <div
                  key={i}
                  className={cn(
                    'flex items-start gap-2.5 px-3 py-2.5 rounded-[var(--radius-lg)] border',
                    rule.passes
                      ? 'bg-green-subtle border-[rgba(45,213,120,0.2)]'
                      : 'bg-red-subtle border-[rgba(245,101,101,0.2)]'
                  )}
                >
                  <div className="shrink-0 mt-px">
                    {rule.passes
                      ? <CheckCircle size={14} color="var(--green)" />
                      : <XCircle size={14} color="var(--red)" />
                    }
                  </div>
                  <div className="flex-1">
                    <div className="text-[12.5px] text-text leading-snug">{rule.rule}</div>
                    {rule.detail && (
                      <div className="text-[11px] text-text-muted mt-0.5">{rule.detail}</div>
                    )}
                    {rule.wcag && (
                      <div className="text-[10.5px] text-text-subtle mt-0.5">
                        WCAG {rule.wcag} · Level {rule.level}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="AI Rules" className="mt-0">
            <div className="flex flex-col gap-4">
              {/* Semantic intent */}
              <div className="bg-accent-subtle border border-accent-border rounded-[var(--radius-lg)] px-4 py-3.5">
                <div className="text-[10px] text-accent uppercase tracking-[0.08em] font-semibold mb-1.5">
                  Semantic Intent
                </div>
                <p className="text-[13.5px] text-text leading-relaxed">
                  {component.aiRules.semanticIntent}
                </p>
              </div>

              {/* Use when */}
              <div>
                <div className="text-[11px] text-green font-semibold uppercase tracking-[0.08em] mb-2 flex items-center gap-1.5">
                  <span className="status-dot pass" />
                  Use when
                </div>
                <div className="flex flex-col gap-[5px]">
                  {component.aiRules.useWhen.map((rule, i) => (
                    <div
                      key={i}
                      className="flex gap-2 px-2.5 py-[7px] bg-green-subtle border border-[rgba(45,213,120,0.15)] rounded-[var(--radius-md)]"
                    >
                      <ChevronRight size={12} color="var(--green)" className="shrink-0 mt-0.5" />
                      <span className="text-[12px] leading-snug">{rule}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Avoid when */}
              <div>
                <div className="text-[11px] text-red font-semibold uppercase tracking-[0.08em] mb-2 flex items-center gap-1.5">
                  <span className="status-dot fail" />
                  Avoid when
                </div>
                <div className="flex flex-col gap-[5px]">
                  {component.aiRules.avoidWhen.map((rule, i) => (
                    <div
                      key={i}
                      className="flex gap-2 px-2.5 py-[7px] bg-red-subtle border border-[rgba(245,101,101,0.15)] rounded-[var(--radius-md)]"
                    >
                      <XCircle size={12} color="var(--red)" className="shrink-0 mt-0.5" />
                      <span className="text-[12px] leading-snug">{rule}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Max per screen */}
              {component.aiRules.maxPerScreen && (
                <div>
                  <SectionLabel>Max per screen</SectionLabel>
                  <div className="flex gap-2 flex-wrap">
                    {Object.entries(component.aiRules.maxPerScreen).map(([variant, max]) => (
                      <Card key={variant}>
                        <CardContent className="p-3 text-center">
                          <div className="text-[22px] font-extrabold text-accent tracking-[-0.03em]">{max}</div>
                          <div className="text-[11px] text-text-muted mt-0.5">{variant}</div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Prompt hints */}
              {component.aiRules.promptHints && (
                <div>
                  <SectionLabel>Generation Hints</SectionLabel>
                  <div className="flex flex-col gap-[5px]">
                    {component.aiRules.promptHints.map((hint, i) => (
                      <div
                        key={i}
                        className="text-[12px] px-2.5 py-1.5 bg-surface-mid border border-border rounded-[var(--radius-md)] text-text-muted leading-snug"
                      >
                        💡 {hint}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="Interaction" className="mt-0">
            <InteractionTab componentId={id} />
          </TabsContent>

          <TabsContent value="Styles" className="mt-0">
            <StylesTab componentId={id} />
          </TabsContent>

          <TabsContent value="Code" className="mt-0">
            <div>
              <div className="text-[11px] text-text-subtle mb-3 leading-relaxed">
                Usage examples for{' '}
                <span className="text-text font-mono">{component.name}</span> component.
              </div>
              <CodeBlock code={component.codeExample} />
            </div>
          </TabsContent>
        </div>
      </ScrollArea>
    </Tabs>
  )
}
