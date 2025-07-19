import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Accessibility, ZoomIn, ZoomOut, Type, MousePointer2 } from 'lucide-react';

/**
 * AccessibilityMenu Komponente
 * 
 * Bietet Barrierefreiheit-Funktionen wie Schriftgrößenanpassung,
 * Kontrastverstärkung und Fokus-Hervorhebung.
 */
export function AccessibilityMenu() {
  // Zustände für verschiedene Barrierefreiheit-Einstellungen
  const [fontSize, setFontSize] = useState(100);
  const [highContrast, setHighContrast] = useState(false);
  const [focusVisible, setFocusVisible] = useState(false);
  
  // Schriftgröße anpassen
  const adjustFontSize = (increment: number) => {
    const newSize = Math.max(80, Math.min(150, fontSize + increment));
    setFontSize(newSize);
    document.documentElement.style.fontSize = `${newSize}%`;
  };
  
  // Kontrast umschalten
  const toggleHighContrast = () => {
    const newValue = !highContrast;
    setHighContrast(newValue);
    document.documentElement.classList.toggle('high-contrast', newValue);
  };
  
  // Fokus-Hervorhebung umschalten
  const toggleFocusVisible = () => {
    const newValue = !focusVisible;
    setFocusVisible(newValue);
    document.documentElement.classList.toggle('focus-visible', newValue);
  };
  
  // Einstellungen beim Laden der Komponente initialisieren
  useEffect(() => {
    // Gespeicherte Einstellungen abrufen
    const savedFontSize = localStorage.getItem('jasz-font-size');
    const savedHighContrast = localStorage.getItem('jasz-high-contrast') === 'true';
    const savedFocusVisible = localStorage.getItem('jasz-focus-visible') === 'true';
    
    // Einstellungen anwenden
    if (savedFontSize) {
      const size = parseInt(savedFontSize, 10);
      setFontSize(size);
      document.documentElement.style.fontSize = `${size}%`;
    }
    
    if (savedHighContrast) {
      setHighContrast(true);
      document.documentElement.classList.add('high-contrast');
    }
    
    if (savedFocusVisible) {
      setFocusVisible(true);
      document.documentElement.classList.add('focus-visible');
    }
  }, []);
  
  // Einstellungen speichern, wenn sie sich ändern
  useEffect(() => {
    localStorage.setItem('jasz-font-size', fontSize.toString());
    localStorage.setItem('jasz-high-contrast', highContrast.toString());
    localStorage.setItem('jasz-focus-visible', focusVisible.toString());
  }, [fontSize, highContrast, focusVisible]);
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-md" aria-label="Barrierefreiheit-Einstellungen">
          <Accessibility className="h-4 w-4" />
          <span className="sr-only">Barrierefreiheit-Einstellungen</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => adjustFontSize(10)}>
          <ZoomIn className="mr-2 h-4 w-4" />
          <span>Schrift vergrößern</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => adjustFontSize(-10)}>
          <ZoomOut className="mr-2 h-4 w-4" />
          <span>Schrift verkleinern</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={toggleHighContrast}>
          <Type className="mr-2 h-4 w-4" />
          <span>{highContrast ? 'Hohen Kontrast deaktivieren' : 'Hohen Kontrast aktivieren'}</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={toggleFocusVisible}>
          <MousePointer2 className="mr-2 h-4 w-4" />
          <span>{focusVisible ? 'Fokus-Hervorhebung deaktivieren' : 'Fokus-Hervorhebung aktivieren'}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/**
 * SkipToContent Komponente
 * 
 * Bietet einen Link, der es Benutzern von Screenreadern ermöglicht,
 * direkt zum Hauptinhalt zu springen.
 */
export function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-background focus:text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
    >
      Zum Hauptinhalt springen
    </a>
  );
}