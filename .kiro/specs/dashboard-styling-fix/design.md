# Design Document

## Overview

Das JASZ-AI Dashboard zeigt derzeit eine primitive, unstyled Darstellung anstatt des konfigurierten Shadcn UI (New York style) Designs. Nach der Analyse der Codebase wurden mehrere kritische Probleme identifiziert, die das korrekte Styling verhindern:

1. **Fehlender ThemeProvider**: Der ThemeProvider wird nicht im Layout verwendet
2. **CSS-Variablen werden nicht korrekt angewendet**: Die CSS-Variablen in globals.css haben Spezifitätsprobleme
3. **Tailwind CSS Integration**: Mögliche Probleme mit der Tailwind CSS Konfiguration
4. **Component Styling**: Shadcn UI Komponenten werden nicht korrekt gerendert

## Architecture

### Problem-Analyse

**Hauptprobleme identifiziert:**

1. **ThemeProvider fehlt**: In `app/layout.tsx` wird der `ThemeProvider` nicht importiert und verwendet, obwohl er in `components/theme-provider.tsx` existiert
2. **CSS-Variablen Spezifität**: Die CSS-Variablen in `globals.css` verwenden komplexe Selektoren, die möglicherweise nicht korrekt angewendet werden
3. **Tailwind CSS Plugins**: Die Tailwind-Konfiguration verwendet veraltete oder inkompatible Plugins
4. **Missing CSS Reset**: Möglicherweise fehlen wichtige Base-Styles für Shadcn UI

### Lösungsarchitektur

**Schicht 1: Theme System**
- ThemeProvider in Layout integrieren
- CSS-Variablen vereinfachen und korrigieren
- Dark/Light Mode Support sicherstellen

**Schicht 2: Tailwind CSS**
- Tailwind-Konfiguration bereinigen
- Plugin-Kompatibilität sicherstellen
- CSS-Variablen korrekt mit Tailwind verknüpfen

**Schicht 3: Component System**
- Shadcn UI Komponenten-Imports verifizieren
- Base-Styles für UI-Komponenten sicherstellen
- Component-spezifische Styles korrigieren

## Components and Interfaces

### Theme System Components

**ThemeProvider Integration**
```typescript
// app/layout.tsx - Updated
import { ThemeProvider } from "@/components/theme-provider"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" suppressHydrationWarning>
      <body className={`${geist.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
```

**CSS Variables Restructure**
```css
/* globals.css - Simplified approach */
@layer base {
  :root {
    /* Light mode variables */
    --background: 0 0% 100%;
    --foreground: 0 0% 3.9%;
    /* ... other variables */
  }
  
  .dark {
    /* Dark mode variables */
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    /* ... other variables */
  }
}
```

### UI Component System

**Select Component Verification**
- Shadcn UI Select-Komponente ist korrekt implementiert
- Radix UI Primitives sind verfügbar
- Styling-Klassen sind korrekt definiert

**Card Components**
- Überprüfung der Card-Komponenten für KPI-Anzeige
- Sicherstellung der korrekten Border- und Shadow-Styles

## Data Models

### Theme Configuration
```typescript
interface ThemeConfig {
  defaultTheme: 'light' | 'dark' | 'system'
  enableSystem: boolean
  attribute: 'class' | 'data-theme'
}

interface CSSVariables {
  light: Record<string, string>
  dark: Record<string, string>
}
```

### Component Props
```typescript
interface DashboardPageProps {
  timeRange: 'today' | 'lastWeek' | 'lastMonth'
  selectedAgent: string
}

interface SelectProps {
  value: string
  onValueChange: (value: string) => void
  className?: string
}
```

## Error Handling

### CSS Loading Issues
- **Problem**: CSS-Variablen werden nicht angewendet
- **Lösung**: Vereinfachte CSS-Struktur mit @layer base
- **Fallback**: Hardcoded Farben als Backup

### Theme Switching Errors
- **Problem**: Theme-Wechsel funktioniert nicht
- **Lösung**: Korrekte ThemeProvider Integration
- **Monitoring**: Console-Logs für Theme-Änderungen

### Component Rendering Issues
- **Problem**: Shadcn UI Komponenten werden nicht gestylt
- **Lösung**: Überprüfung der Tailwind CSS Klassen
- **Debugging**: Component-spezifische CSS-Klassen testen

## Testing Strategy

### Visual Regression Testing
1. **Before/After Screenshots**: Vergleich der UI vor und nach den Änderungen
2. **Component Testing**: Einzelne UI-Komponenten isoliert testen
3. **Theme Testing**: Dark/Light Mode Wechsel testen

### Integration Testing
1. **CSS Loading**: Überprüfung, dass alle CSS-Dateien geladen werden
2. **Tailwind Classes**: Verifizierung, dass Tailwind-Klassen angewendet werden
3. **Component Interaction**: Select-Dropdowns und andere Interaktionen testen

### Browser Compatibility
1. **Chrome/Edge**: Hauptbrowser-Support
2. **Firefox**: Alternative Browser-Unterstützung
3. **Safari**: WebKit-Kompatibilität

## Implementation Approach

### Phase 1: Theme System Fix
1. ThemeProvider in Layout integrieren
2. CSS-Variablen vereinfachen
3. Tailwind-Konfiguration bereinigen

### Phase 2: Component Styling
1. Shadcn UI Base-Styles sicherstellen
2. Component-spezifische Styles korrigieren
3. Dashboard-Layout optimieren

### Phase 3: Verification
1. Visual Testing durchführen
2. Theme-Wechsel testen
3. Component-Interaktionen verifizieren

## Technical Decisions

### CSS Architecture
**Entscheidung**: Verwendung von CSS-Variablen mit @layer base
**Begründung**: Bessere Spezifität und einfachere Wartung
**Alternative**: Inline-Styles (abgelehnt wegen Wartbarkeit)

### Theme Provider
**Entscheidung**: next-themes mit class-Attribut
**Begründung**: Standard-Ansatz für Next.js Anwendungen
**Alternative**: Custom Theme-System (abgelehnt wegen Komplexität)

### Tailwind Configuration
**Entscheidung**: Bereinigung der Plugin-Liste
**Begründung**: Veraltete Plugins können Konflikte verursachen
**Alternative**: Komplette Neukonfiguration (abgelehnt wegen Aufwand)