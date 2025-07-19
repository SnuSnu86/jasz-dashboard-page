"use client"

import * as React from "react"
import {
  AudioWaveform,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Users,
  Database,
  Plug,
  Phone,
  ChevronLeft
} from "lucide-react"

// Importiere die Sidebar-Stile
import "./sidebar-styles.css"

import { NavMain } from "@/components/dashboard/nav-main"
import { NavTemplates } from "@/components/dashboard/nav-templates"
import { NavUser } from "@/components/dashboard/nav-user"
import { TeamSwitcher } from "@/components/dashboard/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"

// This is sample data.
const data = {
  user: {
    name: "Johann",
    email: "johann.zimmer@ai-assistent.tech",
    avatar: "/avatars/default-avatar.jpg",
  },
  teams: [
    {
      name: "AI Assistant Technology",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "JASZ-AI",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Test.Corp",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Agents",
      url: "/dashboard/agents",
      icon: Users,
      isActive: false,
      items: [
        {
          title: "Overview",
          url: "/dashboard/agents/overview",
        },
        {
          title: "Customer Support Agent",
          url: "/dashboard/agents/customer-support",
        },
        {
          title: "Call Center Agent",
          url: "/dashboard/agents/call-center",
        },
      ],
    },
    {
      title: "RAG Knowledge Base",
      url: "/dashboard/rag",
      icon: Database,
      items: [
        {
          title: "Overview",
          url: "/dashboard/rag/overview",
        },
        {
          title: "Import",
          url: "/dashboard/rag/import",
        },
        {
          title: "Export",
          url: "/dashboard/rag/export",
        },
      ],
    },
    {
      title: "Integrations",
      url: "/dashboard/integrations",
      icon: Plug,
      items: [
        {
          title: "Overview",
          url: "/dashboard/integrations/overview",
        },
        {
          title: "Custom Integrations",
          url: "/dashboard/integrations/custom",
        },
        {
          title: "API",
          url: "/dashboard/integrations/api",
        },
        {
          title: "Third-party",
          url: "/dashboard/integrations/third-party",
        },
      ],
    },
    {
      title: "Phone numbers",
      url: "/dashboard/phone",
      icon: Phone,
      items: [
        {
          title: "Overview",
          url: "/dashboard/phone/overview",
        },
        {
          title: "Buy Phone numbers",
          url: "/dashboard/phone/buy",
        },
        {
          title: "Import your Phone number",
          url: "/dashboard/phone/import",
        },
      ],
    },
  ],
  Templates: [
    {
      name: "Medical",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Customer Support",
      url: "#",
      icon: Map,
    },
  ],
}

// Akzeptiert jetzt eine optionale className, isVisible und onToggle
export function DashboardSidebar({ 
  className, 
  isVisible = true, 
  onToggle 
}: { 
  className?: string; 
  isVisible?: boolean; 
  onToggle?: () => void;
}) {
  return (
    // Wendet die className direkt auf den SidebarProvider und alle inneren Komponenten an
    <div className={className}> {/* Wrapper-Div mit Dashboard-Theme-Klasse */}
      <SidebarProvider>
        {/* Use theme-based border color */}
        <Sidebar 
          collapsible="icon" 
          className={`bg-transparent border-r border-border ${!isVisible ? 'sidebar-collapsed' : 'sidebar-expanded'}`}
        >
          <SidebarHeader>
            {/* Schließen-Button für die Sidebar mit onToggle-Handler */}
            <SidebarTrigger 
              className="ml-auto mr-1 h-8 w-8 hover:bg-accent hover:text-accent-foreground" 
              onClick={onToggle}
            />
              {/* Header mit Team-Switcher */}
              <div className="flex items-center justify-between mb-2">
                <TeamSwitcher teams={data.teams} />
              </div>
            
            {/* Dashboard-Link mit blau-türkisem Hintergrund */}
            <a 
              href="/dashboard" 
              className="dashboard-link flex items-center gap-3 px-4 py-4 rounded-md bg-[#4b5b63] hover:bg-[#7dd3fc]/20 text-white transition-colors">
              <GalleryVerticalEnd className="h-5 w-5" />
              <span className="text-foreground">Dashboard</span>
            </a>
          </SidebarHeader>
          <SidebarContent>
            <NavMain items={data.navMain} />
            <NavTemplates templates={data.Templates} />
          </SidebarContent>
          <SidebarFooter>
            <NavUser user={data.user} />
          </SidebarFooter>
        </Sidebar>
      </SidebarProvider>
    </div>
  )
}

// Diese Beispielfunktion wird nur für Testzwecke verwendet
function DashboardPageExample() {
  return (
    <main className="flex min-h-screen bg-black text-white">
      <DashboardSidebar />
    </main>
  )
}
