'use client'

import { useState } from 'react'
import { interactionStyles, startupDNAProfiles, getInteractionStyle } from '@/data/interactionStyles'
import { interactionProfiles } from '@/data/interactions'
import {
  MinimalToggle, EnterpriseToggle, PremiumToggle,
  PlayfulToggle, CyberToggle, NativeMobileToggle,
  ToggleStyleGallery,
} from '@/components/styleVariants/ToggleVariants'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'

const TABS = ['Gallery', 'Styles', 'Startup DNA'] as const
type Tab = typeof TABS[number]

const decorationMeta: Record<string, { label: string; color: string }> = {
  none:      { label: 'None',      color: 'var(--text-subtle)' },
  subtle:    { label: 'Subtle',    color: 'var(--accent)' },
  glow:      { label: 'Glow',      color: '#03e9f4' },
  particles: { label: 'Particles', color: '#8b5cf6' },
}

const feedbackMeta: Record<string, { color: string }> = {
  restrained: { color: 'var(--text-muted)' },
  balanced:   { color: 'var(--accent)' },
  expressive: { color: 'var(--purple)' },
}

const intensityMeta: Record<string, { color: string; bg: string }> = {
  instant:    { color: 'var(--text-subtle)',  bg: 'var(--surface-high)' },
  minimal:    { color: 'var(--text-muted)',   bg: 'var(--surface-high)' },
  standard:   { color: 'var(--accent)',       bg: 'var(--accent-subtle)' },
  expressive: { color: 'var(--purple)',       bg: 'var(--purple-subtle)' },
  cinematic:  { color: '#03e9f4',             bg: 'rgba(3,233,244,0.08)' },
}

// Map styleId → live toggle component
const styleToggleMap: Record<string, React.ReactNode> = {
  minimal:       <MinimalToggle label="Feature flag" />,
  enterprise:    <EnterpriseToggle label="Notifications" />,
  premium:       <PremiumToggle label="Wi-Fi" />,
  playful:       <PlayfulToggle label="Dark Mode" />,
  cyber:         <CyberToggle label="Neural link" />,
  'native-mobile': <NativeMobileToggle label="Airplane Mode" />,
}

const styleBg: Record<string, string> = {
  minimal:       '#111',
  enterprise:    '#f8fafc',
  premium:       '#f5f5f7',
  playful:       '#fffbeb',
  cyber:         '#050505',
  'native-mobile': '#f2f2f7',
}

function StyleDetailCard({ styleId, selected, onClick }: { styleId: string; selected: boolean; onClick: () => void }) {
  const style = getInteractionStyle(styleId)
  if (!style) return null
  const im = intensityMeta[style.animationIntensity]
  const dm = decorationMeta[style.decoration]

  return (
    <button
      onClick={onClick}
      className="rounded-lg text-left transition-all w-full px-4 py-3.5 cursor-pointer"
      style={{
        background: selected ? `${style.color}12` : 'var(--surface-mid)',
        border: `1.5px solid ${selected ? style.color + '60' : 'var(--border)'}`,
      }}
    >
      <div className="flex items-center gap-2 mb-1.5">
        <div style={{ width: 9, height: 9, borderRadius: '50%', background: style.color, flexShrink: 0, boxShadow: `0 0 0 3px ${style.color}20` }} />
        <span className="text-text font-bold" style={{ fontSize: 13, letterSpacing: '-0.01em' }}>{style.name}</span>
        <span
          className="ml-auto font-semibold"
          style={{ fontSize: 9.5, padding: '1px 6px', borderRadius: 99, background: im.bg, color: im.color }}
        >
          {style.animationIntensity}
        </span>
      </div>
      <p className="text-text-muted italic mb-2" style={{ fontSize: 11 }}>
        &ldquo;{style.tagline}&rdquo;
      </p>
      <div className="flex gap-1 flex-wrap">
        <span style={{ fontSize: 9.5, padding: '1px 6px', borderRadius: 99, background: `${dm.color}18`, color: dm.color, fontWeight: 600 }}>
          {dm.label} deco
        </span>
        <span style={{ fontSize: 9.5, padding: '1px 6px', borderRadius: 99, background: `${feedbackMeta[style.feedback].color}18`, color: feedbackMeta[style.feedback].color, fontWeight: 600 }}>
          {style.feedback}
        </span>
        <span className="chip default" style={{ fontSize: 9.5 }}>{style.density}</span>
      </div>
    </button>
  )
}

function StyleDetailPanel({ styleId }: { styleId: string }) {
  const style = getInteractionStyle(styleId)
  if (!style) return null

  const linkedProfile = interactionProfiles.find(p =>
    p.themeIds.some(tid => style.themeIds.includes(tid))
  )
  const im = intensityMeta[style.animationIntensity]
  const dm = decorationMeta[style.decoration]

  return (
    <div className="flex flex-col gap-5">
      {/* Header */}
      <div
        className="rounded-lg p-5"
        style={{
          background: `${style.color}0e`,
          border: `1.5px solid ${style.color}35`,
        }}
      >
        <div className="flex items-center gap-2.5 mb-2">
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: style.color, boxShadow: `0 0 10px ${style.color}70` }} />
          <span className="text-text font-extrabold" style={{ fontSize: 20, letterSpacing: '-0.02em' }}>{style.name}</span>
        </div>
        <p className="text-text italic mb-2.5" style={{ fontSize: 13 }}>
          &ldquo;{style.tagline}&rdquo;
        </p>
        <p className="text-text-muted" style={{ fontSize: 12.5, lineHeight: 1.65 }}>
          {style.personality}
        </p>
      </div>

      {/* Live demo */}
      <div>
        <div className="text-text-subtle font-semibold uppercase mb-2.5" style={{ fontSize: 10, letterSpacing: '0.08em' }}>
          Toggle · Live Demo
        </div>
        <div
          className="border border-border rounded-lg flex items-center justify-center"
          style={{
            padding: '28px 32px',
            background: styleBg[styleId] ?? 'var(--surface-mid)',
            minHeight: 90,
          }}
        >
          {styleToggleMap[styleId]}
        </div>
      </div>

      {/* Behavior profile */}
      <div>
        <div className="text-text-subtle font-semibold uppercase mb-2.5" style={{ fontSize: 10, letterSpacing: '0.08em' }}>
          Behavior Profile
        </div>
        <div className="grid gap-2" style={{ gridTemplateColumns: '1fr 1fr' }}>
          {[
            { label: 'Animation Intensity', value: style.animationIntensity, color: im.color },
            { label: 'Feedback', value: style.feedback, color: feedbackMeta[style.feedback].color },
            { label: 'Decoration', value: style.decoration, color: dm.color },
            { label: 'Density', value: style.density, color: 'var(--text-muted)' },
            { label: 'Gesture Model', value: style.gestureModel, color: 'var(--text-muted)' },
            { label: 'Motion Refs', value: style.motionRefs.length + ' tokens', color: 'var(--accent)' },
          ].map(item => (
            <div key={item.label} className="bg-surface-mid border border-border rounded-md px-3 py-2.5">
              <div className="text-text-subtle uppercase mb-0.5" style={{ fontSize: 9.5, letterSpacing: '0.07em' }}>
                {item.label}
              </div>
              <div className="font-semibold" style={{ fontSize: 12.5, color: item.color, fontFamily: 'monospace' }}>
                {item.value}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Motion tokens */}
      <div>
        <div className="text-text-subtle font-semibold uppercase mb-2" style={{ fontSize: 10, letterSpacing: '0.08em' }}>
          Interaction Token Refs
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {style.motionRefs.map(ref => (
            <code
              key={ref}
              className="rounded"
              style={{
                fontSize: 11, fontFamily: 'monospace',
                padding: '3px 9px',
                background: `${style.color}14`, color: style.color,
                border: `1px solid ${style.color}30`,
              }}
            >
              {ref}
            </code>
          ))}
        </div>
      </div>

      {/* Product fit */}
      <div>
        <div className="text-text-subtle font-semibold uppercase mb-2" style={{ fontSize: 10, letterSpacing: '0.08em' }}>
          Product Fit
        </div>
        <div className="flex gap-1 flex-wrap mb-2.5">
          {style.productFit.map(f => (
            <span key={f} className="chip default" style={{ fontSize: 10 }}>{f}</span>
          ))}
        </div>
        <div className="text-text-subtle mb-1.5" style={{ fontSize: 11 }}>Emotional tone:</div>
        <div className="flex gap-1 flex-wrap">
          {style.emotionalTone.map(t => (
            <span
              key={t}
              className="font-semibold"
              style={{ fontSize: 10, padding: '2px 8px', borderRadius: 99, background: `${style.color}12`, color: style.color }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Example products */}
      <div>
        <div className="text-text-subtle font-semibold uppercase mb-2" style={{ fontSize: 10, letterSpacing: '0.08em' }}>
          Example Products
        </div>
        <div className="flex flex-col gap-1">
          {style.exampleProducts.map(p => (
            <div
              key={p}
              className="flex items-center gap-2 bg-surface-mid border border-border rounded-md px-2.5 py-1.5 text-text-muted"
              style={{ fontSize: 12 }}
            >
              <div style={{ width: 5, height: 5, borderRadius: '50%', background: style.color, flexShrink: 0 }} />
              {p}
            </div>
          ))}
        </div>
      </div>

      {linkedProfile && (
        <div className="bg-accent-subtle border border-accent-border rounded-md px-3.5 py-3 text-text-muted" style={{ fontSize: 11.5 }}>
          Linked to <span className="text-accent font-semibold">{linkedProfile.name}</span> interaction profile
        </div>
      )}
    </div>
  )
}

function DNAView() {
  const [selected, setSelected] = useState(startupDNAProfiles[0].id)
  const dna = startupDNAProfiles.find(d => d.id === selected)!

  return (
    <div className="flex flex-col gap-5">
      <div className="bg-accent-subtle border border-accent-border rounded-lg px-4 py-3.5">
        <div className="text-accent font-semibold uppercase mb-1.5" style={{ fontSize: 10, letterSpacing: '0.08em' }}>
          Startup DNA → Interaction Style
        </div>
        <p className="text-text-muted" style={{ fontSize: 12.5, lineHeight: 1.65 }}>
          Define your product&apos;s DNA — platform, audience, emotional tone.
          The system recommends which Interaction Styles fit your context.
          AI generators use this to avoid randomly assigning interaction behaviors.
        </p>
      </div>

      {/* DNA selector */}
      <div className="flex flex-col gap-1.5">
        {startupDNAProfiles.map(d => (
          <button
            key={d.id}
            onClick={() => setSelected(d.id)}
            className="rounded-md px-3.5 py-3 cursor-pointer text-left transition-all"
            style={{
              background: selected === d.id ? `${d.color}12` : 'var(--surface-mid)',
              border: `1.5px solid ${selected === d.id ? d.color + '50' : 'var(--border)'}`,
            }}
          >
            <div className="flex items-center gap-2">
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: d.color }} />
              <span className="text-text font-bold" style={{ fontSize: 13 }}>{d.name}</span>
              <span className="chip default" style={{ fontSize: 9.5 }}>{d.productType}</span>
              <span className="chip default" style={{ fontSize: 9.5 }}>{d.platform}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Result */}
      <div>
        <div className="text-text-subtle font-semibold uppercase mb-2.5" style={{ fontSize: 10, letterSpacing: '0.08em' }}>
          Recommended Interaction Styles for: <span style={{ color: dna.color }}>{dna.name}</span>
        </div>
        <div className="flex flex-col gap-2">
          {dna.recommendedStyleIds.map((sid, i) => {
            const s = getInteractionStyle(sid)
            if (!s) return null
            return (
              <div
                key={sid}
                className="flex items-center gap-3.5 bg-surface-mid rounded-lg px-4 py-3.5"
                style={{
                  border: `1.5px solid ${s.color}30`,
                  borderLeft: `3px solid ${s.color}`,
                }}
              >
                <div
                  className="flex items-center justify-center shrink-0 font-extrabold"
                  style={{
                    width: 24, height: 24, borderRadius: '50%',
                    background: `${s.color}18`, border: `1px solid ${s.color}40`,
                    fontSize: 11, color: s.color,
                  }}
                >
                  {i + 1}
                </div>
                <div>
                  <div className="text-text font-bold mb-0.5" style={{ fontSize: 13 }}>{s.name}</div>
                  <div className="text-text-muted italic" style={{ fontSize: 11 }}>&ldquo;{s.tagline}&rdquo;</div>
                </div>
                <div className="ml-auto flex gap-1">
                  {s.emotionalTone.slice(0, 2).map(t => (
                    <span
                      key={t}
                      className="font-semibold"
                      style={{ fontSize: 9.5, padding: '2px 7px', borderRadius: 99, background: `${s.color}15`, color: s.color }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Emotional tone */}
      <div className="bg-surface-mid border border-border rounded-md px-4 py-3.5">
        <div className="text-text-subtle font-semibold uppercase mb-2" style={{ fontSize: 10, letterSpacing: '0.08em' }}>
          Emotional Tone
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {dna.emotionalTone.map(t => (
            <span
              key={t}
              className="font-semibold"
              style={{ padding: '3px 10px', borderRadius: 99, fontSize: 11, background: `${dna.color}15`, color: dna.color }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export function InteractionStylesView() {
  const [selectedStyleId, setSelectedStyleId] = useState('enterprise')

  return (
    <Tabs defaultValue="Gallery" className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="px-6 pt-4 pb-3.5 border-b border-border shrink-0 bg-surface">
        <div className="flex items-center gap-2 mb-1">
          <h1 className="text-lg font-bold text-text" style={{ letterSpacing: '-0.02em' }}>
            Interaction Styles
          </h1>
          <Badge variant="default">{interactionStyles.length} styles</Badge>
          <Badge variant="accent">Behavioral</Badge>
        </div>
        <p className="text-text-muted m-0" style={{ fontSize: 13 }}>
          Named behavioral personalities — the same component moves differently depending on which style the theme adopts.
        </p>
      </div>

      {/* Tabs */}
      <TabsList className="tab-bar rounded-none justify-start px-6 h-auto bg-transparent border-b border-border">
        {TABS.map(t => (
          <TabsTrigger key={t} value={t} className="tab">
            {t}
          </TabsTrigger>
        ))}
      </TabsList>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-5">
        <TabsContent value="Gallery" className="mt-0">
          <div className="flex flex-col gap-6">
            <div>
              <div className="inspector-label mb-2.5">
                Toggle · All Style Variants · hover / click each to interact
              </div>
              <p className="text-text-muted mb-4" style={{ fontSize: 12, lineHeight: 1.6 }}>
                The same Toggle component, 6 different behavioral identities.
                Each has different motion timing, decoration level, and emotional character.
                Switching themes changes which style is active — the component
                inherits behavior, not just color.
              </p>
              <ToggleStyleGallery />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="Styles" className="mt-0">
          <div className="grid gap-5 items-start" style={{ gridTemplateColumns: '240px 1fr' }}>
            {/* Style list */}
            <div className="flex flex-col gap-1.5">
              {interactionStyles.map(s => (
                <StyleDetailCard
                  key={s.id}
                  styleId={s.id}
                  selected={selectedStyleId === s.id}
                  onClick={() => setSelectedStyleId(s.id)}
                />
              ))}
            </div>
            {/* Detail panel */}
            <StyleDetailPanel styleId={selectedStyleId} />
          </div>
        </TabsContent>

        <TabsContent value="Startup DNA" className="mt-0">
          <DNAView />
        </TabsContent>
      </div>
    </Tabs>
  )
}
