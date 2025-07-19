"use client"

import React from "react"
import { motion } from "framer-motion"
import { AnimatedGradient } from "@/components/ui/animated-gradient-with-svg"

interface BentoCardProps {
  title: string
  value: string | number
  subtitle?: string
  colors: string[]
  delay: number
}

// Statische Variante für Subtitles, ohne Animation-Overhead
const StaticText: React.FC<{children: React.ReactNode; className: string}> = React.memo(({ 
  children, 
  className
}) => {
  return <p className={className}>{children}</p>;
});

// Optimierte Variante für Titel und Werte - reduzierte Animation
const OptimizedText: React.FC<{children: React.ReactNode; className: string; initial?: any; animate?: any; variants?: any}> = React.memo(({ 
  children, 
  className, 
  initial, 
  animate, 
  variants 
}) => {
  return (
    <motion.p
      className={className}
      initial={initial || { opacity: 0 }}
      animate={animate || { opacity: 1 }}
      transition={{ duration: 0.3 }}
      layout={false}
    >
      {children}
    </motion.p>
  );
});

const BentoCard: React.FC<BentoCardProps> = ({
  title,
  value,
  subtitle,
  colors,
  delay,
}) => {
  // Vereinfachte Animation - kein Container mehr mit komplexen Varianten
  return (
    <motion.div
      className="relative overflow-hidden h-full bg-background dark:bg-background/50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay }}
      layout={false}
    >
      <AnimatedGradient colors={colors} speed={0.05} blur="medium" />
      
      {/* Statischer Container ohne Motion-Wrapper */}
      <div className="relative z-10 p-2 sm:p-3 md:p-4 text-foreground backdrop-blur-sm">
        <OptimizedText 
          className="text-xs sm:text-sm font-medium text-foreground"
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {title}
        </OptimizedText>
        
        <OptimizedText
          className="text-xl sm:text-2xl md:text-3xl font-medium mb-1 text-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {value}
        </OptimizedText>
        
        {/* Statischer Subtitle ohne Animation */}
        {subtitle && (
          <StaticText className="text-xs text-foreground/80">
            {subtitle}
          </StaticText>
        )}
      </div>
    </motion.div>
  )
}

// Verwende React.memo und useCallback für optimierte Rendering-Performance
const AnimatedGradientDashboard: React.FC = React.memo(() => {
  // Blau-türkise Farbpalette aus dem Projekt verwendenz - statisch definiert, kein Neu-Rendering
  const blueColors = React.useMemo(() => ["#7dd3fc", "#0284c7", "#082f49"], []);
  const mixedColors = React.useMemo(() => ["#0284c7", "#083344", "#0369a1"], []);
  
  // BentoCard-Komponenten vorberechnen, um Render-Arbeit zu reduzieren
  const scriptCard = React.useMemo(() => (
    <BentoCard
      title="Script adherence"
      value="62%"
      subtitle="Percentage of calls where the assistant adheres to the script"
      colors={blueColors}
      delay={0.05}
    />
  ), [blueColors]);
  
  const sentimentCard = React.useMemo(() => (
    <BentoCard
      title="Positive Sentiment"
      value="62%"
      subtitle="Percentage of calls where the assistant has a positive sentiment"
      colors={mixedColors}
      delay={0.1}
    />
  ), [mixedColors]);
  
  const durationCard = React.useMemo(() => (
    <BentoCard
      title="Average Call Duration"
      value="2.3 min"
      subtitle="0.5% increase from last week"
      colors={blueColors}
      delay={0.15}
    />
  ), [blueColors]);
  
  const goalCard = React.useMemo(() => (
    <BentoCard
      title="Goal achievement"
      value="8%"
      subtitle="Percentage of calls where the assistant achieves the call objective specified in its prompt"
      colors={mixedColors}
      delay={0.2}
    />
  ), [mixedColors]);
  
  const dropOffCard = React.useMemo(() => (
    <BentoCard
      title="Call Drop-off Rate"
      value="40%"
      subtitle="Percentage of calls ending prematurely"
      colors={blueColors}
      delay={0.25}
    />
  ), [blueColors]);
  
  return (
    <div className="w-full bg-background">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        <div className="md:col-span-2 h-[120px]">
          {scriptCard}
        </div>
        <div className="h-[120px]">
          {sentimentCard}
        </div>
        <div className="h-[120px]">
          {durationCard}
        </div>
        <div className="md:col-span-2 h-[120px]">
          {goalCard}
        </div>
        <div className="md:col-span-3 h-[120px]">
          {dropOffCard}
        </div>
      </div>
    </div>
  )
})
export { AnimatedGradientDashboard }