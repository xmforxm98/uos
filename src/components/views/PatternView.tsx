'use client'

import { useState } from 'react'
import { getPattern } from '@/data/patterns'
import { getComponent } from '@/data/components'
import { useDesignSystem } from '@/context/DesignSystemContext'
import { resolveRadius } from '@/data/themes'
import { CheckCircle, Layers, Sparkles, Eye } from 'lucide-react'

function themeAccent(theme: string) {
  if (theme === 'dark')    return '#3b82f6'
  if (theme === 'brand-a') return '#2563eb'
  if (theme === 'brand-b') return '#9333ea'
  return '#CC5536'
}

function themeAccentSubtle(theme: string) {
  if (theme === 'dark')    return 'rgba(59,130,246,0.12)'
  if (theme === 'brand-a') return 'rgba(37,99,235,0.10)'
  if (theme === 'brand-b') return 'rgba(147,51,234,0.12)'
  return 'rgba(204,85,54,0.12)'
}

/* ── Auth Preview ──────────────────────────────────────────────── */
function AuthPreview({ theme }: { theme: string }) {
  const accent = themeAccent(theme)
  const subtle = themeAccentSubtle(theme)
  const rCard = resolveRadius('radius/md', theme)
  const rInput = resolveRadius('radius/sm', theme)
  const rBtn = resolveRadius('radius/sm', theme)
  const rFull = resolveRadius('radius/full', theme)

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 480, padding: 24 }}>
      <div style={{
        background: 'var(--surface)', border: '1px solid var(--border-mid)',
        borderRadius: rCard, padding: '32px 28px', width: 340,
        boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
      }}>
        {/* Logo / brand */}
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div style={{
            width: 40, height: 40, borderRadius: rFull,
            background: accent, margin: '0 auto 10px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
              <path d="M12 8v4l3 3"/>
            </svg>
          </div>
          <div style={{ fontSize: 17, fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.02em' }}>Sign in</div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>to your account to continue</div>
        </div>

        {/* OAuth */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 18 }}>
          {['Google', 'GitHub'].map(p => (
            <button key={p} style={{
              flex: 1, padding: '8px 10px', border: '1px solid var(--border-mid)',
              borderRadius: rBtn, background: 'var(--surface-mid)',
              color: 'var(--text)', fontSize: 12, fontWeight: 500, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5,
              transition: 'border-color 100ms, background 100ms',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = accent; e.currentTarget.style.background = subtle }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-mid)'; e.currentTarget.style.background = 'var(--surface-mid)' }}
            >
              <span style={{ opacity: 0.6 }}>{p === 'Google' ? '🌐' : '⚙'}</span> {p}
            </button>
          ))}
        </div>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
          <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
          <span style={{ fontSize: 11, color: 'var(--text-subtle)' }}>or</span>
          <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
        </div>

        {/* Form */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div>
            <label style={{ fontSize: 11.5, color: 'var(--text-muted)', display: 'block', marginBottom: 5, fontWeight: 500 }}>Email</label>
            <input
              readOnly defaultValue="you@example.com"
              style={{
                width: '100%', padding: '8px 10px',
                border: '1px solid var(--border-mid)', borderRadius: rInput,
                background: 'var(--surface-mid)', color: 'var(--text)',
                fontSize: 13, outline: 'none', boxSizing: 'border-box',
              }}
            />
          </div>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
              <label style={{ fontSize: 11.5, color: 'var(--text-muted)', fontWeight: 500 }}>Password</label>
              <span style={{ fontSize: 11, color: accent, cursor: 'pointer' }}>Forgot?</span>
            </div>
            <input
              readOnly type="password" defaultValue="password123"
              style={{
                width: '100%', padding: '8px 10px',
                border: '1px solid var(--border-mid)', borderRadius: rInput,
                background: 'var(--surface-mid)', color: 'var(--text)',
                fontSize: 13, outline: 'none', boxSizing: 'border-box',
              }}
            />
          </div>

          <button style={{
            width: '100%', padding: '9px 0', borderRadius: rBtn,
            background: accent, color: '#fff', fontSize: 13, fontWeight: 600,
            border: 'none', cursor: 'pointer', marginTop: 4,
            transition: 'opacity 100ms',
          }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            Sign in
          </button>
        </div>

        {/* Footer */}
        <p style={{ fontSize: 11, color: 'var(--text-subtle)', textAlign: 'center', marginTop: 16 }}>
          No account? <span style={{ color: accent, cursor: 'pointer' }}>Sign up free</span>
        </p>
        <p style={{ fontSize: 10, color: 'var(--text-subtle)', textAlign: 'center', marginTop: 10 }}>
          By signing in you agree to our{' '}
          <span style={{ color: 'var(--text-muted)', textDecoration: 'underline', cursor: 'pointer' }}>Terms</span>
          {' & '}
          <span style={{ color: 'var(--text-muted)', textDecoration: 'underline', cursor: 'pointer' }}>Privacy Policy</span>
        </p>
      </div>
    </div>
  )
}

/* ── Dashboard Preview ─────────────────────────────────────────── */
function DashboardPreview({ theme }: { theme: string }) {
  const accent = themeAccent(theme)
  const rCard = resolveRadius('radius/md', theme)
  const rBtn = resolveRadius('radius/sm', theme)
  const rFull = resolveRadius('radius/full', theme)

  const metrics = [
    { label: 'Monthly Revenue', value: '$48,295', change: '+12.5%', up: true },
    { label: 'Active Users',    value: '12,084',  change: '-3.2%',  up: false },
    { label: 'New Signups',     value: '1,429',   change: '+8.1%',  up: true },
    { label: 'Churn Rate',      value: '2.4%',    change: '-0.3%',  up: true },
  ]

  const activity = [
    { name: 'Alex Kim',  action: 'Upgraded to Pro',     time: '2m ago',  status: 'green' },
    { name: 'Maya R.',   action: 'Submitted support ticket', time: '14m ago', status: 'yellow' },
    { name: 'Sam J.',    action: 'Cancelled subscription',   time: '1h ago',  status: 'red' },
    { name: 'Tia L.',    action: 'Invited 3 teammates',  time: '3h ago',  status: 'green' },
  ]

  const initials = ['AK', 'MR', 'SJ', 'TL']
  const colors = [accent, '#d77a59', '#16a34a', '#dc2626']

  return (
    <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.02em' }}>Good morning, Alex 👋</div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>Here's what's happening today.</div>
        </div>
        <button style={{
          padding: '7px 14px', borderRadius: rBtn,
          background: accent, color: '#fff', fontSize: 12, fontWeight: 600,
          border: 'none', cursor: 'pointer',
        }}>
          + New Report
        </button>
      </div>

      {/* Metrics Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
        {metrics.map(m => (
          <div key={m.label} style={{
            background: 'var(--surface)', border: '1px solid var(--border-mid)',
            borderRadius: rCard, padding: '14px 16px',
            transition: 'box-shadow 150ms, transform 150ms',
          }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.12)'; e.currentTarget.style.transform = 'translateY(-1px)' }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = ''; e.currentTarget.style.transform = '' }}
          >
            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 6 }}>{m.label}</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.02em' }}>{m.value}</div>
            <span style={{
              display: 'inline-block', marginTop: 5, fontSize: 10.5, fontWeight: 600,
              padding: '2px 6px', borderRadius: rFull,
              background: m.up ? 'rgba(34,197,94,0.12)' : 'rgba(239,68,68,0.12)',
              color: m.up ? '#16a34a' : '#dc2626',
            }}>
              {m.change}
            </span>
          </div>
        ))}
      </div>

      {/* Activity */}
      <div style={{
        background: 'var(--surface)', border: '1px solid var(--border-mid)',
        borderRadius: rCard, overflow: 'hidden',
      }}>
        <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>Recent Activity</span>
          <span style={{ fontSize: 11, color: accent, cursor: 'pointer' }}>View all</span>
        </div>
        {activity.map((a, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 10, padding: '10px 16px',
            borderBottom: i < activity.length - 1 ? '1px solid var(--border)' : 'none',
            transition: 'background 100ms',
          }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--surface-mid)'}
            onMouseLeave={e => e.currentTarget.style.background = ''}
          >
            <div style={{
              width: 28, height: 28, borderRadius: rFull,
              background: colors[i] + '22', border: `1.5px solid ${colors[i]}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 9.5, fontWeight: 700, color: colors[i], flexShrink: 0,
            }}>
              {initials[i]}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--text)' }}>{a.name}</div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{a.action}</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
              <span style={{
                fontSize: 9.5, fontWeight: 600, padding: '2px 6px', borderRadius: rFull,
                background: a.status === 'green' ? 'rgba(34,197,94,0.12)' : a.status === 'yellow' ? 'rgba(234,179,8,0.15)' : 'rgba(239,68,68,0.12)',
                color: a.status === 'green' ? '#16a34a' : a.status === 'yellow' ? '#b45309' : '#dc2626',
              }}>
                {a.status === 'green' ? 'Success' : a.status === 'yellow' ? 'Pending' : 'Failed'}
              </span>
              <span style={{ fontSize: 10.5, color: 'var(--text-subtle)' }}>{a.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Settings Preview ──────────────────────────────────────────── */
function SettingsPreview({ theme }: { theme: string }) {
  const accent = themeAccent(theme)
  const [toggles, setToggles] = useState({ emails: true, push: false, marketing: false, twofa: true })
  const rCard = resolveRadius('radius/md', theme)
  const rInput = resolveRadius('radius/sm', theme)
  const rBtn = resolveRadius('radius/sm', theme)
  const rFull = resolveRadius('radius/full', theme)

  function Toggle({ on, onChange }: { on: boolean; onChange: () => void }) {
    return (
      <button onClick={onChange} style={{
        width: 36, height: 20, borderRadius: rFull,
        background: on ? accent : 'var(--surface-high)',
        border: `1px solid ${on ? 'transparent' : 'var(--border-mid)'}`,
        position: 'relative', cursor: 'pointer', flexShrink: 0,
        transition: 'background 200ms',
      }}>
        <div style={{
          width: 14, height: 14, borderRadius: '50%', background: '#fff',
          position: 'absolute', top: 2,
          left: on ? 19 : 3,
          transition: 'left 200ms',
          boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
        }} />
      </button>
    )
  }

  return (
    <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 14 }}>
      {/* Profile */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border-mid)', borderRadius: rCard, padding: '16px 18px' }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', marginBottom: 12 }}>Profile</div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 14 }}>
          <div style={{
            width: 44, height: 44, borderRadius: rFull,
            background: accent + '22', border: `2px solid ${accent}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 14, fontWeight: 700, color: accent, flexShrink: 0,
          }}>AK</div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>Alex Kim</div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>alex@example.com</div>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {['Full name', 'Username'].map(f => (
            <div key={f}>
              <label style={{ fontSize: 11, color: 'var(--text-muted)', display: 'block', marginBottom: 4 }}>{f}</label>
              <input readOnly defaultValue={f === 'Full name' ? 'Alex Kim' : '@alexkim'} style={{
                width: '100%', padding: '7px 9px',
                border: '1px solid var(--border-mid)', borderRadius: rInput,
                background: 'var(--surface-mid)', color: 'var(--text)',
                fontSize: 12, outline: 'none', boxSizing: 'border-box',
              }} />
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 10 }}>
          <button style={{
            padding: '7px 14px', borderRadius: rBtn,
            background: accent, color: '#fff', fontSize: 11.5, fontWeight: 600,
            border: 'none', cursor: 'pointer',
          }}>Save changes</button>
        </div>
      </div>

      {/* Notifications */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border-mid)', borderRadius: rCard, padding: '16px 18px' }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', marginBottom: 12 }}>Notifications</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            { key: 'emails', label: 'Email notifications', desc: 'Receive updates via email' },
            { key: 'push',   label: 'Push notifications',  desc: 'Browser push alerts' },
            { key: 'twofa',  label: 'Two-factor auth',     desc: 'Extra security layer' },
          ].map(({ key, label, desc }) => (
            <div key={key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
              <div>
                <div style={{ fontSize: 12.5, fontWeight: 500, color: 'var(--text)' }}>{label}</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{desc}</div>
              </div>
              <Toggle on={toggles[key as keyof typeof toggles]} onChange={() => setToggles(t => ({ ...t, [key]: !t[key as keyof typeof t] }))} />
            </div>
          ))}
        </div>
      </div>

      {/* Danger Zone */}
      <div style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: rCard, padding: '14px 18px' }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: '#dc2626', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 5 }}>
          <span>⚠</span> Danger Zone
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          <div>
            <div style={{ fontSize: 12.5, fontWeight: 500, color: 'var(--text)' }}>Delete account</div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Permanently remove your account and all data</div>
          </div>
          <button style={{
            padding: '6px 12px', borderRadius: rBtn, fontSize: 11.5, fontWeight: 600,
            background: 'rgba(239,68,68,0.1)', color: '#dc2626',
            border: '1px solid rgba(239,68,68,0.25)', cursor: 'pointer',
            transition: 'background 100ms',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = '#dc2626'; e.currentTarget.style.color = '#fff' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.1)'; e.currentTarget.style.color = '#dc2626' }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

/* ── Billing Preview ───────────────────────────────────────────── */
function BillingPreview({ theme }: { theme: string }) {
  const accent = themeAccent(theme)
  const subtle = themeAccentSubtle(theme)
  const [sel, setSel] = useState('pro')
  const rCard = resolveRadius('radius/md', theme)
  const rBtn = resolveRadius('radius/sm', theme)
  const rFull = resolveRadius('radius/full', theme)

  const plans = [
    { id: 'free',       name: 'Free',       price: '$0',   period: '/mo',  features: ['5 projects', '2 team members', '1 GB storage', 'Community support'], cta: 'Get started',  highlight: false },
    { id: 'pro',        name: 'Pro',        price: '$29',  period: '/mo',  features: ['Unlimited projects', '10 team members', '50 GB storage', 'Priority support', 'Analytics'], cta: 'Upgrade to Pro', highlight: true },
    { id: 'enterprise', name: 'Enterprise', price: 'Custom', period: '',   features: ['Everything in Pro', 'Unlimited members', 'SSO & SAML', 'SLA guarantee', 'Dedicated CSM'], cta: 'Contact sales', highlight: false },
  ]

  return (
    <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center' }}>
      {/* Header */}
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.02em' }}>Choose your plan</div>
        <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 3 }}>Start free. Scale when you're ready.</div>
      </div>

      {/* Trial banner */}
      <div style={{
        background: 'rgba(234,179,8,0.1)', border: '1px solid rgba(234,179,8,0.3)',
        borderRadius: rBtn, padding: '8px 14px',
        display: 'flex', alignItems: 'center', gap: 6,
      }}>
        <span style={{ fontSize: 11, color: '#b45309', fontWeight: 500 }}>⏰ Trial ends in 7 days</span>
        <span style={{ fontSize: 10.5, color: '#b45309', opacity: 0.8 }}>— upgrade to keep access</span>
      </div>

      {/* Plan cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, width: '100%' }}>
        {plans.map(p => (
          <div key={p.id}
            onClick={() => setSel(p.id)}
            style={{
              background: sel === p.id ? subtle : p.highlight ? subtle + '88' : 'var(--surface)', borderRadius: rCard,
              border: `1.5px solid ${sel === p.id ? accent : p.highlight ? accent + '55' : 'var(--border-mid)'}`,
              padding: '16px 14px', cursor: 'pointer',
              position: 'relative', overflow: 'hidden',
              transition: 'border-color 150ms, background 150ms',
            } as React.CSSProperties}
          >
            {p.highlight && (
              <div style={{
                position: 'absolute', top: 8, right: 8,
                fontSize: 9, fontWeight: 700, padding: '2px 7px',
                borderRadius: rFull, background: accent, color: '#fff',
                letterSpacing: '0.04em',
              }}>POPULAR</div>
            )}
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>{p.name}</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 2, marginBottom: 12 }}>
              <span style={{ fontSize: p.price === 'Custom' ? 16 : 22, fontWeight: 800, color: p.highlight ? accent : 'var(--text)', letterSpacing: '-0.03em' }}>{p.price}</span>
              <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{p.period}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5, marginBottom: 14 }}>
              {p.features.map(f => (
                <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <div style={{ width: 5, height: 5, borderRadius: '50%', background: p.highlight ? accent : 'var(--text-subtle)', flexShrink: 0 }} />
                  <span style={{ fontSize: 10.5, color: 'var(--text-muted)' }}>{f}</span>
                </div>
              ))}
            </div>
            <button style={{
              width: '100%', padding: '7px 0', borderRadius: rBtn,
              background: sel === p.id ? accent : p.highlight ? accent : 'var(--surface-mid)',
              color: (sel === p.id || p.highlight) ? '#fff' : 'var(--text-muted)',
              fontSize: 11.5, fontWeight: 600,
              border: `1px solid ${p.highlight ? accent : 'var(--border-mid)'}`,
              cursor: 'pointer', transition: 'all 100ms',
            }}>
              {p.cta}
            </button>
          </div>
        ))}
      </div>

      {/* Trust */}
      <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
        {['🔒 SSL secured', '✓ No hidden fees', '↺ Cancel anytime'].map(t => (
          <span key={t} style={{ fontSize: 10.5, color: 'var(--text-subtle)' }}>{t}</span>
        ))}
      </div>
    </div>
  )
}

/* ── Onboarding Preview ────────────────────────────────────────── */
function OnboardingPreview({ theme }: { theme: string }) {
  const accent = themeAccent(theme)
  const subtle = themeAccentSubtle(theme)
  const [step, setStep] = useState(0)
  const rCard = resolveRadius('radius/md', theme)
  const rInput = resolveRadius('radius/sm', theme)
  const rBtn = resolveRadius('radius/sm', theme)
  const rFull = resolveRadius('radius/full', theme)

  const steps = [
    {
      title: 'Create your workspace',
      desc: 'Give your team a home base.',
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div>
            <label style={{ fontSize: 11.5, color: 'var(--text-muted)', display: 'block', marginBottom: 5 }}>Workspace name</label>
            <input readOnly defaultValue="Acme Corp" style={{
              width: '100%', padding: '8px 10px', boxSizing: 'border-box',
              border: '1px solid var(--border-mid)', borderRadius: rInput,
              background: 'var(--surface-mid)', color: 'var(--text)', fontSize: 13, outline: 'none',
            }} />
          </div>
          <div>
            <label style={{ fontSize: 11.5, color: 'var(--text-muted)', display: 'block', marginBottom: 5 }}>Industry</label>
            <select style={{
              width: '100%', padding: '8px 10px', boxSizing: 'border-box',
              border: '1px solid var(--border-mid)', borderRadius: rInput,
              background: 'var(--surface-mid)', color: 'var(--text)', fontSize: 13, outline: 'none',
            }}>
              <option>Technology</option>
              <option>Finance</option>
              <option>Healthcare</option>
            </select>
          </div>
        </div>
      ),
    },
    {
      title: 'Invite your team',
      desc: 'Collaboration is better together.',
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {['sarah@acme.com', 'mike@acme.com'].map((e, i) => (
            <div key={i} style={{ display: 'flex', gap: 8 }}>
              <input readOnly defaultValue={e} style={{
                flex: 1, padding: '8px 10px',
                border: '1px solid var(--border-mid)', borderRadius: rInput,
                background: 'var(--surface-mid)', color: 'var(--text)', fontSize: 13, outline: 'none',
              }} />
              <div style={{ padding: '7px 10px', borderRadius: rInput, background: subtle, color: accent, fontSize: 11, fontWeight: 600, display: 'flex', alignItems: 'center' }}>Editor</div>
            </div>
          ))}
          <button style={{
            padding: '7px 12px', borderRadius: rBtn, fontSize: 11.5,
            border: '1px dashed var(--border-mid)', background: 'transparent',
            color: 'var(--text-muted)', cursor: 'pointer',
          }}>+ Add another</button>
        </div>
      ),
    },
    {
      title: 'Customize your theme',
      desc: 'Make it yours from day one.',
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
            {[
              { name: 'Ocean', color: '#3b82f6' },
              { name: 'Forest', color: '#16a34a' },
              { name: 'Ember', color: '#CC5536' },
            ].map(c => (
              <button key={c.name} style={{
                padding: '12px 8px', borderRadius: rCard,
                border: `2px solid ${c.color === '#CC5536' ? c.color : 'var(--border-mid)'}`,
                background: c.color + '15', cursor: 'pointer',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
              }}>
                <div style={{ width: 20, height: 20, borderRadius: '50%', background: c.color }} />
                <span style={{ fontSize: 10.5, color: 'var(--text-muted)', fontWeight: 500 }}>{c.name}</span>
              </button>
            ))}
          </div>
        </div>
      ),
    },
    {
      title: 'You\'re all set! 🎉',
      desc: 'Welcome to the team.',
      content: (
        <div style={{ textAlign: 'center', padding: '8px 0 4px' }}>
          <div style={{
            width: 60, height: 60, borderRadius: rFull,
            background: 'rgba(34,197,94,0.12)', border: '2px solid #16a34a',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 26, margin: '0 auto 12px',
          }}>✓</div>
          <div style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.6, marginBottom: 8 }}>
            Your workspace is ready.<br />
            <span style={{ color: 'var(--text-muted)', fontSize: 12 }}>3 teammates invited · Ocean theme applied</span>
          </div>
        </div>
      ),
    },
  ]

  const total = steps.length

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 460, padding: 24 }}>
      <div style={{
        background: 'var(--surface)', border: '1px solid var(--border-mid)',
        borderRadius: rCard, padding: '28px 28px 24px', width: 360,
        boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
      }}>
        {/* Progress */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontSize: 10.5, color: 'var(--text-muted)', fontWeight: 600 }}>STEP {step + 1} OF {total}</span>
            <span style={{ fontSize: 10.5, color: accent, fontWeight: 600 }}>{Math.round((step / (total - 1)) * 100)}%</span>
          </div>
          <div style={{ height: 4, background: 'var(--surface-high)', borderRadius: rFull, overflow: 'hidden' }}>
            <div style={{
              height: '100%', borderRadius: rFull,
              background: accent,
              width: `${((step) / (total - 1)) * 100}%`,
              transition: 'width 300ms ease',
            }} />
          </div>
          {/* Step dots */}
          <div style={{ display: 'flex', gap: 6, marginTop: 10, justifyContent: 'center' }}>
            {steps.map((_, i) => (
              <div key={i} style={{
                width: i === step ? 20 : 8, height: 8,
                borderRadius: rFull, background: i <= step ? accent : 'var(--surface-high)',
                transition: 'all 300ms ease', cursor: 'pointer',
              }} onClick={() => setStep(i)} />
            ))}
          </div>
        </div>

        {/* Step content */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.02em', marginBottom: 4 }}>
            {steps[step].title}
          </div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 16 }}>{steps[step].desc}</div>
          {steps[step].content}
        </div>

        {/* Navigation */}
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10 }}>
          <button
            onClick={() => setStep(s => Math.max(0, s - 1))}
            disabled={step === 0}
            style={{
              padding: '8px 16px', borderRadius: rBtn, fontSize: 12, fontWeight: 500,
              border: '1px solid var(--border-mid)', background: 'var(--surface-mid)',
              color: 'var(--text-muted)', cursor: step === 0 ? 'not-allowed' : 'pointer',
              opacity: step === 0 ? 0.45 : 1,
            }}
          >← Back</button>

          {step < total - 1 ? (
            <button
              onClick={() => setStep(s => Math.min(total - 1, s + 1))}
              style={{
                padding: '8px 20px', borderRadius: rBtn, fontSize: 12, fontWeight: 600,
                border: 'none', background: accent, color: '#fff', cursor: 'pointer',
                flex: 1, transition: 'opacity 100ms',
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >Continue →</button>
          ) : (
            <button
              onClick={() => setStep(0)}
              style={{
                padding: '8px 20px', borderRadius: rBtn, fontSize: 12, fontWeight: 600,
                border: 'none', background: '#16a34a', color: '#fff', cursor: 'pointer',
                flex: 1,
              }}
            >Go to Dashboard →</button>
          )}
        </div>
      </div>
    </div>
  )
}

/* ── Pattern preview router ────────────────────────────────────── */
function PatternPreview({ id, theme }: { id: string; theme: string }) {
  if (id === 'authentication') return <AuthPreview theme={theme} />
  if (id === 'dashboard')      return <DashboardPreview theme={theme} />
  if (id === 'settings')       return <SettingsPreview theme={theme} />
  if (id === 'billing')        return <BillingPreview theme={theme} />
  if (id === 'onboarding')     return <OnboardingPreview theme={theme} />
  return <div style={{ padding: 32, color: 'var(--text-muted)', fontSize: 13 }}>Preview not available for this pattern.</div>
}

/* ── Tab types ──────────────────────────────────────────────────── */
type Tab = 'preview' | 'composition' | 'rules'

/* ── Main PatternView ──────────────────────────────────────────── */
export function PatternView({ id }: { id: string }) {
  const pattern = getPattern(id)
  const { setSelected, activeTheme } = useDesignSystem()
  const [tab, setTab] = useState<Tab>('preview')

  if (!pattern) {
    return (
      <div style={{ padding: 32, color: 'var(--text-muted)' }}>Pattern not found.</div>
    )
  }

  const tabs: { id: Tab; label: string }[] = [
    { id: 'preview',     label: 'Preview' },
    { id: 'composition', label: 'Composition' },
    { id: 'rules',       label: 'AI Rules' },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{
        padding: '16px 24px 0',
        borderBottom: '1px solid var(--border)',
        flexShrink: 0,
        background: 'var(--surface)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <h1 style={{ fontSize: 18, fontWeight: 700, letterSpacing: '-0.02em' }}>
            {pattern.name}
          </h1>
          <span className="chip purple">Pattern</span>
          <span className="chip default">{pattern.category}</span>
        </div>
        <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: 12 }}>
          {pattern.description}
        </p>
        {/* Tabs */}
        <div style={{ display: 'flex', gap: 2 }}>
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              style={{
                padding: '6px 14px', fontSize: 12.5, fontWeight: 500,
                border: 'none', cursor: 'pointer',
                borderBottom: `2px solid ${tab === t.id ? 'var(--accent)' : 'transparent'}`,
                background: 'transparent',
                color: tab === t.id ? 'var(--accent)' : 'var(--text-muted)',
                transition: 'color 100ms, border-color 100ms',
              }}
            >
              {t.id === 'preview' && <Eye size={11} style={{ marginRight: 5, display: 'inline', verticalAlign: 'middle' }} />}
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab body */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {tab === 'preview' && (
          <div style={{ background: 'var(--surface-mid)', minHeight: '100%' }}>
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'flex-end',
              padding: '8px 16px', borderBottom: '1px solid var(--border)',
              background: 'var(--surface)',
            }}>
              <span style={{ fontSize: 11, color: 'var(--text-subtle)' }}>
                Theme: <strong style={{ color: 'var(--text-muted)' }}>{activeTheme.name}</strong>
              </span>
            </div>
            <PatternPreview id={pattern.id} theme={activeTheme.id} />
          </div>
        )}

        {tab === 'composition' && (
          <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Semantic purpose */}
            <div style={{
              background: 'var(--accent-subtle)', border: '1px solid rgba(91,110,247,0.2)',
              borderRadius: 'var(--radius-lg)', padding: '14px 16px',
              display: 'flex', gap: 12, alignItems: 'flex-start',
            }}>
              <Sparkles size={16} color="var(--accent)" style={{ flexShrink: 0, marginTop: 1 }} />
              <div>
                <div style={{ fontSize: 10, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, marginBottom: 4 }}>
                  Semantic Purpose
                </div>
                <p style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.6 }}>
                  {pattern.semanticPurpose}
                </p>
              </div>
            </div>

            {/* Component grid */}
            <div>
              <div style={{ fontSize: 11, color: 'var(--text-subtle)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
                <Layers size={12} />
                Component Composition
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 8 }}>
                {pattern.components.map(cId => {
                  const comp = getComponent(cId)
                  return (
                    <button
                      key={cId}
                      onClick={() => setSelected({ type: 'component', id: cId })}
                      style={{
                        background: 'var(--surface-mid)', border: '1px solid var(--border)',
                        borderRadius: 'var(--radius-lg)', padding: '12px 14px',
                        textAlign: 'left', cursor: 'pointer',
                        transition: 'all 100ms',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.borderColor = 'var(--accent)'
                        e.currentTarget.style.background = 'var(--accent-subtle)'
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.borderColor = 'var(--border)'
                        e.currentTarget.style.background = 'var(--surface-mid)'
                      }}
                    >
                      <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text)', textTransform: 'capitalize', marginBottom: 3 }}>
                        {comp?.name ?? cId}
                      </div>
                      {comp && (
                        <div style={{ fontSize: 11, color: 'var(--text-subtle)' }}>{comp.category}</div>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        )}

        {tab === 'rules' && (
          <div style={{ padding: '20px 24px' }}>
            <div style={{ fontSize: 11, color: 'var(--text-subtle)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
              <Sparkles size={12} />
              AI Generation Rules
              <span className="chip accent">{pattern.aiConstraints.length} constraints</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {pattern.aiConstraints.map((rule, i) => (
                <div key={i} style={{
                  display: 'flex', gap: 10, alignItems: 'flex-start',
                  padding: '10px 14px',
                  background: 'var(--green-subtle)', border: '1px solid rgba(45,213,120,0.2)',
                  borderRadius: 'var(--radius-md)',
                }}>
                  <CheckCircle size={13} color="var(--green)" style={{ flexShrink: 0, marginTop: 2 }} />
                  <span style={{ fontSize: 12.5, lineHeight: 1.5, color: 'var(--text)' }}>{rule}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
