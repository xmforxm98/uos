'use client'

/**
 * BEHAVIOR RESOLUTION DEMO
 *
 * Same product data — 7 fundamentally different UX philosophies.
 * This isn't a color switch. Navigation model, density, motion character,
 * layout architecture, and interaction personality all change per profile.
 *
 * Data: 3 projects in a "project dashboard"
 * Profiles: enterprise · minimal · premium · playful · cyber · native-mobile · ai-native
 */

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'

const PROJECTS = [
  { id: 'p1', name: 'Brand Identity', status: 'Active',    progress: 72, team: ['AK', 'MR'], priority: 'High',   updated: '2h ago',  tasks: 12 },
  { id: 'p2', name: 'Dashboard v2',   status: 'In Review', progress: 45, team: ['SJ', 'TL'], priority: 'Medium', updated: '1d ago',  tasks: 8  },
  { id: 'p3', name: 'Design System',  status: 'Draft',     progress: 88, team: ['AK', 'SJ'], priority: 'Low',    updated: '3d ago',  tasks: 24 },
]

const NAV = ['Projects', 'Team', 'Reports', 'Settings']

// ─────────────────────────────────────────────────────────────────────────────
// ENTERPRISE — Left sidebar + dense data table
// Philosophy: information density, hierarchy, predictability
// Motion: 150ms ease-out. No spring. Never draws attention to itself.
// ─────────────────────────────────────────────────────────────────────────────
function EnterpriseApp() {
  const BLUE = '#2563eb'
  const statusStyle = (s: string) =>
    s === 'Active'    ? { color: '#16a34a', bg: '#16a34a18' } :
    s === 'In Review' ? { color: '#d97706', bg: '#d9770618' } :
                        { color: '#6b7280', bg: '#6b728018' }

  return (
    <div
      className="flex h-full text-[12px]"
      style={{ fontFamily: 'Inter, system-ui, sans-serif', background: '#f8fafc' }}
    >
      {/* ── Left sidebar */}
      <div className="flex flex-col flex-shrink-0" style={{ width: 148, background: '#1e293b' }}>
        <div className="flex flex-col" style={{ padding: '12px 14px 10px', borderBottom: '1px solid #334155' }}>
          <div style={{ fontSize: 9.5, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Workspace</div>
          <div style={{ fontSize: 12.5, fontWeight: 600, color: '#f1f5f9', marginTop: 2 }}>Utopia Studio</div>
        </div>
        {NAV.map((item, i) => (
          <div
            key={item}
            className="cursor-pointer"
            style={{
              padding: '8px 14px', fontSize: 12, fontWeight: i === 0 ? 600 : 400,
              color: i === 0 ? '#fff' : '#64748b',
              background: i === 0 ? BLUE : 'transparent',
              borderLeft: `2px solid ${i === 0 ? BLUE : 'transparent'}`,
              transition: 'background 150ms ease-out, color 150ms ease-out',
              letterSpacing: '0.01em',
            }}
          >
            {item}
          </div>
        ))}
        <div className="mt-auto" style={{ padding: '10px 14px', borderTop: '1px solid #1e293b' }}>
          <div style={{ fontSize: 10, color: '#334155', letterSpacing: '0.06em' }}>TEAM · 4 MEMBERS</div>
        </div>
      </div>

      {/* ── Main */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* Top bar */}
        <div
          className="flex flex-shrink-0 items-center justify-between"
          style={{ padding: '9px 16px', borderBottom: '1px solid #e2e8f0', background: '#fff' }}
        >
          <div>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#0f172a' }}>Projects</span>
            <span className="ml-2" style={{ fontSize: 11, color: '#94a3b8' }}>3 active</span>
          </div>
          <Button
            size="sm"
            style={{ background: BLUE, fontSize: 11, letterSpacing: '0.01em', transition: 'background 150ms ease-out' }}
          >
            + New Project
          </Button>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-y-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr style={{ background: '#f8fafc' }}>
                {['Project', 'Status', 'Progress', 'Team', 'Priority', 'Updated'].map(h => (
                  <th
                    key={h}
                    className="text-left whitespace-nowrap"
                    style={{
                      padding: '6px 14px', fontSize: 9.5, fontWeight: 600, color: '#94a3b8',
                      textTransform: 'uppercase', letterSpacing: '0.07em', borderBottom: '1px solid #e2e8f0',
                    }}
                  >{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PROJECTS.map(p => {
                const ss = statusStyle(p.status)
                return (
                  <tr
                    key={p.id}
                    className="cursor-pointer"
                    style={{ borderBottom: '1px solid #f1f5f9', background: '#fff', transition: 'background 150ms ease-out' }}
                  >
                    <td className="whitespace-nowrap" style={{ padding: '10px 14px', fontWeight: 500, color: '#0f172a', fontSize: 12.5 }}>{p.name}</td>
                    <td style={{ padding: '10px 14px' }}>
                      <span
                        className="whitespace-nowrap"
                        style={{ fontSize: 10, fontWeight: 600, padding: '2px 7px', borderRadius: 3, background: ss.bg, color: ss.color }}
                      >{p.status}</span>
                    </td>
                    <td style={{ padding: '10px 14px' }}>
                      <div className="flex items-center gap-1.5">
                        <div className="rounded-full" style={{ width: 56, height: 3, background: '#e2e8f0' }}>
                          <div style={{ width: `${p.progress}%`, height: '100%', background: BLUE, borderRadius: 99 }} />
                        </div>
                        <span style={{ fontSize: 10, color: '#64748b', fontFeatureSettings: '"tnum"' }}>{p.progress}%</span>
                      </div>
                    </td>
                    <td style={{ padding: '10px 14px' }}>
                      <div className="flex gap-0.5">
                        {p.team.map(t => (
                          <Avatar key={t} className="w-5 h-5">
                            <AvatarFallback
                              className="text-[8px] font-bold"
                              style={{ background: BLUE + '20', border: `1px solid ${BLUE}50`, color: BLUE }}
                            >{t}</AvatarFallback>
                          </Avatar>
                        ))}
                      </div>
                    </td>
                    <td style={{ padding: '10px 14px', fontSize: 11, color: '#64748b' }}>{p.priority}</td>
                    <td className="whitespace-nowrap" style={{ padding: '10px 14px', fontSize: 11, color: '#94a3b8' }}>{p.updated}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// MINIMAL — Slim top bar only + monospace text list
// Philosophy: radical reduction, signal over noise, keyboard-first
// Motion: 80ms instant snap. Transitions are near-invisible.
// ─────────────────────────────────────────────────────────────────────────────
function MinimalApp() {
  const statusGlyph = (s: string) =>
    s === 'Active'    ? { g: '●', c: '#e5e7eb' } :
    s === 'In Review' ? { g: '○', c: '#555'    } :
                        { g: '·', c: '#333'    }

  return (
    <div
      className="flex flex-col h-full text-[12px]"
      style={{ background: '#0d0d0d', fontFamily: '"JetBrains Mono", "Fira Code", "Cascadia Code", monospace' }}
    >
      {/* ── Top bar */}
      <div
        className="flex flex-shrink-0 items-center justify-between"
        style={{ padding: '9px 18px', borderBottom: '1px solid #151515' }}
      >
        <div className="flex gap-[18px]">
          {NAV.map((item, i) => (
            <span
              key={item}
              className="cursor-pointer"
              style={{ fontSize: 11, color: i === 0 ? '#e5e7eb' : '#2a2a2a', transition: 'color 80ms', letterSpacing: '0.02em' }}
            >
              {item.toLowerCase()}
            </span>
          ))}
        </div>
        <span style={{ fontSize: 10, color: '#1c1c1c', letterSpacing: '0.04em' }}>14:27</span>
      </div>

      {/* ── Content */}
      <div className="flex flex-col flex-1 overflow-hidden" style={{ padding: '18px 18px 0' }}>
        <div
          className="uppercase mb-[14px]"
          style={{ fontSize: 9.5, color: '#2a2a2a', letterSpacing: '0.12em' }}
        >
          projects — {PROJECTS.length}
        </div>
        {PROJECTS.map((p, i) => {
          const sg = statusGlyph(p.status)
          return (
            <div
              key={p.id}
              className="flex items-center cursor-pointer"
              style={{
                padding: '9px 0',
                borderBottom: '1px solid #111',
                transition: 'opacity 80ms',
              }}
            >
              <span className="flex-shrink-0" style={{ color: '#1c1c1c', fontSize: 10, width: 22 }}>{String(i + 1).padStart(2, '0')}</span>
              <span className="flex-shrink-0" style={{ fontSize: 12, color: sg.c, width: 16 }}>{sg.g}</span>
              <span className="flex-1" style={{ color: '#e5e7eb', fontSize: 12.5, fontWeight: 400, letterSpacing: '-0.01em' }}>{p.name}</span>
              <div className="flex-shrink-0" style={{ width: 48, height: 1, background: '#151515' }}>
                <div style={{ width: `${p.progress}%`, height: '100%', background: '#2a2a2a' }} />
              </div>
              <span className="flex-shrink-0 text-right" style={{ color: '#2a2a2a', fontSize: 10, width: 32 }}>{p.progress}%</span>
              <span className="flex-shrink-0 text-right" style={{ color: '#1c1c1c', fontSize: 10, width: 42 }}>{p.updated}</span>
            </div>
          )
        })}
        <div className="mt-3" style={{ fontSize: 10, color: '#161616', letterSpacing: '0.04em' }}>
          &gt;_
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// PREMIUM — iOS large title + elevated cards + bottom tab bar
// Philosophy: generous whitespace, smooth spring physics, delight in the detail
// Motion: 400ms cubic-bezier spring (0.34, 1.56, 0.64, 1). Everything feels alive.
// ─────────────────────────────────────────────────────────────────────────────
function PremiumApp() {
  const BLUE = '#007AFF'
  const statusConfig = {
    'Active':    { bg: 'rgba(52,199,89,0.1)',   color: '#34c759', label: 'Active'    },
    'In Review': { bg: 'rgba(255,149,0,0.1)',    color: '#ff9500', label: 'In Review' },
    'Draft':     { bg: 'rgba(142,142,147,0.12)', color: '#8e8e93', label: 'Draft'    },
  }

  return (
    <div
      className="flex flex-col h-full"
      style={{ background: '#f5f5f7', fontFamily: '-apple-system, "SF Pro Display", "Helvetica Neue", sans-serif' }}
    >
      {/* ── Nav bar */}
      <div
        className="flex-shrink-0"
        style={{
          padding: '10px 18px 8px',
          background: 'rgba(245,245,247,0.85)',
          backdropFilter: 'blur(20px)',
          borderBottom: '0.5px solid rgba(0,0,0,0.1)',
        }}
      >
        <div className="flex justify-between items-center mb-1">
          <span className="cursor-pointer" style={{ fontSize: 13, color: BLUE, fontWeight: 400 }}>‹ Workspace</span>
          <Button
            size="icon"
            className="w-7 h-7 rounded-full text-white text-lg"
            style={{
              background: BLUE,
              transition: 'transform 400ms cubic-bezier(0.34,1.56,0.64,1), box-shadow 400ms',
            }}
          >+</Button>
        </div>
        <div style={{ fontSize: 26, fontWeight: 700, color: '#000', letterSpacing: '-0.03em' }}>Projects</div>
      </div>

      {/* ── Card list */}
      <div className="flex-1 flex flex-col gap-2.5 overflow-y-auto" style={{ padding: '12px 14px' }}>
        {PROJECTS.map(p => {
          const sc = statusConfig[p.status as keyof typeof statusConfig] ?? statusConfig['Draft']
          return (
            <div
              key={p.id}
              className="cursor-pointer rounded-[14px]"
              style={{
                background: '#fff',
                boxShadow: '0 2px 12px rgba(0,0,0,0.07), 0 1px 3px rgba(0,0,0,0.04)',
                padding: '14px 16px',
                transition: 'box-shadow 400ms cubic-bezier(0.34,1.56,0.64,1), transform 400ms cubic-bezier(0.34,1.56,0.64,1)',
              }}
            >
              <div className="flex justify-between items-start mb-2.5">
                <span style={{ fontSize: 14.5, fontWeight: 600, color: '#000', letterSpacing: '-0.02em' }}>{p.name}</span>
                <span
                  className="rounded-full"
                  style={{ fontSize: 11, fontWeight: 500, padding: '3px 9px', background: sc.bg, color: sc.color }}
                >{sc.label}</span>
              </div>
              <div className="rounded-full overflow-hidden mb-2.5" style={{ height: 4, background: '#f0f0f0' }}>
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${p.progress}%`,
                    background: `linear-gradient(90deg, ${BLUE}, ${BLUE}bb)`,
                    transition: 'width 800ms cubic-bezier(0.34,1.56,0.64,1)',
                  }}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex">
                  {p.team.map((t, i) => (
                    <Avatar
                      key={t}
                      className="w-6 h-6 rounded-full"
                      style={{
                        border: '2px solid #f5f5f7',
                        marginLeft: i > 0 ? -8 : 0,
                        position: 'relative',
                        zIndex: 10 - i,
                      }}
                    >
                      <AvatarFallback
                        className="text-[9px] font-bold"
                        style={{ background: BLUE + '20', color: BLUE }}
                      >{t}</AvatarFallback>
                    </Avatar>
                  ))}
                </div>
                <span style={{ fontSize: 12, color: '#8e8e93' }}>{p.progress}% · {p.updated}</span>
              </div>
            </div>
          )
        })}
      </div>

      {/* ── Tab bar */}
      <div
        className="flex flex-shrink-0"
        style={{
          borderTop: '0.5px solid rgba(0,0,0,0.1)',
          background: 'rgba(245,245,247,0.92)',
          backdropFilter: 'blur(20px)',
          padding: '8px 0 6px',
        }}
      >
        {[['◫', 'Projects'], ['👥', 'Team'], ['📊', 'Reports'], ['⚙', 'Settings']].map(([icon, label], i) => (
          <div key={label} className="flex flex-1 flex-col items-center gap-0.5 cursor-pointer">
            <span style={{ fontSize: 20, opacity: i === 0 ? 1 : 0.28 }}>{icon}</span>
            <span style={{ fontSize: 10, color: i === 0 ? BLUE : '#8e8e93', fontWeight: i === 0 ? 600 : 400, letterSpacing: '-0.01em' }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// PLAYFUL — Gradient header + emoji status cards + bouncy bottom nav
// Philosophy: joy, personality, emotional resonance, celebrates progress
// Motion: 300ms spring with overshoot (0.34, 1.56, 0.64, 1). Everything bounces.
// ─────────────────────────────────────────────────────────────────────────────
function PlayfulApp() {
  const statusEmoji = { 'Active': '🚀', 'In Review': '👀', 'Draft': '✏️' }
  const CARD_STYLES = [
    { grad: 'linear-gradient(135deg, #fef3c7 0%, #fed7aa 100%)', accent: '#f97316', dot: '#f97316' },
    { grad: 'linear-gradient(135deg, #dbeafe 0%, #e0e7ff 100%)', accent: '#6366f1', dot: '#6366f1' },
    { grad: 'linear-gradient(135deg, #dcfce7 0%, #d1fae5 100%)', accent: '#16a34a', dot: '#16a34a' },
  ]

  return (
    <div
      className="flex flex-col h-full"
      style={{ background: '#fffbeb', fontFamily: '"Plus Jakarta Sans", "DM Sans", system-ui, sans-serif' }}
    >
      {/* ── Gradient header */}
      <div
        className="flex-shrink-0"
        style={{ padding: '12px 16px', background: 'linear-gradient(135deg, #f97316 0%, #fb923c 50%, #fbbf24 100%)' }}
      >
        <div className="flex justify-between items-center mb-[3px]">
          <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.8)', fontWeight: 500 }}>Utopia Studio 🎨</span>
          <Button
            size="sm"
            className="rounded-full font-bold text-white"
            style={{
              padding: '4px 12px',
              background: 'rgba(255,255,255,0.25)',
              border: '1.5px solid rgba(255,255,255,0.5)',
              fontSize: 11,
              transition: 'transform 300ms cubic-bezier(0.34,1.56,0.64,1)',
            }}
          >
            + Add ✨
          </Button>
        </div>
        <div style={{ fontSize: 19, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' }}>Hey! 👋</div>
        <div style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.85)', marginTop: 1 }}>You've got {PROJECTS.length} projects moving 🔥</div>
      </div>

      {/* ── Cards */}
      <div className="flex flex-col flex-1 gap-2 overflow-y-auto" style={{ padding: '12px 12px' }}>
        {PROJECTS.map((p, i) => {
          const cs = CARD_STYLES[i % CARD_STYLES.length]
          return (
            <div
              key={p.id}
              className="rounded-2xl cursor-pointer"
              style={{
                background: cs.grad,
                padding: '12px 14px',
                border: `2px solid ${cs.accent}18`,
                transition: 'transform 300ms cubic-bezier(0.34,1.56,0.64,1), box-shadow 300ms cubic-bezier(0.34,1.56,0.64,1)',
              }}
            >
              <div className="flex justify-between items-start mb-[7px]">
                <div>
                  <div style={{ fontSize: 13.5, fontWeight: 800, color: '#1a1a2e', letterSpacing: '-0.01em' }}>{p.name}</div>
                  <div style={{ fontSize: 11, color: cs.accent, fontWeight: 600, marginTop: 1 }}>
                    {statusEmoji[p.status as keyof typeof statusEmoji]} {p.status}
                  </div>
                </div>
                <div style={{ fontSize: 22, fontWeight: 800, color: cs.accent, letterSpacing: '-0.02em' }}>{p.progress}%</div>
              </div>
              <div className="rounded-full overflow-hidden" style={{ height: 6, background: 'rgba(255,255,255,0.6)' }}>
                <div
                  className="h-full rounded-full"
                  style={{ width: `${p.progress}%`, background: cs.accent, transition: 'width 600ms cubic-bezier(0.34,1.56,0.64,1)' }}
                />
              </div>
              <div className="flex justify-between items-center mt-[7px]">
                <span style={{ fontSize: 11, color: '#6b7280' }}>{p.tasks} tasks 🎯</span>
                <span style={{ fontSize: 10, color: '#9ca3af' }}>{p.updated}</span>
              </div>
            </div>
          )
        })}
      </div>

      {/* ── Bottom nav */}
      <div
        className="flex flex-shrink-0"
        style={{ borderTop: '2px solid #fed7aa', background: '#fff', padding: '8px 0 6px' }}
      >
        {[['🚀', 'Projects'], ['👥', 'Team'], ['📊', 'Stats'], ['⚙️', 'Settings']].map(([emoji, label], i) => (
          <div key={label} className="flex flex-1 flex-col items-center gap-0.5 cursor-pointer">
            <span style={{ fontSize: 20 }}>{emoji}</span>
            <span style={{ fontSize: 10, fontWeight: 700, color: i === 0 ? '#f97316' : '#d1d5db' }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// CYBER — Dark floating side strip + neon-glowing table rows
// Philosophy: command interface, power user, cinematic presence
// Motion: 600ms cubic-bezier(0.23, 1, 0.32, 1). Slow, precise, cinematic.
// ─────────────────────────────────────────────────────────────────────────────
function CyberApp() {
  const CYAN = '#03e9f4'
  const statusStyle = (s: string) =>
    s === 'Active'    ? { color: CYAN,      glow: CYAN         } :
    s === 'In Review' ? { color: '#f59e0b', glow: '#f59e0b'    } :
                        { color: '#374151', glow: '#374151'    }

  return (
    <div
      className="flex h-full text-[11px]"
      style={{ background: '#030308', fontFamily: '"JetBrains Mono", "Fira Code", monospace' }}
    >
      {/* ── Left icon strip */}
      <div
        className="flex flex-col flex-shrink-0 items-center pt-3 gap-1"
        style={{ width: 44, background: '#0a0a14', borderRight: `1px solid ${CYAN}15` }}
      >
        {['◈', '⬡', '△', '◇'].map((icon, i) => (
          <div
            key={i}
            className="flex items-center justify-center cursor-pointer rounded-[5px]"
            style={{
              width: 30, height: 30, fontSize: 13,
              color: i === 0 ? CYAN : '#0d1f2d',
              background: i === 0 ? `${CYAN}10` : 'transparent',
              border: `1px solid ${i === 0 ? CYAN + '35' : 'transparent'}`,
              transition: 'all 600ms cubic-bezier(0.23,1,0.32,1)',
              boxShadow: i === 0 ? `0 0 10px ${CYAN}30` : 'none',
            }}
          >{icon}</div>
        ))}
      </div>

      {/* ── Main panel */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* Header */}
        <div
          className="flex flex-shrink-0 items-center justify-between"
          style={{ padding: '9px 14px', borderBottom: `1px solid ${CYAN}12` }}
        >
          <div>
            <div style={{ fontSize: 8.5, color: `${CYAN}80`, letterSpacing: '0.18em', textTransform: 'uppercase' }}>NEURAL WORKSPACE</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#c0e8f0', letterSpacing: '0.04em' }}>PROJECTS</div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            style={{
              padding: '4px 12px',
              background: 'transparent',
              border: `1px solid ${CYAN}`,
              borderRadius: 2,
              color: CYAN,
              fontSize: 9.5,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              boxShadow: `0 0 8px ${CYAN}25`,
              transition: 'all 600ms cubic-bezier(0.23,1,0.32,1)',
            }}
          >INIT +</Button>
        </div>

        {/* Column headers */}
        <div
          className="flex-shrink-0 grid gap-2"
          style={{
            padding: '5px 14px',
            gridTemplateColumns: '2fr 1fr 1fr 1fr 80px',
            borderBottom: `1px solid ${CYAN}08`,
          }}
        >
          {['DESIGNATION', 'STATUS', 'COMPLETION', 'OPERATIVES', 'TIMESTAMP'].map(h => (
            <div key={h} style={{ fontSize: 8, color: '#0d2233', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{h}</div>
          ))}
        </div>

        {/* Data rows */}
        <div className="flex-1 overflow-y-auto">
          {PROJECTS.map(p => {
            const ss = statusStyle(p.status)
            return (
              <div
                key={p.id}
                className="grid items-center gap-2 cursor-pointer"
                style={{
                  padding: '11px 14px',
                  borderBottom: `1px solid ${CYAN}06`,
                  gridTemplateColumns: '2fr 1fr 1fr 1fr 80px',
                  borderLeft: `2px solid ${ss.color}`,
                  transition: 'background 600ms cubic-bezier(0.23,1,0.32,1), border-left-color 600ms',
                }}
              >
                <div
                  className="overflow-hidden text-ellipsis whitespace-nowrap"
                  style={{ fontSize: 11.5, fontWeight: 600, color: '#7ab4bf', letterSpacing: '0.04em' }}
                >
                  {p.name.toUpperCase()}
                </div>
                <div
                  className="whitespace-nowrap"
                  style={{
                    fontSize: 9, letterSpacing: '0.1em', fontWeight: 700, color: ss.color,
                    textShadow: `0 0 8px ${ss.glow}50`,
                  }}
                >
                  {p.status.toUpperCase()}
                </div>
                <div className="flex items-center gap-[5px]">
                  <div style={{ width: 44, height: 2, background: '#0d1117' }}>
                    <div style={{ width: `${p.progress}%`, height: '100%', background: ss.color, boxShadow: `0 0 5px ${ss.glow}` }} />
                  </div>
                  <span style={{ fontSize: 10, color: ss.color }}>{p.progress}%</span>
                </div>
                <div className="flex gap-[3px]">
                  {p.team.map(t => (
                    <Avatar key={t} className="w-[17px] h-[17px] rounded-[2px]">
                      <AvatarFallback
                        className="text-[7px] rounded-[2px]"
                        style={{ background: `${CYAN}10`, border: `1px solid ${CYAN}30`, color: CYAN }}
                      >{t}</AvatarFallback>
                    </Avatar>
                  ))}
                </div>
                <div style={{ fontSize: 9, color: '#0d2a37' }}>{p.updated}</div>
              </div>
            )
          })}
        </div>

        {/* Status bar */}
        <div
          className="flex flex-shrink-0 gap-4"
          style={{ padding: '5px 14px', borderTop: `1px solid ${CYAN}10` }}
        >
          <span style={{ fontSize: 8, color: CYAN, letterSpacing: '0.1em' }}>SYS:ONLINE</span>
          <span style={{ fontSize: 8, color: '#0d2233', letterSpacing: '0.08em' }}>3 PROJECTS ACTIVE</span>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// NATIVE MOBILE — iOS navigation bar + inset table view + system tab bar
// Philosophy: platform native, familiar, muscle memory, zero friction
// Motion: 350ms spring matching iOS UIKit. Feels like it belongs on device.
// ─────────────────────────────────────────────────────────────────────────────
function NativeMobileApp() {
  const TINT = '#007AFF'
  const statusColor = (s: string) =>
    s === 'Active' ? '#34c759' : s === 'In Review' ? '#ff9500' : '#8e8e93'

  return (
    <div
      className="flex flex-col h-full"
      style={{ background: '#f2f2f7', fontFamily: '-apple-system, "SF Pro Text", "Helvetica Neue", sans-serif' }}
    >
      {/* ── Status bar simulation */}
      <div
        className="flex flex-shrink-0 justify-between"
        style={{ padding: '7px 16px 2px', background: '#f2f2f7' }}
      >
        <span style={{ fontSize: 12, fontWeight: 600, color: '#000', letterSpacing: '-0.01em' }}>9:41</span>
        <span style={{ fontSize: 10, color: '#000', letterSpacing: '0.02em' }}>▊▊▊ 100%</span>
      </div>

      {/* ── Navigation bar */}
      <div
        className="flex-shrink-0"
        style={{
          padding: '2px 16px 8px',
          background: 'rgba(242,242,247,0.9)',
          backdropFilter: 'blur(20px)',
          borderBottom: '0.5px solid rgba(60,60,67,0.28)',
        }}
      >
        <div className="flex justify-between items-center mb-[3px]">
          <span className="cursor-pointer" style={{ fontSize: 14, color: TINT, fontWeight: 400, letterSpacing: '-0.01em' }}>‹ Workspaces</span>
          <span className="cursor-pointer" style={{ fontSize: 14, color: TINT, fontWeight: 400 }}>Edit</span>
        </div>
        <div style={{ fontSize: 26, fontWeight: 700, color: '#000', letterSpacing: '-0.03em' }}>Projects</div>
      </div>

      {/* ── Inset table */}
      <div className="flex-1 overflow-y-auto pt-4">
        <div className="mx-4 rounded-[10px] overflow-hidden" style={{ background: '#fff' }}>
          {PROJECTS.map((p, i) => (
            <div key={p.id}>
              <div
                className="flex items-center cursor-pointer"
                style={{ padding: '12px 16px', transition: 'background 350ms' }}
              >
                <div className="flex-1 min-w-0">
                  <div
                    className="whitespace-nowrap overflow-hidden text-ellipsis"
                    style={{ fontSize: 14.5, color: '#000', fontWeight: 400, letterSpacing: '-0.015em' }}
                  >{p.name}</div>
                  <div className="flex items-center gap-[5px] mt-0.5">
                    <div
                      className="rounded-full flex-shrink-0"
                      style={{ width: 6, height: 6, background: statusColor(p.status) }}
                    />
                    <span style={{ fontSize: 12, color: statusColor(p.status), letterSpacing: '-0.01em' }}>{p.status}</span>
                    <span style={{ fontSize: 12, color: '#8e8e93' }}>· {p.progress}%</span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <span style={{ fontSize: 13, color: '#8e8e93' }}>{p.updated}</span>
                  <span style={{ fontSize: 18, color: '#c7c7cc', lineHeight: 1 }}>›</span>
                </div>
              </div>
              {i < PROJECTS.length - 1 && (
                <div className="ml-4" style={{ height: '0.5px', background: 'rgba(60,60,67,0.18)' }} />
              )}
            </div>
          ))}
        </div>
        <div className="px-4 py-1.5" style={{ fontSize: 13, color: '#8e8e93' }}>3 Projects</div>
      </div>

      {/* ── Tab bar */}
      <div
        className="flex flex-shrink-0"
        style={{
          borderTop: '0.5px solid rgba(60,60,67,0.28)',
          background: 'rgba(242,242,247,0.92)',
          backdropFilter: 'blur(20px)',
          padding: '8px 0 8px',
        }}
      >
        {[['◫', 'Projects'], ['👥', 'Team'], ['📊', 'Reports'], ['⋯', 'More']].map(([icon, label], i) => (
          <div key={label} className="flex flex-1 flex-col items-center gap-0.5 cursor-pointer">
            <span style={{ fontSize: 22, color: i === 0 ? TINT : '#8e8e93', opacity: i === 0 ? 1 : 0.5 }}>{icon}</span>
            <span style={{ fontSize: 10, color: i === 0 ? TINT : '#8e8e93', fontWeight: i === 0 ? 500 : 400, letterSpacing: '-0.01em' }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// AI NATIVE — Ambient purple header + AI-contextual cards + prompt bar
// Philosophy: context is everything, AI speaks first, prediction over navigation
// Motion: 800ms smooth. Cards feel like they're being generated live.
// ─────────────────────────────────────────────────────────────────────────────
function AINativeApp() {
  const PURPLE = '#8b5cf6'
  const statusColor = (s: string) =>
    s === 'Active' ? '#34d399' : s === 'In Review' ? '#fbbf24' : '#6b7280'
  const aiContext = (s: string) =>
    s === 'Active'    ? '↑ Trending above forecast. Milestone in 3 days.' :
    s === 'In Review' ? '⚠ Review pending 1d. Consider async approval.' :
                        '✦ Low priority. Suggest bundling with Brand Identity.'

  return (
    <div
      className="flex flex-col h-full"
      style={{ background: '#0a000f', fontFamily: 'Inter, system-ui, sans-serif' }}
    >
      {/* ── Ambient header */}
      <div
        className="flex-shrink-0"
        style={{
          padding: '13px 16px 11px',
          background: `radial-gradient(ellipse 100% 200% at 50% -20%, ${PURPLE}20 0%, transparent 70%)`,
          borderBottom: `1px solid ${PURPLE}15`,
        }}
      >
        <div className="flex items-center gap-[7px] mb-[5px]">
          <div
            className="rounded-full flex-shrink-0"
            style={{ width: 6, height: 6, background: PURPLE, boxShadow: `0 0 10px ${PURPLE}` }}
          />
          <span style={{ fontSize: 9.5, color: PURPLE, letterSpacing: '0.09em', fontWeight: 500 }}>AI WORKSPACE · CONTEXT ACTIVE</span>
        </div>
        <div style={{ fontSize: 18, fontWeight: 600, color: '#f5f3ff', letterSpacing: '-0.02em' }}>Projects</div>
        <div style={{ fontSize: 11, color: '#4b5563', marginTop: 2 }}>3 projects · 2 need attention</div>
      </div>

      {/* ── AI-contextualized cards */}
      <div className="flex flex-col flex-1 gap-2 overflow-y-auto" style={{ padding: '12px 12px' }}>
        {PROJECTS.map(p => {
          const sc = statusColor(p.status)
          return (
            <div
              key={p.id}
              className="rounded-xl cursor-pointer"
              style={{
                background: `linear-gradient(135deg, ${PURPLE}08 0%, rgba(255,255,255,0.015) 100%)`,
                border: `1px solid ${PURPLE}18`,
                padding: '12px 13px',
                transition: 'border-color 800ms, box-shadow 800ms',
              }}
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#f5f3ff', letterSpacing: '-0.015em' }}>{p.name}</div>
                  <div className="flex items-center gap-[5px] mt-[3px]">
                    <div
                      className="rounded-full flex-shrink-0"
                      style={{ width: 5, height: 5, background: sc, boxShadow: `0 0 6px ${sc}` }}
                    />
                    <span style={{ fontSize: 10.5, color: sc }}>{p.status}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div style={{ fontSize: 19, fontWeight: 700, color: PURPLE, letterSpacing: '-0.02em' }}>{p.progress}%</div>
                  <div style={{ fontSize: 9.5, color: '#374151' }}>{p.updated}</div>
                </div>
              </div>

              {/* AI insight */}
              <div
                className="rounded-[7px] mb-2"
                style={{
                  padding: '6px 10px',
                  background: `${PURPLE}08`,
                  borderLeft: `2px solid ${PURPLE}35`,
                }}
              >
                <span style={{ fontSize: 10.5, color: '#9ca3af', lineHeight: 1.5, fontStyle: 'italic' }}>
                  {aiContext(p.status)}
                </span>
              </div>

              <div className="rounded-full overflow-hidden" style={{ height: 2, background: 'rgba(255,255,255,0.04)' }}>
                <div
                  className="h-full"
                  style={{
                    width: `${p.progress}%`,
                    background: `linear-gradient(90deg, ${PURPLE}, ${PURPLE}60)`,
                    transition: 'width 800ms',
                  }}
                />
              </div>
            </div>
          )
        })}
      </div>

      {/* ── Prompt bar */}
      <div
        className="flex flex-shrink-0 items-center gap-2"
        style={{
          padding: '9px 12px',
          borderTop: `1px solid ${PURPLE}12`,
          background: `${PURPLE}04`,
        }}
      >
        <div
          className="flex-1 cursor-text rounded-[20px]"
          style={{
            background: 'rgba(255,255,255,0.035)',
            border: `1px solid ${PURPLE}22`,
            padding: '7px 14px',
            fontSize: 12,
            color: '#374151',
          }}
        >
          Ask anything about your projects…
        </div>
        <Button
          size="icon"
          className="w-8 h-8 rounded-full flex-shrink-0 text-white text-[15px] flex items-center justify-center"
          style={{
            background: PURPLE,
            boxShadow: `0 0 12px ${PURPLE}55`,
            transition: 'transform 400ms, box-shadow 400ms',
          }}
        >↑</Button>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// ── Export ────────────────────────────────────────────────────────────────────

const DEMO_MAP: Record<string, React.ComponentType> = {
  enterprise:      EnterpriseApp,
  minimal:         MinimalApp,
  premium:         PremiumApp,
  playful:         PlayfulApp,
  cyber:           CyberApp,
  'native-mobile': NativeMobileApp,
  'ai-native':     AINativeApp,
}

export function BehaviorDemoApp({ profileId }: { profileId: string }) {
  const Demo = DEMO_MAP[profileId]
  if (!Demo) return null

  return (
    <div className="relative overflow-hidden rounded-xl border border-border" style={{ height: 370 }}>
      <Demo />
    </div>
  )
}
