import Link from "next/link"
import { Button } from "@/components/ui/button"

<<<<<<< HEAD
import * as React from "react"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
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
import { Card, CardContent } from "@/components/ui/card"

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

export default function DashboardPage() {
  const [sidebarVisible, setSidebarVisible] = React.useState(true)
  const [timeRange, setTimeRange] = React.useState<TimeRange>("today")
  const [selectedAgent, setSelectedAgent] = React.useState<string>("all")
  
  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible)
  }
  
  const handleTimeRangeChange = (value: string) => {
    setTimeRange(value as TimeRange);
  }
  
  const handleAgentChange = (value: string) => {
    setSelectedAgent(value);
  }
  
  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <DashboardSidebar 
        className="dashboard-theme"
        isVisible={sidebarVisible}
        onToggle={toggleSidebar}
      />
      
      {/* Main content area with proper responsive margins */}
      <main className={`flex-1 transition-all duration-300 ease-in-out ${
        sidebarVisible ? 'ml-64' : 'ml-16'
      }`}>
        <div className="container mx-auto p-6 max-w-none space-y-6">
          {/* Dashboard Header with proper Shadcn styling */}
          <div className="flex items-center justify-between">
            <DashboardHeader />
          </div>
          
          {/* Filter Controls with proper Card styling */}
          <Card className="border border-border bg-card">
            <CardContent className="p-4">
              <div className="flex items-center flex-wrap gap-4">
                {/* Zeitraum-Auswahl */}
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-foreground">Time Range:</span>
                  <Select value={timeRange} onValueChange={handleTimeRangeChange}>
                    <SelectTrigger className="h-9 w-[150px] border-input bg-background">
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
                    <SelectTrigger className="h-9 w-[150px] border-input bg-background">
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
            </CardContent>
          </Card>
          
          {/* Charts Grid with proper responsive design */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Radial Charts */}
            <Card className="border border-border bg-card">
              <CardContent className="p-6 h-[420px]">
                <RadialCharts timeRange={timeRange} agentId={selectedAgent} />
              </CardContent>
            </Card>
            
            {/* Circle Charts */}
            <Card className="border border-border bg-card">
              <CardContent className="p-6 h-[420px]">
                <PieCharts timeRange={timeRange} agentId={selectedAgent} />
              </CardContent>
            </Card>
            
            {/* Pie Chart */}
            <Card className="border border-border bg-card">
              <CardContent className="p-6 h-[420px]">
                <PieChart timeRange={timeRange} agentId={selectedAgent} />
              </CardContent>
            </Card>
          </div>
          
          {/* KPI Cards Section */}
          <div className="space-y-6">
            <AnimatedGradientDashboard />
          </div>
        </div>
      </main>
=======
export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold text-foreground">
          Welcome to JASZ-AI
        </h1>
        <p className="text-xl text-muted-foreground">
          AI-powered voice agent dashboard
        </p>
        <Button asChild>
          <Link href="/dashboard">
            Go to Dashboard
          </Link>
        </Button>
      </div>
>>>>>>> 61f4874390d44fe158b57a189a7bcabca73cb19a
    </div>
  )
}