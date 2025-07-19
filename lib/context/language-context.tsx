'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { Language, getLanguage, setLanguage } from '@/lib/utils/language-switcher'

/**
 * Interface für den Language-Context
 */
interface LanguageContextType {
  /** Aktuelle Sprache */
  language: Language
  /** Funktion zum Ändern der Sprache */
  changeLanguage: (lang: Language) => void
  /** Übersetzungsfunktion */
  t: (key: string) => string
  /** Gibt an, ob der Provider initialisiert wurde */
  isInitialized: boolean
}

/**
 * Übersetzungen für Deutsch und Englisch
 * 
 * // AI-CONTEXT: Diese Übersetzungen werden für die Benutzeroberfläche verwendet.
 * Neue Übersetzungsschlüssel sollten hier hinzugefügt werden.
 * 
 * Struktur:
 * {
 *   de: { 'schlüssel': 'Deutsche Übersetzung' },
 *   en: { 'schlüssel': 'Englische Übersetzung' }
 * }
 */
const translations: Record<Language, Record<string, string>> = {
  de: {
    // Navigation
    'nav.home': 'Startseite',
    'nav.solution': 'Lösung',
    'nav.pricing': 'Preise',
    'nav.about': 'Über uns',
    
    // Buttons
    'button.login': 'Anmelden',
    'button.signup': 'Registrieren',
    'button.getStarted': 'Starten',
    
    // Theme
    'theme.toggle': 'Design wechseln',
    'theme.light': 'Helles Design',
    'theme.dark': 'Dunkles Design',
    'theme.system': 'System-Design',
    
    // Language
    'language.toggle': 'Sprache wechseln',
    'language.de': 'Deutsch',
    'language.en': 'Englisch',
    'language.current': 'Aktuelle Sprache',
    'language.select': 'Sprache auswählen',
    
    // Common
    'common.loading': 'Wird geladen...',
    'common.error': 'Ein Fehler ist aufgetreten',
    'common.success': 'Erfolgreich',
    'common.cancel': 'Abbrechen',
    'common.save': 'Speichern',
    'common.delete': 'Löschen',
    'common.edit': 'Bearbeiten',
    'common.search': 'Suchen',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.solution': 'Solution',
    'nav.pricing': 'Pricing',
    'nav.about': 'About',
    
    // Buttons
    'button.login': 'Login',
    'button.signup': 'Sign Up',
    'button.getStarted': 'Get Started',
    
    // Theme
    'theme.toggle': 'Toggle theme',
    'theme.light': 'Light theme',
    'theme.dark': 'Dark theme',
    'theme.system': 'System theme',
    
    // Language
    'language.toggle': 'Toggle language',
    'language.de': 'German',
    'language.en': 'English',
    'language.current': 'Current language',
    'language.select': 'Select language',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'An error occurred',
    'common.success': 'Success',
    'common.cancel': 'Cancel',
    'common.save': 'Save',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.search': 'Search',
  }
}

// Standardwerte für den Context
const defaultContextValue: LanguageContextType = {
  language: 'de',
  changeLanguage: () => {},
  t: (key) => key,
  isInitialized: false
}

// Context erstellen
const LanguageContext = createContext<LanguageContextType>(defaultContextValue)

/**
 * Language-Provider-Komponente
 * 
 * Diese Komponente stellt den Language-Context für die gesamte Anwendung bereit.
 * Sie initialisiert die Sprache und bietet Funktionen zum Ändern der Sprache und
 * zum Übersetzen von Texten.
 * 
 * Verwendung:
 * ```tsx
 * // In der Root-Komponente (z.B. layout.tsx)
 * <LanguageProvider>
 *   {children}
 * </LanguageProvider>
 * 
 * // In einer Komponente
 * const { language, t } = useLanguage();
 * return <p>{t('schlüssel')}</p>;
 * ```
 * 
 * @param {object} props - Komponenten-Props
 * @param {React.ReactNode} props.children - Kind-Komponenten
 */
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Initialisiere mit einer Standardsprache, die später aktualisiert wird
  const [language, setCurrentLanguage] = useState<Language>('de')
  const [isInitialized, setIsInitialized] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  // Markiere die Komponente als gemountet, um Client-seitiges Rendering zu erkennen
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Initialisiere die Sprache beim ersten Rendern im Client
  useEffect(() => {
    if (isMounted) {
      try {
        // Initialen Sprachzustand laden
        const initialLanguage = getLanguage()
        setCurrentLanguage(initialLanguage)
        setIsInitialized(true)
        
        // Debug-Ausgabe
        console.log(`Sprache initialisiert: ${initialLanguage}`)

        // Event-Listener für Sprachänderungen
        const handleLanguageChange = (e: CustomEvent<Language>) => {
          console.log(`Sprachänderung erkannt: ${e.detail}`)
          setCurrentLanguage(e.detail)
        }

        window.addEventListener('language-change', handleLanguageChange as EventListener)
        
        return () => {
          window.removeEventListener('language-change', handleLanguageChange as EventListener)
        }
      } catch (error) {
        console.error('Fehler bei der Initialisierung der Sprache:', error)
        // Fallback auf Standardsprache
        setCurrentLanguage('de')
        setIsInitialized(true)
      }
    }
  }, [isMounted])

  /**
   * Ändert die aktuelle Sprache
   * 
   * @param {Language} lang - Die neue Sprache
   */
  const changeLanguage = (lang: Language) => {
    if (!isMounted) return
    
    console.log(`Sprache wird geändert auf: ${lang}`)
    setLanguage(lang)
    setCurrentLanguage(lang) // Aktualisiere den State direkt für sofortige Reaktion
  }

  /**
   * Übersetzt einen Schlüssel in die aktuelle Sprache
   * 
   * @param {string} key - Der Übersetzungsschlüssel
   * @returns {string} Die übersetzte Zeichenkette
   */
  const t = (key: string): string => {
    // Wenn nicht initialisiert oder Schlüssel nicht existiert, gib den Schlüssel zurück
    if (!isInitialized || !translations[language] || !translations[language][key]) {
      if (isInitialized && translations[language] && !translations[language][key]) {
        console.warn(`Übersetzungsschlüssel nicht gefunden: ${key}`)
      }
      return key
    }
    return translations[language][key]
  }

  // Erstelle den Context-Wert
  const contextValue: LanguageContextType = {
    language,
    changeLanguage,
    t,
    isInitialized
  }

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  )
}

/**
 * Hook zum Zugriff auf den Language-Context
 * 
 * Dieser Hook ermöglicht den Zugriff auf die aktuelle Sprache und die Übersetzungsfunktion
 * in jeder Komponente innerhalb des LanguageProvider.
 * 
 * Verwendung:
 * ```tsx
 * const { language, t } = useLanguage();
 * return (
 *   <div>
 *     <p>Aktuelle Sprache: {language}</p>
 *     <p>{t('nav.home')}</p>
 *   </div>
 * );
 * ```
 * 
 * @returns {LanguageContextType} Der Language-Context mit der aktuellen Sprache und Übersetzungsfunktion
 * @throws {Error} Wenn der Hook außerhalb eines LanguageProvider verwendet wird
 */
export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext)
  
  // Wenn der Context undefined ist, wurde der Hook außerhalb eines LanguageProvider verwendet
  if (context === defaultContextValue) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  
  return context
} 