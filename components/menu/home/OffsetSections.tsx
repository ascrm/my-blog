"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Plus } from "lucide-react";
import { useSite } from "@/components/common/SiteContext";
import { cn } from "@/lib/utils/utils";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

// ModernImageStack 组件 - 重新设计的图片堆叠方案
function ModernImageStack({ images, isDark, reversed = false }: { images: string[]; isDark: boolean; reversed?: boolean }) {
  const [isHovered, setIsHovered] = useState(false);

  const stackItems = [
    {
      initial: { x: reversed ? 45 : -45, y: 35, rotate: reversed ? 8 : -8, scale: 0.9, opacity: 0.55 },
      hover: { x: reversed ? 85 : -85, y: 65, rotate: reversed ? 14 : -14, scale: 0.92, opacity: 0.85 }
    },
    {
      initial: { x: reversed ? -30 : 30, y: -20, rotate: reversed ? -4 : 4, scale: 0.95, opacity: 0.75 },
      hover: { x: reversed ? -80 : 80, y: -45, rotate: reversed ? -8 : 8, scale: 0.98, opacity: 0.95 }
    },
    {
      initial: { x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 },
      hover: { x: 0, y: 0, rotate: reversed ? 1.5 : -1.5, scale: 1.05, opacity: 1 }
    }
  ];

  const bgGlow = isDark ? "bg-blue-600/8" : "bg-blue-400/5";
  const borderCard = isDark ? "border-white/10 shadow-2xl shadow-black" : "border-black/5 shadow-xl shadow-black/[0.05]";

  return (
    <div
      className="relative w-full aspect-square md:aspect-[4/3.2] max-w-xl mx-auto flex items-center justify-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 装饰性背景发光 */}
      <div className={cn(
        "absolute inset-0 rounded-[4rem] transition-all duration-1000 blur-[100px]",
        bgGlow,
        isHovered ? "opacity-100 scale-110" : "opacity-0 scale-90"
      )} />

      {stackItems.map((item, i) => {
        const state = isHovered ? item.hover : item.initial;
        const imgIndex = i % images.length;

        return (
          <div
            key={i}
            className={cn(
              "absolute w-[85%] aspect-video rounded-3xl border transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] overflow-hidden",
              borderCard,
              i === 2 ? "z-30" : i === 1 ? "z-20" : "z-10"
            )}
            style={{
              transform: `translate(${state.x}px, ${state.y}px) rotate(${state.rotate}deg) scale(${state.scale})`,
              opacity: state.opacity,
              backgroundColor: isDark ? '#1a1a1a' : '#fff'
            }}
          >
            <Image
              src={images[imgIndex]}
              fill
              unoptimized
              className={cn(
                "object-cover transition-all duration-1000",
                isHovered && i === 2 ? "scale-110" : "scale-100",
                !isHovered && i !== 2 ? "grayscale-[0.2]" : "grayscale-0"
              )}
              alt={`Project stack ${i}`}
            />
            {/* 顶层光效 */}
            {i === 2 && (
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            )}
            {/* 非活跃态微遮罩 */}
            <div className={cn(
              "absolute inset-0 transition-opacity duration-500 pointer-events-none",
              !isHovered && i !== 2 ? "bg-black/[0.03] dark:bg-black/10" : "opacity-0"
            )} />
          </div>
        );
      })}
    </div>
  );
}

const workImages = [
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80"
];

const archiveImages = [
  "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80"
];

export function OffsetSections() {
  const { isDark } = useSite();
  const params = useParams();
  const locale = params.locale as string || 'zh';
  const t = useTranslations('offsetSections');

  const btnWork = isDark
    ? "bg-white/5 text-white hover:bg-white/10 shadow-2xl shadow-black/50 border border-white/5"
    : "bg-white text-black hover:shadow-2xl shadow-black/5 border border-black/[0.05]";
  const btnWorkIcon = isDark ? "group-hover:text-blue-400" : "group-hover:text-blue-600";
  const btnArchive = isDark
    ? "bg-white/5 text-white hover:bg-white/10 shadow-2xl shadow-black/50 border border-white/5"
    : "bg-white text-black hover:shadow-2xl shadow-black/5 border border-black/[0.05]";
  const btnArchiveIcon = isDark ? "group-hover:text-emerald-400" : "group-hover:text-emerald-600";

  return (
    <section className="pb-20 md:pb-60 space-y-40 md:space-y-80 overflow-hidden">
      {/* 精选作品集 */}
      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-16 items-center">
        <div className="col-span-12 lg:col-span-5 space-y-12 text-[#2D2A26] dark:text-white">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <span className="text-5xl font-black italic opacity-10">01</span>
              <div className="h-[1px] flex-1 bg-current opacity-10" />
            </div>
            <h2 className="text-5xl md:text-7xl font-black italic tracking-tighter leading-[0.85] uppercase">
              {t('featuredWorks')}
            </h2>
            <p className="text-xl font-light opacity-50 leading-relaxed max-w-md text-[#4A443D] dark:text-white/60">
              {t('featuredWorksDesc')}
            </p>
          </div>
          <Link
            href={`/${locale}/work`}
            className={cn(
              "group relative shadow inline-flex items-center gap-6 px-6 py-4 rounded-xl transition-all duration-300 text-sm font-black tracking-[0.2em] uppercase cursor-pointer",
              btnWork
            )}
          >
            <span>{locale === 'zh' ? '查看全部作品' : 'VIEW ALL WORKS'}</span>
            <ArrowUpRight size={18} className={cn(
              "transition-all duration-300 group-hover:-translate-y-1",
              btnWorkIcon
            )} />
          </Link>
        </div>

        <div className="col-span-12 lg:col-span-7">
          <ModernImageStack images={workImages} isDark={isDark} reversed={false} />
        </div>
      </div>

      {/* 数字档案室 */}
      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-16 items-center">
        <div className="col-span-12 lg:col-span-7 lg:order-first order-last">
          <ModernImageStack images={archiveImages} isDark={isDark} reversed={true} />
        </div>

        <div className="col-span-12 lg:col-span-5 pr-3 space-y-12 order-1 lg:order-2 text-right text-[#2D2A26] dark:text-white">
          <div className="space-y-6">
            <div className="flex flex-row-reverse items-center gap-4">
              <span className="text-5xl font-black italic opacity-10">02</span>
              <div className="h-[1px] flex-1 bg-current opacity-10" />
            </div>
            <h2 className="text-5xl md:text-7xl font-black italic tracking-tighter leading-[0.85] uppercase">
              {t('digitalArchive')}
            </h2>
            <p className="text-xl font-light opacity-50 leading-relaxed max-w-md ml-auto text-[#4A443D] dark:text-white/60">
              {t('digitalArchiveDesc')}
            </p>
          </div>
          <div className="flex justify-end">
            <Link
              href={`/${locale}/archive`}
              className={cn(
                "group relative inline-flex shadow items-center gap-4 px-6 py-4 rounded-xl transition-all duration-300 text-sm font-black tracking-[0.2em] uppercase cursor-pointer",
                btnArchive
              )}
            >
              <span>{locale === 'zh' ? '进入深度归档' : 'DEEP ARCHIVE'}</span>
              <Plus size={18} className={cn(
                "transition-all duration-300 group-hover:rotate-180",
                btnArchiveIcon
              )} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
