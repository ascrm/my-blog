"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface BackgroundProps {
  mousePos: { x: number; y: number };
  isDark: boolean;
}

export function Background({ mousePos, isDark }: BackgroundProps) {
  const glowColor = isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.03)";
  const gridColor = isDark ? "%23ffffff" : "%23000000";

  return (
    <>
      {/* 动态光晕效果 */}
      <div
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300 opacity-50"
        style={{
          background: `radial-gradient(600px at ${mousePos.x}px ${mousePos.y}px, ${glowColor}, transparent 80%)`,
        }}
      />
    </>
  );
}
