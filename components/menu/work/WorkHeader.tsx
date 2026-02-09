"use client";

import React, { useState } from "react";
import { Search, ArrowLeft } from "lucide-react";
import { useSite } from "@/components/common/SiteContext";
import { useLocale, useTranslations } from "next-intl";
import { cn } from "@/lib/utils/utils";

// 分类数据
const categories = ["All", "Backend", "Frontend", "AI", "Mobile", "Cloud", "Security", "Blockchain"];

interface WorkHeaderProps {
  filteredCount?: number;
  activeCategory?: string;
  onCategoryChange?: (category: string) => void;
}

export function WorkHeader({
  filteredCount = 0,
  activeCategory = "All",
  onCategoryChange = () => {},
}: WorkHeaderProps) {
  const { isDark } = useSite();
  const locale = useLocale();
  const t = useTranslations('workHeader');

  const [showSearch, setShowSearch] = useState(false);

  // 样式变量 - 使用 Background.tsx 中的配色逻辑
  const textSecondary = isDark ? "text-gray-400" : "text-gray-500";
  const borderColor = isDark ? "border-white/10" : "border-black/10";

  // 辅助函数获取本地化文本
  const getLocalizedText = (zh: string, en: string) =>
    locale === 'zh' ? zh : en;

  return (
    <div className="min-h-[300px] flex items-start mb-20 relative">
      {!showSearch ? (
        /* 标准 Header Section */
        <header className="w-full flex justify-between items-end animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="max-w-3xl">
            <div
              className={cn(
                "inline-block px-3 py-1 border rounded-full text-[10px] uppercase tracking-widest mb-10",
                borderColor
              )}
            >
              {getLocalizedText(t('selectedWorks'), t('selectedWorksEn'))}
            </div>
            <h2
              className={cn(
                "text-5xl md:text-8xl font-bold tracking-tighter mb-8 italic",
                textSecondary
              )}
            >
              {getLocalizedText(
                t('craftingDigitalExperiences'),
                t('craftingDigitalExperiencesEn')
              )}
            </h2>
            <p
              className={cn(
                "text-xl md:text-2xl leading-relaxed max-w-2xl opacity-60"
              )}
            >
              {getLocalizedText(t('focusOnBuilding'), t('focusOnBuildingEn'))}
            </p>
          </div>
          <button
            onClick={() => setShowSearch(true)}
            className={cn(
              "group flex items-center gap-3 p-3.5 rounded-full border transition-all hover:scale-110 cursor-pointer",
              borderColor,
              isDark
                ? "hover:bg-white hover:text-black"
                : "hover:bg-black hover:text-white"
            )}
            title={getLocalizedText(t('filterCategories'), t('filterByCategories'))}
          >
            <Search size={20} />
          </button>
        </header>
      ) : (
        /* 搜索/筛选 Section */
        <section className="w-full animate-in fade-in slide-in-from-top-8 duration-700">
          <div className="flex justify-between items-center mb-12">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowSearch(false)}
                className={cn(
                  "p-3 rounded-full transition-colors cursor-pointer",
                  isDark ? "hover:bg-white/10" : "hover:bg-black/10"
                )}
              >
                <ArrowLeft size={20} />
              </button>
              <h3 className="text-2xl font-bold tracking-tight uppercase">
                {getLocalizedText(t('filterCategories'), t('filterByCategories'))}
              </h3>
            </div>
            <div
              className={cn(
                "text-[10px] font-black tracking-[0.3em] opacity-30 uppercase"
              )}
            >
              {filteredCount}{" "}
              {getLocalizedText(t('projectsFound'), t('projectsFoundEn'))}
            </div>
          </div>

          <div className="flex flex-wrap gap-3 max-w-4xl">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  onCategoryChange(cat);
                }}
                className={cn(
                  "px-5 py-2.5 rounded-full text-[11px] font-bold tracking-widest transition-all cursor-pointer",
                  activeCategory === cat
                    ? isDark
                      ? "bg-white text-black scale-105 shadow-xl shadow-white/10"
                      : "bg-black text-white scale-105 shadow-xl shadow-black/10"
                    : isDark
                      ? "border border-white/10 text-white/40 hover:border-white/40 hover:text-white"
                      : "border border-black/10 text-black/40 hover:border-black/40 hover:text-black"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
