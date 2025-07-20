import { DashboardHeader } from "@/components/dashboard/header";
import { AgentList } from "@/components/dashboard/agent-list";
import { AnimatedGradientDashboard } from "@/components/dashboard-animated-kpi";
import { Component as PieChart } from "@/components/dashboard/pie-chart";
import { Component as RadialChart } from "@/components/dashboard/radial-charts";
import { Component as CircleChart } from "@/components/dashboard/circle-charts";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <DashboardHeader />
      
      {/* KPI Section */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-foreground">Key Performance Indicators</h3>
        <AnimatedGradientDashboard />
      </div>
      
      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <PieChart />
        <RadialChart />
        <CircleChart />
      </div>
      
      {/* Agents Section */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-foreground">Your Voice Agents</h3>
        <AgentList />
      </div>
    </div>
  );
}