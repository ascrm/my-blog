"use client";

import React from "react";

interface BackgroundProps {
  mousePos: { x: number; y: number };
  isDark: boolean;
}

export function Background({ mousePos, isDark }: BackgroundProps) {
  // 使用蓝色聚光灯效果 (RGB: 59, 130, 246 - blue)
  const spotlightColor = isDark ? "rgba(59, 130, 246, 0.12)" : "rgba(59, 130, 246, 0.04)";

  return (
    <>
      {/* 鼠标跟随聚光灯效果 */}
      <div
        className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-500"
        style={{
          background: `radial-gradient(800px circle at ${mousePos.x}px ${mousePos.y}px, ${spotlightColor}, transparent 80%)`,
        }}
      />
    </>
  );
}
