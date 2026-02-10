"use client";

import React from "react";
import { useSite } from "@/components/common/SiteContext";
import { cn } from "@/lib/utils/utils";
import { useTranslations, useLocale } from "next-intl";
import { Search, X } from "lucide-react";

export interface ArchiveHeaderProps {
  isSearching: boolean;
  setIsSearching: (value: boolean) => void;
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  selectedYear: string;
  setSelectedYear: (value: string) => void;
  categories: string[];
  years: string[];
}

export function ArchiveHeader({
  isSearching,
  setIsSearching,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedYear,
  setSelectedYear,
  categories,
  years,
}: ArchiveHeaderProps) {
  const { isDark } = useSite();
  const locale = useLocale();
  const t = useTranslations('archiveHeader');
  const tFeed = useTranslations('archiveFeed');

  // 样式变量 - 使用 Background.tsx 中的配色逻辑
  const textSecondary = isDark ? "text-gray-400" : "text-gray-500";
  const borderColor = isDark ? "border-white/10" : "border-black/10";
  const inputBg = isDark ? "bg-white/5" : "bg-black/5";
  const activeTagBg = isDark ? "bg-white text-black" : "bg-black text-white";
  const inactiveTagBg = isDark ? "bg-white/5 hover:bg-white/10" : "bg-black/5 hover:bg-black/10";

  // 辅助函数获取本地化文本
  const getLocalizedText = (zh: string, en: string) =>
    locale === 'zh' ? zh : en;

  return (
    <div className="min-h-[300px] flex items-start mb-20 relative py-6">
      {/* 标准 Header */}
      {!isSearching ? (
        <header className="w-full flex justify-between items-end animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="max-w-3xl">
            <div className={cn("inline-block px-3 py-1 border rounded-full text-[10px] uppercase tracking-widest mb-10", borderColor)}>
              {getLocalizedText(t('digitalGarden'), t('digitalGardenEn'))}
            </div>
            <h2 className={cn("text-5xl md:text-8xl font-bold tracking-tighter mb-8 italic", textSecondary)}>
              {getLocalizedText(t('archiveList'), t('archiveListEn'))}
            </h2>
            <p className={cn("text-xl md:text-2xl leading-relaxed max-w-2xl opacity-60", textSecondary)}>
              {getLocalizedText(t('description'), t('descriptionEn'))}
            </p>
          </div>
          <button
            onClick={() => setIsSearching(true)}
            className={cn(
              "group flex items-center gap-3 p-3.5 rounded-full border transition-all hover:scale-110 cursor-pointer",
              borderColor,
              isDark
                ? "hover:bg-white hover:text-black"
                : "hover:bg-black hover:text-white"
            )}
            title={getLocalizedText(t('searchAndFilter'), "Search & Filter")}
          >
            <Search size={20} />
          </button>
        </header>
      ) : (
        /* 搜索 Header */
        <section className="w-full animate-in fade-in slide-in-from-top-8 duration-700">
          <div className="flex items-center gap-4 mb-10">
            <div className={cn("flex-grow flex items-center px-6 py-4 rounded-3xl border transition-all", borderColor, inputBg)}>
              <Search size={20} className="opacity-30 mr-4" />
              <input
                autoFocus
                type="text"
                placeholder={getLocalizedText(tFeed('searchPlaceholder'), "Search titles, content...")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none outline-none w-full text-xl md:text-2xl font-light placeholder:opacity-30"
              />
            </div>
            <button
              onClick={() => {
                setIsSearching(false);
                setSearchQuery("");
                setSelectedCategory("All");
                setSelectedYear("All");
              }}
              className={cn("p-5 rounded-3xl border transition-all hover:opacity-100 opacity-60 cursor-pointer", borderColor, inputBg)}
            >
              <X size={20} />
            </button>
          </div>

          {/* 分类筛选 */}
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <span className="text-[10px] uppercase tracking-widest opacity-30 mr-2">
              {getLocalizedText(tFeed('categoryFilter'), "Category")}:
            </span>
            {["All", ...categories].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  "px-5 py-2.5 rounded-full text-[13px] font-medium transition-all duration-300 cursor-pointer",
                  selectedCategory === cat ? activeTagBg : inactiveTagBg
                )}
              >
                {cat === "All" ? getLocalizedText(tFeed('allCategories'), "All") : cat}
              </button>
            ))}
          </div>

          {/* 年份筛选 */}
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-[10px] uppercase tracking-widest opacity-30 mr-2">
              {getLocalizedText(tFeed('yearFilter'), "Year")}:
            </span>
            {["All", ...years].map((year) => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={cn(
                  "px-5 py-2.5 rounded-full text-[13px] font-medium transition-all duration-300 cursor-pointer",
                  selectedYear === year ? activeTagBg : inactiveTagBg
                )}
              >
                {year === "All" ? getLocalizedText(tFeed('allYears'), "All") : year}
              </button>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
