'use client'

import { useEffect } from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { initializeTheme } from '@/lib/utils/theme-switcher'

/**
 * Theme-Provider-Komponente
 * 
 * Diese Komponente initialisiert den Theme-Switcher beim Laden der Anwendung
 * und stellt den NextThemesProvider bereit, um Theme-Wechsel in der gesamten
 * Anwendung zu ermöglichen.
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Theme-Switcher initialisieren
    initializeTheme()
  }, [])

  return (
    <div>
      <NextThemesProvider attribute="class" defaultTheme="system" enableSystem />
      {children}
    </div>
  )
} 