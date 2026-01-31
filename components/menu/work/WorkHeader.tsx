"use client";

import React from "react";
import { useSite } from "@/components/common/SiteContext";
import { cn } from "@/lib/utils";

export function WorkHeader() {
  const { isDark, t } = useSite();

  const textSecondary = isDark ? "text-gray-400" : "text-gray-500";
  const borderColor = isDark ? "border-white/10" : "border-black/10";

  return (
    <header className="mb-32 md:mb-32 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <div className={cn("inline-block px-3 py-1 border rounded-full text-[10px] uppercase tracking-widest mb-10", borderColor)}>
        {t("全栈工程师 / 设计师", "Full-stack Engineer / Designer")}
      </div>
      <h2 className={cn("text-5xl md:text-8xl font-bold tracking-tighter mb-8 italic", textSecondary)}>
        {t("作品档案", "Projects Archive")}
      </h2>
      <p className={cn("text-xl md:text-2xl max-w-3xl leading-relaxed", textSecondary)}>
        {t(
          "这里记录了我近年来在全栈开发、系统架构以及 UI 设计方面的深度实践。每一项都代表了我对工程质量的追求。",
          "A curated collection of my work in full-stack development, architecture, and UI design. Each piece represents my pursuit of engineering excellence."
        )}
      </p>
    </header>
  );
}
