'use client'

import { DesignSystemProvider, useDesignSystem } from '@/context/DesignSystemContext'
import { Sidebar } from '@/components/Sidebar'
import { Inspector } from '@/components/Inspector'
import { ComponentView } from '@/components/views/ComponentView'
import { FoundationsView } from '@/components/views/FoundationsView'
import { SemanticView } from '@/components/views/SemanticView'
import { ThemeView } from '@/components/views/ThemeView'
import { PatternView } from '@/components/views/PatternView'
import { Layers } from 'lucide-react'

function MainContent() {
  const { selected } = useDesignSystem()

  if (!selected) {
    return (
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        height: '100%', gap: 16, color: 'var(--text-subtle)',
      }}>
        <Layers size={32} />
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--text)', marginBottom: 6 }}>DesignOS</div>
          <div style={{ fontSize: 13 }}>Select any item from the sidebar to explore</div>
        </div>
      </div>
    )
  }

  if (selected.type === 'component') return <ComponentView id={selected.id} />
  if (selected.type === 'primitive') return <FoundationsView category={selected.id} />
  if (selected.type === 'semantic')  return <SemanticView group={selected.id} />
  if (selected.type === 'theme')     return <ThemeView id={selected.id} />
  if (selected.type === 'pattern')   return <PatternView id={selected.id} />

  return null
}

export default function Home() {
  return (
    <DesignSystemProvider>
      <div style={{
        display: 'flex',
        height: '100dvh',
        overflow: 'hidden',
        background: 'var(--bg)',
      }}>
        <Sidebar />
        <main style={{ flex: 1, overflow: 'hidden', background: 'var(--bg)' }}>
          <MainContent />
        </main>
        <Inspector />
      </div>
    </DesignSystemProvider>
  )
}
