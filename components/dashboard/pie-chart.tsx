"use client"

import * as React from "react"
import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
// Basis-Daten für die Pie-Chart mit den Farben aus dem Dashboard-Theme
const baseChartData = [
  { calls: "No Answer", visitors: 275, fill: "#0284c7" },
  { calls: "Complete", visitors: 200, fill: "#082f49" },
]

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  noAnswer: {
    label: "No Answer",
    color: "#0284c7", // #2662d9 im Dark Mode
  },
  complete: {
    label: "Complete",
    color: "#082f49", // #2eb88a im Dark Mode
  },

} satisfies ChartConfig

// Zeitraum-Typ für die Komponente
type TimeRange = "today" | "lastWeek" | "lastMonth";

// Props-Interface für die Komponente
interface PieChartProps {
  timeRange?: TimeRange;
  agentId?: string;
}

export function Component({ timeRange = "today", agentId = "all" }: PieChartProps) {
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
  
  // Gesamtbesucher berechnen
  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.visitors, 0)
  }, [chartData])

  return (
    <Card className="flex flex-col bg-muted/30 border-1 shadow-none" style={{ height: '100%', maxHeight: '400px' }}>
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-foreground">
          {agentId === "all" ? "Calls - All Agents" : 
           agentId === "customer-support" ? "Calls - Customer Support" :
           agentId === "sales" ? "Calls - Sales" :
           agentId === "technical" ? "Calls - Technical Support" : "Calls"}
        </CardTitle>
        <CardDescription className="text-muted-foreground">{timeRangeTitle}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto w-full"
          style={{ height: '200px', width: '100%', maxWidth: '300px' }}
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="calls"
              innerRadius={60}
              strokeWidth={5}
            >
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
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Calls
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm bg-transparent">
        <div className="flex items-center gap-2 font-medium leading-none text-foreground">
          Trend compare to last month: {trendText} <TrendingUp className={`h-4 w-4 ${trendText.startsWith('-') ? 'text-red-500 rotate-180' : 'text-green-500'}`} />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing calls for selected agent and time range
        </div>
      </CardFooter>
    </Card>
  )
}
