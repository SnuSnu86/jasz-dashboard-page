/**
 * Theme-Switcher für JASZ-AI
 * 
 * Dieses Modul bietet Funktionen zum Umschalten zwischen Light-, Dark- und System-Theme.
 * Es speichert die Präferenz des Benutzers im localStorage und wendet das Theme entsprechend an.
 */

export type Theme = 'light' | 'dark' | 'system';

// Schlüssel für localStorage
const THEME_STORAGE_KEY = 'jasz-theme';

/**
 * Gibt das aktuelle Theme zurück
 */
export function getTheme(): Theme {
  // Wenn im Browser ausgeführt
  if (typeof window !== 'undefined') {
    const storedTheme = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;
    return storedTheme || 'system';
  }
  
  // Standardwert für SSR
  return 'system';
}

/**
 * Setzt das Theme und speichert es im localStorage
 */
export function setTheme(theme: Theme): void {
  if (typeof window === 'undefined') return;

  // Theme im localStorage speichern
  localStorage.setItem(THEME_STORAGE_KEY, theme);
  
  // Theme anwenden
  applyTheme(theme);
  
  // Event auslösen, damit andere Komponenten reagieren können
  window.dispatchEvent(new CustomEvent('theme-change', { detail: theme }));
}

/**
 * Wendet das Theme auf das HTML-Element an
 */
export function applyTheme(theme: Theme): void {
  if (typeof window === 'undefined') return;
  
  const root = window.document.documentElement;
  const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  
  // Dark-Klasse hinzufügen oder entfernen
  root.classList.toggle('dark', isDark);
  
  // Meta-Tag für Theme-Color aktualisieren
  const metaThemeColor = document.querySelector('meta[name="theme-color"]');
  if (metaThemeColor) {
    metaThemeColor.setAttribute('content', isDark ? '#09090b' : '#ffffff');
  }
}

/**
 * Initialisiert den Theme-Switcher
 * Sollte beim App-Start aufgerufen werden
 */
export function initializeTheme(): void {
  if (typeof window === 'undefined') return;
  
  // Gespeichertes Theme abrufen und anwenden
  const theme = getTheme();
  applyTheme(theme);
  
  // Auf Änderungen des System-Themes reagieren
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  const handleChange = () => {
    if (getTheme() === 'system') {
      applyTheme('system');
    }
  };
  
  // Event-Listener für Änderungen des System-Themes
  mediaQuery.addEventListener('change', handleChange);
}

/**
 * Wechselt zum nächsten Theme in der Reihenfolge: light -> dark -> system -> light
 */
export function toggleTheme(): void {
  const currentTheme = getTheme();
  
  switch (currentTheme) {
    case 'light':
      setTheme('dark');
      break;
    case 'dark':
      setTheme('system');
      break;
    case 'system':
    default:
      setTheme('light');
      break;
  }
}