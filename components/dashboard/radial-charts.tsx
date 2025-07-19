"use client"

import * as React from "react"
import { TrendingUp } from "lucide-react"
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ChartConfig, ChartContainer } from "@/components/ui/chart"
// Daten mit den Farben aus unserer Farbpalette
const baseChartData = [
  { browser: "safari", visitors: 200, fill: "#0284c7" }, // Mittleres Blau
]

// Die blau-türkise Farbpalette aus dem Projekt verwenden
const chartConfig = {
  visitors: {
    label: "Besucher",
    color: "#0284c7", // Standardfarbe hinzufügen
  },
  safari: {
    label: "Browser",
    color: "#0284c7", // Mittleres Blau
  },
} satisfies ChartConfig

// Zeitraum-Typ für die Komponente
type TimeRange = "today" | "lastWeek" | "lastMonth";

// Props-Interface für die Komponente
interface RadialChartProps {
  timeRange?: TimeRange;
  agentId?: string;
}

export function Component({ timeRange = "today", agentId = "all" }: RadialChartProps) {
  // Titel basierend auf dem ausgewählten Zeitraum anpassen
  const timeRangeTitle = React.useMemo(() => {
    switch (timeRange) {
      case "today":
        return "Today";
      case "lastWeek":
        return "Last Week";
      case "lastMonth":
        return "Last Month";
      default:
        return "Today";
    }
  }, [timeRange])
  
  // Daten basierend auf dem ausgewählten Agent anpassen
  const chartData = React.useMemo(() => {
    // Verschiedene Werte für verschiedene Agents
    const multiplier = 
      agentId === "all" ? 1 :
      agentId === "customer-support" ? 0.85 :
      agentId === "sales" ? 1.25 :
      agentId === "technical" ? 0.7 : 1;
    
    return baseChartData.map(item => ({
      ...item,
      visitors: Math.round(item.visitors * multiplier)
    }));
  }, [agentId])
  
  // Trend-Text basierend auf dem ausgewählten Agent
  const trendText = React.useMemo(() => {
    switch (agentId) {
      case "all":
        return "+5.2%";
      case "customer-support":
        return "+3.8%";
      case "sales":
        return "+7.3%";
      case "technical":
        return "-1.5%";
      default:
        return "+5.2%";
    }
  }, [agentId])
  
  return (
    <Card className="flex flex-col bg-transparent border-1 shadow-none bg-muted/30" style={{ height: '100%', maxHeight: '400px' }}>
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-foreground">
          {agentId === "all" ? "Minutes Used - All Agents" : 
           agentId === "customer-support" ? "Minutes Used - Customer Support" :
           agentId === "sales" ? "Minutes Used - Sales" :
           agentId === "technical" ? "Minutes Used - Technical Support" : "Minutes Used"}
        </CardTitle>
        <CardDescription className="text-muted-foreground">{timeRangeTitle}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        {/* Zusätzliches Styling für transparenten Hintergrund */}
        <style jsx global>{`
          .recharts-wrapper,
          .recharts-surface {
            background-color: transparent !important;
          }
          
          .recharts-polar-grid-concentric-polygon {
            stroke: transparent;
          }
          
          .recharts-radial-bar-background-sector {
            fill: rgba(0, 0, 0, 0.1) !important;
          }
        `}</style>
        <ChartContainer
          config={chartConfig}
          className="mx-auto"
          style={{ height: '200px', width: '100%' }}
        >
          <RadialBarChart
            data={chartData}
            startAngle={0}
            endAngle={250}
            innerRadius={80}
            outerRadius={110}
          >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              className="first:fill-muted last:fill-background"
              polarRadius={[86, 74]}
            />
            <RadialBar dataKey="visitors" background cornerRadius={10} />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-4xl font-bold"
                        >
                          {chartData[0].visitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Minutes
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm bg-transparent">
        <div className="flex items-center gap-2 font-medium leading-none text-foreground">
          Trend compare to last month: {trendText} <TrendingUp className={`h-4 w-4 ${trendText.startsWith('-') ? 'text-red-500 rotate-180' : 'text-green-500'}`} />
        </div>
        <div className="leading-none text-muted-foreground">
          Show total minutes used for selected agent and time range
        </div>
      </CardFooter>
    </Card>
  )
}
