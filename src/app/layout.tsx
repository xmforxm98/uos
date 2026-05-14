import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'DesignOS — Semantic Design System Explorer',
  description: 'Code-native semantic design system viewer for AI-native product generation',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
