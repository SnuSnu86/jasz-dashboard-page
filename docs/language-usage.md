# Mehrsprachigkeit in der JASZ-AI Anwendung

Diese Dokumentation erklärt, wie die Mehrsprachigkeitsfunktion in der JASZ-AI Anwendung implementiert ist und wie sie in verschiedenen Komponenten verwendet werden kann.

## Übersicht

Die Anwendung unterstützt derzeit zwei Sprachen:
- Deutsch (de)
- Englisch (en)

Die Spracheinstellung wird im `localStorage` gespeichert und beim Laden der Anwendung automatisch wiederhergestellt. Wenn keine gespeicherte Einstellung vorhanden ist, wird die Browsersprache des Benutzers erkannt und als Standardsprache verwendet.

## Architektur

Die Mehrsprachigkeitsfunktion besteht aus drei Hauptkomponenten:

1. **Language-Switcher-Utility** (`lib/utils/language-switcher.ts`)
   - Bietet grundlegende Funktionen zum Abrufen und Setzen der Sprache
   - Speichert die Sprachpräferenz im localStorage
   - Löst Events aus, wenn sich die Sprache ändert

2. **Language-Context** (`lib/context/language-context.tsx`)
   - Stellt einen React-Context bereit, der die aktuelle Sprache und Übersetzungsfunktionen enthält
   - Enthält alle Übersetzungen für die unterstützten Sprachen
   - Bietet den `useLanguage`-Hook für den Zugriff auf Übersetzungen in Komponenten
   - Behandelt Hydration-Probleme durch Client-seitige Initialisierung

3. **LanguageHtmlAttributes** (`components/language-html-attributes.tsx`)
   - Aktualisiert das `lang`-Attribut des HTML-Elements basierend auf der aktuellen Sprache
   - Fügt CSS-Klassen und data-Attribute hinzu, um die Sprachauswahl in CSS und JavaScript zu erleichtern
   - Sorgt für korrekte Barrierefreiheit und SEO
   - Verwendet einen zweistufigen Rendering-Ansatz, um Hydration-Probleme zu vermeiden

## Wichtige Änderungen für die gesamte Website

Um sicherzustellen, dass die Sprachänderung auf der gesamten Website funktioniert, wurden folgende Änderungen vorgenommen:

1. **Reihenfolge der Provider**: Der `LanguageProvider` umschließt jetzt den `ThemeProvider` und alle anderen Komponenten, um sicherzustellen, dass die Spracheinstellungen überall verfügbar sind.

2. **Reaktive Komponenten**: Alle Komponenten, die Text anzeigen, müssen den `useLanguage`-Hook verwenden und auf Sprachänderungen reagieren.

3. **Verbesserte Sprachänderung**: Die Sprachänderung aktualisiert jetzt direkt den State im `LanguageContext` und löst ein Event aus, auf das alle Komponenten reagieren können.

4. **HTML-Attribute**: Das `lang`-Attribut des HTML-Elements wird automatisch aktualisiert, wenn sich die Sprache ändert.

5. **Hydration-Behandlung**: Komponenten verwenden einen zweistufigen Rendering-Ansatz, um Hydration-Probleme zu vermeiden.

## Verwendung in Komponenten

### 1. Zugriff auf Übersetzungen

Um auf Übersetzungen in einer Komponente zuzugreifen, verwenden Sie den `useLanguage`-Hook:

```tsx
'use client'
import { useLanguage } from '@/lib/context/language-context'
import { useState, useEffect } from 'react'

export function MyComponent() {
  // Lokaler State für Client-seitiges Rendering
  const [isMounted, setIsMounted] = useState(false)
  
  // Markiere die Komponente als gemountet
  useEffect(() => {
    setIsMounted(true)
  }, [])
  
  // Wenn nicht im Client-Kontext, zeige einen Platzhalter an
  if (!isMounted) {
    return <div>Lade...</div>
  }
  
  // Zugriff auf den Language-Context
  const { language, t } = useLanguage()
  
  return (
    <div>
      <h1>{t('nav.home')}</h1>
      <p>{t('button.getStarted')}</p>
    </div>
  )
}
```

### 2. Dynamische Übersetzungen

Sie können auch dynamische Übersetzungen basierend auf der aktuellen Sprache erstellen:

```tsx
const { language } = useLanguage()

const message = language === 'de' 
  ? 'Dies ist eine deutsche Nachricht.' 
  : 'This is an English message.'
```

### 3. Sprache wechseln

Um die Sprache programmatisch zu wechseln:

```tsx
const { changeLanguage } = useLanguage()

// Zu Deutsch wechseln
changeLanguage('de')

// Zu Englisch wechseln
changeLanguage('en')
```

Oder mit dem Toggle-Utility:

```tsx
import { toggleLanguage } from '@/lib/utils/language-switcher'

// Zwischen Deutsch und Englisch wechseln
toggleLanguage()
```

## Hinzufügen neuer Übersetzungen

Um neue Übersetzungen hinzuzufügen, bearbeiten Sie die `translations`-Konstante in `lib/context/language-context.tsx`:

```tsx
const translations: Record<Language, Record<string, string>> = {
  de: {
    // Bestehende Übersetzungen...
    'mein.neuer.schluessel': 'Meine deutsche Übersetzung',
  },
  en: {
    // Bestehende Übersetzungen...
    'mein.neuer.schluessel': 'My English translation',
  }
}
```

## Bewährte Praktiken

1. **Verwenden Sie sprechende Schlüssel**: Organisieren Sie Übersetzungsschlüssel in Kategorien (z.B. `nav.home`, `button.login`).

2. **Client-Komponenten**: Da der `useLanguage`-Hook einen React-Context verwendet, funktioniert er nur in Client-Komponenten. Fügen Sie `'use client'` am Anfang Ihrer Komponente hinzu.

3. **Vermeiden Sie direkte Zeichenketten**: Verwenden Sie immer die Übersetzungsfunktion `t()` für Texte, die dem Benutzer angezeigt werden.

4. **Testen Sie beide Sprachen**: Stellen Sie sicher, dass Ihre Komponenten in beiden Sprachen korrekt angezeigt werden, insbesondere bei längeren deutschen Texten.

5. **Verwenden Sie useMemo für übersetzte Listen**: Wenn Sie eine Liste von übersetzten Elementen haben, verwenden Sie `useMemo`, um die Liste nur neu zu berechnen, wenn sich die Sprache ändert:

```tsx
const menuItems = React.useMemo(() => [
  { name: t('nav.home'), href: '#link' },
  { name: t('nav.solution'), href: '#link' },
], [t]) // Aktualisiere die Menüpunkte, wenn sich die Sprache ändert
```

6. **Zweistufiges Rendering**: Verwenden Sie einen zweistufigen Rendering-Ansatz, um Hydration-Probleme zu vermeiden:

```tsx
'use client'
import { useState, useEffect } from 'react'
import { useLanguage } from '@/lib/context/language-context'

export function MyComponent() {
  const [isMounted, setIsMounted] = useState(false)
  
  useEffect(() => {
    setIsMounted(true)
  }, [])
  
  if (!isMounted) {
    return <div>Lade...</div> // Platzhalter während des Server-Renderings
  }
  
  // Client-seitige Implementierung mit useLanguage
  return <ClientComponent />
}

function ClientComponent() {
  const { language, t } = useLanguage()
  
  return <div>{t('nav.home')}</div>
}
```

## Fehlerbehebung

Wenn die Sprachänderung nicht auf der gesamten Website funktioniert, überprüfen Sie Folgendes:

1. **Provider-Reihenfolge**: Stellen Sie sicher, dass der `LanguageProvider` alle anderen Komponenten umschließt.

2. **Client-Komponenten**: Stellen Sie sicher, dass alle Komponenten, die Übersetzungen verwenden, als Client-Komponenten markiert sind (`'use client'`).

3. **Konsole-Ausgaben**: Überprüfen Sie die Konsole auf Fehlermeldungen oder Warnungen. Der Language-Context gibt Debug-Informationen aus, die bei der Fehlerbehebung helfen können.

4. **Fehlende Übersetzungen**: Stellen Sie sicher, dass alle verwendeten Übersetzungsschlüssel in beiden Sprachen definiert sind.

5. **Reaktivität**: Stellen Sie sicher, dass Komponenten, die Übersetzungen verwenden, auf Sprachänderungen reagieren, indem sie den `useLanguage`-Hook verwenden und gegebenenfalls `useMemo` für übersetzte Listen.

6. **Hydration-Probleme**: Wenn Sie Fehler wie `useLanguage must be used within a LanguageProvider` sehen, verwenden Sie den zweistufigen Rendering-Ansatz, um Hydration-Probleme zu vermeiden.

7. **Initialisierungsstatus**: Prüfen Sie den `isInitialized`-Status des Language-Context, um sicherzustellen, dass die Übersetzungen geladen wurden, bevor Sie sie verwenden.

## Beispielkomponente

Eine vollständige Beispielkomponente finden Sie in `components/translated-component-example.tsx`. Diese Komponente demonstriert die Verwendung von Übersetzungen und das Wechseln der Sprache. 