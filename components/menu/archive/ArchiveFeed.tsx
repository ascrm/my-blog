"use client";

import React, { useState, useEffect } from "react";
import { useSite } from "@/components/common/SiteContext";
import { cn } from "@/lib/utils/utils";
import { useTranslations, useLocale } from "next-intl";
import { MessageSquare, Terminal, Palette, PenTool, Eye, Sprout, Loader2 } from "lucide-react";
// import { getPosts, Post } from "@/lib/api/contentful";

interface Archive {
  date: string;
  year: string;
  title: string;
  excerpt: string;
  category: string;
  status: "Evergreen" | "Sprouting" | "Evolving" | "Fading";
  views: string;
  slug: string;
  cover: string | null;
}

// 模拟数据 - 用于 UI 预览
const MOCK_ARCHIVES: Archive[] = [
  {
    date: "2024.05.20",
    year: "2024",
    title: "深度解析现代前端工程化架构演进：从单体应用到微前端再到生成式 UI 的全路径探索与实践指南",
    excerpt: "探索 AI 如何重塑我们构建界面（UI）的方式，从静态组件转向基于用户意图的动态体验。",
    category: "Engineering",
    status: "Evergreen",
    views: "2.4k",
    slug: "future-of-generative-ui",
    cover: null,
  },
  {
    date: "2024.04.12",
    year: "2024",
    title: "数字产品设计中的极简主义",
    excerpt: "为什么少即是多依然奏效。深度分析现代科技巨头的减法设计，以及如何将其应用到你的项目中。",
    category: "Design",
    status: "Sprouting",
    views: "1.8k",
    slug: "minimalism-design",
    cover: null,
  },
  {
    date: "2023.12.28",
    year: "2023",
    title: "遗留代码库：维护的艺术",
    excerpt: "如何在不崩溃的情况下接手拥有 10 年历史的 JavaScript 项目。关于重构与系统稳定性的实战策略。",
    category: "Engineering",
    status: "Evolving",
    views: "3.2k",
    slug: "legacy-code-maintenance",
    cover: null,
  },
  {
    date: "2023.03.05",
    year: "2023",
    title: "三年远程办公的反思",
    excerpt: "在东南亚旅行期间，保持高效产出的技术方案、心态起伏以及远程协作的真实体验。",
    category: "Journal",
    status: "Evergreen",
    views: "850",
    slug: "remote-work-reflections",
    cover: "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?w=800&auto=format&fit=crop&q=60",
  },
  {
    date: "2022.11.15",
    year: "2022",
    title: "从零开始的排版学",
    excerpt: "理解字体、间距与行高。如何让文字在屏幕上更具可读性。",
    category: "Design",
    status: "Fading",
    views: "1.1k",
    slug: "typography-basics",
    cover: null,
  },
];

// 根据分类获取图标
const getCategoryIcon = (category: string) => {
  switch (category) {
    case "Engineering":
      return <Terminal size={14} />;
    case "Design":
      return <Palette size={14} />;
    case "Journal":
      return <PenTool size={14} />;
    default:
      return <MessageSquare size={14} />;
  }
};

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

// 从 Contentful 文章转换为本地面试格式
// const transformPost = (post: Post): Archive => {
//   // 解析 Rich Text 的第一段作为摘要（取纯文本）
//   let excerpt = '';
//   if (post.content?.content) {
//     const firstParagraph = post.content.content.find(
//       (node: any) => node.nodeType === 'paragraph'
//     );
//     if (firstParagraph?.content) {
//       excerpt = firstParagraph.content
//         .filter((node: any) => node.nodeType === 'text')
//         .map((node: any) => node.value)
//         .join('');
//     }
//   }
//   excerpt = excerpt.slice(0, 100) + (excerpt.length > 100 ? '...' : '');

//   return {
//     date: post.createdAt ? new Date(post.createdAt).toISOString().split('T')[0].replace(/-/g, '.') : '2024.01.01',
//     year: post.createdAt ? new Date(post.createdAt).getFullYear().toString() : '2024',
//     title: post.title,
//     excerpt: excerpt || 'No description',
//     category: 'Engineering',
//     status: 'Evergreen',
//     views: '1.0k',
//     slug: post.slug,
//     cover: post.cover,
//   };
// };

interface ArchiveFeedProps {
  archives?: Archive[];
  loading?: boolean;
}

export function ArchiveFeed({ archives = MOCK_ARCHIVES, loading = false }: ArchiveFeedProps) {
  const { isDark } = useSite();
  const locale = useLocale();
  const t = useTranslations('archiveFeed');
  const tStatus = useTranslations('archiveFeed.status');

  const bgCard = isDark
    ? "bg-white/5 border-white/5 hover:border-white/10"
    : "bg-white border-white/50 hover:border-black/10";
  const textPrimary = isDark ? "text-[#f0f0f0]" : "text-[#1a1a1a]";
  const textSecondary = isDark ? "text-gray-500" : "text-gray-400";
  const dividerColor = isDark ? "border-white/5" : "border-black/5";

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

  // 获取文章（使用模拟数据）
  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     try {
  //       const posts = await getPosts(locale);
  //       setArchives(posts.map(transformPost));
  //     } catch (error) {
  //       console.error('Error fetching posts:', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchPosts();
  // }, [locale]);

  // 加载状态
  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 className="animate-spin" size={32} />
      </div>
    );
  }

  // 空状态
  if (!archives || archives.length === 0) {
    return (
      <div className="py-60 flex flex-col items-center animate-in fade-in zoom-in-95">
        <div className="w-16 h-[1px] bg-current opacity-10 mb-8"></div>
        <p className="text-2xl italic font-light opacity-30 mb-4 text-center">
          {t('emptyTitle')}
        </p>
        <p className="text-[10px] uppercase tracking-widest opacity-20 text-center">
          {t('emptySubtitle')}
        </p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 pb-80">
      {archives.map((article, i) => {
        const statusColor = getStatusColor(article.status);
        return (
          <div
            key={i}
            className={cn(
              "p-10 rounded-[2.5rem] shadow border group cursor-pointer transition-all duration-500 hover:-translate-y-1 relative flex flex-col min-h-[340px]",
              bgCard
            )}
          >
            {/* 封面图 */}
            {article.cover && (
              <div className="w-[calc(100%+5rem)] h-48 -mx-10 -mt-10 mb-8 overflow-hidden rounded-t-[2.5rem]">
                <img
                  src={article.cover}
                  alt={article.title}
                  className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                />
              </div>
            )}

            <div className="flex justify-between items-center mb-10">
              <span className="text-[10px] font-mono opacity-30 uppercase tracking-[0.2em]">
                {article.date}
              </span>
              <div className={cn(
                "px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider opacity-60",
                isDark ? "bg-white/10" : "bg-black/5"
              )}>
                {article.category}
              </div>
            </div>

            {/* 标题 - 带 hover 效果 */}
            <h3 className={cn(
              "text-2xl font-bold mb-5 leading-tight transition-all duration-500",
              isDark ? "group-hover:text-emerald-400" : "group-hover:text-emerald-500"
            )}>
              {article.title}
            </h3>

            <p className="text-sm leading-relaxed mb-8 opacity-50 line-clamp-4 font-light">
              {article.excerpt}
            </p>

            <div className="flex-grow"></div>

            <div className={cn("flex items-center justify-between pt-8 border-t mt-4", dividerColor)}>
              <div className="flex items-center gap-1.5 text-[10px] font-mono opacity-30 uppercase">
                <Eye size={12} /> {article.views}
              </div>
              <div className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 group-hover:gap-2 transition-all opacity-80">
                {t('readFullPost')} <Sprout size={12} />
              </div>
            </div>

            {/* 右上角分类图标 - 悬浮时显示 */}
            <div
              className={cn(
                "absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-20 group-hover:scale-125 transition-all duration-500",
                textSecondary
              )}
            >
              {getCategoryIcon(article.category)}
            </div>
          </div>
        );
      })}
    </div>
  );
}
