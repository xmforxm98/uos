'use client'

import * as React from 'react'
import { useDesignSystem } from '@/context/DesignSystemContext'
import { resolveRadius } from '@/data/themes'
import type { ComponentDef } from '@/types'
import { Checkbox } from '@/components/ui/checkbox'
import { Switch } from '@/components/ui/switch'
import { Slider } from '@/components/ui/slider'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'

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

function PreviewCheckbox() {
  const [checked1, setChecked1] = React.useState<boolean | 'indeterminate'>(true)
  const [checked2, setChecked2] = React.useState<boolean | 'indeterminate'>(false)
  const [radio, setRadio] = React.useState('monthly')
  const [sw1, setSw1] = React.useState(true)
  const [sw2, setSw2] = React.useState(false)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: 260 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <p style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 2 }}>Checkbox</p>
        <div className="flex items-center gap-2">
          <Checkbox id="p1" checked={checked1} onCheckedChange={v => setChecked1(v as boolean)} />
          <Label htmlFor="p1">Accept terms and conditions</Label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="p2" checked={checked2} onCheckedChange={v => setChecked2(v as boolean)} />
          <Label htmlFor="p2">Subscribe to newsletter</Label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="p3" disabled />
          <Label htmlFor="p3" className="opacity-50">Disabled option</Label>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <p style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 2 }}>Radio Group</p>
        <RadioGroup value={radio} onValueChange={setRadio} className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <RadioGroupItem value="monthly" id="monthly" />
            <Label htmlFor="monthly">Monthly — $12/mo</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="annual" id="annual" />
            <Label htmlFor="annual">Annual — $99/yr</Label>
          </div>
        </RadioGroup>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <p style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 2 }}>Switch</p>
        <div className="flex items-center justify-between">
          <Label>Dark mode</Label>
          <Switch checked={sw1} onCheckedChange={setSw1} />
        </div>
        <div className="flex items-center justify-between">
          <Label>Notifications</Label>
          <Switch checked={sw2} onCheckedChange={setSw2} />
        </div>
      </div>
    </div>
  )
}

function PreviewSlider() {
  const [val1, setVal1] = React.useState([60])
  const [val2, setVal2] = React.useState([20, 75])
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: 280 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div className="flex justify-between items-center">
          <Label>Volume</Label>
          <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{val1[0]}%</span>
        </div>
        <Slider value={val1} onValueChange={setVal1} max={100} step={1} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div className="flex justify-between items-center">
          <Label>Price range</Label>
          <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>${val2[0]} – ${val2[1]}</span>
        </div>
        <Slider value={val2} onValueChange={setVal2} max={100} step={5} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div className="flex justify-between items-center">
          <Label className="opacity-50">Disabled</Label>
          <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>50%</span>
        </div>
        <Slider defaultValue={[50]} disabled />
      </div>
    </div>
  )
}

function PreviewProgress() {
  const [upload, setUpload] = React.useState(0)
  React.useEffect(() => {
    const t = setInterval(() => setUpload(v => v >= 100 ? 0 : v + 2), 80)
    return () => clearInterval(t)
  }, [])
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: 280 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div className="flex justify-between">
          <Label>Profile completion</Label>
          <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>72%</span>
        </div>
        <Progress value={72} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div className="flex justify-between">
          <Label>Uploading file...</Label>
          <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{upload}%</span>
        </div>
        <Progress value={upload} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <Label>Storage used</Label>
        <Progress value={91} className="[&>div]:bg-red-500" />
        <p style={{ fontSize: 11, color: 'var(--text-muted)' }}>9.1 GB of 10 GB used</p>
      </div>
    </div>
  )
}

function PreviewTable() {
  const rows = [
    { name: 'Alice Kim',    email: 'alice@co.com',  status: 'Active',   plan: 'Pro' },
    { name: 'Bob Park',     email: 'bob@co.com',    status: 'Pending',  plan: 'Free' },
    { name: 'Carol Lee',    email: 'carol@co.com',  status: 'Active',   plan: 'Enterprise' },
    { name: 'Dave Choi',    email: 'dave@co.com',   status: 'Inactive', plan: 'Pro' },
  ]
  const statusColor: Record<string, 'green' | 'yellow' | 'default'> = {
    Active: 'green', Pending: 'yellow', Inactive: 'default',
  }
  return (
    <div style={{ width: 420 }}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Plan</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map(r => (
            <TableRow key={r.email}>
              <TableCell className="font-medium">{r.name}</TableCell>
              <TableCell className="text-muted-foreground text-xs">{r.email}</TableCell>
              <TableCell>{r.plan}</TableCell>
              <TableCell>
                <Badge variant={statusColor[r.status]}>{r.status}</Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

function PreviewCalendar() {
  const [selected, setSelected] = React.useState<number | null>(14)
  const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
  const cells = Array.from({ length: 35 }, (_, i) => {
    const day = i - 2
    return day > 0 && day <= 31 ? day : null
  })
  const today = 16
  return (
    <div style={{
      background: 'var(--surface)', border: '1px solid var(--border-mid)',
      borderRadius: 12, padding: 16, width: 260, userSelect: 'none',
    }}>
      <div className="flex items-center justify-between mb-3">
        <button style={{ fontSize: 12, color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer', padding: '2px 6px' }}>←</button>
        <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>May 2026</span>
        <button style={{ fontSize: 12, color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer', padding: '2px 6px' }}>→</button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2, marginBottom: 4 }}>
        {days.map(d => (
          <div key={d} style={{ fontSize: 10, color: 'var(--text-muted)', textAlign: 'center', padding: '2px 0', fontWeight: 500 }}>{d}</div>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2 }}>
        {cells.map((day, i) => {
          const isSelected = day === selected
          const isToday = day === today
          return (
            <button
              key={i}
              onClick={() => day && setSelected(day)}
              style={{
                width: '100%', aspectRatio: '1', borderRadius: 6, border: 'none',
                fontSize: 11, cursor: day ? 'pointer' : 'default',
                background: isSelected ? 'var(--accent)' : isToday ? 'var(--accent-subtle)' : 'transparent',
                color: isSelected ? '#fff' : isToday ? 'var(--accent)' : day ? 'var(--text)' : 'transparent',
                fontWeight: isSelected || isToday ? 600 : 400,
                transition: 'background 100ms',
              }}
            >{day ?? ''}</button>
          )
        })}
      </div>
    </div>
  )
}

function PreviewAccordion() {
  return (
    <div style={{ width: 300 }}>
      <Accordion type="single" collapsible defaultValue="item-1">
        <AccordionItem value="item-1">
          <AccordionTrigger>What is included?</AccordionTrigger>
          <AccordionContent>All plans include unlimited projects, team collaboration, and priority support.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Can I cancel anytime?</AccordionTrigger>
          <AccordionContent>Yes, cancel anytime with no questions asked. Billing stops at cycle end.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Is there a free trial?</AccordionTrigger>
          <AccordionContent>14-day free trial on all paid plans. No credit card required.</AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

function PreviewTabs() {
  return (
    <div style={{ width: 320 }}>
      <Tabs defaultValue="overview">
        <TabsList className="w-full">
          <TabsTrigger value="overview" className="flex-1">Overview</TabsTrigger>
          <TabsTrigger value="analytics" className="flex-1">Analytics</TabsTrigger>
          <TabsTrigger value="settings" className="flex-1">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <div style={{ padding: '16px 0', display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>Project overview</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.6 }}>Track your project's progress, recent activity, and key metrics all in one place.</div>
            <div className="flex gap-2 mt-2">
              <Badge variant="green">Active</Badge>
              <Badge variant="default">v2.4.1</Badge>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="analytics">
          <div style={{ padding: '16px 0', fontSize: 12, color: 'var(--text-muted)' }}>Analytics dashboard coming soon.</div>
        </TabsContent>
        <TabsContent value="settings">
          <div style={{ padding: '16px 0', fontSize: 12, color: 'var(--text-muted)' }}>Project settings and configuration.</div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function PreviewSelect() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 260 }}>
      <div className="flex flex-col gap-1.5">
        <Label>Timezone</Label>
        <Select defaultValue="utc">
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="utc">UTC +0:00</SelectItem>
            <SelectItem value="pst">Pacific Time −8:00</SelectItem>
            <SelectItem value="est">Eastern Time −5:00</SelectItem>
            <SelectItem value="kst">Korea Standard +9:00</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-1.5">
        <Label>Plan</Label>
        <Select defaultValue="pro">
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="free">Free</SelectItem>
            <SelectItem value="pro">Pro — $12/mo</SelectItem>
            <SelectItem value="enterprise">Enterprise</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-1.5">
        <Label className="opacity-50">Disabled</Label>
        <Select disabled>
          <SelectTrigger>
            <SelectValue placeholder="Not available" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="x">x</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

function PreviewDialog() {
  return (
    <div style={{ position: 'relative', width: 340, height: 200 }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'rgba(0,0,0,0.45)', borderRadius: 12,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{
          background: 'var(--surface)', border: '1px solid var(--border-mid)',
          borderRadius: 12, padding: '20px 24px', width: 280,
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 6 }}>Delete project?</div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 16 }}>
            This action is permanent and cannot be undone. All data will be removed.
          </div>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <button className="ds-btn ds-btn-secondary" style={{ fontSize: 12, padding: '6px 12px', borderRadius: 6 }}>Cancel</button>
            <button className="ds-btn ds-btn-destructive" style={{ fontSize: 12, padding: '6px 12px', borderRadius: 6 }}>Delete</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export function ComponentPreview({ component }: { component: ComponentDef }) {
  const { activeTheme } = useDesignSystem()
  const accent = themeAccent(activeTheme.id)

  // Inject theme accent into CSS variables so ALL previews (custom + Shadcn) respond to theme switching.
  // Shadcn components use --color-primary / --color-ring; our custom ones use --accent.
  const themeVars = {
    '--accent':        accent,
    '--accent-hover':  accent + 'dd',
    '--accent-subtle': accent + '18',
    '--accent-border': accent + '44',
    '--color-accent':  accent,
    '--color-primary': accent,
    '--color-ring':    accent,
  } as React.CSSProperties

  const renders: Record<string, React.ReactNode> = {
    button:    <PreviewButton theme={activeTheme.id} />,
    input:     <PreviewInput theme={activeTheme.id} />,
    card:      <PreviewCard theme={activeTheme.id} />,
    badge:     <PreviewBadge />,
    avatar:    <PreviewAvatar theme={activeTheme.id} />,
    toggle:    <PreviewToggle theme={activeTheme.id} />,
    checkbox:  <PreviewCheckbox />,
    slider:    <PreviewSlider />,
    progress:  <PreviewProgress />,
    table:     <PreviewTable />,
    calendar:  <PreviewCalendar />,
    accordion: <PreviewAccordion />,
    tabs:      <PreviewTabs />,
    select:    <PreviewSelect />,
    dialog:    <PreviewDialog />,
  }

  return (
    <div style={themeVars}>
      <div className="preview-canvas">
        {renders[component.previewType] ?? (
          <span style={{ color: 'var(--text-subtle)', fontSize: 12 }}>Preview not available</span>
        )}
      </div>
    </div>
  )
}
