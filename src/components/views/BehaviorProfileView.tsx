'use client'

import { useState } from 'react'
import { getInteractionStyle, startupDNAProfiles, interactionStyles } from '@/data/interactionStyles'
import { getInteractionToken } from '@/data/interactions'
import {
  MinimalToggle, EnterpriseToggle, PremiumToggle,
  PlayfulToggle, CyberToggle, NativeMobileToggle, AINativeToggle,
} from '@/components/styleVariants/ToggleVariants'

const TABS = ['Overview', 'Live Demo', 'Tokens', 'DNA'] as const
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Personality card */}
      <div style={{
        padding: '20px',
        background: `${profile.color}0c`,
        border: `1.5px solid ${profile.color}35`,
        borderRadius: 'var(--radius-lg)',
      }}>
        <p style={{ fontSize: 13.5, color: 'var(--text)', lineHeight: 1.7 }}>
          {profile.personality}
        </p>
      </div>

      {/* Behavior matrix */}
      <div>
        <div className="inspector-label" style={{ marginBottom: 10 }}>Behavior Profile</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
          {[
            { label: 'Animation Intensity', value: profile.animationIntensity, color: im.color, bg: im.bg },
            { label: 'Feedback Style',     value: profile.feedback,           color: feedbackMeta[profile.feedback], bg: 'var(--surface-high)' },
            { label: 'Decoration',         value: dm.label,                   color: dm.color, bg: 'var(--surface-high)' },
            { label: 'Density',            value: profile.density,            color: 'var(--text-muted)', bg: 'var(--surface-high)' },
            { label: 'Gesture Model',      value: profile.gestureModel,       color: 'var(--text-muted)', bg: 'var(--surface-high)' },
            { label: 'Motion Tokens',      value: `${profile.motionRefs.length} refs`, color: 'var(--accent)', bg: 'var(--accent-subtle)' },
          ].map(item => (
            <div key={item.label} style={{
              padding: '12px 14px',
              background: item.bg,
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-md)',
            }}>
              <div style={{ fontSize: 9.5, color: 'var(--text-subtle)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 4 }}>
                {item.label}
              </div>
              <div style={{ fontSize: 13, fontWeight: 600, color: item.color, fontFamily: 'monospace' }}>
                {item.value}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Emotional tone */}
      <div>
        <div className="inspector-label" style={{ marginBottom: 8 }}>Emotional Tone</div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {profile.emotionalTone.map(t => (
            <span key={t} style={{
              padding: '4px 12px', borderRadius: 99, fontSize: 12, fontWeight: 600,
              background: `${profile.color}14`, color: profile.color,
              border: `1px solid ${profile.color}30`,
            }}>
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Usage guidance */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div>
          <div style={{ fontSize: 11, color: 'var(--green)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 5 }}>
            <span className="status-dot pass" /> Use for
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {profile.usageGuidance.useFor.map(u => (
              <div key={u} style={{
                padding: '6px 10px',
                background: 'var(--green-subtle)', border: '1px solid rgba(45,213,120,0.15)',
                borderRadius: 'var(--radius-md)', fontSize: 12, color: 'var(--text-muted)',
              }}>
                {u}
              </div>
            ))}
          </div>
        </div>
        <div>
          <div style={{ fontSize: 11, color: 'var(--red)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 5 }}>
            <span className="status-dot fail" /> Avoid for
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {profile.usageGuidance.avoidFor.map(a => (
              <div key={a} style={{
                padding: '6px 10px',
                background: 'var(--red-subtle)', border: '1px solid rgba(245,101,101,0.12)',
                borderRadius: 'var(--radius-md)', fontSize: 12, color: 'var(--text-muted)',
              }}>
                {a}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Component compatibility */}
      <div>
        <div className="inspector-label" style={{ marginBottom: 8 }}>Component Compatibility</div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {profile.componentCompatibility.best.map(c => (
            <span key={c} style={{
              fontSize: 11, padding: '3px 10px', borderRadius: 99,
              background: `${profile.color}14`, color: profile.color,
              fontWeight: 600, border: `1px solid ${profile.color}30`,
            }}>
              ✓ {c}
            </span>
          ))}
          {profile.componentCompatibility.avoid.map(c => (
            <span key={c} style={{
              fontSize: 11, padding: '3px 10px', borderRadius: 99,
              background: 'var(--red-subtle)', color: 'var(--red)',
              fontWeight: 600,
            }}>
              ✗ {c}
            </span>
          ))}
        </div>
      </div>

      {/* Example products */}
      <div>
        <div className="inspector-label" style={{ marginBottom: 8 }}>Reference Products</div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {profile.exampleProducts.map(p => (
            <div key={p} style={{
              padding: '5px 12px',
              background: 'var(--surface-mid)', border: '1px solid var(--border)',
              borderRadius: 'var(--radius-md)', fontSize: 12, color: 'var(--text-muted)',
              display: 'flex', alignItems: 'center', gap: 6,
            }}>
              <div style={{ width: 5, height: 5, borderRadius: '50%', background: profile.color }} />
              {p}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function LiveDemoTab({ profileId, profile }: { profileId: string; profile: ReturnType<typeof getInteractionStyle> }) {
  if (!profile) return null
  const toggle = toggleMap[profileId]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <div className="inspector-label" style={{ marginBottom: 4 }}>Toggle · {profile.name} Style</div>
        <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 14, lineHeight: 1.6 }}>
          Click to toggle. Notice the motion character — timing, easing, decoration level, and
          emotional feel are all determined by this Behavioral Profile.
        </p>
        <div style={{
          padding: '40px 32px',
          background: demoBg[profileId] ?? 'var(--surface-mid)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          minHeight: 120,
        }}>
          {toggle}
        </div>
      </div>

      {/* Motion signature */}
      <div style={{
        padding: '16px 18px',
        background: 'var(--surface-mid)', border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)',
      }}>
        <div className="inspector-label" style={{ marginBottom: 10 }}>Motion Signature</div>
        <div style={{ display: 'grid', gridTemplateColumns: '90px 1fr', gap: '6px 12px', alignItems: 'baseline' }}>
          <span style={{ fontSize: 10.5, color: 'var(--text-subtle)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Intensity</span>
          <span style={{ fontSize: 12, color: intensityMeta[profile.animationIntensity].color, fontWeight: 600 }}>{profile.animationIntensity}</span>
          <span style={{ fontSize: 10.5, color: 'var(--text-subtle)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Feedback</span>
          <span style={{ fontSize: 12, color: feedbackMeta[profile.feedback], fontWeight: 600 }}>{profile.feedback}</span>
          <span style={{ fontSize: 10.5, color: 'var(--text-subtle)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Decoration</span>
          <span style={{ fontSize: 12, color: decorationMeta[profile.decoration].color, fontWeight: 600 }}>{decorationMeta[profile.decoration].label}</span>
          <span style={{ fontSize: 10.5, color: 'var(--text-subtle)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Gesture</span>
          <span style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: 'monospace' }}>{profile.gestureModel}</span>
        </div>
      </div>

      {/* Compare with others */}
      <div>
        <div className="inspector-label" style={{ marginBottom: 8 }}>All Profiles — Quick Compare</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {interactionStyles.map(s => (
            <div key={s.id} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '8px 12px',
              background: s.id === profileId ? `${s.color}10` : 'var(--surface-mid)',
              border: `1px solid ${s.id === profileId ? s.color + '40' : 'var(--border)'}`,
              borderRadius: 'var(--radius-md)',
              borderLeft: `2px solid ${s.color}`,
              opacity: s.id === profileId ? 1 : 0.6,
            }}>
              <div style={{ width: 7, height: 7, borderRadius: '50%', background: s.color, flexShrink: 0 }} />
              <span style={{ fontSize: 12, fontWeight: s.id === profileId ? 700 : 400, color: 'var(--text)', width: 120 }}>{s.name}</span>
              <span style={{ fontSize: 10.5, color: 'var(--text-subtle)', fontFamily: 'monospace', flex: 1 }}>{s.animationIntensity} · {s.feedback} · {s.decoration}</span>
              {s.id === profileId && <span style={{ fontSize: 9, fontWeight: 700, color: s.color }}>← CURRENT</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function TokensTab({ profile }: { profile: ReturnType<typeof getInteractionStyle> }) {
  if (!profile) return null

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div>
        <div className="inspector-label" style={{ marginBottom: 10 }}>Motion Token Refs</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {profile.motionRefs.map(ref => {
            const token = getInteractionToken(ref)
            return (
              <div key={ref} style={{
                padding: '12px 14px',
                background: 'var(--surface-mid)', border: '1px solid var(--border)',
                borderRadius: 'var(--radius-lg)',
                borderLeft: `2px solid ${profile.color}`,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5 }}>
                  <code style={{
                    fontSize: 12, fontFamily: 'monospace', fontWeight: 600,
                    color: profile.color, background: `${profile.color}10`,
                    padding: '2px 8px', borderRadius: 4,
                  }}>
                    {ref}
                  </code>
                </div>
                {token && (
                  <>
                    <p style={{ fontSize: 11.5, color: 'var(--text-muted)', marginBottom: 6, lineHeight: 1.5 }}>{token.description}</p>
                    {token.cssTransition && (
                      <code style={{ fontSize: 10.5, fontFamily: 'monospace', color: 'var(--text-subtle)', display: 'block' }}>
                        {token.cssTransition}
                      </code>
                    )}
                    {token.cssTransform && (
                      <code style={{ fontSize: 10.5, fontFamily: 'monospace', color: 'var(--green)', display: 'block', marginTop: 2 }}>
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
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
        {[
          { label: 'Feedback',    value: profile.feedback,           desc: 'How much the UI reacts to interaction' },
          { label: 'Decoration',  value: profile.decoration,         desc: 'Visual effects layer (glow, particles)' },
          { label: 'Density',     value: profile.density,            desc: 'Spacing and information density' },
        ].map(item => (
          <div key={item.label} style={{
            padding: '14px',
            background: 'var(--surface-mid)', border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)',
          }}>
            <div className="inspector-label" style={{ marginBottom: 6 }}>{item.label}</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 4, fontFamily: 'monospace' }}>
              {item.value}
            </div>
            <div style={{ fontSize: 11, color: 'var(--text-subtle)', lineHeight: 1.5 }}>{item.desc}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function DNATab({ profileId, recommendingDNA }: { profileId: string; recommendingDNA: typeof startupDNAProfiles }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{
        padding: '14px 16px',
        background: 'var(--accent-subtle)', border: '1px solid var(--accent-border)',
        borderRadius: 'var(--radius-lg)',
      }}>
        <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>
          Startup DNA → Behavioral Profile
        </div>
        <p style={{ fontSize: 12.5, color: 'var(--text-muted)', lineHeight: 1.65 }}>
          AI generators use this mapping to choose interaction behavior based on product context —
          not randomly. The Startup DNA defines <em>what kind of product</em> is being built.
          The Behavioral Profile defines <em>how it should feel</em>.
        </p>
      </div>

      {recommendingDNA.length > 0 ? (
        <div>
          <div className="inspector-label" style={{ marginBottom: 10 }}>
            DNA Profiles that recommend this Behavioral Profile ({recommendingDNA.length})
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {recommendingDNA.map(dna => (
              <div key={dna.id} style={{
                padding: '14px 16px',
                background: `${dna.color}0c`,
                border: `1.5px solid ${dna.color}30`,
                borderRadius: 'var(--radius-lg)',
                borderLeft: `3px solid ${dna.color}`,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: dna.color }} />
                  <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>{dna.name}</span>
                  <span className="chip default" style={{ fontSize: 9.5 }}>{dna.productType}</span>
                  <span className="chip default" style={{ fontSize: 9.5 }}>{dna.platform}</span>
                </div>
                <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                  {dna.emotionalTone.map(t => (
                    <span key={t} style={{
                      fontSize: 10.5, padding: '2px 8px', borderRadius: 99,
                      background: `${dna.color}15`, color: dna.color, fontWeight: 600,
                    }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div style={{
          padding: '24px', textAlign: 'center',
          color: 'var(--text-subtle)', fontSize: 13,
          background: 'var(--surface-mid)', borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border)',
        }}>
          No Startup DNA profiles currently map to this behavioral profile.
        </div>
      )}

      {/* All DNA for reference */}
      <div>
        <div className="inspector-label" style={{ marginBottom: 10 }}>All Startup DNA Profiles</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
          {startupDNAProfiles.map(dna => {
            const recommends = dna.recommendedStyleIds.includes(profileId)
            return (
              <div key={dna.id} style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '8px 12px',
                background: recommends ? `${dna.color}0c` : 'var(--surface-mid)',
                border: `1px solid ${recommends ? dna.color + '30' : 'var(--border)'}`,
                borderRadius: 'var(--radius-md)',
                opacity: recommends ? 1 : 0.5,
              }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: dna.color }} />
                <span style={{ fontSize: 12, color: 'var(--text)', flex: 1 }}>{dna.name}</span>
                {recommends && <span style={{ fontSize: 10, color: dna.color, fontWeight: 700 }}>RECOMMENDED</span>}
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
    return <div style={{ padding: 32, color: 'var(--text-muted)' }}>Profile not found: {profileId}</div>
  }

  const recommendingDNA = startupDNAProfiles.filter(d =>
    d.recommendedStyleIds.includes(profileId)
  )

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{
        padding: '16px 24px 14px',
        borderBottom: '1px solid var(--border)',
        flexShrink: 0,
        background: 'var(--surface)',
        borderLeft: `3px solid ${profile.color}`,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
          <div style={{
            width: 12, height: 12, borderRadius: '50%',
            background: profile.color,
            boxShadow: `0 0 8px ${profile.color}60, 0 0 0 3px ${profile.color}20`,
          }} />
          <h1 style={{ fontSize: 18, fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text)' }}>
            {profile.name}
          </h1>
          <span className="chip accent">Behavioral Profile</span>
          <span style={{
            fontSize: 10, fontWeight: 600, padding: '2px 8px', borderRadius: 99, marginLeft: 'auto',
            background: `${profile.color}18`, color: profile.color,
            border: `1px solid ${profile.color}30`,
          }}>
            {profile.animationIntensity}
          </span>
        </div>
        <p style={{ fontSize: 13, color: 'var(--text-muted)', fontStyle: 'italic', margin: 0 }}>
          &ldquo;{profile.tagline}&rdquo;
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
        {tab === 'Overview'  && <OverviewTab profile={profile} />}
        {tab === 'Live Demo' && <LiveDemoTab profileId={profileId} profile={profile} />}
        {tab === 'Tokens'    && <TokensTab profile={profile} />}
        {tab === 'DNA'       && <DNATab profileId={profileId} recommendingDNA={recommendingDNA} />}
      </div>
    </div>
  )
}
