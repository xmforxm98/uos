'use client'

import { useState } from 'react'
import { getPattern } from '@/data/patterns'
import { getComponent } from '@/data/components'
import { useDesignSystem } from '@/context/DesignSystemContext'
import { resolveRadius } from '@/data/themes'
import { CheckCircle, Layers, Sparkles, Eye } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'

function themeAccent(theme: string) {
  if (theme === 'dark')    return '#3b82f6'
  if (theme === 'brand-a') return '#2563eb'
  if (theme === 'brand-b') return '#007AFF'
  return '#CC5536'
}

function themeAccentSubtle(theme: string) {
  if (theme === 'dark')    return 'rgba(59,130,246,0.12)'
  if (theme === 'brand-a') return 'rgba(37,99,235,0.10)'
  if (theme === 'brand-b') return 'rgba(0,122,255,0.10)'
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
    <div className="flex justify-center items-center min-h-[480px] p-6">
      <div style={{
        background: 'var(--surface)', border: '1px solid var(--border-mid)',
        borderRadius: rCard, padding: '32px 28px', width: 340,
        boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
      }}>
        {/* Logo / brand */}
        <div className="text-center mb-6">
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
          <div className="text-[17px] font-bold text-text tracking-tight">Sign in</div>
          <div className="text-xs text-text-muted mt-0.5">to your account to continue</div>
        </div>

        {/* OAuth */}
        <div className="flex gap-2 mb-[18px]">
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
              <span className="opacity-60">{p === 'Google' ? '🌐' : '⚙'}</span> {p}
            </button>
          ))}
        </div>

        {/* Divider */}
        <div className="flex items-center gap-2.5 mb-4">
          <div className="flex-1 h-px bg-border" />
          <span className="text-[11px] text-text-subtle">or</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* Form */}
        <div className="flex flex-col gap-3">
          <div>
            <label className="text-[11.5px] text-text-muted block mb-[5px] font-medium">Email</label>
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
            <div className="flex justify-between mb-[5px]">
              <label className="text-[11.5px] text-text-muted font-medium">Password</label>
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
        <p className="text-[11px] text-text-subtle text-center mt-4">
          No account? <span style={{ color: accent, cursor: 'pointer' }}>Sign up free</span>
        </p>
        <p className="text-[10px] text-text-subtle text-center mt-2.5">
          By signing in you agree to our{' '}
          <span className="text-text-muted underline cursor-pointer">Terms</span>
          {' & '}
          <span className="text-text-muted underline cursor-pointer">Privacy Policy</span>
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
    { name: 'Alex Kim',  action: 'Upgraded to Pro',         time: '2m ago',  status: 'green' },
    { name: 'Maya R.',   action: 'Submitted support ticket', time: '14m ago', status: 'yellow' },
    { name: 'Sam J.',    action: 'Cancelled subscription',   time: '1h ago',  status: 'red' },
    { name: 'Tia L.',    action: 'Invited 3 teammates',      time: '3h ago',  status: 'green' },
  ]

  const initials = ['AK', 'MR', 'SJ', 'TL']
  const colors = [accent, '#d77a59', '#16a34a', '#dc2626']

  return (
    <div className="p-5 flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="text-base font-bold text-text tracking-tight">Good morning, Alex 👋</div>
          <div className="text-xs text-text-muted mt-0.5">Here&apos;s what&apos;s happening today.</div>
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
      <div className="grid grid-cols-2 gap-2.5">
        {metrics.map(m => (
          <div key={m.label} style={{
            background: 'var(--surface)', border: '1px solid var(--border-mid)',
            borderRadius: rCard, padding: '14px 16px',
            transition: 'box-shadow 150ms, transform 150ms',
          }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.12)'; e.currentTarget.style.transform = 'translateY(-1px)' }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = ''; e.currentTarget.style.transform = '' }}
          >
            <div className="text-[11px] text-text-muted mb-1.5">{m.label}</div>
            <div className="text-[20px] font-bold text-text tracking-tight">{m.value}</div>
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
        <div className="px-4 py-3 border-b border-border flex justify-between items-center">
          <span className="text-[13px] font-semibold text-text">Recent Activity</span>
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
            <div className="flex-1 min-w-0">
              <div className="text-xs font-medium text-text">{a.name}</div>
              <div className="text-[11px] text-text-muted truncate">{a.action}</div>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <Badge variant={a.status as 'green' | 'yellow' | 'red'}>
                {a.status === 'green' ? 'Success' : a.status === 'yellow' ? 'Pending' : 'Failed'}
              </Badge>
              <span className="text-[10.5px] text-text-subtle">{a.time}</span>
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
    <div className="p-5 flex flex-col gap-3.5">
      {/* Profile */}
      <Card className="border-border-mid" style={{ borderRadius: rCard }}>
        <CardHeader className="pb-3">
          <CardTitle>Profile</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex gap-3 items-center mb-3.5">
            <div style={{
              width: 44, height: 44, borderRadius: rFull,
              background: accent + '22', border: `2px solid ${accent}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 14, fontWeight: 700, color: accent, flexShrink: 0,
            }}>AK</div>
            <div>
              <div className="text-[13px] font-semibold text-text">Alex Kim</div>
              <div className="text-[11px] text-text-muted">alex@example.com</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            {['Full name', 'Username'].map(f => (
              <div key={f}>
                <label className="text-[11px] text-text-muted block mb-1">{f}</label>
                <input readOnly defaultValue={f === 'Full name' ? 'Alex Kim' : '@alexkim'} style={{
                  width: '100%', padding: '7px 9px',
                  border: '1px solid var(--border-mid)', borderRadius: rInput,
                  background: 'var(--surface-mid)', color: 'var(--text)',
                  fontSize: 12, outline: 'none', boxSizing: 'border-box',
                }} />
              </div>
            ))}
          </div>
          <div className="flex justify-end mt-2.5">
            <button style={{
              padding: '7px 14px', borderRadius: rBtn,
              background: accent, color: '#fff', fontSize: 11.5, fontWeight: 600,
              border: 'none', cursor: 'pointer',
            }}>Save changes</button>
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card className="border-border-mid" style={{ borderRadius: rCard }}>
        <CardHeader className="pb-3">
          <CardTitle>Notifications</CardTitle>
        </CardHeader>
        <CardContent className="pt-0 flex flex-col gap-3">
          {[
            { key: 'emails', label: 'Email notifications', desc: 'Receive updates via email' },
            { key: 'push',   label: 'Push notifications',  desc: 'Browser push alerts' },
            { key: 'twofa',  label: 'Two-factor auth',     desc: 'Extra security layer' },
          ].map(({ key, label, desc }) => (
            <div key={key} className="flex items-center justify-between gap-3">
              <div>
                <div className="text-[12.5px] font-medium text-text">{label}</div>
                <div className="text-[11px] text-text-muted">{desc}</div>
              </div>
              <Toggle on={toggles[key as keyof typeof toggles]} onChange={() => setToggles(t => ({ ...t, [key]: !t[key as keyof typeof t] }))} />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <div className="bg-red-subtle border border-[rgba(239,68,68,0.25)] p-[14px_18px]" style={{ borderRadius: rCard }}>
        <div className="text-xs font-semibold text-red mb-2 flex items-center gap-1.5">
          <span>⚠</span> Danger Zone
        </div>
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-[12.5px] font-medium text-text">Delete account</div>
            <div className="text-[11px] text-text-muted">Permanently remove your account and all data</div>
          </div>
          <Button variant="destructive" size="sm" style={{ borderRadius: rBtn }}>
            Delete
          </Button>
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
    { id: 'free',       name: 'Free',       price: '$0',    period: '/mo', features: ['5 projects', '2 team members', '1 GB storage', 'Community support'],                               cta: 'Get started',    highlight: false },
    { id: 'pro',        name: 'Pro',        price: '$29',   period: '/mo', features: ['Unlimited projects', '10 team members', '50 GB storage', 'Priority support', 'Analytics'],         cta: 'Upgrade to Pro', highlight: true },
    { id: 'enterprise', name: 'Enterprise', price: 'Custom', period: '',   features: ['Everything in Pro', 'Unlimited members', 'SSO & SAML', 'SLA guarantee', 'Dedicated CSM'],          cta: 'Contact sales',  highlight: false },
  ]

  return (
    <div className="p-5 flex flex-col gap-4 items-center">
      {/* Header */}
      <div className="text-center">
        <div className="text-base font-bold text-text tracking-tight">Choose your plan</div>
        <div className="text-xs text-text-muted mt-0.5">Start free. Scale when you&apos;re ready.</div>
      </div>

      {/* Trial banner */}
      <div className="bg-yellow-subtle border border-[rgba(234,179,8,0.3)] px-3.5 py-2 flex items-center gap-1.5" style={{ borderRadius: rBtn }}>
        <span className="text-[11px] text-yellow font-medium">⏰ Trial ends in 7 days</span>
        <span className="text-[10.5px] text-yellow opacity-80">— upgrade to keep access</span>
      </div>

      {/* Plan cards */}
      <div className="grid grid-cols-3 gap-2.5 w-full">
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
            <div className="text-[13px] font-bold text-text mb-1">{p.name}</div>
            <div className="flex items-baseline gap-0.5 mb-3">
              <span style={{ fontSize: p.price === 'Custom' ? 16 : 22, fontWeight: 800, color: p.highlight ? accent : 'var(--text)', letterSpacing: '-0.03em' }}>{p.price}</span>
              <span className="text-[11px] text-text-muted">{p.period}</span>
            </div>
            <div className="flex flex-col gap-[5px] mb-3.5">
              {p.features.map(f => (
                <div key={f} className="flex items-center gap-[5px]">
                  <div style={{ width: 5, height: 5, borderRadius: '50%', background: p.highlight ? accent : 'var(--text-subtle)', flexShrink: 0 }} />
                  <span className="text-[10.5px] text-text-muted">{f}</span>
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
      <div className="flex gap-4 items-center">
        {['🔒 SSL secured', '✓ No hidden fees', '↺ Cancel anytime'].map(t => (
          <span key={t} className="text-[10.5px] text-text-subtle">{t}</span>
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
        <div className="flex flex-col gap-2.5">
          <div>
            <label className="text-[11.5px] text-text-muted block mb-[5px]">Workspace name</label>
            <input readOnly defaultValue="Acme Corp" style={{
              width: '100%', padding: '8px 10px', boxSizing: 'border-box',
              border: '1px solid var(--border-mid)', borderRadius: rInput,
              background: 'var(--surface-mid)', color: 'var(--text)', fontSize: 13, outline: 'none',
            }} />
          </div>
          <div>
            <label className="text-[11.5px] text-text-muted block mb-[5px]">Industry</label>
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
        <div className="flex flex-col gap-2.5">
          {['sarah@acme.com', 'mike@acme.com'].map((e, i) => (
            <div key={i} className="flex gap-2">
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
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-3 gap-2">
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
                <span className="text-[10.5px] text-text-muted font-medium">{c.name}</span>
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
        <div className="text-center py-2">
          <div style={{
            width: 60, height: 60, borderRadius: rFull,
            background: 'rgba(34,197,94,0.12)', border: '2px solid #16a34a',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 26, margin: '0 auto 12px',
          }}>✓</div>
          <div className="text-[13px] text-text leading-relaxed mb-2">
            Your workspace is ready.<br />
            <span className="text-text-muted text-xs">3 teammates invited · Ocean theme applied</span>
          </div>
        </div>
      ),
    },
  ]

  const total = steps.length

  return (
    <div className="flex justify-center items-center min-h-[460px] p-6">
      <div style={{
        background: 'var(--surface)', border: '1px solid var(--border-mid)',
        borderRadius: rCard, padding: '28px 28px 24px', width: 360,
        boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
      }}>
        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <span className="text-[10.5px] text-text-muted font-semibold">STEP {step + 1} OF {total}</span>
            <span style={{ fontSize: 10.5, color: accent, fontWeight: 600 }}>{Math.round((step / (total - 1)) * 100)}%</span>
          </div>
          <div className="h-1 bg-surface-high overflow-hidden" style={{ borderRadius: rFull }}>
            <div style={{
              height: '100%', borderRadius: rFull,
              background: accent,
              width: `${((step) / (total - 1)) * 100}%`,
              transition: 'width 300ms ease',
            }} />
          </div>
          {/* Step dots */}
          <div className="flex gap-1.5 mt-2.5 justify-center">
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
        <div className="mb-5">
          <div className="text-base font-bold text-text tracking-tight mb-1">
            {steps[step].title}
          </div>
          <div className="text-xs text-text-muted mb-4">{steps[step].desc}</div>
          {steps[step].content}
        </div>

        {/* Navigation */}
        <div className="flex justify-between gap-2.5">
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

/* ── AI Chat Preview ───────────────────────────────────────────── */
function AIChatPreview({ theme }: { theme: string }) {
  const accent = themeAccent(theme)
  const subtle = themeAccentSubtle(theme)
  const rCard  = resolveRadius('radius/md', theme)
  const rFull  = resolveRadius('radius/full', theme)
  const rBtn   = resolveRadius('radius/sm', theme)

  const isApple = theme === 'brand-b'
  const glassBg = isApple ? 'rgba(255,255,255,0.72)' : 'var(--surface)'
  const glassBackdrop = isApple ? 'saturate(180%) blur(20px)' : 'none'
  const glassBorder = isApple ? '1px solid rgba(255,255,255,0.55)' : '1px solid var(--border-mid)'
  const glassShadow = isApple ? '0 8px 32px rgba(0,0,0,0.10), inset 0 1px 0 rgba(255,255,255,0.65)' : '0 2px 8px rgba(0,0,0,0.08)'

  const messages = [
    { role: 'user',      text: 'Summarize the Q3 financial report in 3 bullet points.' },
    { role: 'assistant', text: '• Revenue grew **18% YoY** to $48.3M, driven by enterprise expansion.\n• Operating margin improved to **24%** (+4pp) through headcount efficiency.\n• Cash reserves at **$120M** — 2× burn rate coverage for 18 months.' },
    { role: 'user',      text: 'What were the main risks mentioned?' },
  ]

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', height: 500,
      background: isApple
        ? 'linear-gradient(160deg, #e8f4ff 0%, #f0e8ff 50%, #e8fff0 100%)'
        : 'var(--surface-mid)',
    }}>
      {/* Header */}
      <div style={{
        padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: glassBg, backdropFilter: glassBackdrop, WebkitBackdropFilter: glassBackdrop,
        borderBottom: glassBorder, boxShadow: isApple ? '0 1px 0 rgba(255,255,255,0.5)' : 'none',
        flexShrink: 0,
      } as React.CSSProperties}>
        <div className="flex items-center gap-2.5">
          <div style={{
            width: 32, height: 32, borderRadius: rFull,
            background: isApple ? `linear-gradient(135deg, ${accent}, ${accent}aa)` : accent,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 14, flexShrink: 0,
            boxShadow: isApple ? `0 2px 8px ${accent}55` : 'none',
          }}>✦</div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: isApple ? '#1c1c1e' : 'var(--text)' }}>AI Assistant</div>
            <div style={{ fontSize: 10.5, color: isApple ? 'rgba(60,60,67,0.6)' : 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#30d158', display: 'inline-block' }} />
              GPT-4o · Ready
            </div>
          </div>
        </div>
        <div className="flex gap-1.5">
          {['⋯', '+'].map(s => (
            <button key={s} style={{
              width: 28, height: 28, borderRadius: rFull,
              background: isApple ? 'rgba(0,0,0,0.05)' : 'var(--surface-high)',
              border: 'none', cursor: 'pointer', fontSize: 14,
              color: isApple ? '#3c3c43' : 'var(--text-muted)',
            }}>{s}</button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 pb-2 flex flex-col gap-3">
        {messages.map((m, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: m.role === 'user' ? 'row-reverse' : 'row', gap: 8, alignItems: 'flex-end' }}>
            {m.role === 'assistant' && (
              <div style={{
                width: 26, height: 26, borderRadius: rFull, flexShrink: 0,
                background: isApple ? `linear-gradient(135deg, ${accent}, ${accent}aa)` : accent,
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11,
              }}>✦</div>
            )}
            <div style={{
              maxWidth: '72%',
              background: m.role === 'user'
                ? accent
                : (isApple ? 'rgba(255,255,255,0.75)' : 'var(--surface)'),
              backdropFilter: m.role === 'assistant' && isApple ? 'blur(16px)' : 'none',
              WebkitBackdropFilter: m.role === 'assistant' && isApple ? 'blur(16px)' : 'none',
              border: m.role === 'assistant'
                ? (isApple ? '1px solid rgba(255,255,255,0.6)' : '1px solid var(--border-mid)')
                : 'none',
              boxShadow: m.role === 'assistant' && isApple ? glassShadow : (m.role === 'user' ? `0 2px 8px ${accent}44` : 'none'),
              borderRadius: m.role === 'user' ? `${rCard} ${rCard} 4px ${rCard}` : `4px ${rCard} ${rCard} ${rCard}`,
              padding: '10px 14px',
              color: m.role === 'user' ? '#fff' : (isApple ? '#1c1c1e' : 'var(--text)'),
            } as React.CSSProperties}>
              <div className="text-[12.5px] leading-[1.55] whitespace-pre-wrap">
                {m.text.replace(/\*\*(.*?)\*\*/g, '$1')}
              </div>
              {m.role === 'assistant' && (
                <div className="flex gap-2.5 mt-2 opacity-50">
                  {['↺', '📋', '👍', '👎'].map(a => (
                    <button key={a} className="bg-transparent border-none cursor-pointer text-[11px] p-0">{a}</button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        <div className="flex items-end gap-2">
          <div style={{
            width: 26, height: 26, borderRadius: rFull, flexShrink: 0,
            background: isApple ? `linear-gradient(135deg, ${accent}, ${accent}aa)` : accent,
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11,
          }}>✦</div>
          <div style={{
            background: isApple ? 'rgba(255,255,255,0.75)' : 'var(--surface)',
            backdropFilter: isApple ? 'blur(16px)' : 'none',
            border: isApple ? '1px solid rgba(255,255,255,0.6)' : '1px solid var(--border-mid)',
            borderRadius: `4px ${rCard} ${rCard} ${rCard}`,
            padding: '12px 16px', display: 'flex', gap: 4, alignItems: 'center',
          }}>
            {[0, 1, 2].map(d => (
              <div key={d} style={{
                width: 7, height: 7, borderRadius: '50%',
                background: accent, opacity: 0.6 + d * 0.2,
                animation: `pulse 1.2s ease-in-out ${d * 0.2}s infinite`,
              }} />
            ))}
          </div>
        </div>
      </div>

      {/* Input bar */}
      <div style={{
        padding: '10px 12px',
        background: glassBg, backdropFilter: glassBackdrop, WebkitBackdropFilter: glassBackdrop,
        borderTop: glassBorder, flexShrink: 0,
      } as React.CSSProperties}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          background: isApple ? 'rgba(255,255,255,0.65)' : 'var(--surface-mid)',
          border: isApple ? '1px solid rgba(255,255,255,0.55)' : '1px solid var(--border-mid)',
          borderRadius: rFull, padding: '8px 10px 8px 16px',
          boxShadow: isApple ? '0 2px 8px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.8)' : 'none',
        }}>
          <input readOnly placeholder="Ask anything..." style={{
            flex: 1, background: 'none', border: 'none', outline: 'none',
            fontSize: 13, color: isApple ? '#1c1c1e' : 'var(--text)',
          }} />
          <button style={{
            width: 32, height: 32, borderRadius: rFull,
            background: accent, border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0, boxShadow: isApple ? `0 2px 8px ${accent}55` : 'none',
          }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"/>
            </svg>
          </button>
        </div>
        <p style={{ fontSize: 9.5, color: isApple ? 'rgba(60,60,67,0.4)' : 'var(--text-subtle)', textAlign: 'center', marginTop: 6 }}>
          AI can make mistakes — verify important information.
        </p>
      </div>
    </div>
  )
}

/* ── AI Generation Preview ─────────────────────────────────────── */
function AIGenerationPreview({ theme }: { theme: string }) {
  const accent = themeAccent(theme)
  const subtle = themeAccentSubtle(theme)
  const [streaming, setStreaming] = useState(false)
  const [output, setOutput] = useState('')
  const rCard = resolveRadius('radius/md', theme)
  const rBtn  = resolveRadius('radius/sm', theme)
  const rFull = resolveRadius('radius/full', theme)
  const isApple = theme === 'brand-b'

  const fullOutput = `Product Design Lead at Anthropic

We're looking for an exceptional Product Design Lead to shape the interfaces that millions of people use to interact with AI every day.

**What you'll do:**
• Own end-to-end design for Claude.ai — from concept to shipped product
• Define interaction patterns for novel AI capabilities
• Partner closely with research, engineering, and product teams
• Build and mentor a world-class design team`

  function handleGenerate() {
    if (streaming) { setStreaming(false); return }
    setOutput('')
    setStreaming(true)
    let i = 0
    const words = fullOutput.split('')
    const iv = setInterval(() => {
      if (i < words.length) {
        setOutput(p => p + words[i])
        i++
      } else {
        clearInterval(iv)
        setStreaming(false)
      }
    }, 18)
  }

  const glassBg = isApple ? 'rgba(255,255,255,0.72)' : 'var(--surface)'
  const glassBackdrop = isApple ? 'saturate(180%) blur(20px)' : 'none'
  const glassBorder = isApple ? 'rgba(255,255,255,0.55)' : 'var(--border-mid)'

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', gap: 14, padding: 20,
      background: isApple ? 'linear-gradient(160deg, #f0f8ff 0%, #f8f0ff 100%)' : 'var(--surface-mid)',
      minHeight: 480,
    }}>
      {/* Model + controls bar */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10,
        background: glassBg, backdropFilter: glassBackdrop, WebkitBackdropFilter: glassBackdrop,
        border: `1px solid ${glassBorder}`, borderRadius: rCard, padding: '10px 14px',
        boxShadow: isApple ? '0 4px 16px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.7)' : 'none',
      } as React.CSSProperties}>
        <div className="flex gap-2 items-center">
          <select style={{
            padding: '5px 10px', borderRadius: rBtn, fontSize: 12, fontWeight: 500,
            border: `1px solid ${glassBorder}`, cursor: 'pointer',
            background: isApple ? 'rgba(255,255,255,0.6)' : 'var(--surface-mid)',
            color: isApple ? '#1c1c1e' : 'var(--text)',
          }}>
            <option>gpt-4o</option>
            <option>claude-3.5-sonnet</option>
            <option>gemini-1.5-pro</option>
          </select>
          <div className="flex items-center gap-1.5">
            <span style={{ fontSize: 11, color: isApple ? 'rgba(60,60,67,0.5)' : 'var(--text-subtle)' }}>Temp</span>
            <div style={{ width: 60, height: 4, background: isApple ? 'rgba(0,0,0,0.1)' : 'var(--border-mid)', borderRadius: 2, position: 'relative' }}>
              <div style={{ width: '40%', height: '100%', background: accent, borderRadius: 2 }} />
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: accent, position: 'absolute', top: -3, left: '38%', boxShadow: `0 0 0 2px ${isApple ? 'white' : 'var(--surface)'}` }} />
            </div>
            <span style={{ fontSize: 11, fontFamily: 'monospace', color: accent }}>0.7</span>
          </div>
        </div>
        <div className="flex gap-1.5 items-center">
          <span style={{ fontSize: 10.5, color: isApple ? 'rgba(60,60,67,0.5)' : 'var(--text-subtle)' }}>342 / 4096 tokens</span>
        </div>
      </div>

      {/* Prompt area */}
      <div style={{
        background: glassBg, backdropFilter: glassBackdrop, WebkitBackdropFilter: glassBackdrop,
        border: `1px solid ${glassBorder}`, borderRadius: rCard,
        overflow: 'hidden',
        boxShadow: isApple ? '0 4px 16px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.7)' : 'none',
      } as React.CSSProperties}>
        <div style={{ padding: '8px 12px', borderBottom: `1px solid ${isApple ? 'rgba(0,0,0,0.06)' : 'var(--border)'}`, display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: isApple ? 'rgba(60,60,67,0.5)' : 'var(--text-subtle)' }}>System</span>
        </div>
        <textarea readOnly defaultValue="You are a professional copywriter specializing in tech job descriptions. Write compelling, concise, and inclusive job postings."
          style={{
            width: '100%', resize: 'none', border: 'none', outline: 'none', padding: '10px 14px',
            background: 'transparent', color: isApple ? '#1c1c1e' : 'var(--text)', fontSize: 12.5, lineHeight: 1.55,
            fontFamily: 'inherit',
          }} rows={2} />
        <div style={{ padding: '8px 12px', borderTop: `1px solid ${isApple ? 'rgba(0,0,0,0.06)' : 'var(--border)'}`, borderBottom: `1px solid ${isApple ? 'rgba(0,0,0,0.06)' : 'var(--border)'}`, display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: accent }}>User</span>
        </div>
        <textarea readOnly defaultValue="Write a job description for a Product Design Lead role at an AI company."
          style={{
            width: '100%', resize: 'none', border: 'none', outline: 'none', padding: '10px 14px',
            background: 'transparent', color: isApple ? '#1c1c1e' : 'var(--text)', fontSize: 12.5, lineHeight: 1.55,
            fontFamily: 'inherit',
          }} rows={2} />
      </div>

      {/* Generate button */}
      <button onClick={handleGenerate} style={{
        padding: '10px 0', borderRadius: rBtn,
        background: streaming ? 'rgba(239,68,68,0.9)' : accent, color: '#fff',
        fontSize: 13, fontWeight: 600, border: 'none', cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        boxShadow: isApple ? `0 4px 16px ${streaming ? 'rgba(239,68,68,0.4)' : accent + '44'}` : 'none',
        transition: 'background 200ms, box-shadow 200ms',
      }}>
        {streaming ? (
          <><span style={{ width: 10, height: 10, borderRadius: 2, background: '#fff', display: 'inline-block' }} /> Stop Generation</>
        ) : (
          <><span>▶</span> Generate</>
        )}
      </button>

      {/* Output */}
      {(output || streaming) && (
        <div style={{
          background: glassBg, backdropFilter: glassBackdrop, WebkitBackdropFilter: glassBackdrop,
          border: `1px solid ${glassBorder}`, borderRadius: rCard, padding: '14px 16px',
          boxShadow: isApple ? '0 4px 16px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.7)' : 'none',
        } as React.CSSProperties}>
          <div className="flex justify-between items-center mb-2.5">
            <div className="flex gap-1.5 items-center">
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: streaming ? '#30d158' : accent, boxShadow: streaming ? '0 0 6px rgba(48,209,88,0.8)' : 'none' }} />
              <span style={{ fontSize: 11, fontWeight: 600, color: isApple ? 'rgba(60,60,67,0.6)' : 'var(--text-muted)' }}>
                {streaming ? 'Generating…' : 'Output'}
              </span>
            </div>
            {!streaming && (
              <div className="flex gap-1.5">
                {['📋 Copy', '↺ Retry'].map(a => (
                  <button key={a} style={{
                    padding: '4px 10px', borderRadius: rBtn, fontSize: 11,
                    background: isApple ? 'rgba(0,0,0,0.05)' : 'var(--surface-high)',
                    border: `1px solid ${isApple ? 'rgba(0,0,0,0.08)' : 'var(--border-mid)'}`,
                    color: isApple ? '#3c3c43' : 'var(--text-muted)', cursor: 'pointer',
                  }}>{a}</button>
                ))}
              </div>
            )}
          </div>
          <div style={{ fontSize: 13, lineHeight: 1.65, color: isApple ? '#1c1c1e' : 'var(--text)', whiteSpace: 'pre-wrap' }}>
            {output}
            {streaming && <span style={{ display: 'inline-block', width: 2, height: 14, background: accent, marginLeft: 2, verticalAlign: 'text-bottom', animation: 'pulse 1s ease-in-out infinite' }} />}
          </div>
        </div>
      )}
    </div>
  )
}

/* ── AI Command Preview ─────────────────────────────────────────── */
function AICommandPreview({ theme }: { theme: string }) {
  const accent = themeAccent(theme)
  const subtle = themeAccentSubtle(theme)
  // Command palettes are always rounded rectangles — use radius/md (never radius/lg which is full for Brand B)
  const rCard = resolveRadius('radius/md', theme)
  const rFull = resolveRadius('radius/full', theme)
  const rBtn  = resolveRadius('radius/xs', theme)
  const isApple = theme === 'brand-b'

  const groups = [
    {
      label: 'AI Answer',
      items: [{ icon: '✦', text: 'Summarize selected text', sub: 'Ask AI · Shift+Enter for full response', accent: true }],
    },
    {
      label: 'Actions',
      items: [
        { icon: '⊕', text: 'New Project',           sub: '⌘N',   accent: false },
        { icon: '⟲', text: 'Share with team…',     sub: '⌘⇧S', accent: false },
        { icon: '⊘', text: 'Archive current space', sub: '',      accent: false },
      ],
    },
    {
      label: 'Recent',
      items: [
        { icon: '⊙', text: 'Q3 Financial Report', sub: 'Document · 2h ago',   accent: false },
        { icon: '⊙', text: 'Design System v2',    sub: 'Project · yesterday', accent: false },
      ],
    },
  ]

  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'flex-start',
      padding: '32px 24px', minHeight: 500, position: 'relative',
      background: isApple
        ? 'linear-gradient(135deg, #1a0533 0%, #0d1a40 35%, #003366 65%, #001a2e 100%)'
        : 'var(--surface-mid)',
      overflow: 'hidden',
    }}>
      {/* Brand B: floating color blobs behind glass */}
      {isApple && (
        <>
          <div style={{
            position: 'absolute', width: 280, height: 280, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0,122,255,0.55) 0%, transparent 70%)',
            top: -60, left: -40, filter: 'blur(50px)',
            animation: 'blob-a 8s ease-in-out infinite',
          }} />
          <div style={{
            position: 'absolute', width: 240, height: 240, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(140,80,255,0.5) 0%, transparent 70%)',
            bottom: -40, right: 20, filter: 'blur(45px)',
            animation: 'blob-b 10s ease-in-out infinite',
          }} />
          <div style={{
            position: 'absolute', width: 180, height: 180, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0,200,180,0.4) 0%, transparent 70%)',
            top: 60, right: 80, filter: 'blur(35px)',
            animation: 'blob-c 12s ease-in-out infinite',
          }} />
        </>
      )}

      {/* Backdrop scrim */}
      <div className="relative w-full max-w-[520px] z-[1]">
        {/* Hint badge */}
        <div className="flex justify-center mb-3">
          <div style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '5px 12px', borderRadius: rFull,
            background: isApple ? 'rgba(255,255,255,0.15)' : 'var(--surface)',
            border: `1px solid ${isApple ? 'rgba(255,255,255,0.25)' : 'var(--border-mid)'}`,
            backdropFilter: isApple ? 'blur(12px)' : 'none',
            WebkitBackdropFilter: isApple ? 'blur(12px)' : 'none',
          }}>
            <kbd style={{
              background: isApple ? 'rgba(255,255,255,0.2)' : 'var(--surface-high)',
              border: `1px solid ${isApple ? 'rgba(255,255,255,0.3)' : 'var(--border-mid)'}`,
              borderRadius: 5, padding: '1px 6px', fontSize: 11, fontFamily: 'monospace',
              color: isApple ? 'rgba(255,255,255,0.9)' : 'var(--text-muted)',
            }}>⌘K</kbd>
            <span style={{ fontSize: 11, color: isApple ? 'rgba(255,255,255,0.7)' : 'var(--text-muted)' }}>AI Command</span>
          </div>
        </div>

        {/* Palette */}
        <div style={{
          background: isApple ? 'rgba(255,255,255,0.14)' : 'var(--surface)',
          backdropFilter: isApple ? 'saturate(200%) blur(32px)' : 'none',
          WebkitBackdropFilter: isApple ? 'saturate(200%) blur(32px)' : 'none',
          border: `1px solid ${isApple ? 'rgba(255,255,255,0.22)' : 'var(--border-mid)'}`,
          borderRadius: rCard,
          boxShadow: isApple
            ? '0 24px 60px rgba(0,0,0,0.5), 0 4px 16px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.3)'
            : '0 20px 40px rgba(0,0,0,0.15)',
          overflow: 'hidden',
        }}>
          {/* Search input */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10, padding: '14px 16px',
            borderBottom: `1px solid ${isApple ? 'rgba(255,255,255,0.1)' : 'var(--border)'}`,
          }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={isApple ? 'rgba(255,255,255,0.5)' : 'var(--text-subtle)'} strokeWidth="2" strokeLinecap="round">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input readOnly defaultValue="Summarize selected" style={{
              flex: 1, background: 'none', border: 'none', outline: 'none',
              fontSize: 15, color: isApple ? 'rgba(255,255,255,0.92)' : 'var(--text)',
              fontWeight: 300,
            }} />
            <kbd style={{
              fontSize: 10, fontFamily: 'monospace',
              background: isApple ? 'rgba(255,255,255,0.12)' : 'var(--surface-high)',
              border: `1px solid ${isApple ? 'rgba(255,255,255,0.18)' : 'var(--border-mid)'}`,
              borderRadius: 5, padding: '2px 6px',
              color: isApple ? 'rgba(255,255,255,0.55)' : 'var(--text-subtle)',
            }}>ESC</kbd>
          </div>

          {/* Results */}
          <div className="max-h-[300px] overflow-y-auto">
            {groups.map((g, gi) => (
              <div key={gi}>
                <div style={{
                  padding: '8px 16px 4px', fontSize: 10.5, fontWeight: 600,
                  textTransform: 'uppercase', letterSpacing: '0.06em',
                  color: isApple ? 'rgba(255,255,255,0.35)' : 'var(--text-subtle)',
                }}>{g.label}</div>
                {g.items.map((item, ii) => (
                  <div key={ii} style={{
                    display: 'flex', alignItems: 'center', gap: 12, padding: '9px 16px',
                    background: gi === 0 && ii === 0 ? (isApple ? 'rgba(0,122,255,0.25)' : subtle) : 'transparent',
                    cursor: 'pointer', transition: 'background 60ms',
                    borderLeft: gi === 0 && ii === 0 && isApple ? `2px solid ${accent}` : '2px solid transparent',
                  }}
                    onMouseEnter={e => e.currentTarget.style.background = isApple ? 'rgba(255,255,255,0.08)' : 'var(--surface-mid)'}
                    onMouseLeave={e => e.currentTarget.style.background = gi === 0 && ii === 0 ? (isApple ? 'rgba(0,122,255,0.25)' : subtle) : 'transparent'}
                  >
                    <div style={{
                      width: 30, height: 30, borderRadius: item.accent ? rFull : rBtn,
                      background: item.accent ? accent : (isApple ? 'rgba(255,255,255,0.1)' : 'var(--surface-high)'),
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 13, color: item.accent ? '#fff' : (isApple ? 'rgba(255,255,255,0.7)' : 'var(--text-muted)'),
                      flexShrink: 0, boxShadow: item.accent ? `0 2px 12px ${accent}66` : 'none',
                    }}>{item.icon}</div>
                    <div className="flex-1 min-w-0">
                      <div style={{ fontSize: 13, color: isApple ? 'rgba(255,255,255,0.92)' : 'var(--text)', fontWeight: item.accent ? 500 : 400 }}>{item.text}</div>
                      {item.sub && <div style={{ fontSize: 11, color: isApple ? 'rgba(255,255,255,0.4)' : 'var(--text-subtle)', marginTop: 1 }}>{item.sub}</div>}
                    </div>
                    {item.sub && item.sub.startsWith('⌘') && (
                      <kbd style={{
                        fontSize: 11, fontFamily: 'monospace',
                        background: isApple ? 'rgba(255,255,255,0.1)' : 'var(--surface-high)',
                        border: `1px solid ${isApple ? 'rgba(255,255,255,0.15)' : 'var(--border-mid)'}`,
                        borderRadius: 5, padding: '2px 7px',
                        color: isApple ? 'rgba(255,255,255,0.5)' : 'var(--text-subtle)',
                      }}>{item.sub}</kbd>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Footer */}
          <div style={{
            padding: '8px 16px', borderTop: `1px solid ${isApple ? 'rgba(255,255,255,0.1)' : 'var(--border)'}`,
            display: 'flex', gap: 14,
          }}>
            {[['↵', 'Select'], ['↑↓', 'Navigate'], ['⌘↵', 'Ask AI']].map(([key, label]) => (
              <div key={key} className="flex items-center gap-1">
                <kbd style={{
                  fontSize: 10,
                  background: isApple ? 'rgba(255,255,255,0.1)' : 'var(--surface-high)',
                  border: `1px solid ${isApple ? 'rgba(255,255,255,0.15)' : 'var(--border-mid)'}`,
                  borderRadius: 4, padding: '1px 5px', fontFamily: 'monospace',
                  color: isApple ? 'rgba(255,255,255,0.5)' : 'var(--text-subtle)',
                }}>{key}</kbd>
                <span style={{ fontSize: 10.5, color: isApple ? 'rgba(255,255,255,0.35)' : 'var(--text-subtle)' }}>{label}</span>
              </div>
            ))}
          </div>
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
  if (id === 'ai-chat')        return <AIChatPreview theme={theme} />
  if (id === 'ai-generation')  return <AIGenerationPreview theme={theme} />
  if (id === 'ai-command')     return <AICommandPreview theme={theme} />
  return <div className="p-8 text-text-muted text-[13px]">Preview not available for this pattern.</div>
}

/* ── Main PatternView ──────────────────────────────────────────── */
export function PatternView({ id }: { id: string }) {
  const pattern = getPattern(id)
  const { setSelected, activeTheme } = useDesignSystem()

  if (!pattern) {
    return (
      <div className="p-8 text-text-muted">Pattern not found.</div>
    )
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="px-6 pt-4 pb-0 border-b border-border shrink-0 bg-surface">
        <div className="flex items-center gap-2 mb-1">
          <h1 className="text-[18px] font-bold tracking-tight text-text">
            {pattern.name}
          </h1>
          <Badge variant="purple">Pattern</Badge>
          <Badge variant="default">{pattern.category}</Badge>
        </div>
        <p className="text-[13px] text-text-muted leading-relaxed mb-3">
          {pattern.description}
        </p>
        {/* Tabs rendered as Shadcn Tabs — we manage active state internally */}
        <Tabs defaultValue="preview" className="w-full">
          <TabsList className="bg-transparent p-0 h-auto gap-0 border-none">
            <TabsTrigger
              value="preview"
              className="px-3.5 py-1.5 text-[12.5px] font-medium rounded-none border-b-2 border-transparent data-[state=active]:border-accent data-[state=active]:text-accent data-[state=inactive]:text-text-muted bg-transparent shadow-none"
            >
              <Eye size={11} className="mr-[5px] inline align-middle" />
              Preview
            </TabsTrigger>
            <TabsTrigger
              value="composition"
              className="px-3.5 py-1.5 text-[12.5px] font-medium rounded-none border-b-2 border-transparent data-[state=active]:border-accent data-[state=active]:text-accent data-[state=inactive]:text-text-muted bg-transparent shadow-none"
            >
              Composition
            </TabsTrigger>
            <TabsTrigger
              value="rules"
              className="px-3.5 py-1.5 text-[12.5px] font-medium rounded-none border-b-2 border-transparent data-[state=active]:border-accent data-[state=active]:text-accent data-[state=inactive]:text-text-muted bg-transparent shadow-none"
            >
              AI Rules
            </TabsTrigger>
          </TabsList>

          {/* Tab body — lifted outside header padding via negative margin trick */}
          <div className="flex-1 overflow-y-auto mt-0">
            <TabsContent value="preview" className="m-0 bg-surface-mid min-h-full">
              <div className="flex items-center justify-end px-4 py-2 border-b border-border bg-surface">
                <span className="text-[11px] text-text-subtle">
                  Theme: <strong className="text-text-muted">{activeTheme.name}</strong>
                </span>
              </div>
              <PatternPreview id={pattern.id} theme={activeTheme.id} />
            </TabsContent>

            <TabsContent value="composition" className="m-0 p-5 flex flex-col gap-4">
              {/* Semantic purpose */}
              <div className="bg-accent-subtle border border-accent-border rounded-lg p-[14px_16px] flex gap-3 items-start">
                <Sparkles size={16} className="text-accent shrink-0 mt-0.5" />
                <div>
                  <div className="text-[10px] text-accent uppercase tracking-widest font-semibold mb-1">
                    Semantic Purpose
                  </div>
                  <p className="text-[13px] text-text leading-relaxed">
                    {pattern.semanticPurpose}
                  </p>
                </div>
              </div>

              {/* Component grid */}
              <div>
                <div className="text-[11px] text-text-subtle font-semibold uppercase tracking-widest mb-2.5 flex items-center gap-1.5">
                  <Layers size={12} />
                  Component Composition
                </div>
                <div className="grid gap-2" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))' }}>
                  {pattern.components.map(cId => {
                    const comp = getComponent(cId)
                    return (
                      <button
                        key={cId}
                        onClick={() => setSelected({ type: 'component', id: cId })}
                        className="bg-surface-mid border border-border rounded-lg p-[12px_14px] text-left cursor-pointer transition-all hover:border-accent hover:bg-accent-subtle"
                      >
                        <div className="text-[13px] font-medium text-text capitalize mb-0.5">
                          {comp?.name ?? cId}
                        </div>
                        {comp && (
                          <div className="text-[11px] text-text-subtle">{comp.category}</div>
                        )}
                      </button>
                    )
                  })}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="rules" className="m-0 p-5">
              <div className="text-[11px] text-text-subtle font-semibold uppercase tracking-widest mb-2.5 flex items-center gap-1.5">
                <Sparkles size={12} />
                AI Generation Rules
                <Badge variant="accent">{pattern.aiConstraints.length} constraints</Badge>
              </div>
              <div className="flex flex-col gap-1.5">
                {pattern.aiConstraints.map((rule, i) => (
                  <div key={i} className="flex gap-2.5 items-start px-3.5 py-2.5 bg-green-subtle border border-[rgba(45,213,120,0.2)] rounded-md">
                    <CheckCircle size={13} className="text-green shrink-0 mt-0.5" />
                    <span className="text-[12.5px] leading-relaxed text-text">{rule}</span>
                  </div>
                ))}
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  )
}
