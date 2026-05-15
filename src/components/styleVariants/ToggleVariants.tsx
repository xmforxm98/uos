'use client'

/**
 * TOGGLE STYLE VARIANTS
 *
 * Live interactive implementations of the Toggle component
 * across all 6 Interaction Styles.
 *
 * Each variant demonstrates:
 * - motion character (timing, easing)
 * - decoration level (none / subtle / glow / particles)
 * - feedback personality (restrained / balanced / expressive)
 * - emotional identity
 *
 * These are NOT just color variants — they are fundamentally
 * different behavioral implementations of the same component.
 */

import { useState, useRef, type JSX } from 'react'

// ─── Minimal Toggle ──────────────────────────────────────────────────────────
// Zero decoration. Instant or <100ms. No spring, no glow. Just flips.

export function MinimalToggle({ label }: { label?: string }) {
  const [on, setOn] = useState(false)
  return (
    <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', userSelect: 'none' }}>
      <div
        onClick={() => setOn(!on)}
        style={{
          position: 'relative',
          width: 40, height: 22,
          borderRadius: 11,
          background: on ? '#404040' : '#2a2a2a',
          border: `1px solid ${on ? '#555' : '#333'}`,
          transition: 'background 80ms, border-color 80ms',
          cursor: 'pointer',
          flexShrink: 0,
        }}
      >
        <div style={{
          position: 'absolute',
          top: 4,
          left: on ? 'calc(100% - 17px)' : 3,
          width: 14, height: 14,
          borderRadius: '50%',
          background: on ? '#ececec' : '#555',
          transition: 'left 80ms ease-out, background 80ms',
        }} />
      </div>
      {label && <span style={{ fontSize: 12, color: on ? '#ececec' : '#6b6b6b', transition: 'color 80ms', fontFamily: 'monospace' }}>{label}</span>}
    </label>
  )
}

// ─── Enterprise Toggle ───────────────────────────────────────────────────────
// Clean, professional. 150ms ease-out. No bounce, no glow.
// Focus ring for keyboard accessibility. Functional above all.

export function EnterpriseToggle({ label }: { label?: string }) {
  const [on, setOn] = useState(false)
  const [focused, setFocused] = useState(false)

  return (
    <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', userSelect: 'none' }}>
      <div
        role="switch"
        tabIndex={0}
        aria-checked={on}
        onClick={() => setOn(!on)}
        onKeyDown={e => e.key === ' ' && setOn(!on)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          position: 'relative',
          width: 44, height: 24,
          borderRadius: 12,
          background: on ? '#2563eb' : '#e2e8f0',
          transition: 'background 150ms ease-out',
          cursor: 'pointer',
          flexShrink: 0,
          outline: focused ? '2px solid #93c5fd' : 'none',
          outlineOffset: 2,
        }}
      >
        <div style={{
          position: 'absolute',
          top: 3,
          left: on ? 'calc(100% - 21px)' : 3,
          width: 18, height: 18,
          borderRadius: '50%',
          background: '#fff',
          boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
          transition: 'left 150ms ease-out',
        }} />
      </div>
      {label && (
        <span style={{ fontSize: 12.5, color: '#374151', fontWeight: on ? 600 : 400, transition: 'font-weight 100ms' }}>
          {label}
        </span>
      )}
    </label>
  )
}

// ─── Premium Toggle ──────────────────────────────────────────────────────────
// iOS-style. Spring physics (cubic-bezier overshoot). Glass-like thumb.
// Brand blue, smooth and satisfying. Thumb has subtle shadow.

export function PremiumToggle({ label }: { label?: string }) {
  const [on, setOn] = useState(false)
  const [pressing, setPressing] = useState(false)

  return (
    <label style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', userSelect: 'none' }}>
      <div
        onClick={() => setOn(!on)}
        onMouseDown={() => setPressing(true)}
        onMouseUp={() => setPressing(false)}
        onMouseLeave={() => setPressing(false)}
        style={{
          position: 'relative',
          width: 51, height: 31,
          borderRadius: 15.5,
          background: on ? '#007AFF' : 'rgba(120,120,128,0.32)',
          transition: 'background 300ms cubic-bezier(0.34,1.56,0.64,1)',
          cursor: 'pointer',
          flexShrink: 0,
          boxShadow: on ? '0 0 0 0 rgba(0,122,255,0.3)' : 'none',
        }}
      >
        {/* Shimmer sweep on toggle */}
        {on && (
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
            borderRadius: 15.5,
            background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.25) 50%, transparent 60%)',
            animation: 'premiumShimmer 0.6s ease-out forwards',
            pointerEvents: 'none',
          }} />
        )}
        {/* Thumb */}
        <div style={{
          position: 'absolute',
          top: 2,
          left: on ? 'calc(100% - 29px)' : 2,
          width: 27, height: 27,
          borderRadius: '50%',
          background: '#fff',
          boxShadow: '0 3px 8px rgba(0,0,0,0.15), 0 1px 3px rgba(0,0,0,0.1)',
          transition: 'left 300ms cubic-bezier(0.34,1.56,0.64,1), transform 80ms ease',
          transform: pressing ? 'scale(0.92)' : 'scale(1)',
        }} />
      </div>
      {label && (
        <span style={{
          fontSize: 14,
          color: on ? '#007AFF' : '#8e8e93',
          fontWeight: 500,
          transition: 'color 200ms',
          fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
        }}>
          {label}
        </span>
      )}
    </label>
  )
}

// ─── Playful Toggle ──────────────────────────────────────────────────────────
// Big spring overshoot. Gradient track. Emoji spark on toggle.
// Thumb bounces. Colors celebrate. Joy-first.

export function PlayfulToggle({ label }: { label?: string }) {
  const [on, setOn] = useState(false)
  const [sparking, setSparking] = useState(false)

  function handleToggle() {
    setOn(!on)
    setSparking(true)
    setTimeout(() => setSparking(false), 600)
  }

  return (
    <label style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', userSelect: 'none' }}>
      <div style={{ position: 'relative' }}>
        {/* Spark burst */}
        {sparking && (
          <div style={{
            position: 'absolute',
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
            zIndex: 10,
          }}>
            {['✦','✧','✦','✧'].map((s, i) => (
              <span key={i} style={{
                position: 'absolute',
                fontSize: 10,
                animation: `playfulBounce 0.5s ${i * 60}ms ease-out forwards`,
                transform: `rotate(${i * 90}deg) translateY(-14px)`,
                opacity: 0.9,
                color: ['#f59e0b', '#ef4444', '#8b5cf6', '#10b981'][i],
              }}>{s}</span>
            ))}
          </div>
        )}

        <div
          onClick={handleToggle}
          style={{
            position: 'relative',
            width: 56, height: 30,
            borderRadius: 15,
            background: on
              ? 'linear-gradient(135deg, #f59e0b, #ef4444)'
              : 'linear-gradient(135deg, #d1d5db, #9ca3af)',
            transition: 'background 300ms',
            cursor: 'pointer',
            boxShadow: on ? '0 4px 14px rgba(245,158,11,0.4)' : '0 2px 4px rgba(0,0,0,0.1)',
          }}
        >
          {/* Thumb */}
          <div style={{
            position: 'absolute',
            top: 3,
            left: on ? 'calc(100% - 27px)' : 3,
            width: 24, height: 24,
            borderRadius: '50%',
            background: '#fff',
            boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
            transition: 'left 380ms cubic-bezier(0.34, 1.8, 0.64, 1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 13,
          }}>
            {on ? '☀️' : '🌙'}
          </div>
        </div>
      </div>
      {label && (
        <span style={{
          fontSize: 13,
          color: on ? '#f59e0b' : '#9ca3af',
          fontWeight: 700,
          transition: 'color 200ms',
          letterSpacing: '-0.01em',
        }}>
          {label}
        </span>
      )}
    </label>
  )
}

// ─── Cyber Toggle ────────────────────────────────────────────────────────────
// Dark track. Cyan gradient glow when ON. Floating particles.
// Neon text labels. Power icon in thumb. Futuristic.

export function CyberToggle({ label }: { label?: string }) {
  const [on, setOn] = useState(false)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 8 }}>
      <div
        onClick={() => setOn(!on)}
        style={{
          position: 'relative',
          width: 64, height: 32,
          cursor: 'pointer',
          userSelect: 'none',
        }}
      >
        {/* Track */}
        <div style={{
          position: 'absolute', inset: 0,
          borderRadius: 16,
          background: '#0a0a0a',
          boxShadow: on
            ? '0 0 16px rgba(3,233,244,0.5), 0 0 32px rgba(3,233,244,0.2), inset 0 0 8px rgba(0,0,0,0.8)'
            : 'inset 0 0 8px rgba(0,0,0,0.8), 0 2px 4px rgba(0,0,0,0.5)',
          transition: 'box-shadow 0.4s ease',
          overflow: 'hidden',
          animation: on ? 'cyberPulse 2s infinite' : 'none',
        }}>
          {/* Inner track */}
          <div style={{
            position: 'absolute', inset: 2,
            borderRadius: 14,
            background: '#161616',
          }} />

          {/* Glow gradient */}
          <div style={{
            position: 'absolute', inset: 0,
            borderRadius: 16,
            background: 'linear-gradient(90deg, #03e9f4 0%, #4a00e0 100%)',
            opacity: on ? 0.45 : 0,
            transition: 'opacity 0.4s ease',
          }} />

          {/* Particles */}
          {on && [
            { top: '15%', right: '18%', delay: '0s' },
            { top: '55%', right: '32%', delay: '0.4s' },
            { top: '30%', right: '42%', delay: '0.8s' },
            { top: '65%', right: '22%', delay: '1.2s' },
          ].map((p, i) => (
            <div key={i} style={{
              position: 'absolute',
              width: 3, height: 3,
              background: '#03e9f4',
              borderRadius: '50%',
              top: p.top, right: p.right,
              zIndex: 1,
              boxShadow: '0 0 5px rgba(3,233,244,0.9)',
              animation: `cyberFloat 2.5s ${p.delay} infinite alternate ease-in-out`,
            }} />
          ))}

          {/* Track dots (right side) */}
          <div style={{
            position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)',
            display: 'flex', gap: 3, zIndex: 1,
          }}>
            {[0,1,2].map(i => (
              <div key={i} style={{
                width: 3, height: 3, borderRadius: '50%',
                background: on ? '#03e9f4' : '#333',
                boxShadow: on ? '0 0 4px #03e9f4' : 'none',
                transition: 'all 0.4s ease',
                transitionDelay: `${i * 60}ms`,
              }} />
            ))}
          </div>
        </div>

        {/* Thumb */}
        <div style={{
          position: 'absolute',
          top: 4,
          left: on ? 'calc(100% - 28px)' : 4,
          width: 24, height: 24,
          borderRadius: '50%',
          background: on ? '#1a1a1a' : '#111',
          boxShadow: on
            ? '0 0 10px rgba(3,233,244,0.6), 0 2px 6px rgba(0,0,0,0.6)'
            : '0 2px 5px rgba(0,0,0,0.5)',
          transition: 'left 0.4s cubic-bezier(0.3, 1.5, 0.7, 1), box-shadow 0.4s ease',
          zIndex: 2,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {/* Power icon */}
          <svg width="11" height="11" viewBox="0 0 14 14" fill="none">
            <line x1="7" y1="1" x2="7" y2="6" stroke={on ? '#03e9f4' : '#555'} strokeWidth="1.8" strokeLinecap="round" style={{ transition: 'stroke 0.4s' }} />
            <path d="M4 3.2A5 5 0 1 0 10 3.2" stroke={on ? '#03e9f4' : '#555'} strokeWidth="1.8" fill="none" strokeLinecap="round" style={{ transition: 'stroke 0.4s' }} />
          </svg>
        </div>
      </div>

      {/* Labels */}
      <div style={{ display: 'flex', gap: 14, fontSize: 9, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', fontFamily: 'monospace' }}>
        <span style={{
          color: !on ? '#aaa' : '#3a3a3a',
          transition: 'color 0.4s',
        }}>OFF</span>
        <span style={{
          color: on ? '#03e9f4' : '#3a3a3a',
          textShadow: on ? '0 0 8px rgba(3,233,244,0.7)' : 'none',
          transition: 'color 0.4s, text-shadow 0.4s',
        }}>ON</span>
      </div>

      {label && <span style={{ fontSize: 11, color: on ? '#03e9f4' : '#555', fontFamily: 'monospace', transition: 'color 0.4s' }}>{label}</span>}
    </div>
  )
}

// ─── Native Mobile Toggle ────────────────────────────────────────────────────
// Platform conventions. Large touch target. Haptic-ready timing.
// Green (iOS) when on. Shadow like native controls.

export function NativeMobileToggle({ label }: { label?: string }) {
  const [on, setOn] = useState(false)
  const [pressing, setPressing] = useState(false)
  const rippleRef = useRef<HTMLDivElement>(null)

  return (
    <label style={{ display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer', userSelect: 'none' }}>
      {label && (
        <span style={{ fontSize: 17, color: '#1c1c1e', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif', flex: 1 }}>
          {label}
        </span>
      )}
      <div
        onClick={() => setOn(!on)}
        onMouseDown={() => setPressing(true)}
        onMouseUp={() => setPressing(false)}
        onMouseLeave={() => setPressing(false)}
        style={{
          position: 'relative',
          width: 51, height: 31,
          borderRadius: 15.5,
          background: on ? '#34c759' : 'rgba(120,120,128,0.32)',
          transition: 'background 0.25s ease',
          cursor: 'pointer',
          flexShrink: 0,
          WebkitTapHighlightColor: 'transparent',
        }}
      >
        {/* Ripple on press */}
        {pressing && (
          <div ref={rippleRef} style={{
            position: 'absolute',
            top: '50%', left: '50%',
            width: 50, height: 50,
            borderRadius: '50%',
            transform: 'translate(-50%, -50%) scale(0)',
            background: 'rgba(120,120,128,0.2)',
            animation: 'nativeRipple 0.4s ease-out forwards',
            pointerEvents: 'none',
          }} />
        )}
        {/* Thumb */}
        <div style={{
          position: 'absolute',
          top: 2,
          left: on ? 'calc(100% - 29px)' : 2,
          width: 27, height: 27,
          borderRadius: '50%',
          background: '#fff',
          boxShadow: '0 3px 7px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.08)',
          transition: 'left 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.1s ease',
          transform: pressing ? 'scale(0.94)' : 'scale(1)',
        }} />
      </div>
    </label>
  )
}

// ─── AI Native Toggle ────────────────────────────────────────────────────────
// Streaming / generative feel. Track pulses when ON — like computation running.
// Purple gradient, smooth spring, subtle inner glow. Context-aware.

export function AINativeToggle({ label }: { label?: string }) {
  const [on, setOn] = useState(false)
  const [thinking, setThinking] = useState(false)

  function handleToggle() {
    setThinking(true)
    setTimeout(() => {
      setOn(!on)
      setThinking(false)
    }, 280)
  }

  return (
    <label style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', userSelect: 'none' }}>
      <div
        onClick={handleToggle}
        style={{
          position: 'relative',
          width: 51, height: 31,
          borderRadius: 15.5,
          background: on
            ? 'linear-gradient(135deg, #a855f7, #7c3aed)'
            : 'rgba(120,120,128,0.32)',
          transition: 'background 300ms ease',
          cursor: 'pointer',
          flexShrink: 0,
          boxShadow: on ? '0 0 12px rgba(168,85,247,0.35)' : 'none',
        }}
      >
        {/* Thinking pulse */}
        {thinking && (
          <div style={{
            position: 'absolute', inset: 0,
            borderRadius: 15.5,
            background: 'linear-gradient(90deg, transparent, rgba(168,85,247,0.4), transparent)',
            animation: 'premiumShimmer 0.4s ease-out',
          }} />
        )}
        {/* Subtle inner glow when on */}
        {on && (
          <div style={{
            position: 'absolute', inset: 2,
            borderRadius: 13.5,
            background: 'linear-gradient(135deg, rgba(255,255,255,0.15), transparent)',
            pointerEvents: 'none',
          }} />
        )}
        {/* Thumb */}
        <div style={{
          position: 'absolute',
          top: 2,
          left: on ? 'calc(100% - 29px)' : 2,
          width: 27, height: 27,
          borderRadius: '50%',
          background: thinking ? 'rgba(168,85,247,0.3)' : '#fff',
          boxShadow: on
            ? '0 2px 8px rgba(168,85,247,0.3), 0 1px 3px rgba(0,0,0,0.1)'
            : '0 1px 3px rgba(0,0,0,0.15)',
          transition: 'left 300ms cubic-bezier(0.34,1.3,0.64,1), background 280ms ease',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 12,
        }}>
          {thinking ? (
            <div style={{
              width: 8, height: 8, borderRadius: '50%',
              background: '#a855f7',
              animation: 'cyberPulse 0.5s infinite',
            }} />
          ) : (
            <span style={{ opacity: on ? 1 : 0.4, transition: 'opacity 200ms' }}>✦</span>
          )}
        </div>
      </div>
      {label && (
        <span style={{
          fontSize: 13.5,
          color: on ? '#a855f7' : 'var(--text-muted)',
          fontWeight: 500,
          transition: 'color 200ms',
        }}>
          {label}
        </span>
      )}
    </label>
  )
}

// ─── Style Gallery ────────────────────────────────────────────────────────────
// Renders all 6 toggle variants in a comparable grid.

type ToggleVariantEntry = {
  styleId: string
  name: string
  color: string
  tagline: string
  component: JSX.Element
  motionNote: string
  decorationNote: string
}

export function ToggleStyleGallery() {
  const variants: ToggleVariantEntry[] = [
    {
      styleId: 'minimal',
      name: 'Minimal',
      color: '#6b6b6b',
      tagline: 'The interface disappears.',
      component: <MinimalToggle label="Enable feature" />,
      motionNote: '80ms ease-out — near instant',
      decorationNote: 'None',
    },
    {
      styleId: 'enterprise',
      name: 'Enterprise',
      color: '#2563eb',
      tagline: 'Productive clarity.',
      component: <EnterpriseToggle label="Notifications" />,
      motionNote: '150ms ease-out — fast, no bounce',
      decorationNote: 'None — focus ring only',
    },
    {
      styleId: 'premium',
      name: 'Premium',
      color: '#007AFF',
      tagline: 'Fluid precision.',
      component: <PremiumToggle label="Wi-Fi" />,
      motionNote: '300ms spring (0.34,1.56,0.64,1) — iOS feel',
      decorationNote: 'Shimmer sweep on toggle',
    },
    {
      styleId: 'playful',
      name: 'Playful',
      color: '#f59e0b',
      tagline: 'Joy in motion.',
      component: <PlayfulToggle label="Dark Mode" />,
      motionNote: '380ms spring (0.34,1.8,0.64,1) — big overshoot',
      decorationNote: 'Emoji thumb + spark burst',
    },
    {
      styleId: 'cyber',
      name: 'Cyber',
      color: '#03e9f4',
      tagline: 'Digital pulse.',
      component: <CyberToggle label="Neural link" />,
      motionNote: '400ms cubic-bezier(0.3,1.5,0.7,1) — snappy spring',
      decorationNote: 'Glow + floating particles',
    },
    {
      styleId: 'native-mobile',
      name: 'Native Mobile',
      color: '#34c759',
      tagline: 'Platform-first feel.',
      component: <NativeMobileToggle label="Airplane Mode" />,
      motionNote: '250ms cubic-bezier(0.25,0.46,0.45,0.94) — OS timing',
      decorationNote: 'Press ripple',
    },
    {
      styleId: 'ai-native',
      name: 'AI Native',
      color: '#a855f7',
      tagline: 'The interface thinks with you.',
      component: <AINativeToggle label="AI Assist" />,
      motionNote: '280ms thinking delay + 300ms spring — computation feel',
      decorationNote: 'Shimmer pulse + inner glow + ✦ icon',
    },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {variants.map(v => (
        <div key={v.styleId} style={{
          display: 'flex', alignItems: 'center', gap: 20,
          padding: '18px 20px',
          background: 'var(--surface-mid)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)',
          borderLeft: `3px solid ${v.color}`,
          transition: 'border-color 120ms',
        }}>
          {/* Style label */}
          <div style={{ width: 100, flexShrink: 0 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: v.color, marginBottom: 2 }}>{v.name}</div>
            <div style={{ fontSize: 10, color: 'var(--text-subtle)', lineHeight: 1.4 }}>{v.tagline}</div>
          </div>

          {/* Live demo */}
          <div style={{
            width: 220, flexShrink: 0,
            padding: '12px 16px',
            background: v.styleId === 'cyber' ? '#080808' : v.styleId === 'minimal' ? '#111' : v.styleId === 'ai-native' ? '#0d0014' : 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-md)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            {v.component}
          </div>

          {/* Meta */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 5 }}>
            <div style={{ display: 'flex', gap: 6, alignItems: 'flex-start' }}>
              <span style={{ fontSize: 9.5, fontWeight: 600, color: 'var(--text-subtle)', textTransform: 'uppercase', letterSpacing: '0.07em', width: 64, flexShrink: 0 }}>Motion</span>
              <code style={{ fontSize: 10.5, color: 'var(--text-muted)', fontFamily: 'monospace', lineHeight: 1.5 }}>{v.motionNote}</code>
            </div>
            <div style={{ display: 'flex', gap: 6, alignItems: 'flex-start' }}>
              <span style={{ fontSize: 9.5, fontWeight: 600, color: 'var(--text-subtle)', textTransform: 'uppercase', letterSpacing: '0.07em', width: 64, flexShrink: 0 }}>Deco</span>
              <code style={{ fontSize: 10.5, color: 'var(--text-muted)', fontFamily: 'monospace', lineHeight: 1.5 }}>{v.decorationNote}</code>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
