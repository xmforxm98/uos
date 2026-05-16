'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { getInteractionStyle, startupDNAProfiles, interactionStyles } from '@/data/interactionStyles'
import { getInteractionToken } from '@/data/interactions'
import {
  MinimalToggle, EnterpriseToggle, PremiumToggle,
  PlayfulToggle, CyberToggle, NativeMobileToggle, AINativeToggle,
} from '@/components/styleVariants/ToggleVariants'
import { BehaviorDemoApp } from '@/components/views/BehaviorDemoApp'
import { getProfileReferences } from '@/data/profileReferences'
import { synthesizeCompactPrompt, synthesizeFullContext } from '@/lib/traitSynthesis'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'

const TABS = ['Overview', 'References', 'Tokens', 'DNA'] as const
type Tab = typeof TABS[number]

// Map profileId → toggle live component
const toggleMap: Record<string, React.ReactNode> = {
  minimal:        <MinimalToggle label="Feature flag" />,
  enterprise:     <EnterpriseToggle label="Notifications" />,
  premium:        <PremiumToggle label="Wi-Fi" />,
  playful:        <PlayfulToggle label="Dark Mode" />,
  cyber:          <CyberToggle label="Neural link" />,
  'native-mobile':<NativeMobileToggle label="Airplane Mode" />,
  'ai-native':    <AINativeToggle label="AI Assist" />,
}

// Demo canvas backgrounds per profile
const demoBg: Record<string, string> = {
  minimal:        '#0d0d0d',
  enterprise:     '#f8fafc',
  premium:        '#f5f5f7',
  playful:        '#fffbeb',
  cyber:          '#030308',
  'native-mobile':'#f2f2f7',
  'ai-native':    '#0a000f',
}

const intensityMeta: Record<string, { color: string; bg: string }> = {
  instant:    { color: 'var(--text-subtle)',  bg: 'var(--surface-high)' },
  minimal:    { color: 'var(--text-muted)',   bg: 'var(--surface-high)' },
  standard:   { color: 'var(--accent)',       bg: 'var(--accent-subtle)' },
  expressive: { color: 'var(--purple)',       bg: 'var(--purple-subtle)' },
  cinematic:  { color: '#03e9f4',             bg: 'rgba(3,233,244,0.08)' },
}

const feedbackMeta: Record<string, string> = {
  restrained: 'var(--text-muted)',
  balanced:   'var(--accent)',
  expressive: 'var(--purple)',
}

const decorationMeta: Record<string, { label: string; color: string }> = {
  none:      { label: 'None',      color: 'var(--text-subtle)' },
  subtle:    { label: 'Subtle',    color: 'var(--accent)' },
  glow:      { label: 'Glow',      color: '#03e9f4' },
  particles: { label: 'Particles', color: '#8b5cf6' },
}

// ─────────────────────────────────────────────────────────────────────────────

function OverviewTab({ profile }: { profile: ReturnType<typeof getInteractionStyle> }) {
  if (!profile) return null
  const im = intensityMeta[profile.animationIntensity]
  const dm = decorationMeta[profile.decoration]

  return (
    <div className="flex flex-col gap-6">
      {/* Personality card */}
      <div
        className="rounded-lg p-5"
        style={{
          background: `${profile.color}0c`,
          border: `1.5px solid ${profile.color}35`,
        }}
      >
        <p className="text-[13.5px] text-text leading-[1.7]">
          {profile.personality}
        </p>
      </div>

      {/* Behavior matrix */}
      <div>
        <div className="inspector-label mb-2.5">Behavior Profile</div>
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: 'Animation Intensity', value: profile.animationIntensity, color: im.color, bg: im.bg },
            { label: 'Feedback Style',     value: profile.feedback,           color: feedbackMeta[profile.feedback], bg: 'var(--surface-high)' },
            { label: 'Decoration',         value: dm.label,                   color: dm.color, bg: 'var(--surface-high)' },
            { label: 'Density',            value: profile.density,            color: 'var(--text-muted)', bg: 'var(--surface-high)' },
            { label: 'Gesture Model',      value: profile.gestureModel,       color: 'var(--text-muted)', bg: 'var(--surface-high)' },
            { label: 'Motion Tokens',      value: `${profile.motionRefs.length} refs`, color: 'var(--accent)', bg: 'var(--accent-subtle)' },
          ].map(item => (
            <div
              key={item.label}
              className="rounded-md border border-border px-3.5 py-3"
              style={{ background: item.bg }}
            >
              <div className="text-[9.5px] text-text-subtle uppercase tracking-[0.07em] mb-1">
                {item.label}
              </div>
              <div className="text-[13px] font-semibold font-mono" style={{ color: item.color }}>
                {item.value}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Emotional tone */}
      <div>
        <div className="inspector-label mb-2">Emotional Tone</div>
        <div className="flex gap-1.5 flex-wrap">
          {profile.emotionalTone.map(t => (
            <span
              key={t}
              className="px-3 py-1 rounded-full text-[12px] font-semibold"
              style={{
                background: `${profile.color}14`,
                color: profile.color,
                border: `1px solid ${profile.color}30`,
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Usage guidance */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <div className="text-[11px] text-green font-semibold uppercase tracking-[0.07em] mb-2 flex items-center gap-1.5">
            <span className="status-dot pass" /> Use for
          </div>
          <div className="flex flex-col gap-1">
            {profile.usageGuidance.useFor.map(u => (
              <div
                key={u}
                className="px-2.5 py-1.5 bg-green-subtle border border-[rgba(45,213,120,0.15)] rounded-md text-[12px] text-text-muted"
              >
                {u}
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="text-[11px] text-red font-semibold uppercase tracking-[0.07em] mb-2 flex items-center gap-1.5">
            <span className="status-dot fail" /> Avoid for
          </div>
          <div className="flex flex-col gap-1">
            {profile.usageGuidance.avoidFor.map(a => (
              <div
                key={a}
                className="px-2.5 py-1.5 bg-red-subtle border border-[rgba(245,101,101,0.12)] rounded-md text-[12px] text-text-muted"
              >
                {a}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Component compatibility */}
      <div>
        <div className="inspector-label mb-2">Component Compatibility</div>
        <div className="flex gap-2 flex-wrap">
          {profile.componentCompatibility.best.map(c => (
            <span
              key={c}
              className="text-[11px] px-2.5 py-0.5 rounded-full font-semibold"
              style={{
                background: `${profile.color}14`,
                color: profile.color,
                border: `1px solid ${profile.color}30`,
              }}
            >
              ✓ {c}
            </span>
          ))}
          {profile.componentCompatibility.avoid.map(c => (
            <Badge key={c} variant="red" className="text-[11px] font-semibold rounded-full">
              ✗ {c}
            </Badge>
          ))}
        </div>
      </div>

      {/* Example products */}
      <div>
        <div className="inspector-label mb-2">Reference Products</div>
        <div className="flex gap-1.5 flex-wrap">
          {profile.exampleProducts.map(p => (
            <div
              key={p}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-surface-mid border border-border rounded-md text-[12px] text-text-muted"
            >
              <div
                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ background: profile.color }}
              />
              {p}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

type CopyTarget = 'md' | 'agent' | null

function ReferencesTab({ profileId, profile }: { profileId: string; profile: ReturnType<typeof getInteractionStyle> }) {
  const [copied, setCopied] = useState<CopyTarget>(null)
  const [activeExport, setActiveExport] = useState<'md' | 'agent'>('agent')
  const data = getProfileReferences(profileId)
  if (!profile) return null
  if (!data) return null

  // Computed from canonical trait taxonomy — not hand-written
  const agentPrompt = synthesizeCompactPrompt(profileId)
  const designMd    = synthesizeFullContext(profile.name, profileId, data.semanticEssence, {
    doRules:   data.doRules,
    dontRules: data.dontRules,
  })

  function handleCopy(target: 'md' | 'agent') {
    const text = target === 'md' ? designMd : agentPrompt
    navigator.clipboard.writeText(text).then(() => {
      setCopied(target)
      setTimeout(() => setCopied(null), 2200)
    })
  }

  const TRAIT_ROWS: Array<{ key: keyof typeof data.extractedTraits; label: string }> = [
    { key: 'motion',        label: 'Motion'   },
    { key: 'density',       label: 'Density'  },
    { key: 'navigation',    label: 'Navigation' },
    { key: 'visualLanguage',label: 'Visual'   },
    { key: 'typography',    label: 'Type'     },
  ]

  return (
    <div className="flex flex-col gap-7">

      {/* ── Semantic Essence ─────────────────────────────────────────── */}
      <div
        className="px-5 py-[18px] rounded-lg"
        style={{
          background: `${profile.color}08`,
          border: `1.5px solid ${profile.color}25`,
        }}
      >
        <div
          className="text-[9.5px] font-bold tracking-[0.1em] uppercase mb-2"
          style={{ color: profile.color }}
        >
          Semantic Essence
        </div>
        <p className="text-[15px] font-medium text-text leading-[1.55] m-0 tracking-[-0.01em] italic">
          &ldquo;{data.semanticEssence}&rdquo;
        </p>
        <p className="text-[12px] text-text-muted leading-[1.6] mt-2 mb-0">
          {data.summary}
        </p>
      </div>

      {/* ── Two-column: Extracted Traits + References ─────────────────── */}
      <div className="grid gap-4 items-start" style={{ gridTemplateColumns: '220px 1fr' }}>

        {/* LEFT — Extracted Traits + Do/Don't */}
        <div className="flex flex-col gap-3">

          {/* Traits */}
          <Card className="bg-surface-mid overflow-hidden">
            <div className="px-3 py-[9px] border-b border-border bg-surface-high">
              <span className="text-[9.5px] font-bold text-text-subtle tracking-[0.09em] uppercase">
                Extracted Traits
              </span>
            </div>
            {TRAIT_ROWS.map(({ key, label }) => (
              <div key={key} className="px-3 py-2 border-b border-border flex flex-col gap-0.5">
                <span className="text-[9px] text-text-subtle uppercase tracking-[0.08em] font-semibold">{label}</span>
                <span className="text-[10.5px] text-text-muted leading-[1.5] font-mono">{data.extractedTraits[key]}</span>
              </div>
            ))}
          </Card>

          {/* Do */}
          <Card className="bg-surface-mid overflow-hidden">
            <div className="px-3 py-[7px] border-b border-border bg-green-subtle flex items-center gap-1.5">
              <span className="status-dot pass" />
              <span className="text-[9.5px] font-bold text-green tracking-[0.09em] uppercase">Do</span>
            </div>
            {data.doRules.map((rule, i) => (
              <div
                key={i}
                className={cn(
                  'px-3 py-1.5 flex items-start gap-[7px]',
                  i < data.doRules.length - 1 && 'border-b border-border'
                )}
              >
                <span className="text-green text-[11px] flex-shrink-0 mt-px">✓</span>
                <span className="text-[11px] text-text-muted leading-[1.5]">{rule}</span>
              </div>
            ))}
          </Card>

          {/* Don't */}
          <Card className="bg-surface-mid overflow-hidden">
            <div className="px-3 py-[7px] border-b border-border bg-red-subtle flex items-center gap-1.5">
              <span className="status-dot fail" />
              <span className="text-[9.5px] font-bold text-red tracking-[0.09em] uppercase">Don&apos;t</span>
            </div>
            {data.dontRules.map((rule, i) => (
              <div
                key={i}
                className={cn(
                  'px-3 py-1.5 flex items-start gap-[7px]',
                  i < data.dontRules.length - 1 && 'border-b border-border'
                )}
              >
                <span className="text-red text-[11px] flex-shrink-0 mt-px">✗</span>
                <span className="text-[11px] text-text-muted leading-[1.5]">{rule}</span>
              </div>
            ))}
          </Card>
        </div>

        {/* RIGHT — Reference cards */}
        <div className="flex flex-col gap-[7px]">
          <div className="text-[9.5px] font-bold text-text-subtle tracking-[0.09em] uppercase mb-1">
            Curated References
          </div>
          {data.references.map(ref => (
            <a
              key={ref.name}
              href={ref.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block no-underline"
            >
              <div
                className="px-3 py-2.5 bg-surface-mid border border-border rounded-md cursor-pointer transition-[background,border-left-color] duration-150"
                style={{ borderLeft: `2px solid ${profile.color}60` }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = `${profile.color}08`
                  e.currentTarget.style.borderLeftColor = profile.color
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'var(--surface-mid)'
                  e.currentTarget.style.borderLeftColor = profile.color + '60'
                }}
              >
                <div className="flex items-center gap-[7px] mb-1">
                  <span className="text-[12.5px] font-semibold text-text flex-1 tracking-[-0.01em]">{ref.name}</span>
                  <span className="text-[10px] text-text-subtle">↗</span>
                </div>
                <p className="text-[11px] text-text-muted m-0 mb-1.5 leading-[1.55]">
                  {ref.description}
                </p>
                <div className="flex gap-1 flex-wrap">
                  {ref.traits.map(t => (
                    <span
                      key={t}
                      className="text-[9px] px-1.5 py-px rounded-[3px] font-mono font-semibold"
                      style={{
                        background: `${profile.color}10`,
                        color: profile.color,
                        border: `1px solid ${profile.color}20`,
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* ── AI Context Export ─────────────────────────────────────────── */}
      <div>
        <div className="flex items-center gap-2.5 mb-2.5">
          {/* Export type toggle */}
          <div className="flex gap-0.5 p-0.5 bg-surface-high rounded border border-border">
            {(['agent', 'md'] as const).map(exportTab => (
              <Button
                key={exportTab}
                variant={activeExport === exportTab ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setActiveExport(exportTab)}
                className="h-auto py-1 px-3 text-[10.5px]"
              >
                {exportTab === 'agent' ? 'Agent Prompt' : 'Design MD'}
              </Button>
            ))}
          </div>
          <div className="flex-1" />
          <Button
            variant="secondary"
            size="sm"
            onClick={() => handleCopy(activeExport)}
            className={cn(
              'h-auto py-1 px-3 text-[10.5px] font-semibold transition-all duration-200',
              copied === activeExport
                ? 'bg-green-subtle border-[rgba(45,213,120,0.3)] text-green'
                : ''
            )}
            style={
              copied !== activeExport
                ? {
                    background: `${profile.color}14`,
                    border: `1px solid ${profile.color}30`,
                    color: profile.color,
                  }
                : undefined
            }
          >
            {copied === activeExport ? '✓ Copied' : `Copy ${activeExport === 'agent' ? 'Prompt' : 'MD'}`}
          </Button>
        </div>

        {activeExport === 'agent' && (
          <div>
            <p className="text-[11px] text-text-subtle mb-2 leading-[1.5]">
              Compact prompt — paste into Claude, Cursor, or Codex to apply this profile immediately.{' '}
              <span style={{ color: profile.color }}>Generated from canonical trait taxonomy.</span>
            </p>
            <div
              className="bg-surface-mid rounded-lg px-4 py-3.5"
              style={{
                border: `1px solid ${profile.color}20`,
                borderLeft: `3px solid ${profile.color}`,
              }}
            >
              <pre className="m-0 text-[11.5px] leading-[1.75] font-[JetBrains_Mono,Fira_Code,monospace] text-text-muted whitespace-pre-wrap break-words">
                {agentPrompt}
              </pre>
            </div>
          </div>
        )}

        {activeExport === 'md' && (
          <div>
            <p className="text-[11px] text-text-subtle mb-2 leading-[1.5]">
              Full design context — use as DESIGN.md or long-context system prompt.{' '}
              <span style={{ color: profile.color }}>Generated. Stays in sync when traits change.</span>
            </p>
            <div
              className="bg-surface-mid rounded-lg"
              style={{
                border: `1px solid ${profile.color}20`,
                borderLeft: `3px solid ${profile.color}`,
              }}
            >
              <ScrollArea className="max-h-80">
                <pre className="m-0 px-4 py-3.5 text-[11px] leading-[1.7] font-[JetBrains_Mono,Fira_Code,monospace] text-text-muted whitespace-pre-wrap break-words">
                  {designMd}
                </pre>
              </ScrollArea>
            </div>
          </div>
        )}
      </div>

      {/* ── Atomic Demo ───────────────────────────────────────────────── */}
      <div>
        <div className="inspector-label mb-2">Atomic Component · Toggle</div>
        <p className="text-[11px] text-text-subtle mb-2.5 leading-[1.5]">
          Same toggle, different behavioral philosophy — timing, easing, decoration character.
        </p>
        <div
          className="flex items-center justify-center rounded-lg border border-border min-h-20 px-6 py-7"
          style={{ background: demoBg[profileId] ?? 'var(--surface-mid)' }}
        >
          {toggleMap[profileId]}
        </div>
      </div>
    </div>
  )
}

function TokensTab({ profile }: { profile: ReturnType<typeof getInteractionStyle> }) {
  if (!profile) return null

  return (
    <div className="flex flex-col gap-5">
      <div>
        <div className="inspector-label mb-2.5">Motion Token Refs</div>
        <div className="flex flex-col gap-2">
          {profile.motionRefs.map(ref => {
            const token = getInteractionToken(ref)
            return (
              <div
                key={ref}
                className="px-3.5 py-3 bg-surface-mid border border-border rounded-lg"
                style={{ borderLeft: `2px solid ${profile.color}` }}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <code
                    className="text-[12px] font-mono font-semibold px-2 py-0.5 rounded"
                    style={{
                      color: profile.color,
                      background: `${profile.color}10`,
                    }}
                  >
                    {ref}
                  </code>
                </div>
                {token && (
                  <>
                    <p className="text-[11.5px] text-text-muted mb-1.5 leading-[1.5]">{token.description}</p>
                    {token.cssTransition && (
                      <code className="text-[10.5px] font-mono text-text-subtle block">
                        {token.cssTransition}
                      </code>
                    )}
                    {token.cssTransform && (
                      <code className="text-[10.5px] font-mono text-green block mt-0.5">
                        transform: {token.cssTransform}
                      </code>
                    )}
                  </>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Feedback + Decoration + Density */}
      <div className="grid grid-cols-3 gap-2.5">
        {[
          { label: 'Feedback',    value: profile.feedback,   desc: 'How much the UI reacts to interaction' },
          { label: 'Decoration',  value: profile.decoration, desc: 'Visual effects layer (glow, particles)' },
          { label: 'Density',     value: profile.density,    desc: 'Spacing and information density' },
        ].map(item => (
          <Card key={item.label} className="bg-surface-mid p-3.5">
            <div className="inspector-label mb-1.5">{item.label}</div>
            <div className="text-[14px] font-bold text-text mb-1 font-mono">
              {item.value}
            </div>
            <div className="text-[11px] text-text-subtle leading-[1.5]">{item.desc}</div>
          </Card>
        ))}
      </div>
    </div>
  )
}

function DNATab({ profileId, recommendingDNA }: { profileId: string; recommendingDNA: typeof startupDNAProfiles }) {
  return (
    <div className="flex flex-col gap-5">
      <Card className="bg-accent-subtle border-accent-border">
        <CardContent className="px-4 py-3.5">
          <div className="text-[10px] font-semibold text-accent uppercase tracking-[0.08em] mb-1.5">
            Startup DNA → Behavioral Profile
          </div>
          <p className="text-[12.5px] text-text-muted leading-[1.65] m-0">
            AI generators use this mapping to choose interaction behavior based on product context —
            not randomly. The Startup DNA defines <em>what kind of product</em> is being built.
            The Behavioral Profile defines <em>how it should feel</em>.
          </p>
        </CardContent>
      </Card>

      {recommendingDNA.length > 0 ? (
        <div>
          <div className="inspector-label mb-2.5">
            DNA Profiles that recommend this Behavioral Profile ({recommendingDNA.length})
          </div>
          <div className="flex flex-col gap-2">
            {recommendingDNA.map(dna => (
              <div
                key={dna.id}
                className="px-4 py-3.5 rounded-lg"
                style={{
                  background: `${dna.color}0c`,
                  border: `1.5px solid ${dna.color}30`,
                  borderLeft: `3px solid ${dna.color}`,
                }}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <div
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ background: dna.color }}
                  />
                  <span className="text-[13px] font-bold text-text">{dna.name}</span>
                  <Badge variant="default" className="text-[9.5px]">{dna.productType}</Badge>
                  <Badge variant="default" className="text-[9.5px]">{dna.platform}</Badge>
                </div>
                <div className="flex gap-1.5 flex-wrap">
                  {dna.emotionalTone.map(t => (
                    <span
                      key={t}
                      className="text-[10.5px] px-2 py-0.5 rounded-full font-semibold"
                      style={{
                        background: `${dna.color}15`,
                        color: dna.color,
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="px-6 py-6 text-center text-text-subtle text-[13px] bg-surface-mid rounded-lg border border-border">
          No Startup DNA profiles currently map to this behavioral profile.
        </div>
      )}

      {/* All DNA for reference */}
      <div>
        <div className="inspector-label mb-2.5">All Startup DNA Profiles</div>
        <div className="flex flex-col gap-1.5">
          {startupDNAProfiles.map(dna => {
            const recommends = dna.recommendedStyleIds.includes(profileId)
            return (
              <div
                key={dna.id}
                className={cn(
                  'flex items-center gap-2.5 px-3 py-2 rounded-md border',
                  recommends ? 'opacity-100' : 'opacity-50'
                )}
                style={{
                  background: recommends ? `${dna.color}0c` : 'var(--surface-mid)',
                  borderColor: recommends ? `${dna.color}30` : 'var(--border)',
                }}
              >
                <div
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: dna.color }}
                />
                <span className="text-[12px] text-text flex-1">{dna.name}</span>
                {recommends && (
                  <span className="text-[10px] font-bold" style={{ color: dna.color }}>
                    RECOMMENDED
                  </span>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────

export function BehaviorProfileView({ profileId }: { profileId: string }) {
  const [tab, setTab] = useState<Tab>('Overview')
  const profile = getInteractionStyle(profileId)

  if (!profile) {
    return <div className="p-8 text-text-muted">Profile not found: {profileId}</div>
  }

  const recommendingDNA = startupDNAProfiles.filter(d =>
    d.recommendedStyleIds.includes(profileId)
  )

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div
        className="px-6 pt-4 pb-3.5 border-b border-border flex-shrink-0 bg-surface"
        style={{ borderLeft: `3px solid ${profile.color}` }}
      >
        <div className="flex items-center gap-2.5 mb-1">
          <div
            className="w-3 h-3 rounded-full flex-shrink-0"
            style={{
              background: profile.color,
              boxShadow: `0 0 8px ${profile.color}60, 0 0 0 3px ${profile.color}20`,
            }}
          />
          <h1 className="text-[18px] font-bold tracking-[-0.02em] text-text">
            {profile.name}
          </h1>
          <Badge variant="accent">Behavioral Profile</Badge>
          <span
            className="text-[10px] font-semibold px-2 py-0.5 rounded-full ml-auto"
            style={{
              background: `${profile.color}18`,
              color: profile.color,
              border: `1px solid ${profile.color}30`,
            }}
          >
            {profile.animationIntensity}
          </span>
        </div>
        <p className="text-[13px] text-text-muted italic m-0">
          &ldquo;{profile.tagline}&rdquo;
        </p>
      </div>

      {/* Tabs + Content */}
      <Tabs
        value={tab}
        onValueChange={(v) => setTab(v as Tab)}
        className="flex flex-col flex-1 overflow-hidden"
      >
        <TabsList className="flex-shrink-0 px-2">
          {TABS.map(t => (
            <TabsTrigger key={t} value={t}>{t}</TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="Overview" className="flex-1 overflow-auto">
          <div className="px-6 py-5">
            <OverviewTab profile={profile} />
          </div>
        </TabsContent>

        <TabsContent value="References" className="flex-1 overflow-auto">
          <div className="px-6 py-5">
            <ReferencesTab profileId={profileId} profile={profile} />
          </div>
        </TabsContent>

        <TabsContent value="Tokens" className="flex-1 overflow-auto">
          <div className="px-6 py-5">
            <TokensTab profile={profile} />
          </div>
        </TabsContent>

        <TabsContent value="DNA" className="flex-1 overflow-auto">
          <div className="px-6 py-5">
            <DNATab profileId={profileId} recommendingDNA={recommendingDNA} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
