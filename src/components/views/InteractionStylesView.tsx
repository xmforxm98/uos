'use client'

import { useState } from 'react'
import { interactionStyles, startupDNAProfiles, getInteractionStyle } from '@/data/interactionStyles'
import { interactionProfiles } from '@/data/interactions'
import {
  MinimalToggle, EnterpriseToggle, PremiumToggle,
  PlayfulToggle, CyberToggle, NativeMobileToggle,
  ToggleStyleGallery,
} from '@/components/styleVariants/ToggleVariants'

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
      style={{
        padding: '14px 16px',
        background: selected ? `${style.color}12` : 'var(--surface-mid)',
        border: `1.5px solid ${selected ? style.color + '60' : 'var(--border)'}`,
        borderRadius: 'var(--radius-lg)',
        cursor: 'pointer',
        textAlign: 'left',
        transition: 'all 120ms',
        width: '100%',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5 }}>
        <div style={{ width: 9, height: 9, borderRadius: '50%', background: style.color, flexShrink: 0, boxShadow: `0 0 0 3px ${style.color}20` }} />
        <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.01em' }}>{style.name}</span>
        <span style={{
          fontSize: 9.5, fontWeight: 600, padding: '1px 6px', borderRadius: 99,
          background: im.bg, color: im.color, marginLeft: 'auto',
        }}>
          {style.animationIntensity}
        </span>
      </div>
      <p style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 8, fontStyle: 'italic' }}>
        &ldquo;{style.tagline}&rdquo;
      </p>
      <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Header */}
      <div style={{
        padding: '20px',
        background: `${style.color}0e`,
        border: `1.5px solid ${style.color}35`,
        borderRadius: 'var(--radius-lg)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: style.color, boxShadow: `0 0 10px ${style.color}70` }} />
          <span style={{ fontSize: 20, fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em' }}>{style.name}</span>
        </div>
        <p style={{ fontSize: 13, color: 'var(--text)', fontStyle: 'italic', marginBottom: 10 }}>
          &ldquo;{style.tagline}&rdquo;
        </p>
        <p style={{ fontSize: 12.5, color: 'var(--text-muted)', lineHeight: 1.65 }}>
          {style.personality}
        </p>
      </div>

      {/* Live demo */}
      <div>
        <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-subtle)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>
          Toggle · Live Demo
        </div>
        <div style={{
          padding: '28px 32px',
          background: styleBg[styleId] ?? 'var(--surface-mid)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          minHeight: 90,
        }}>
          {styleToggleMap[styleId]}
        </div>
      </div>

      {/* Behavior profile */}
      <div>
        <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-subtle)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>
          Behavior Profile
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {[
            { label: 'Animation Intensity', value: style.animationIntensity, color: im.color },
            { label: 'Feedback', value: style.feedback, color: feedbackMeta[style.feedback].color },
            { label: 'Decoration', value: style.decoration, color: dm.color },
            { label: 'Density', value: style.density, color: 'var(--text-muted)' },
            { label: 'Gesture Model', value: style.gestureModel, color: 'var(--text-muted)' },
            { label: 'Motion Refs', value: style.motionRefs.length + ' tokens', color: 'var(--accent)' },
          ].map(item => (
            <div key={item.label} style={{
              padding: '10px 12px',
              background: 'var(--surface-mid)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-md)',
            }}>
              <div style={{ fontSize: 9.5, color: 'var(--text-subtle)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 3 }}>
                {item.label}
              </div>
              <div style={{ fontSize: 12.5, fontWeight: 600, color: item.color, fontFamily: 'monospace' }}>
                {item.value}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Motion tokens */}
      <div>
        <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-subtle)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>
          Interaction Token Refs
        </div>
        <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
          {style.motionRefs.map(ref => (
            <code key={ref} style={{
              fontSize: 11, fontFamily: 'monospace',
              padding: '3px 9px', borderRadius: 5,
              background: `${style.color}14`, color: style.color,
              border: `1px solid ${style.color}30`,
            }}>
              {ref}
            </code>
          ))}
        </div>
      </div>

      {/* Product fit */}
      <div>
        <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-subtle)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>
          Product Fit
        </div>
        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: 10 }}>
          {style.productFit.map(f => (
            <span key={f} className="chip default" style={{ fontSize: 10 }}>{f}</span>
          ))}
        </div>
        <div style={{ fontSize: 11, color: 'var(--text-subtle)', marginBottom: 6 }}>Emotional tone:</div>
        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
          {style.emotionalTone.map(t => (
            <span key={t} style={{
              fontSize: 10, padding: '2px 8px', borderRadius: 99,
              background: `${style.color}12`, color: style.color, fontWeight: 600,
            }}>
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Example products */}
      <div>
        <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-subtle)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>
          Example Products
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {style.exampleProducts.map(p => (
            <div key={p} style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '6px 10px',
              background: 'var(--surface-mid)', border: '1px solid var(--border)',
              borderRadius: 'var(--radius-md)',
              fontSize: 12, color: 'var(--text-muted)',
            }}>
              <div style={{ width: 5, height: 5, borderRadius: '50%', background: style.color, flexShrink: 0 }} />
              {p}
            </div>
          ))}
        </div>
      </div>

      {linkedProfile && (
        <div style={{
          padding: '12px 14px',
          background: 'var(--accent-subtle)', border: '1px solid var(--accent-border)',
          borderRadius: 'var(--radius-md)',
          fontSize: 11.5, color: 'var(--text-muted)',
        }}>
          Linked to <span style={{ color: 'var(--accent)', fontWeight: 600 }}>{linkedProfile.name}</span> interaction profile
        </div>
      )}
    </div>
  )
}

function DNAView() {
  const [selected, setSelected] = useState(startupDNAProfiles[0].id)
  const dna = startupDNAProfiles.find(d => d.id === selected)!

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{
        background: 'var(--accent-subtle)', border: '1px solid var(--accent-border)',
        borderRadius: 'var(--radius-lg)', padding: '14px 16px',
      }}>
        <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>
          Startup DNA → Interaction Style
        </div>
        <p style={{ fontSize: 12.5, color: 'var(--text-muted)', lineHeight: 1.65 }}>
          Define your product&apos;s DNA — platform, audience, emotional tone.
          The system recommends which Interaction Styles fit your context.
          AI generators use this to avoid randomly assigning interaction behaviors.
        </p>
      </div>

      {/* DNA selector */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {startupDNAProfiles.map(d => (
          <button
            key={d.id}
            onClick={() => setSelected(d.id)}
            style={{
              padding: '12px 14px',
              background: selected === d.id ? `${d.color}12` : 'var(--surface-mid)',
              border: `1.5px solid ${selected === d.id ? d.color + '50' : 'var(--border)'}`,
              borderRadius: 'var(--radius-md)',
              cursor: 'pointer', textAlign: 'left',
              transition: 'all 100ms',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: d.color }} />
              <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>{d.name}</span>
              <span className="chip default" style={{ fontSize: 9.5 }}>{d.productType}</span>
              <span className="chip default" style={{ fontSize: 9.5 }}>{d.platform}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Result */}
      <div>
        <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-subtle)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>
          Recommended Interaction Styles for: <span style={{ color: dna.color }}>{dna.name}</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {dna.recommendedStyleIds.map((sid, i) => {
            const s = getInteractionStyle(sid)
            if (!s) return null
            return (
              <div key={sid} style={{
                display: 'flex', alignItems: 'center', gap: 14,
                padding: '14px 16px',
                background: 'var(--surface-mid)', border: `1.5px solid ${s.color}30`,
                borderRadius: 'var(--radius-lg)',
                borderLeft: `3px solid ${s.color}`,
              }}>
                <div style={{
                  width: 24, height: 24, borderRadius: '50%',
                  background: `${s.color}18`, border: `1px solid ${s.color}40`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 11, fontWeight: 800, color: s.color, flexShrink: 0,
                }}>
                  {i + 1}
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 3 }}>{s.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', fontStyle: 'italic' }}>&ldquo;{s.tagline}&rdquo;</div>
                </div>
                <div style={{ marginLeft: 'auto', display: 'flex', gap: 4 }}>
                  {s.emotionalTone.slice(0, 2).map(t => (
                    <span key={t} style={{
                      fontSize: 9.5, padding: '2px 7px', borderRadius: 99,
                      background: `${s.color}15`, color: s.color, fontWeight: 600,
                    }}>
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
      <div style={{
        padding: '14px 16px',
        background: 'var(--surface-mid)', border: '1px solid var(--border)',
        borderRadius: 'var(--radius-md)',
      }}>
        <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-subtle)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>
          Emotional Tone
        </div>
        <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
          {dna.emotionalTone.map(t => (
            <span key={t} style={{
              padding: '3px 10px', borderRadius: 99, fontSize: 11,
              background: `${dna.color}15`, color: dna.color, fontWeight: 600,
            }}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export function InteractionStylesView() {
  const [tab, setTab] = useState<Tab>('Gallery')
  const [selectedStyleId, setSelectedStyleId] = useState('enterprise')

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{
        padding: '16px 24px 14px',
        borderBottom: '1px solid var(--border)',
        flexShrink: 0, background: 'var(--surface)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <h1 style={{ fontSize: 18, fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text)' }}>
            Interaction Styles
          </h1>
          <span className="chip default">{interactionStyles.length} styles</span>
          <span className="chip accent">Behavioral</span>
        </div>
        <p style={{ fontSize: 13, color: 'var(--text-muted)', margin: 0 }}>
          Named behavioral personalities — the same component moves differently depending on which style the theme adopts.
        </p>
      </div>

      {/* Tabs */}
      <div className="tab-bar">
        {TABS.map(t => (
          <button key={t} className={`tab ${tab === t ? 'active' : ''}`} onClick={() => setTab(t)}>
            {t}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px' }}>
        {tab === 'Gallery' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div>
              <div className="inspector-label" style={{ marginBottom: 10 }}>
                Toggle · All Style Variants · hover / click each to interact
              </div>
              <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 16, lineHeight: 1.6 }}>
                The same Toggle component, 6 different behavioral identities.
                Each has different motion timing, decoration level, and emotional character.
                Switching themes changes which style is active — the component
                inherits behavior, not just color.
              </p>
              <ToggleStyleGallery />
            </div>
          </div>
        )}

        {tab === 'Styles' && (
          <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: 20, alignItems: 'start' }}>
            {/* Style list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
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
        )}

        {tab === 'Startup DNA' && <DNAView />}
      </div>
    </div>
  )
}
