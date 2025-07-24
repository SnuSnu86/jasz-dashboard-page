"use client"

import React, { useEffect, useRef } from "react"
import { motion } from "framer-motion"

// Typen für die AnimatedGradient-Komponente
interface AnimatedGradientProps {
  colors: string[]
  speed?: number
  blur?: "none" | "light" | "medium" | "heavy"
  opacity?: number
  className?: string
}

/**
 * AnimatedGradient Komponente
 * 
 * Erzeugt einen animierten Farbverlauf mit SVG-Filtern für verschiedene Blur-Effekte.
 * Die Komponente verwendet Framer Motion für flüssige Animationen und ist für
 * Performance optimiert.
 * 
 * @param colors - Array von Farben für den Gradienten (z.B. ["#7dd3fc", "#0284c7", "#082f49"])
 * @param speed - Geschwindigkeit der Animation (Standard: 0.05)
 * @param blur - Stärke des Blur-Effekts: "none", "light", "medium", "heavy" (Standard: "medium")
 * @param opacity - Deckkraft des Gradienten (Standard: 0.7)
 * @param className - Zusätzliche CSS-Klassen
 */
export const AnimatedGradient: React.FC<AnimatedGradientProps> = ({
  colors,
  speed = 0.05,
  blur = "medium",
  opacity = 0.7,
  className = "",
}) => {
  // Stabile ID für den Filter basierend auf den Farben und der Blur-Stärke
  const colorHash = colors.join('-').replace(/#/g, '').substring(0, 8)
  const filterId = useRef(`blur-filter-${colorHash}-${blur}`).current
  
  // Blur-Stärke basierend auf dem gewählten Level
  const blurValue = {
    none: 0,
    light: 20,
    medium: 40,
    heavy: 80,
  }[blur]

  // Animation für den Gradienten
  const variants = {
    animate: {
      backgroundPosition: ["0% 0%", "100% 100%"],
      transition: {
        duration: 10 / speed,
        ease: "linear",
        repeat: Infinity,
        repeatType: "reverse" as const,
      },
    },
  }

  // Farbverlauf als CSS-Wert
  const gradientColors = colors.join(", ")

  return (
    <>
      {/* SVG-Filter für den Blur-Effekt */}
      <svg
        width="0"
        height="0"
        style={{ position: "absolute", visibility: "hidden" }}
        aria-hidden="true"
      >
        <filter id={filterId}>
          <feGaussianBlur in="SourceGraphic" stdDeviation={blurValue} />
        </filter>
      </svg>

      {/* Animierter Gradient */}
      <motion.div
        className={`absolute inset-0 z-0 ${className}`}
        style={{
          background: `linear-gradient(45deg, ${gradientColors})`,
          backgroundSize: "200% 200%",
          opacity,
          filter: blur !== "none" ? `url(#${filterId})` : undefined,
        }}
        variants={variants}
        animate="animate"
      />
    </>
  )
}
