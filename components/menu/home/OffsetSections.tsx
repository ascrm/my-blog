"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useSite } from "@/components/common/SiteContext";
import { cn } from "@/lib/utils";
import { useTranslations, useLocale } from "next-intl";
import { useParams } from "next/navigation";

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

  const borderColor = isDark ? "border-white/10" : "border-black/10";
  const textSecondary = isDark ? "text-gray-400" : "text-gray-600";
  const textMuted = isDark ? "text-gray-500" : "text-gray-400";
  const hoverText = isDark ? "group-hover:text-blue-500" : "group-hover:text-blue-600";

  // 辅助函数获取本地化文本
  const getLocalizedText = (zh: string, en: string) => locale === 'zh' ? zh : en;

  return (
    <section className="py-40 space-y-80">
      {/* 精选作品集 */}
      <div className="grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5 relative z-10">
          <span className="font-mono text-xs text-blue-500 mb-4 block tracking-widest uppercase">
            Portfolio 01
          </span>
          <h2 className="text-5xl font-black mb-8 italic leading-tight">
            {t('featuredWorks')}
          </h2>
          <p className="text-lg leading-relaxed mb-10 font-light opacity-60">
            {t('featuredWorksDesc')}
          </p>
          <Link
            href={`/${locale}/work`}
            className={cn(
              "group flex items-center gap-4 text-xs font-bold uppercase tracking-[0.3em] transition-all hover:gap-6 cursor-pointer"
            )}
          >
            {t('viewAllWorks')} <ArrowUpRight className={hoverText} />
          </Link>
        </div>

        <div className="lg:col-span-7 flex justify-center items-center relative">
          <div className="relative w-full aspect-video max-w-lg group">
            {workImages.map((img, i) => (
              <div
                key={i}
                className={cn(
                  "absolute inset-0 rounded-2xl border overflow-hidden shadow-2xl transition-all duration-500 transform",
                  borderColor,
                  i === 0 && "z-30 translate-x-0 translate-y-0 rotate-0 group-hover:-translate-y-4",
                  i === 1 && "z-20 translate-x-6 translate-y-6 rotate-3 opacity-60 group-hover:translate-x-12 group-hover:translate-y-12",
                  i === 2 && "z-10 translate-x-12 translate-y-12 rotate-6 opacity-30 group-hover:translate-x-24 group-hover:translate-y-24"
                )}
              >
                <img src={img} alt="Work" className="w-full h-full object-cover" />
              </div>
            ))}
            <div className="absolute top-4 left-4 z-40 bg-black/50 backdrop-blur px-3 py-1 rounded text-[10px] tracking-widest font-bold">
              MANY WORKS_
            </div>
          </div>
        </div>
      </div>

      {/* 数字档案室 */}
      <div className="grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 lg:order-first order-last flex justify-center items-center relative">
          <div className="relative w-full aspect-video max-w-lg group">
            {archiveImages.map((img, i) => (
              <div
                key={i}
                className={cn(
                  "absolute inset-0 rounded-2xl border overflow-hidden shadow-2xl transition-all duration-500 transform",
                  borderColor,
                  i === 0 && "z-30 translate-x-0 translate-y-0 rotate-0 group-hover:-translate-y-4",
                  i === 1 && "z-20 -translate-x-6 translate-y-6 -rotate-3 opacity-60 group-hover:-translate-x-12 group-hover:translate-y-12",
                  i === 2 && "z-10 -translate-x-12 translate-y-12 -rotate-6 opacity-30 group-hover:-translate-x-24 group-hover:translate-y-24"
                )}
              >
                <img src={img} alt="Archive" className="w-full h-full object-cover" />
              </div>
            ))}
            <div className="absolute bottom-4 right-4 z-40 bg-black/50 backdrop-blur px-3 py-1 rounded text-[10px] tracking-widest font-bold">
              THE VAULT_
            </div>
          </div>
        </div>

        <div className="lg:col-span-5">
          <span className="font-mono text-xs text-emerald-500 mb-4 block tracking-widest uppercase">
            Archive 02
          </span>
          <h2 className="text-5xl font-black mb-8 italic leading-tight">
            {t('digitalArchive')}
          </h2>
          <p className="text-lg leading-relaxed mb-10 font-light opacity-60">
            {t('digitalArchiveDesc')}
          </p>
          <Link
            href={`/${locale}/archive`}
            className={cn(
              "group flex items-center gap-4 text-xs font-bold uppercase tracking-[0.3em] transition-all hover:gap-6 cursor-pointer"
            )}
          >
            {t('enterArchive')} <ArrowUpRight className="group-hover:text-emerald-500" />
          </Link>
        </div>
      </div>
    </section>
  );
}
