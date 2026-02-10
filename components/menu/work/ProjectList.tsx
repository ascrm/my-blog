"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { useSite } from "@/components/common/SiteContext";
import { useLocale, useTranslations } from "next-intl";
import { cn } from "@/lib/utils/utils";
import { Project, projects } from "@/mocks/work";

interface ProjectListProps {
  projects?: Project[];
}

export function ProjectList({ projects: propsProjects }: ProjectListProps) {
  const projectsToUse = propsProjects || projects;
  const { isDark } = useSite();
  const locale = useLocale();
  const t = useTranslations('workHeader');

  const [currentSlide, setCurrentSlide] = useState<Record<string, number>>({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  // 样式变量 - 使用 Background.tsx 中的配色逻辑
  const textPrimary = isDark ? "text-[#f0f0f0]" : "text-[#1a1a1a]";
  const textSecondary = isDark ? "text-gray-400" : "text-gray-500";
  const borderColor = isDark ? "border-white/10" : "border-black/10";
  const bgCard = isDark ? "bg-white/5 border-white/5" : "bg-black/5 border-black/5";

  // 辅助函数获取本地化文本
  const getLocalizedText = (zh: string, en: string) =>
    locale === 'zh' ? zh : en;

  if (!mounted) return null;

  return (
    <div className="space-y-64 pb-80">
      {projectsToUse.map((p, i) => (
        <div
          key={p.id}
          className="group relative animate-in fade-in slide-in-from-bottom-12 duration-1000 fill-mode-both"
          style={{ animationDelay: `${i * 150}ms` }}
        >
          {/* 媒体展示区 */}
          <div
            className={cn(
              "w-full aspect-[21/9] rounded-3xl border mb-16 overflow-hidden relative transition-all duration-700 shadow-2xl flex items-center justify-center",
              bgCard
            )}
          >
            {/* 方案一：B站 Iframe 嵌入 (非自动播放) */}
            {p.type === "video" && p.videoIframe && (
              <div className="absolute inset-0 w-full h-full bg-black">
                <iframe
                  src={p.videoIframe}
                  scrolling="no"
                  frameBorder={0}
                  allowFullScreen
                  className="w-full h-full"
                  sandbox="allow-top-navigation allow-same-origin allow-forms allow-scripts"
                ></iframe>
              </div>
            )}

            {/* 方案二：轮播图方案 */}
            {p.type === "slider" && p.images && (
              <div className="absolute inset-0 w-full h-full bg-neutral-900">
                <div
                  className="flex transition-transform duration-700 h-full"
                  style={{
                    transform: `translateX(-${(currentSlide[p.id] || 0) * 100}%)`,
                  }}
                >
                  {p.images.map((img, idx) => (
                    <div key={idx} className="min-w-full h-full relative">
                      <Image
                        src={img}
                        alt=""
                        fill
                        className="object-cover opacity-60"
                        unoptimized
                      />
                    </div>
                  ))}
                </div>

                {/* 轮播图底部进度指示器 - 白色 */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-30">
                  {p.images.map((_, idx) => (
                    <div
                      key={idx}
                      className={cn(
                        "h-[2px] transition-all duration-500 rounded-full",
                        currentSlide[p.id] === idx
                          ? "w-10 bg-white"
                          : "w-4 bg-white/20"
                      )}
                    />
                  ))}
                </div>

                {/* 轮播控制 */}
                <div className="absolute inset-0 flex items-center justify-between px-6 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() =>
                      setCurrentSlide((prev) => ({
                        ...prev,
                        [p.id]:
                          prev[p.id] === 0
                            ? p.images!.length - 1
                            : (prev[p.id] || 0) - 1,
                      }))
                    }
                    className={cn(
                      "p-3 rounded-full bg-black/40 backdrop-blur-md hover:bg-white hover:text-black text-white transition-all"
                    )}
                  >
                    <ChevronLeft />
                  </button>
                  <button
                    onClick={() =>
                      setCurrentSlide((prev) => ({
                        ...prev,
                        [p.id]:
                          prev[p.id] === p.images!.length - 1
                            ? 0
                            : (prev[p.id] || 0) + 1,
                      }))
                    }
                    className={cn(
                      "p-3 rounded-full bg-black/40 backdrop-blur-md hover:bg-white hover:text-black text-white transition-all"
                    )}
                  >
                    <ChevronRight />
                  </button>
                </div>
              </div>
            )}

            {/* 静态图方案 */}
            {p.type === "image" && p.imageUrl && (
              <div className="absolute inset-0 w-full h-full overflow-hidden">
                <Image
                  src={p.imageUrl}
                  alt=""
                  fill
                  className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-[3s]"
                  unoptimized
                />
              </div>
            )}
          </div>

          {/* 详情描述区 */}
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-24">
            <div className="lg:col-span-5">
              <div className="flex items-center gap-3 mb-6">
                <span
                  className={cn(
                    "text-[10px] font-mono tracking-[0.3em] uppercase block opacity-60"
                  )}
                >
                  {getLocalizedText(p.category.zh, p.category.en)}
                </span>
                <div
                  className={cn(
                    "h-[1px] w-8",
                    isDark ? "bg-white/20" : "bg-black/20"
                  )}
                ></div>
              </div>

              <h3
                className={cn("text-4xl md:text-5xl font-bold mb-8", textPrimary)}
              >
                {getLocalizedText(p.title.zh, p.title.en)}
              </h3>

              {/* 极简标签：首字母大写 + 斜杠 */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-10">
                {p.tags.map((tag, idx) => (
                  <React.Fragment key={tag}>
                    <span
                      className={cn(
                        "text-[11px] font-bold tracking-[0.1em] opacity-60 hover:opacity-100 transition-opacity cursor-default capitalize"
                      )}
                    >
                      {tag}
                    </span>
                    {idx !== p.tags.length - 1 && (
                      <span className="text-blue-500/40 font-light text-xs">
                        /
                      </span>
                    )}
                  </React.Fragment>
                ))}
              </div>

              {/* 交互区：按钮在左，年份在右，间距拉大 */}
              <div className="flex items-center justify-between mt-12 w-full">
                <button
                  className={cn(
                    "flex items-center gap-3 px-10 py-5 rounded-xl text-sm font-bold tracking-widest transition-all transform active:scale-95 uppercase border cursor-pointer",
                    isDark
                      ? "bg-white text-black border-white hover:opacity-80 shadow-lg shadow-white/5"
                      : "bg-black text-white border-black hover:opacity-80 shadow-lg shadow-black/5"
                  )}
                >
                  {getLocalizedText(t('visitProject'), t('visitProjectEn'))}{" "}
                  <ExternalLink size={14} />
                </button>

                <div className="flex flex-col items-end gap-1">
                  <span
                    className={cn(
                      "text-[9px] font-black uppercase tracking-[0.4em] opacity-20 italic"
                    )}
                  >
                    {t('timeline')}
                  </span>
                  <span
                    className={cn("text-lg font-mono font-bold tracking-tighter", textSecondary)}
                  >
                    {p.year}
                  </span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 flex flex-col justify-end">
              <div className={cn("mb-8 pb-8 border-b", borderColor)}>
                <h4
                  className={cn(
                    "text-[10px] font-black uppercase tracking-[0.4em] mb-4",
                    isDark ? "text-gray-500" : "text-gray-400"
                  )}
                >
                  {getLocalizedText(t('projectOverview'), t('projectOverviewEn'))}
                </h4>
                <p
                  className={cn(
                    "text-xl md:text-3xl leading-tight font-medium mb-6",
                    textPrimary
                  )}
                >
                  {getLocalizedText(p.desc.zh, p.desc.en)}
                </p>
              </div>
              <p className={cn("text-lg leading-relaxed", textSecondary)}>
                {getLocalizedText(p.details.zh, p.details.en)}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
