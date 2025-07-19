"use client"

import * as React from "react"
import { DisplayCardsAnimated } from "@/components/ui/animated-cards"
import { Component as PieCharts } from "@/components/dashboard/circle-charts"
import { DashboardHeader } from "@/components/dashboard/header"
import { Component as PieChart } from "@/components/dashboard/pie-chart"
import { Component as RadialCharts } from "@/components/dashboard/radial-charts"
import { AnimatedGradientDashboard } from "@/components/dashboard-animated-kpi"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select"

// Zeitraum-Optionen für das Dropdown-Menü
type TimeRange = "today" | "lastWeek" | "lastMonth";

// Agent-Typ für das Dropdown-Menü
interface Agent {
  id: string;
  name: string;
}

// Beispiel-Agents für das Dropdown-Menü
const agents: Agent[] = [
  { id: "all", name: "All" },
  { id: "customer-support", name: "Customer Support" },
  { id: "sales", name: "Sales" },
  { id: "technical", name: "Technical Support" },
];

// Diese Seite wird vom DashboardLayout umhüllt
export default function DashboardPage() {
  // State für den ausgewählten Zeitraum
  const [timeRange, setTimeRange] = React.useState<TimeRange>("today")
  
  // State für den ausgewählten Agent
  const [selectedAgent, setSelectedAgent] = React.useState<string>("all")
  
  // Funktion zum Aktualisieren des Zeitraums
  const handleTimeRangeChange = (value: string) => {
    setTimeRange(value as TimeRange);
  }
  
  // Funktion zum Aktualisieren des ausgewählten Agents
  const handleAgentChange = (value: string) => {
    setSelectedAgent(value);
  }
  
  // Nur der spezifische Inhalt für /dashboard
  return (
    // Wrapper mit voller Breite und Abstand
    <div className="w-full">
      {/* Header mit Klasse für korrekte Positionierung */}
      <div className="dashboard-header">
        <DashboardHeader />
      </div>
      
      {/* Filter-Bereich */}
      <div className="pl-4 pr-4 mt-4">
        {/* Flexbox-Container für beide Dropdown-Menüs */}
        <div className="flex items-center flex-wrap gap-4">
          {/* Zeitraum-Auswahl */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-foreground">Time Range:</span>
            <Select value={timeRange} onValueChange={handleTimeRangeChange}>
              <SelectTrigger className="h-8 w-[150px]">
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="lastWeek">Last Week</SelectItem>
                <SelectItem value="lastMonth">Last Month</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Agent-Auswahl */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-foreground">Agent:</span>
            <Select value={selectedAgent} onValueChange={handleAgentChange}>
              <SelectTrigger className="h-8 w-[150px]">
                <SelectValue placeholder="Select an agent" />
              </SelectTrigger>
              <SelectContent>
                {agents.map((agent) => (
                  <SelectItem key={agent.id} value={agent.id}>
                    {agent.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      
      {/* Inhalt mit voller Breite und linksbündig */}
      <div className="w-full pl-4 pr-4 mt-8">
        {/* Alle drei Charts nebeneinander in einem Grid mit fester Höhe */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8" style={{ height: '420px' }}>
          {/* Kreisdiagramm mit fester Höhe */}
          <div style={{ height: '420px', maxHeight: '420px', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: '100%' }}>
              <RadialCharts timeRange={timeRange} agentId={selectedAgent} />
            </div>
          </div>
          
          {/* Radial Diagramm mit fester Höhe */}
          <div style={{ height: '420px', maxHeight: '420px', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: '100%' }}>
              <PieCharts timeRange={timeRange} agentId={selectedAgent} />
            </div>
          </div>
          
          {/* Pie Chart mit fester Höhe */}
          <div style={{ height: '420px', maxHeight: '420px', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: '100%' }}>
              <PieChart timeRange={timeRange} agentId={selectedAgent} />
            </div>
          </div>
        </div>
        
        {/* Animierte Karten */}
        <div className="w-full space-y-8">
          <AnimatedGradientDashboard />
        </div>
      </div>
    </div>
  );
}
