"use client";

import React from "react";
import { Github, Linkedin, Mail, ExternalLink, MapPin, Radio, Quote } from "lucide-react";
import { useSite } from "@/components/common/SiteContext";
import { cn } from "@/lib/utils";

export function Hero() {
  const { isDark, t } = useSite();

  const textPrimary = isDark ? "text-white" : "text-black";
  const textSecondary = isDark ? "text-gray-400" : "text-gray-600";
  const textMuted = isDark ? "text-gray-500" : "text-gray-400";
  const borderColor = isDark ? "border-white/10" : "border-black/10";
  const bgSubtle = isDark ? "bg-white/[0.02]" : "bg-black/[0.02]";
  const btnBg = isDark ? "bg-white text-black" : "bg-black text-white";
  const iconOpacity = isDark ? "opacity-40" : "opacity-60";

  return (
    <section className="relative flex items-center">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-12 gap-12 items-center">
        {/* 左侧文字区 */}
        <div className="col-span-12 lg:col-span-7 relative z-10">
          <h1 className="flex flex-col gap-1 mb-10">
            <span className="text-5xl md:text-7xl font-black tracking-tighter leading-none">
              {t("你好，我是", "Hello, I'm")}
            </span>
            <span className={cn(
              "text-5xl md:text-7xl font-black tracking-tighter leading-none italic",
              isDark ? "text-transparent stroke-text-white" : "text-transparent stroke-text-black"
            )}
            style={{ WebkitTextStroke: isDark ? '1px rgba(255,255,255,0.3)' : '1px rgba(0,0,0,0.3)' }}>
              {t("张恒源 (ascrm)", "Zhang Hengyuan (ascrm)")}
            </span>
            <span className="text-5xl md:text-7xl font-black tracking-tighter leading-none">
              {t("很高兴遇见你", "Nice to meet you")}
            </span>
          </h1>

          <p className="text-base md:text-lg max-w-xl leading-relaxed mb-12 font-light opacity-70">
            {t(
              "作为一名独立开发者与全栈工程师，我热衷于构建能够真正解决问题的数字化产品。我追求极致的代码美学，并在复杂的技术栈中寻找最优雅的解决方案。",
              "As an independent developer and full-stack engineer, I'm passionate about building digital products that truly solve problems. I pursue extreme code aesthetics and seek the most elegant solutions in complex tech stacks."
            )}
          </p>

          <div className="flex flex-wrap items-center gap-6">
            <button className={cn(
              "group flex items-center gap-3 px-6 py-3 rounded-full text-base font-bold transition-all cursor-pointer",
              btnBg
            )}>
              {t("获取简历", "Get Resume")} <ExternalLink size={16} />
            </button>
            <div className="flex gap-5">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className={cn("hover:opacity-100 transition-opacity", iconOpacity)}>
                <Github size={20} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className={cn("hover:opacity-100 transition-opacity", iconOpacity)}>
                <Linkedin size={20} />
              </a>
              <a href="mailto:hello@name.dev" className={cn("hover:opacity-100 transition-opacity", iconOpacity)}>
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* 右侧信息区 */}
        <div className="col-span-12 lg:col-span-5 flex flex-col items-center lg:items-end w-full">
          <div className="flex flex-col w-fit">
            {/* 头像 */}
            <div className="relative mb-8 group self-center lg:self-start">
              <div className={cn(
                "absolute inset-0 rounded-full bg-gradient-to-tr from-blue-500 to-emerald-500 blur-2xl opacity-20 group-hover:opacity-40 transition-opacity"
              )} />
              <div className={cn(
                "w-48 h-48 md:w-56 md:h-56 rounded-full border-4 overflow-hidden relative z-10 p-1",
                borderColor
              )}>
                <div className={cn(
                  "w-full h-full rounded-full flex items-center justify-center overflow-hidden",
                  bgSubtle
                )}>
                  <Radio size={80} strokeWidth={1} className={iconOpacity} />
                </div>
              </div>
            </div>

            <div className={cn("space-y-4 text-left", isDark ? "text-gray-400" : "text-gray-600")}>
              <div className="flex items-center gap-3 text-sm font-mono">
                <MapPin size={14} className="text-blue-500" />
                <span>Shanghai, China</span>
              </div>
              <div className="flex items-center gap-3 text-sm font-mono">
                <Radio size={14} className="text-emerald-500 animate-pulse" />
                <span>{t("正在构建新产品...", "Building something new...")}</span>
              </div>
              <div className={cn("pt-4 border-t flex items-start gap-2", borderColor)}>
                <Quote size={12} className={cn("mt-1", iconOpacity)} />
                <p className="text-sm leading-relaxed opacity-60 max-w-[220px] md:max-w-[260px]">
                  {t("保持空杯，追求极致。连接设计与代码的最后 1 像素。", "Stay hungry, stay极致. Connecting the last 1 pixel between design and code.")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
