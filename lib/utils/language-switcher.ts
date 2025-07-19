/**
 * Language-Switcher für JASZ-AI
 * 
 * Dieses Modul bietet Funktionen zum Umschalten zwischen Deutsch und Englisch.
 * Es speichert die Sprachpräferenz des Benutzers im localStorage und ermöglicht
 * den Zugriff auf die aktuelle Sprache.
 */

export type Language = 'de' | 'en';

// Schlüssel für localStorage
const LANGUAGE_STORAGE_KEY = 'jasz-language';

/**
 * Gibt die aktuelle Sprache zurück
 * 
 * @returns {Language} Die aktuelle Sprache ('de' oder 'en')
 */
export function getLanguage(): Language {
  // Wenn im Browser ausgeführt
  if (typeof window !== 'undefined') {
    const storedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY) as Language | null;
    return storedLanguage || getBrowserLanguage();
  }
  
  // Standardwert für SSR
  return 'de';
}

/**
 * Ermittelt die Browsersprache des Benutzers
 * 
 * @returns {Language} Die erkannte Browsersprache ('de' oder 'en')
 */
function getBrowserLanguage(): Language {
  if (typeof window === 'undefined') return 'de';
  
  const browserLang = navigator.language.toLowerCase();
  return browserLang.startsWith('de') ? 'de' : 'en';
}

/**
 * Setzt die Sprache und speichert sie im localStorage
 * 
 * @param {Language} language - Die zu setzende Sprache
 */
export function setLanguage(language: Language): void {
  if (typeof window === 'undefined') return;

  // Sprache im localStorage speichern
  localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  
  // Event auslösen, damit andere Komponenten reagieren können
  window.dispatchEvent(new CustomEvent('language-change', { detail: language }));
}

/**
 * Wechselt zwischen Deutsch und Englisch
 */
export function toggleLanguage(): void {
  const currentLanguage = getLanguage();
  setLanguage(currentLanguage === 'de' ? 'en' : 'de');
} 