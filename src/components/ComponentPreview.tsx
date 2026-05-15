'use client'

import { useDesignSystem } from '@/context/DesignSystemContext'
import { resolveRadius } from '@/data/themes'
import type { ComponentDef } from '@/types'

function themeAccent(theme: string) {
  if (theme === 'dark')    return '#3b82f6'
  if (theme === 'brand-a') return '#2563eb'
  if (theme === 'brand-b') return '#007AFF'
  return '#CC5536'
}

/* ── Interactive CSS injected once ─────────────────────────── */
const INTERACTIVE_STYLES = `
  .ds-btn {
    display: inline-flex; align-items: center; justify-content: center;
    gap: 6px; padding: 8px 16px; border-radius: 8px; font-size: 13px;
    font-weight: 500; cursor: pointer; border: 1px solid transparent;
    transition: background 120ms, color 120ms, border-color 120ms, box-shadow 120ms, opacity 120ms, transform 80ms;
    font-family: inherit; outline: none; user-select: none;
  }
  .ds-btn:active:not(:disabled) { transform: scale(0.97); }
  .ds-btn:disabled { cursor: not-allowed; opacity: 0.45; }

  .ds-btn-primary {
    background: var(--accent); color: #fff; border-color: transparent;
    box-shadow: 0 1px 2px rgba(0,0,0,0.2);
  }
  .ds-btn-primary:hover:not(:disabled) { background: var(--accent-hover); box-shadow: 0 3px 10px rgba(0,0,0,0.25); }
  .ds-btn-primary:focus-visible { box-shadow: 0 0 0 3px var(--accent-subtle), 0 0 0 1px var(--accent); }

  .ds-btn-secondary {
    background: var(--surface-mid); color: var(--text); border-color: var(--border-mid);
  }
  .ds-btn-secondary:hover:not(:disabled) { background: var(--surface-high); border-color: var(--border-strong); }
  .ds-btn-secondary:focus-visible { box-shadow: 0 0 0 3px var(--accent-subtle); border-color: var(--accent); }

  .ds-btn-ghost {
    background: transparent; color: var(--text-muted); border-color: transparent;
  }
  .ds-btn-ghost:hover:not(:disabled) { background: var(--surface-mid); color: var(--text); }
  .ds-btn-ghost:focus-visible { box-shadow: 0 0 0 3px var(--accent-subtle); }

  .ds-btn-destructive {
    background: var(--red-subtle); color: var(--red); border-color: rgba(220,38,38,0.2);
  }
  .ds-btn-destructive:hover:not(:disabled) { background: var(--red); color: #fff; border-color: var(--red); }
  .ds-btn-destructive:focus-visible { box-shadow: 0 0 0 3px rgba(220,38,38,0.2); }

  .ds-input {
    width: 100%; background: var(--surface-mid); border: 1px solid var(--border-mid);
    border-radius: 8px; padding: 8px 10px; font-size: 13px; color: var(--text);
    outline: none; transition: border-color 120ms, box-shadow 120ms; font-family: inherit;
  }
  .ds-input:hover:not(:disabled) { border-color: var(--border-strong); }
  .ds-input:focus { border-color: var(--accent); box-shadow: 0 0 0 3px var(--accent-subtle); }
  .ds-input:disabled { opacity: 0.45; cursor: not-allowed; }
  .ds-input-error { border-color: rgba(220,38,38,0.5) !important; background: var(--red-subtle) !important; }
  .ds-input-error:focus { box-shadow: 0 0 0 3px rgba(220,38,38,0.15) !important; }

  .ds-toggle-track {
    width: 38px; height: 22px; border-radius: 11px; position: relative;
    cursor: pointer; transition: background 200ms, box-shadow 120ms; flex-shrink: 0;
    border: none; outline: none; display: inline-flex; align-items: center;
  }
  .ds-toggle-thumb {
    width: 16px; height: 16px; border-radius: 50%; background: #fff;
    position: absolute; top: 50%; transform: translateY(-50%);
    transition: left 200ms cubic-bezier(0.25,0.46,0.45,0.94);
    box-shadow: 0 1px 4px rgba(0,0,0,0.3);
  }
  .ds-toggle-track:focus-visible { box-shadow: 0 0 0 3px var(--accent-subtle); }
  .ds-toggle-track:hover { opacity: 0.85; }

  .ds-card {
    background: var(--surface); border: 1px solid var(--border-mid);
    border-radius: 12px; padding: 20px; width: 240px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    transition: box-shadow 150ms, transform 150ms, border-color 150ms;
    cursor: default;
  }
  .ds-card:hover { box-shadow: 0 8px 24px rgba(0,0,0,0.16); transform: translateY(-2px); border-color: var(--border-strong); }
`

function StyleInjector() {
  return <style dangerouslySetInnerHTML={{ __html: INTERACTIVE_STYLES }} />
}

function PreviewButton({ theme }: { theme: string }) {
  const accent = themeAccent(theme)
  const r = resolveRadius('radius/sm', theme)
  return (
    <>
      <StyleInjector />
      <button className="ds-btn ds-btn-primary" style={{ '--accent': accent, '--accent-hover': accent + 'dd', borderRadius: r } as React.CSSProperties}>
        Get Started
      </button>
      <button className="ds-btn ds-btn-secondary" style={{ borderRadius: r }}>Learn More</button>
      <button className="ds-btn ds-btn-ghost" style={{ borderRadius: r }}>Cancel</button>
      <button className="ds-btn ds-btn-destructive" style={{ borderRadius: r }}>Delete</button>
      <button className="ds-btn ds-btn-primary" disabled style={{ '--accent': accent, borderRadius: r } as React.CSSProperties}>
        Disabled
      </button>
    </>
  )
}

function PreviewInput({ theme }: { theme: string }) {
  const r = resolveRadius('radius/sm', theme)
  return (
    <>
      <StyleInjector />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 280 }}>
        <div>
          <label style={{ fontSize: 12, color: 'var(--text-muted)', display: 'block', marginBottom: 4 }}>Email address</label>
          <input className="ds-input" defaultValue="you@example.com" style={{ borderRadius: r }} />
        </div>
        <div>
          <label style={{ fontSize: 12, color: 'var(--text-muted)', display: 'block', marginBottom: 4 }}>
            Invalid field
            <span style={{ color: 'var(--red)', marginLeft: 4, fontSize: 10 }}>Error</span>
          </label>
          <input className="ds-input ds-input-error" defaultValue="invalid@" style={{ borderRadius: r }} />
          <p style={{ fontSize: 11, color: 'var(--red)', marginTop: 4 }}>Enter a valid email address</p>
        </div>
        <div>
          <label style={{ fontSize: 12, color: 'var(--text-muted)', display: 'block', marginBottom: 4 }}>Disabled</label>
          <input className="ds-input" disabled placeholder="Not editable" style={{ borderRadius: r }} />
        </div>
      </div>
    </>
  )
}

function PreviewCard({ theme }: { theme: string }) {
  const r = resolveRadius('radius/md', theme)
  return (
    <>
      <StyleInjector />
      <div className="ds-card" style={{ borderRadius: r }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
          <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Monthly Revenue</div>
          <span className="chip green">+12.5%</span>
        </div>
        <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.02em' }}>$48,295</div>
        <div style={{ fontSize: 11, color: 'var(--text-subtle)', marginTop: 4 }}>vs $42,912 last month</div>
      </div>
      <div className="ds-card" style={{ borderRadius: r }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
          <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Active Users</div>
          <span className="chip red">-3.2%</span>
        </div>
        <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.02em' }}>12,084</div>
        <div style={{ fontSize: 11, color: 'var(--text-subtle)', marginTop: 4 }}>vs 12,488 last week</div>
      </div>
    </>
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
  const accent = themeAccent(theme)
  const users = [
    { initials: 'AK', color: accent },
    { initials: 'MR', color: '#d77a59' },
    { initials: 'SJ', color: '#16a34a' },
    { initials: 'TL', color: '#dc2626' },
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'center' }}>
      <div style={{ display: 'flex', gap: 10 }}>
        {users.map(u => (
          <div key={u.initials} style={{
            width: 40, height: 40, borderRadius: '50%',
            background: u.color + '22', border: `2px solid ${u.color}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 13, fontWeight: 600, color: u.color,
            cursor: 'pointer', transition: 'transform 120ms, box-shadow 120ms',
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.12)'; e.currentTarget.style.boxShadow = `0 0 0 4px ${u.color}33` }}
            onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '' }}
            title={u.initials}
          >
            {u.initials}
          </div>
        ))}
      </div>
      <div style={{ display: 'flex' }}>
        {users.map((u, i) => (
          <div key={u.initials} style={{
            width: 30, height: 30, borderRadius: '50%',
            background: u.color + '22',
            border: `2px solid var(--surface)`,
            outline: `1.5px solid ${u.color}55`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 10, fontWeight: 600, color: u.color,
            marginLeft: i > 0 ? -9 : 0, zIndex: users.length - i,
            position: 'relative',
          }}>
            {u.initials}
          </div>
        ))}
        <div style={{
          width: 30, height: 30, borderRadius: '50%',
          background: 'var(--surface-high)', border: '2px solid var(--surface)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 9.5, color: 'var(--text-muted)', marginLeft: -9, position: 'relative',
        }}>+5</div>
      </div>
    </div>
  )
}

function PreviewToggle({ theme }: { theme: string }) {
  const accent = themeAccent(theme)
  const toggles = [
    { label: 'Email notifications', on: true },
    { label: 'Dark mode', on: false },
    { label: 'Marketing emails', on: true },
  ]
  return (
    <>
      <StyleInjector />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, width: 260 }}>
        {toggles.map(t => (
          <div key={t.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 12.5, color: 'var(--text)' }}>{t.label}</span>
            <button
              className="ds-toggle-track"
              style={{
                background: t.on ? accent : 'var(--surface-high)',
                boxShadow: t.on ? 'none' : 'inset 0 0 0 1px var(--border-mid)',
              }}
            >
              <div className="ds-toggle-thumb" style={{ left: t.on ? 'calc(100% - 19px)' : '3px' }} />
            </button>
          </div>
        ))}
      </div>
    </>
  )
}

export function ComponentPreview({ component }: { component: ComponentDef }) {
  const { activeTheme } = useDesignSystem()

  const renders: Record<string, React.ReactNode> = {
    button:  <PreviewButton theme={activeTheme.id} />,
    input:   <PreviewInput theme={activeTheme.id} />,
    card:    <PreviewCard theme={activeTheme.id} />,
    badge:   <PreviewBadge />,
    avatar:  <PreviewAvatar theme={activeTheme.id} />,
    toggle:  <PreviewToggle theme={activeTheme.id} />,
  }

  return (
    <div>
      <div className="preview-canvas">
        {renders[component.previewType] ?? (
          <span style={{ color: 'var(--text-subtle)', fontSize: 12 }}>Preview not available</span>
        )}
      </div>
    </div>
  )
}
