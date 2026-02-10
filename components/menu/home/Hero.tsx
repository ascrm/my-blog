"use client";

import React from "react";
import { Github, Twitter, Mail, ExternalLink, MapPin, Radio, Quote, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useSite } from "@/components/common/SiteContext";
import { cn } from "@/lib/utils/utils";
import { useTranslations } from "next-intl";

export function Hero() {
  const { isDark } = useSite();
  const t = useTranslations('hero');

  // const textPrimary = isDark ? "text-white" : "text-black";
  // const textSecondary = isDark ? "text-gray-400" : "text-gray-600";
  // const textMuted = isDark ? "text-gray-500" : "text-gray-400";
  const borderColor = isDark ? "border-white/10" : "border-black/10";
  const bgSubtle = isDark ? "bg-white/[0.02]" : "bg-black/[0.02]";
  const btnBg = isDark ? "bg-white text-black" : "bg-black text-white";
  const iconOpacity = isDark ? "opacity-40" : "opacity-60";

  return (
    <section className="relative flex items-center pt-12 pb-80">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-18 gap-12 items-center">
        {/* 左侧文字区 */}
        <div className="col-span-12 lg:col-span-12 relative z-10">
          <div className="animate-in fade-in slide-in-from-left-8 duration-1000">
            <h1 className="flex flex-col gap-2 mb-10">
              <span className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.9] opacity-90">
                {t('greeting')}
              </span>
              <span className={cn(
                "text-5xl md:text-8xl font-black tracking-tighter italic py-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-emerald-500"
              )}
              style={{ WebkitTextStroke: isDark ? '1px rgba(255,255,255,0.1)' : '1px rgba(0,0,0,0.1)' }}>
                {t('name')}
              </span>
              {/*<span className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.9]">*/}
              {/*  {t('niceToMeetYou')}*/}
              {/*</span>*/}
            </h1>

            <p className="text-lg md:text-xl max-w-xl leading-relaxed mb-12 font-light opacity-60">
              {t('bio')}
            </p>

            <div className="flex flex-wrap items-center gap-8">
              <button className={cn(
                "group relative flex items-center gap-4 px-10 py-4 rounded-full text-base font-bold tracking-widest transition-all overflow-hidden shadow-2xl hover:shadow-blue-500/20 cursor-pointer",
                btnBg
              )}>
                <span className="relative z-10 flex items-center gap-3">
                  {t('getResume')} <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
              <div className="flex gap-6">
                {[Github, Twitter, Mail].map((Icon, i) => (
                  <a key={i} href="#" className={cn("opacity-40 hover:opacity-100 hover:scale-110 transition-all text-current", iconOpacity)}>
                    <Icon size={22} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 右侧信息区 */}
        <div className="col-span-12 lg:col-span-6 flex flex-col items-center lg:items-end w-full">
          <div className="flex flex-col w-fit">
            {/* 头像 */}
            <div className="relative mb-8 group self-center lg:self-start">
              <div className="absolute -inset-4 bg-gradient-to-tr from-blue-600 to-emerald-600 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-1000" />
              <div className={cn(
                "w-48 h-48 md:w-56 md:h-56 rounded-full border-4 overflow-hidden relative z-10 p-1 transition-transform duration-700 group-hover:rotate-3",
                borderColor
              )}>
                <div className={cn(
                  "w-full h-full rounded-full flex items-center justify-center overflow-hidden relative",
                  bgSubtle
                )}>
                  <Image
                    src="/images/avatar3.png"
                    alt="Avatar"
                    fill
                    className="object-cover scale-110 group-hover:scale-125 transition-transform duration-700"
                    priority
                  />
                </div>
              </div>
            </div>

            <div className={cn("space-y-4 text-left", isDark ? "text-gray-400" : "text-gray-600")}>
              <div className="flex items-center gap-3 text-sm font-mono">
                <MapPin size={14} className="text-blue-500" />
                <span>{t('location')}</span>
              </div>
              <div className="flex items-center gap-3 text-sm font-mono">
                <Radio size={14} className="text-emerald-500 animate-pulse" />
                <span>{t('building')}</span>
              </div>
              <div className={cn("pt-4 border-t flex items-start gap-2", borderColor)}>
                <Quote size={12} className={cn("mt-1", iconOpacity)} />
                <p className="text-sm leading-relaxed opacity-60 max-w-[220px] md:max-w-[260px]">
                  {t('quote')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
