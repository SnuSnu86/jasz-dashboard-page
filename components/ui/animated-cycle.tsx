"use client";

import React from 'react';
import { cn } from "@/lib/utils";

interface AnimatedCycleProps {
  /** Größe der Kugel in Pixeln (Durchmesser) */
  size?: number;
  /** Zusätzliche Tailwind-Klassen */
  className?: string;
  /** Position der Komponente */
  position?: "absolute" | "relative" | "fixed";
  /** Z-Index für die gesamte Komponente */
  zIndex?: number;
  /** Animationsgeschwindigkeit in Sekunden */
  duration?: number;
}

/**
 * AnimatedCycle - Eine animierte leuchtende Kugel mit Rotation und Glow-Effekt
 * 
 * Diese Komponente erzeugt eine weiße Kugel mit farbigem Leuchteffekt drumherum,
 * die kontinuierlich rotiert. Der Effekt verwendet die Projektfarbpalette.
 */
export function AnimatedCycle({
  size = 96,
  className,
  position = "absolute",
  zIndex = 30,
  duration = 8, // langsamere Rotation für besseren visuellen Effekt
}: AnimatedCycleProps) {
  return (
    <div 
      className={cn(
        position,
        "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
        className
      )}
      style={{ width: size, height: size, zIndex }}
    >
      <div 
        className={`
          absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full
          h-full w-full bg-gradient-to-b from-[#7dd3fc] via-[#0284c7] to-[#082f49]
        `}
        style={{
          animation: `rotate ${duration}s linear infinite`,
        }}
      >
        {/* Leuchteffekt-Ebenen */}
        <span className="absolute inset-0 rounded-full bg-gradient-to-b from-[#7dd3fc] via-[#0284c7] to-[#082f49]"></span>
        <span className="absolute inset-0 rounded-full bg-gradient-to-b from-[#7dd3fc] via-[#0284c7] to-[#082f49] blur-[5px]"></span>
        <span className="absolute inset-0 rounded-full bg-gradient-to-b from-[#7dd3fc] via-[#0284c7] to-[#082f49] blur-[10px]"></span>
        <span className="absolute inset-0 rounded-full bg-gradient-to-b from-[#7dd3fc] via-[#0284c7] to-[#082f49] blur-[25px]"></span>
        <span className="absolute inset-0 rounded-full bg-gradient-to-b from-[#7dd3fc] via-[#0284c7] to-[#082f49] blur-[50px]"></span>

        {/* Weißer Kern */}
        <span 
          className="absolute rounded-full bg-white border-[5px] border-white" 
          style={{
            top: '10px',
            left: '10px',
            right: '10px',
            bottom: '10px',
          }}
        ></span>
      </div>
    </div>
  );
}

export default AnimatedCycle;
