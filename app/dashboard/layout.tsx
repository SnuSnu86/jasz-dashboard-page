"use client"

import * as React from "react"
import { DashboardSidebar } from "@/components/dashboard/sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarVisible, setSidebarVisible] = React.useState(true)

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible)
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <DashboardSidebar 
        className="dashboard-theme"
        isVisible={sidebarVisible}
        onToggle={toggleSidebar}
      />
      
      {/* Main content area */}
      <main className={`flex-1 transition-all duration-300 ${
        sidebarVisible ? 'ml-64' : 'ml-16'
      }`}>
        <div className="container mx-auto p-6 max-w-none">
          {children}
        </div>
      </main>
    </div>
  )
}