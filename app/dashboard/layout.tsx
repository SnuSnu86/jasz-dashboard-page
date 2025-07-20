"use client"; // Client-Komponente für dynamische Klassenanwendung

import * as React from "react";
import { Menu } from "lucide-react";
import { DashboardSidebar } from "../../components/dashboard/sidebar";
import styles from "../dashboard-theme.module.css";
import { Button } from "@/components/ui/button";

// Dieses Layout wird alle Seiten unter /dashboard umhüllen
export default function DashboardLayout({
  children, // Der Inhalt der spezifischen page.tsx wird hier übergeben
}: {
  children: React.ReactNode;
}) {
  // State für die Sichtbarkeit der Sidebar
  const [sidebarVisible, setSidebarVisible] = React.useState(true);
  
  // Wir verwenden useEffect, um sicherzustellen, dass das Theme auf alle Komponenten angewendet wird
  React.useEffect(() => {
    // Wir fügen eine Klasse zum HTML-Element hinzu, um das Theme global zu überschreiben
    document.documentElement.classList.add('dashboard-page');
    
    // Zusätzlich fügen wir eine Klasse hinzu, die den Status der Sidebar anzeigt
    if (sidebarVisible) {
      document.documentElement.classList.remove('sidebar-collapsed');
    } else {
      document.documentElement.classList.add('sidebar-collapsed');
    }
    
    // Cleanup-Funktion zum Entfernen der Klassen, wenn die Komponente unmounted wird
    return () => {
      document.documentElement.classList.remove('dashboard-page');
      document.documentElement.classList.remove('sidebar-collapsed');
    };
  }, [sidebarVisible]); // Abhängigkeit von sidebarVisible hinzugefügt

  // Funktion zum Umschalten der Sidebar-Sichtbarkeit
  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    // Kombiniere reguläre Klasse und CSS-Modul für höchste Spezifität
    // Verwende data-theme="dashboard" für zusätzliche CSS-Selektoren
    <main 
      className={`dashboard-theme ${styles.dashboardTheme} flex min-h-screen bg-background text-foreground`}
      data-theme="dashboard"
    >
      {/* Sidebar-Container mit fester Breite und fester Position */}
      <div 
        className={`${styles.dashboardTheme} sidebar-container fixed top-0 left-0 h-full z-10`} 
        style={{ width: sidebarVisible ? '16rem' : '3rem', transition: 'width 0.3s ease-in-out' }}
      >
        <DashboardSidebar 
          className={styles.dashboardTheme} 
          isVisible={sidebarVisible} 
          onToggle={toggleSidebar} 
        />
      </div>

      {/* Inhalt-Container mit flexibler Breite und dynamischem Abstand zur Sidebar */}
      <div 
        className={`flex-1 ${styles.dashboardTheme} content-container`} 
        style={{ 
          marginLeft: sidebarVisible ? '16rem' : '3rem', 
          width: `calc(100% - ${sidebarVisible ? '16rem' : '3rem'})`,
          transition: 'margin-left 0.3s ease-in-out, width 0.3s ease-in-out'
        }}
      >
        {/* Toggle-Button für mobile Ansicht */}
        <div className="p-4">
          <Button 
            variant="outline" 
            size="icon" 
            className="md:hidden" 
            onClick={toggleSidebar}
          >
            <Menu className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Eigentlicher Inhalt */}
        <div className="p-4">
          {children}
        </div>
      </div>
    </main>
  );
}