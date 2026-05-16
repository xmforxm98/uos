'use client'

import {
  Type, Ruler, Shapes, Zap, Circle,
  Component, Square, ToggleLeft, FormInput, LayoutDashboard,
  Palette, Sparkles, GalleryHorizontal, MonitorSmartphone, Search, Wind, MousePointer2, Fingerprint, Brain, MessageSquare
} from 'lucide-react'
import { interactionStyles } from '@/data/interactionStyles'
import { useDesignSystem } from '@/context/DesignSystemContext'
import { themes } from '@/data/themes'
import { componentDefs } from '@/data/components'
import { patterns } from '@/data/patterns'
import type { SelectedItem } from '@/types'
import { ThemeToggle } from './ThemeToggle'
import { ScrollArea } from './ui/scroll-area'
import { Badge } from './ui/badge'
import { Input } from './ui/input'
import { Button } from './ui/button'

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
      <div className="text-[10px] font-semibold tracking-[0.08em] uppercase text-text-subtle px-3 pt-3.5 pb-1">
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
      <span className="opacity-60 flex items-center">{icon}</span>
      <span className="flex-1">{label}</span>
      {badge && (
        <Badge className="text-[9.5px] px-1.5 py-0">{badge}</Badge>
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
    <aside className="w-[220px] min-w-[220px] bg-surface border-r border-border flex flex-col overflow-hidden shrink-0">
      {/* Header */}
      <div className="px-3.5 py-3 border-b border-border shrink-0 flex items-center justify-between gap-2">
        <div>
          <div className="text-[13px] font-semibold text-text tracking-[-0.01em]">
            DesignOS
          </div>
          <div className="text-[10px] text-text-subtle tracking-[0.04em] mt-px">
            Design System Explorer
          </div>
        </div>
        <ThemeToggle />
      </div>

      {/* Search */}
      <div className="px-2.5 py-2 shrink-0 border-b border-border">
        <div className="relative flex items-center">
          <Search size={11} className="absolute left-2 text-text-subtle pointer-events-none" />
          <Input
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search tokens..."
            className="pl-6 h-7 text-[11.5px]"
          />
        </div>
      </div>

      {/* Theme switcher */}
      <div className="px-2.5 py-2 border-b border-border shrink-0">
        <div className="text-[10px] text-text-subtle mb-1.5 font-semibold uppercase tracking-[0.08em]">
          Theme
        </div>
        <div className="flex gap-1 flex-wrap">
          {themes.map(t => (
            <Button
              key={t.id}
              onClick={() => setActiveThemeId(t.id)}
              title={t.description}
              variant={activeTheme.id === t.id ? 'secondary' : 'ghost'}
              size="sm"
              className={
                activeTheme.id === t.id
                  ? 'h-6 px-2 text-[11px] bg-accent-subtle border border-accent-border text-accent'
                  : 'h-6 px-2 text-[11px] text-text-muted'
              }
            >
              {t.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Nav */}
      <ScrollArea className="flex-1">
        <nav className="px-1.5 pt-1 pb-4">
          <NavSection label="Foundations">
            <NavItemRow icon={<Palette size={12} />}        label="Colors"       selected={isSelected({ type: 'primitive', id: 'color' })}        onClick={() => setSelected({ type: 'primitive', id: 'color' })} />
            <NavItemRow icon={<Ruler size={12} />}          label="Spacing"      selected={isSelected({ type: 'primitive', id: 'spacing' })}      onClick={() => setSelected({ type: 'primitive', id: 'spacing' })} />
            <NavItemRow icon={<Type size={12} />}           label="Typography"   selected={isSelected({ type: 'primitive', id: 'typography' })}   onClick={() => setSelected({ type: 'primitive', id: 'typography' })} />
            <NavItemRow icon={<Shapes size={12} />}         label="Radius"       selected={isSelected({ type: 'primitive', id: 'radius' })}       onClick={() => setSelected({ type: 'primitive', id: 'radius' })} />
            <NavItemRow icon={<Zap size={12} />}            label="Motion"       selected={isSelected({ type: 'primitive', id: 'motion' })}       onClick={() => setSelected({ type: 'primitive', id: 'motion' })} />
            <NavItemRow icon={<Shapes size={12} />}         label="Shadows"      selected={isSelected({ type: 'primitive', id: 'shadow' })}       onClick={() => setSelected({ type: 'primitive', id: 'shadow' })} />
            <NavItemRow icon={<Zap size={12} />}            label="Icons"        selected={isSelected({ type: 'primitive', id: 'icons' })}        onClick={() => setSelected({ type: 'primitive', id: 'icons' })} />
            <NavItemRow icon={<Wind size={12} />}           label="Liquid Glass" selected={isSelected({ type: 'primitive', id: 'glass' })}        onClick={() => setSelected({ type: 'primitive', id: 'glass' })} />
            <NavItemRow icon={<MousePointer2 size={12} />}  label="Interaction"  selected={isSelected({ type: 'primitive', id: 'interaction' })}  onClick={() => setSelected({ type: 'primitive', id: 'interaction' })} />
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
              icon={<MessageSquare size={12} />}
              label="Chat Prototype"
              selected={isSelected({ type: 'primitive', id: 'chat-prototype' })}
              onClick={() => setSelected({ type: 'primitive', id: 'chat-prototype' })}
              badge="new"
            />
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
                <div className="text-[10.5px] text-text-subtle px-2.5 pt-1.5 pb-0.5 font-medium">{cat}</div>
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
