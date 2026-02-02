"use client";

import React, { useState, useEffect } from "react";
import { useSite } from "@/components/common/SiteContext";
import { cn } from "@/lib/utils/utils";
import { MessageSquare, Terminal, Palette, PenTool, Eye, Sprout, Loader2 } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { getPosts, Post } from "@/lib/api/contentful";

interface Archive {
  date: string;
  title: string;
  excerpt: string;
  category: string;
  status: "Evergreen" | "Sprouting" | "Evolving" | "Fading";
  views: string;
  slug: string;
  cover: string | null;
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
const transformPost = (post: Post): Archive => {
  // 解析 Rich Text 的第一段作为摘要（取纯文本）
  let excerpt = '';
  if (post.content?.content) {
    // 取第一段文本
    const firstParagraph = post.content.content.find(
      (node: any) => node.nodeType === 'paragraph'
    );
    if (firstParagraph?.content) {
      excerpt = firstParagraph.content
        .filter((node: any) => node.nodeType === 'text')
        .map((node: any) => node.value)
        .join('');
    }
  }
  // 截取前100字作为摘要
  excerpt = excerpt.slice(0, 100) + (excerpt.length > 100 ? '...' : '');

  return {
    date: post.createdAt ? new Date(post.createdAt).toISOString().split('T')[0].replace(/-/g, '.') : '2024.01.01',
    title: post.title,
    excerpt: excerpt || 'No description',
    category: 'Engineering', // 默认分类，可根据需要调整
    status: 'Evergreen', // 默认状态，可根据需要调整
    views: '1.0k', // 默认浏览量
    slug: post.slug,
    cover: post.cover,
  };
};

export function ArchiveFeed() {
  const { isDark } = useSite();
  const locale = useLocale();
  const t = useTranslations('archiveFeed');
  const tStatus = useTranslations('archiveFeed.status');

  const [archives, setArchives] = useState<Archive[]>([]);
  const [loading, setLoading] = useState(true);

  const bgCard = isDark ? "bg-white/5 border-white/5 hover:border-white/20" : "bg-black/5 border-black/5 hover:border-black/20";
  const textPrimary = isDark ? "text-[#f0f0f0]" : "text-[#1a1a1a]";
  const textSecondary = isDark ? "text-gray-500" : "text-gray-400";

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

  // 获取文章
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const posts = await getPosts(locale);
        setArchives(posts.map(transformPost));
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [locale]);

  // 加载状态
  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 className="animate-spin" size={32} />
      </div>
    );
  }

  // 空状态
  if (archives.length === 0) {
    return (
      <div className="text-center py-32">
        <p className={cn("text-sm", textSecondary)}>
          {t('noPosts')}
        </p>
      </div>
    );
  }

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

            {/* 封面图 */}
            {article.cover && (
              <div className="w-full h-40 -mx-8 -mt-8 mb-6 overflow-hidden rounded-t-3xl">
                <img
                  src={article.cover}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            )}

            <div className="flex justify-between items-start mb-12">
              <span className="text-[10px] font-mono opacity-50">{article.date}</span>
            </div>

            <span className={cn("text-[10px] uppercase tracking-widest font-bold mb-4 block", textSecondary)}>
              {article.category}
            </span>

            <h3 className="text-2xl font-bold mb-6 leading-tight group-hover:text-current transition-colors">
              {article.title}
            </h3>

            <p className="text-sm leading-relaxed mb-8 opacity-60 line-clamp-3">
              {article.excerpt}
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
              <a
                href={`/${locale}/post/${article.slug}`}
                className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 group-hover:gap-2 transition-all cursor-pointer"
              >
                {t('readFullPost')} <Sprout size={12} />
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
}
