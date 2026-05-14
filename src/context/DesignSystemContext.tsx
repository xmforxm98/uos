'use client'

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import type { SelectedItem } from '@/types'
import { themes } from '@/data/themes'
import type { BrandTheme } from '@/types'

type DesignSystemContextValue = {
  selected: SelectedItem
  setSelected: (item: SelectedItem) => void
  activeTheme: BrandTheme
  setActiveThemeId: (id: string) => void
  copiedId: string | null
  copyValue: (id: string, value: string) => void
  searchQuery: string
  setSearchQuery: (q: string) => void
}

const DesignSystemContext = createContext<DesignSystemContextValue | null>(null)

export function DesignSystemProvider({ children }: { children: ReactNode }) {
  const [selected, setSelected] = useState<SelectedItem>({ type: 'component', id: 'button' })
  const [activeThemeId, setActiveThemeId] = useState('light')
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const activeTheme = themes.find(t => t.id === activeThemeId) ?? themes[0]

  const copyValue = useCallback((id: string, value: string) => {
    navigator.clipboard.writeText(value).catch(() => {})
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 1500)
  }, [])

  return (
    <DesignSystemContext.Provider
      value={{ selected, setSelected, activeTheme, setActiveThemeId, copiedId, copyValue, searchQuery, setSearchQuery }}
    >
      {children}
    </DesignSystemContext.Provider>
  )
}

export function useDesignSystem() {
  const ctx = useContext(DesignSystemContext)
  if (!ctx) throw new Error('useDesignSystem must be used within DesignSystemProvider')
  return ctx
}
