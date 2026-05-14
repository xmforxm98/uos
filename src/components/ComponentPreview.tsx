'use client'

import { useDesignSystem } from '@/context/DesignSystemContext'
import type { ComponentDef } from '@/types'

function PreviewButton({ theme }: { theme: string }) {
  const accent = theme === 'brand-b' ? '#9333ea' : theme === 'dark' ? '#3b82f6' : '#2563eb'
  return (
    <>
      {/* Primary */}
      <button style={{
        background: accent, color: '#fff', border: 'none',
        padding: '8px 16px', borderRadius: 6, fontSize: 13, fontWeight: 500,
        cursor: 'pointer', transition: 'opacity 150ms',
      }}>
        Get Started
      </button>
      {/* Secondary */}
      <button style={{
        background: 'transparent', color: 'var(--text)',
        border: '1px solid var(--border-mid)',
        padding: '8px 16px', borderRadius: 6, fontSize: 13, fontWeight: 500, cursor: 'pointer',
      }}>
        Learn More
      </button>
      {/* Ghost */}
      <button style={{
        background: 'transparent', color: 'var(--text-muted)',
        border: 'none', padding: '8px 16px', borderRadius: 6, fontSize: 13, cursor: 'pointer',
      }}>
        Cancel
      </button>
      {/* Destructive */}
      <button style={{
        background: 'var(--red-subtle)', color: 'var(--red)',
        border: '1px solid rgba(245,101,101,0.2)',
        padding: '8px 16px', borderRadius: 6, fontSize: 13, fontWeight: 500, cursor: 'pointer',
      }}>
        Delete
      </button>
      {/* Disabled */}
      <button style={{
        background: 'var(--surface-high)', color: 'var(--text-subtle)',
        border: '1px solid var(--border)',
        padding: '8px 16px', borderRadius: 6, fontSize: 13, cursor: 'not-allowed', opacity: 0.6,
      }} disabled>
        Disabled
      </button>
    </>
  )
}

function PreviewInput() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 280 }}>
      <div>
        <label style={{ fontSize: 12, color: 'var(--text-muted)', display: 'block', marginBottom: 4 }}>
          Email address
        </label>
        <input
          readOnly
          defaultValue="you@example.com"
          style={{
            width: '100%', background: 'var(--surface-mid)',
            border: '1px solid var(--border-mid)', borderRadius: 6,
            padding: '8px 10px', fontSize: 13, color: 'var(--text)', outline: 'none',
          }}
        />
      </div>
      <div>
        <label style={{ fontSize: 12, color: 'var(--text-muted)', display: 'block', marginBottom: 4 }}>
          Invalid field
        </label>
        <input
          readOnly
          defaultValue="invalid@"
          style={{
            width: '100%', background: 'var(--red-subtle)',
            border: '1px solid rgba(245,101,101,0.4)', borderRadius: 6,
            padding: '8px 10px', fontSize: 13, color: 'var(--text)', outline: 'none',
          }}
        />
        <p style={{ fontSize: 11, color: 'var(--red)', marginTop: 4 }}>Enter a valid email address</p>
      </div>
    </div>
  )
}

function PreviewCard() {
  return (
    <div style={{
      background: 'var(--surface)',
      border: '1px solid var(--border-mid)',
      borderRadius: 12, padding: '20px 20px', width: 240,
      boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
        <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Monthly Revenue</div>
        <span className="chip green">+12.5%</span>
      </div>
      <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.02em' }}>$48,295</div>
      <div style={{ fontSize: 11, color: 'var(--text-subtle)', marginTop: 4 }}>vs $42,912 last month</div>
    </div>
  )
}

function PreviewBadge() {
  const badges = [
    { label: 'Active',   cls: 'green' },
    { label: 'Pending',  cls: 'yellow' },
    { label: 'Failed',   cls: 'red' },
    { label: 'Draft',    cls: 'default' },
    { label: 'New',      cls: 'accent' },
    { label: 'Beta',     cls: 'purple' },
  ]
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
      {badges.map(b => (
        <span key={b.label} className={`chip ${b.cls}`}>{b.label}</span>
      ))}
    </div>
  )
}

function PreviewAvatar({ theme }: { theme: string }) {
  const accent = theme === 'brand-b' ? '#9333ea' : '#2563eb'
  const users = [
    { initials: 'AK', color: accent },
    { initials: 'MR', color: '#9333ea' },
    { initials: 'SJ', color: '#16a34a' },
    { initials: 'TL', color: '#dc2626' },
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center' }}>
      <div style={{ display: 'flex', gap: 10 }}>
        {users.map(u => (
          <div key={u.initials} style={{
            width: 36, height: 36, borderRadius: '50%',
            background: u.color + '22',
            border: `1.5px solid ${u.color}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 12, fontWeight: 600, color: u.color,
          }}>
            {u.initials}
          </div>
        ))}
      </div>
      <div style={{ display: 'flex' }}>
        {users.map((u, i) => (
          <div key={u.initials} style={{
            width: 28, height: 28, borderRadius: '50%',
            background: u.color + '22',
            border: `1.5px solid var(--surface)`,
            outline: `1.5px solid ${u.color}44`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 10, fontWeight: 600, color: u.color,
            marginLeft: i > 0 ? -8 : 0,
          }}>
            {u.initials}
          </div>
        ))}
        <div style={{
          width: 28, height: 28, borderRadius: '50%',
          background: 'var(--surface-high)',
          border: '1.5px solid var(--surface)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 9.5, color: 'var(--text-muted)', marginLeft: -8,
        }}>
          +5
        </div>
      </div>
    </div>
  )
}

function PreviewToggle({ theme }: { theme: string }) {
  const accent = theme === 'brand-b' ? '#9333ea' : theme === 'dark' ? '#3b82f6' : '#2563eb'
  const toggles = [
    { label: 'Email notifications', on: true },
    { label: 'Dark mode', on: false },
    { label: 'Marketing emails', on: true },
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 260 }}>
      {toggles.map(t => (
        <div key={t.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 12.5, color: 'var(--text)' }}>{t.label}</span>
          <div style={{
            width: 36, height: 20, borderRadius: 10,
            background: t.on ? accent : 'var(--surface-high)',
            border: '1px solid ' + (t.on ? 'transparent' : 'var(--border-mid)'),
            position: 'relative', transition: 'background 200ms', cursor: 'pointer',
          }}>
            <div style={{
              width: 14, height: 14, borderRadius: '50%',
              background: '#fff', position: 'absolute',
              top: 2, left: t.on ? 18 : 2,
              transition: 'left 200ms',
              boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
            }} />
          </div>
        </div>
      ))}
    </div>
  )
}

export function ComponentPreview({ component }: { component: ComponentDef }) {
  const { activeTheme } = useDesignSystem()

  const renders: Record<string, React.ReactNode> = {
    button:  <PreviewButton theme={activeTheme.id} />,
    input:   <PreviewInput />,
    card:    <PreviewCard />,
    badge:   <PreviewBadge />,
    avatar:  <PreviewAvatar theme={activeTheme.id} />,
    toggle:  <PreviewToggle theme={activeTheme.id} />,
  }

  return (
    <div>
      <div className="preview-canvas">
        {renders[component.previewType] ?? (
          <span style={{ color: 'var(--text-subtle)', fontSize: 12 }}>
            Preview not available
          </span>
        )}
      </div>
    </div>
  )
}
