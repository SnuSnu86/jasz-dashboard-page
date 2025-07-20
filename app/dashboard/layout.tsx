"use client";

import * as React from "react";
import { DashboardSidebar } from "../../components/dashboard/sidebar";
import styles from "../dashboard-theme.module.css";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarVisible, setSidebarVisible] = React.useState(true);
  
  React.useEffect(() => {
    document.documentElement.classList.add('dashboard-page');
    
    if (sidebarVisible) {
      document.documentElement.classList.remove('sidebar-collapsed');
    } else {
      document.documentElement.classList.add('sidebar-collapsed');
    }
    
    return () => {
      document.documentElement.classList.remove('dashboard-page');
      document.documentElement.classList.remove('sidebar-collapsed');
    };
  }, [sidebarVisible]);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <div className={`dashboard-theme ${styles.dashboardTheme} min-h-screen bg-background text-foreground`}>
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <div className={`${styles.dashboardTheme} transition-all duration-300 ease-in-out ${sidebarVisible ? 'w-64' : 'w-16'}`}>
          <DashboardSidebar 
            className={styles.dashboardTheme} 
            isVisible={sidebarVisible} 
            onToggle={toggleSidebar} 
          />
        </div>

        {/* Main Content */}
        <div className={`flex-1 ${styles.dashboardTheme} transition-all duration-300 ease-in-out`}>
          <main className="p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}