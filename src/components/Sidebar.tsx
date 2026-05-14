'use client'

import {
  Type, Ruler, Shapes, Zap, Circle,
  Component, Square, ToggleLeft, FormInput, LayoutDashboard,
  Palette, Sparkles, GalleryHorizontal, MonitorSmartphone, Search, Layers, Wind, MousePointer2, Fingerprint, Brain
} from 'lucide-react'
import { interactionStyles } from '@/data/interactionStyles'
import { useDesignSystem } from '@/context/DesignSystemContext'
import { themes } from '@/data/themes'
import { componentDefs } from '@/data/components'
import { patterns } from '@/data/patterns'
import type { SelectedItem } from '@/types'
import { ThemeToggle } from './ThemeToggle'
import { ScrollArea } from './ui/scroll-area'

const componentIconMap: Record<string, React.ReactNode> = {
  button:  <Square size={12} />,
  input:   <FormInput size={12} />,
  card:    <LayoutDashboard size={12} />,
  badge:   <Circle size={12} />,
  avatar:  <Circle size={12} />,
  toggle:  <ToggleLeft size={12} />,
}

function NavSection({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div style={{
        fontSize: '10px',
        fontWeight: 600,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: 'var(--text-subtle)',
        padding: '14px 12px 4px',
      }}>
        {label}
      </div>
      {children}
    </div>
  )
}

function NavItemRow({
  icon, label, selected, onClick, badge
}: {
  icon: React.ReactNode
  label: string
  selected: boolean
  onClick: () => void
  badge?: string
}) {
  return (
    <button
      onClick={onClick}
      className={`nav-item w-full text-left ${selected ? 'active' : ''}`}
      style={{ border: 'none', background: selected ? undefined : 'transparent' }}
    >
      <span style={{ opacity: 0.6, display: 'flex', alignItems: 'center' }}>{icon}</span>
      <span style={{ flex: 1 }}>{label}</span>
      {badge && (
        <span className="chip default" style={{ fontSize: '9.5px', padding: '1px 5px' }}>{badge}</span>
      )}
    </button>
  )
}

export function Sidebar() {
  const { selected, setSelected, activeTheme, setActiveThemeId, searchQuery, setSearchQuery } = useDesignSystem()

  function isSelected(item: SelectedItem) {
    if (!selected || !item) return false
    if (selected.type !== item.type) return false
    if (selected.type === 'component' && item.type === 'component') return selected.id === item.id
    if (selected.type === 'theme' && item.type === 'theme') return selected.id === item.id
    if (selected.type === 'pattern' && item.type === 'pattern') return selected.id === item.id
    if (selected.type === 'primitive' && item.type === 'primitive') return selected.id === item.id
    if (selected.type === 'semantic' && item.type === 'semantic') return selected.id === item.id
    return false
  }

  const byCategory = componentDefs.reduce<Record<string, typeof componentDefs>>((acc, c) => {
    if (!acc[c.category]) acc[c.category] = []
    acc[c.category].push(c)
    return acc
  }, {})

  return (
    <aside style={{
      width: 220,
      minWidth: 220,
      background: 'var(--surface)',
      borderRight: '1px solid var(--border)',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      flexShrink: 0,
    }}>
      {/* Header */}
      <div style={{
        padding: '12px 14px',
        borderBottom: '1px solid var(--border)',
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 8,
      }}>
        <div>
          <div style={{
            fontSize: 13,
            fontWeight: 600,
            color: 'var(--text)',
            letterSpacing: '-0.01em',
          }}>
            DesignOS
          </div>
          <div style={{
            fontSize: 10,
            color: 'var(--text-subtle)',
            letterSpacing: '0.04em',
            marginTop: 1,
          }}>
            Design System Explorer
          </div>
        </div>
        <ThemeToggle />
      </div>

      {/* Search */}
      <div style={{ padding: '8px 10px', flexShrink: 0, borderBottom: '1px solid var(--border)' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6,
          background: 'var(--surface-mid)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-md)',
          padding: '5px 8px',
        }}>
          <Search size={11} color="var(--text-subtle)" />
          <input
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search tokens..."
            style={{
              background: 'none', border: 'none', outline: 'none',
              color: 'var(--text)', fontSize: 11.5, width: '100%',
            }}
          />
        </div>
      </div>

      {/* Theme switcher */}
      <div style={{ padding: '8px 10px', borderBottom: '1px solid var(--border)', flexShrink: 0 }}>
        <div style={{ fontSize: 10, color: 'var(--text-subtle)', marginBottom: 5, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Theme
        </div>
        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
          {themes.map(t => (
            <button
              key={t.id}
              onClick={() => setActiveThemeId(t.id)}
              title={t.description}
              style={{
                padding: '3px 8px',
                borderRadius: 'var(--radius-sm)',
                fontSize: 11,
                fontWeight: 500,
                border: '1px solid',
                cursor: 'pointer',
                background: activeTheme.id === t.id ? 'var(--accent-subtle)' : 'transparent',
                borderColor: activeTheme.id === t.id ? 'var(--accent-border)' : 'var(--border)',
                color: activeTheme.id === t.id ? 'var(--accent)' : 'var(--text-muted)',
                transition: 'all 100ms',
              }}
            >
              {t.name}
            </button>
          ))}
        </div>
      </div>

      {/* Nav */}
      <ScrollArea style={{ flex: 1 }}>
        <nav style={{ padding: '4px 6px 16px' }}>
          <NavSection label="Foundations">
            <NavItemRow icon={<Palette size={12} />} label="Colors"      selected={isSelected({ type: 'primitive', id: 'color' })}      onClick={() => setSelected({ type: 'primitive', id: 'color' })} />
            <NavItemRow icon={<Ruler size={12} />}   label="Spacing"     selected={isSelected({ type: 'primitive', id: 'spacing' })}    onClick={() => setSelected({ type: 'primitive', id: 'spacing' })} />
            <NavItemRow icon={<Type size={12} />}    label="Typography"  selected={isSelected({ type: 'primitive', id: 'typography' })} onClick={() => setSelected({ type: 'primitive', id: 'typography' })} />
            <NavItemRow icon={<Shapes size={12} />}  label="Radius"      selected={isSelected({ type: 'primitive', id: 'radius' })}     onClick={() => setSelected({ type: 'primitive', id: 'radius' })} />
            <NavItemRow icon={<Zap size={12} />}     label="Motion"      selected={isSelected({ type: 'primitive', id: 'motion' })}     onClick={() => setSelected({ type: 'primitive', id: 'motion' })} />
            <NavItemRow icon={<Shapes size={12} />}  label="Shadows"     selected={isSelected({ type: 'primitive', id: 'shadow' })}     onClick={() => setSelected({ type: 'primitive', id: 'shadow' })} />
            <NavItemRow icon={<Zap size={12} />}     label="Icons"       selected={isSelected({ type: 'primitive', id: 'icons' })}      onClick={() => setSelected({ type: 'primitive', id: 'icons' })} />
            <NavItemRow icon={<Wind size={12} />}       label="Liquid Glass"   selected={isSelected({ type: 'primitive', id: 'glass' })}       onClick={() => setSelected({ type: 'primitive', id: 'glass' })} />
            <NavItemRow icon={<MousePointer2 size={12} />} label="Interaction"  selected={isSelected({ type: 'primitive', id: 'interaction' })} onClick={() => setSelected({ type: 'primitive', id: 'interaction' })} />
          </NavSection>

          <NavSection label="Semantic Tokens">
            {['background', 'text', 'border', 'surface', 'interactive', 'radius', 'glass'].map(g => (
              <NavItemRow
                key={g}
                icon={<Circle size={12} />}
                label={g.charAt(0).toUpperCase() + g.slice(1)}
                selected={isSelected({ type: 'semantic', id: g })}
                onClick={() => setSelected({ type: 'semantic', id: g })}
              />
            ))}
          </NavSection>

          <NavSection label="Behavior">
            {interactionStyles.map(style => (
              <NavItemRow
                key={style.id}
                icon={<Fingerprint size={12} style={{ color: style.color }} />}
                label={style.name}
                selected={isSelected({ type: 'primitive', id: `behavior-${style.id}` })}
                onClick={() => setSelected({ type: 'primitive', id: `behavior-${style.id}` })}
              />
            ))}
            <NavItemRow
              icon={<Brain size={12} />}
              label="Compare All"
              selected={isSelected({ type: 'primitive', id: 'interaction-styles' })}
              onClick={() => setSelected({ type: 'primitive', id: 'interaction-styles' })}
              badge="7"
            />
          </NavSection>

          <NavSection label="Components">
            {Object.entries(byCategory).map(([cat, comps]) => (
              <div key={cat}>
                <div style={{ fontSize: 10.5, color: 'var(--text-subtle)', padding: '6px 10px 2px', fontWeight: 500 }}>{cat}</div>
                {comps.map(c => (
                  <NavItemRow
                    key={c.id}
                    icon={componentIconMap[c.id] ?? <Component size={12} />}
                    label={c.name}
                    selected={isSelected({ type: 'component', id: c.id })}
                    onClick={() => setSelected({ type: 'component', id: c.id })}
                    badge={c.accessibility.some(a => !a.passes) ? 'a11y' : undefined}
                  />
                ))}
              </div>
            ))}
          </NavSection>

          <NavSection label="Patterns">
            {patterns.map(p => (
              <NavItemRow
                key={p.id}
                icon={<GalleryHorizontal size={12} />}
                label={p.name}
                selected={isSelected({ type: 'pattern', id: p.id })}
                onClick={() => setSelected({ type: 'pattern', id: p.id })}
              />
            ))}
          </NavSection>

          <NavSection label="Brand Themes">
            {themes.map(t => (
              <NavItemRow
                key={t.id}
                icon={<MonitorSmartphone size={12} />}
                label={t.name}
                selected={isSelected({ type: 'theme', id: t.id })}
                onClick={() => setSelected({ type: 'theme', id: t.id })}
                badge={t.overrides.length > 0 ? `${t.overrides.length}` : undefined}
              />
            ))}
          </NavSection>

          <NavSection label="AI System">
            <NavItemRow
              icon={<Sparkles size={12} />}
              label="Generation Rules"
              selected={isSelected({ type: 'pattern', id: 'ai-rules' })}
              onClick={() => setSelected({ type: 'pattern', id: 'ai-rules' })}
            />
          </NavSection>
        </nav>
      </ScrollArea>
    </aside>
  )
}
