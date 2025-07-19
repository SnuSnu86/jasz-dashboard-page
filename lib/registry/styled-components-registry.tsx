'use client'

import React, { useState } from 'react'
import { useServerInsertedHTML } from 'next/navigation'
import { ServerStyleSheet, StyleSheetManager } from 'styled-components'

/**
 * StyledComponentsRegistry Komponente
 * 
 * Diese Komponente ermöglicht das korrekte Rendering von styled-components im 
 * Server-Side Rendering (SSR) Kontext von Next.js.
 * 
 * Sie sammelt alle generierten CSS-Stile während des Renderns und injiziert sie
 * in den HTML-Head.
 */
export default function StyledComponentsRegistry({
  children,
}: {
  children: React.ReactNode
}) {
  // Stylesheet nur einmal mit Lazy-Initialisierung erstellen
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet())

  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement()
    styledComponentsStyleSheet.instance.clearTag()
    return <>{styles}</>
  })

  // Im Client-Side einfach die Kinder zurückgeben
  if (typeof window !== 'undefined') return <>{children}</>

  // Im Server-Side die Kinder mit StyleSheetManager umhüllen
  return (
    <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
      {children}
    </StyleSheetManager>
  )
} 