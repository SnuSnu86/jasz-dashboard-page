import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Moon, Sun, Laptop } from 'lucide-react';
import { getTheme, setTheme, Theme } from '@/lib/utils/theme-switcher';

/**
 * ThemeSwitcher Komponente
 * 
 * Ermöglicht dem Benutzer, zwischen Light-, Dark- und System-Theme zu wechseln.
 * Die Komponente zeigt ein Icon entsprechend dem aktuellen Theme an.
 */
export function ThemeSwitcher() {
  const [theme, setCurrentTheme] = useState<Theme>('system');
  
  // Theme beim Laden der Komponente initialisieren
  useEffect(() => {
    setCurrentTheme(getTheme());
    
    // Event-Listener für Theme-Änderungen
    const handleThemeChange = (e: CustomEvent<Theme>) => {
      setCurrentTheme(e.detail);
    };
    
    window.addEventListener('theme-change', handleThemeChange as EventListener);
    
    return () => {
      window.removeEventListener('theme-change', handleThemeChange as EventListener);
    };
  }, []);
  
  // Theme-Wechsel-Handler
  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    setCurrentTheme(newTheme);
  };

  // Return-Block für die erste ThemeSwitcher-Komponente
  return (
    <Button 
      variant="ghost" 
      size="icon" 
      className="h-9 w-9 rounded-md" 
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <Moon className="h-4 w-4" />
      ) : theme === 'light' ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Laptop className="h-4 w-4" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}

/**
 * ThemeSwitcherSimple Komponente
 * 
 * Eine vereinfachte Version des Theme-Switchers, die nur ein Icon anzeigt
 * und beim Klick zum nächsten Theme wechselt.
 */
export function ThemeSwitcherSimple() {
  const [theme, setCurrentTheme] = useState<Theme>('system');
  
  // Theme beim Laden der Komponente initialisieren
  useEffect(() => {
    setCurrentTheme(getTheme());
    
    // Event-Listener für Theme-Änderungen
    const handleThemeChange = (e: CustomEvent<Theme>) => {
      setCurrentTheme(e.detail);
    };
    
    window.addEventListener('theme-change', handleThemeChange as EventListener);
    
    return () => {
      window.removeEventListener('theme-change', handleThemeChange as EventListener);
    };
  }, []);
  
  // Theme-Wechsel-Handler
  const handleClick = () => {
    const nextTheme: Theme = theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light';
    setTheme(nextTheme);
    setCurrentTheme(nextTheme);
  };
  
  return (
    <Button 
      variant="ghost" 
      size="icon" 
      className="h-9 w-9 rounded-md" 
      onClick={handleClick}
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <Moon className="h-4 w-4" />
      ) : theme === 'light' ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Laptop className="h-4 w-4" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
