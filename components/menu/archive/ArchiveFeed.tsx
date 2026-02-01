"use client";

import React from "react";
import { useSite } from "@/components/common/SiteContext";
import { cn } from "@/lib/utils";
import { MessageSquare, Terminal, Palette, PenTool, Eye, Sprout } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";

interface Archive {
  date: string;
  title: { zh: string; en: string };
  excerpt: { zh: string; en: string };
  category: string;
  status: "Evergreen" | "Sprouting" | "Evolving" | "Fading";
  views: string;
}

// 根据分类获取图标
const getCategoryIcon = (category: string) => {
  switch (category) {
    case "Engineering":
      return <Terminal size={14} />;
    case "Design":
      return <Palette size={14} />;
    case "Archives":
    case "Journal":
      return <PenTool size={14} />;
    default:
      return <MessageSquare size={14} />;
  }
};

const archives: Archive[] = [
  {
    date: "2024.05.12",
    title: { zh: "为什么我们需要在设计中加入「不完美」感？", en: "Why we need 'imperfection' in design?" },
    excerpt: {
      zh: "当算法生成的界面越来越趋于一致，手工感的瑕疵反而成为了连接人类情感的关键。",
      en: "As algorithm-generated interfaces become uniform, handcrafted flaws become key to connecting human emotions.",
    },
    category: "Design",
    status: "Evolving",
    views: "1.2k",
  },
  {
    date: "2024.03.20",
    title: { zh: "深度学习时代的后端架构演进", en: "Evolution of Backend Architecture in the AI Era" },
    excerpt: {
      zh: "从传统的 CRUD 到面向 RAG 架构的转变，后端开发者需要重新审视数据流的定义。",
      en: "The shift from traditional CRUD to RAG-oriented architectures requires a rethink of data flow.",
    },
    category: "Engineering",
    status: "Evergreen",
    views: "856",
  },
  {
    date: "2024.01.05",
    title: { zh: "极简主义不是简单的减法", en: "Minimalism is not just subtraction" },
    excerpt: {
      zh: "在 UI 设计中，有意义的留白比堆砌装饰更难掌控，它关乎信息的呼吸感。",
      en: "In UI design, meaningful whitespace is harder to master than decoration; it's about the rhythm of information.",
    },
    category: "Archives",
    status: "Sprouting",
    views: "2.4k",
  },
  {
    date: "2023.11.15",
    title: { zh: "关于 2023 年的一些旧思考", en: "Old archives about 2023" },
    excerpt: {
      zh: "回看这些过时的观点，有时能发现当时未曾察觉的思维盲区。",
      en: "Looking back at outdated views can sometimes reveal blind spots that were unnoticed then.",
    },
    category: "Journal",
    status: "Fading",
    views: "1.1k",
  },
  {
    date: "2023.09.08",
    title: { zh: "程序员的审美进化", en: "Aesthetic evolution of a programmer" },
    excerpt: {
      zh: "从功能优先到体验至上，一个开发者如何在代码与设计之间找到平衡。",
      en: "From functionality-first to experience-first, how a developer finds balance between code and design.",
    },
    category: "Design",
    status: "Evergreen",
    views: "3.2k",
  },
  {
    date: "2023.06.22",
    title: { zh: "远程工作的这一年", en: "One year of remote work" },
    excerpt: {
      zh: "关于自律、孤独和重新定义工作边界的思考。",
      en: "Archives on self-discipline, loneliness, and redefining work boundaries.",
    },
    category: "Journal",
    status: "Fading",
    views: "1.8k",
  },
];

// 根据状态获取颜色
const getStatusColor = (status: string) => {
  switch (status) {
    case "Evergreen": return "bg-green-500";
    case "Sprouting": return "bg-emerald-300";
    case "Evolving": return "bg-amber-500";
    case "Fading": return "bg-gray-500";
    default: return "bg-green-500";
  }
};

export function ArchiveFeed() {
  const { isDark } = useSite();
  const locale = useLocale();
  const t = useTranslations('archiveFeed');
  const tStatus = useTranslations('archiveFeed.status');

  const bgCard = isDark ? "bg-white/5 border-white/5 hover:border-white/20" : "bg-black/5 border-black/5 hover:border-black/20";
  const bgSpecial = isDark ? "bg-white/[0.02]" : "bg-black/[0.02]";
  const bgBadge = isDark ? "bg-white/5" : "bg-black/5";
  const textPrimary = isDark ? "text-[#f0f0f0]" : "text-[#1a1a1a]";
  const textSecondary = isDark ? "text-gray-500" : "text-gray-400";

  // 获取翻译文本的辅助函数
  const getLocalizedText = (zh: string, en: string) => {
    return locale === 'zh' ? zh : en;
  };

  // 获取状态翻译
  const getStatusLabel = (status: string) => {
    switch (status) {
      case "Evergreen": return tStatus('evergreen');
      case "Sprouting": return tStatus('sprouting');
      case "Evolving": return tStatus('evolving');
      case "Fading": return tStatus('fading');
      default: return status;
    }
  };

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 pb-32">
      {archives.map((article, i) => {
        const statusColor = getStatusColor(article.status);
        return (
          <div
            key={i}
            className={cn(
              "p-8 rounded-3xl border group cursor-pointer transition-all duration-500 hover:-translate-y-2 relative overflow-hidden flex flex-col min-h-[420px]",
              bgCard
            )}
          >
            {/* 右上角分类图标 */}
            <div
              className={cn(
                "absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-100 group-hover:scale-125 transition-all duration-500",
                textSecondary
              )}
            >
              {getCategoryIcon(article.category)}
            </div>

            <div className="flex justify-between items-start mb-12">
              <span className="text-[10px] font-mono opacity-50">{article.date}</span>
            </div>

            <span className={cn("text-[10px] uppercase tracking-widest font-bold mb-4 block", textSecondary)}>
              {article.category}
            </span>

            <h3 className="text-2xl font-bold mb-6 leading-tight group-hover:text-current transition-colors">
              {getLocalizedText(article.title.zh, article.title.en)}
            </h3>

            <p className="text-sm leading-relaxed mb-8 opacity-60 line-clamp-3">
              {getLocalizedText(article.excerpt.zh, article.excerpt.en)}
            </p>

            {/* 占位元素，将底部对齐 */}
            <div className="flex-grow"></div>

            <div className="flex items-center justify-between pt-6 border-t border-current/5">
              <div className="flex items-center gap-4 text-[10px] font-mono opacity-50 uppercase">
                {/* 状态展示 */}
                <div className="flex items-center gap-1.5 font-bold">
                  <span
                    className={cn(
                      "w-1.5 h-1.5 rounded-full",
                      statusColor,
                      article.status === "Evolving" && "animate-pulse"
                    )}
                  ></span>
                  {getStatusLabel(article.status)}
                </div>
                <div className="flex items-center gap-1.5">
                  <Eye size={12} /> {article.views}
                </div>
              </div>
              <button className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 group-hover:gap-2 transition-all cursor-pointer">
                {t('readFullPost')} <Sprout size={12} />
              </button>
            </div>
          </div>
        );
      })}

      {/* 特殊引导卡片 */}
      <div
        className={cn(
          "p-10 rounded-3xl flex flex-col justify-center items-center text-center border-2 border-dashed transition-all",
          isDark ? "border-white/10 hover:border-white/20" : "border-black/10 hover:border-black/20",
          bgSpecial
        )}
      >
        <div className={cn("w-12 h-12 rounded-full flex items-center justify-center mb-6", bgBadge)}>
          <Sprout size={20} className="opacity-50" />
        </div>
        <h4 className={cn("text-xl font-bold mb-4 italic", textPrimary)}>
          {t('wantMore')}
        </h4>
        <p className="text-sm opacity-50 mb-8 max-w-[200px]">
          {t('subscribeDescription')}
        </p>
        <div className="flex w-full gap-2 border-b border-current/20 pb-2">
          <input
            type="text"
            placeholder={t('emailPlaceholder')}
            className={cn(
              "flex-grow bg-transparent text-xs py-2 focus:outline-none",
              textSecondary
            )}
          />
          <button className="text-xs font-bold uppercase tracking-tighter hover:opacity-60 transition-opacity cursor-pointer">
            {t('join')}
          </button>
        </div>
      </div>
    </div>
  );
}
