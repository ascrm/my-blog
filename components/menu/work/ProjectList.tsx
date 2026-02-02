"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { useSite } from "@/components/common/SiteContext";
import { cn } from "@/lib/utils/utils";
import { useLocale, useTranslations } from "next-intl";

interface Project {
  id: string;
  title: { zh: string; en: string };
  category: { zh: string; en: string };
  desc: { zh: string; en: string };
  details: { zh: string; en: string };
  tags: string[];
  year: string;
}

const projects: Project[] = [
  {
    id: "01",
    title: { zh: "分布式爬虫系统", en: "Distributed Crawler" },
    category: { zh: "后端 / 基础架构", en: "Backend / Infrastructure" },
    desc: {
      zh: "基于 Go 语言的分布式爬虫系统，实现了高并发下的任务调度与动态代理池管理。",
      en: "Distributed crawler system based on Go, implementing high-concurrency task scheduling.",
    },
    details: {
      zh: "该项目解决了大规模数据抓取过程中的反爬识别与数据清洗瓶颈。采用 gRPC 通讯协议实现集群管理，支持动态扩展节点，日均处理数据量千万级。",
      en: "This project solves anti-crawling and data cleaning bottlenecks. Uses gRPC for cluster management, processing millions of rows daily.",
    },
    tags: ["Go", "Redis", "gRPC", "K8s"],
    year: "2023",
  },
  {
    id: "02",
    title: { zh: "UI 设计系统", en: "UI Design System" },
    category: { zh: "前端 / 设计", en: "Frontend / Design" },
    desc: {
      zh: "为企业级应用设计的轻量级组件库，基于 Tailwind CSS，支持高度自定义。",
      en: "Lightweight component library designed for enterprise apps, based on Tailwind CSS.",
    },
    details: {
      zh: "从原子设计理论出发，构建了支持多主题切换的 UI 组件库。通过高度封装的 API 大幅提升了开发团队的 UI 交付效率，并确保了视觉一致性。",
      en: "Built a multi-theme UI component library based on atomic design principles. Improved delivery efficiency via encapsulated APIs.",
    },
    tags: ["React", "Tailwind", "Radix UI", "TypeScript"],
    year: "2024",
  },
  {
    id: "03",
    title: { zh: "AI 驱动的代码助手", en: "AI Powered Assistant" },
    category: { zh: "人工智能 / 应用", en: "AI / Application" },
    desc: {
      zh: "结合 LLM 的代码智能分析工具，通过向量数据库实现企业级代码库的精准检索。",
      en: "Intelligent code analysis tool using LLMs and vector databases.",
    },
    details: {
      zh: "利用 Next.js 作为前端底座，整合了 RAG 架构，帮助开发者在万行代码中快速定位逻辑。支持自动化生成技术文档与单元测试。",
      en: "Integrated RAG architecture with Next.js to help developers locate logic. Supports automated generation of documentation.",
    },
    tags: ["Next.js", "Python", "OpenAI", "Pinecone"],
    year: "2024",
  },
];

export function ProjectList() {
  const { isDark } = useSite();
  const locale = useLocale();
  const t = useTranslations('projectList');

  const textSecondary = isDark ? "text-gray-400" : "text-gray-500";
  const textMuted = isDark ? "text-gray-500" : "text-gray-400";
  const textMutedLight = isDark ? "text-gray-600" : "text-gray-400";
  const borderColor = isDark ? "border-white/5" : "border-black/5";
  const bgCard = isDark ? "bg-white/5 border-white/5" : "bg-black/5 border-black/5";
  const bgBadge = isDark ? "bg-white/5 border-white/10" : "bg-black/5 border-black/10";
  const textPrimary = isDark ? "text-[#f0f0f0]" : "text-[#1a1a1a]";

  // 辅助函数获取本地化文本
  const getLocalizedText = (zh: string, en: string) => locale === 'zh' ? zh : en;

  return (
    <div className="space-y-64 pb-32">
      {projects.map((p, i) => (
        <div
          key={p.id}
          className="group relative animate-in fade-in slide-in-from-bottom-12 duration-1000 fill-mode-both"
          style={{ animationDelay: `${i * 150}ms` }}
        >
          {/* 大图展示区 */}
          <div
            className={cn(
              "w-full aspect-[21/9] rounded-3xl border mb-16 overflow-hidden relative transition-all duration-700 group-hover:scale-[1.01] shadow-2xl",
              bgCard
            )}
          >
            <div
              className={cn(
                "absolute inset-0 flex items-center justify-center text-[200px] font-black opacity-[0.03] select-none",
                textPrimary
              )}
            >
              {p.id}
            </div>
            <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-40 transition-opacity">
              <span className="text-sm font-mono tracking-[0.5em] uppercase"></span>
            </div>
            <div className="absolute bottom-10 right-10 flex gap-4">
              <div
                className={cn(
                  "px-4 py-2 rounded-full border backdrop-blur-md text-[10px] font-bold tracking-widest",
                  bgBadge
                )}
              >
                YEAR — {p.year}
              </div>
            </div>
          </div>

          {/* 详情描述区 */}
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-24">
            <div className="lg:col-span-5">
              <div className="flex items-center gap-3 mb-6">
                <span
                  className={cn(
                    "text-[10px] font-mono tracking-[0.3em] uppercase block",
                    textMutedLight
                  )}
                >
                  {getLocalizedText(p.category.zh, p.category.en)}
                </span>
                <div className={cn("h-[1px] w-8", isDark ? "bg-white/20" : "bg-black/20")}></div>
              </div>
              <h3 className={cn("text-4xl md:text-5xl font-bold mb-8", textPrimary)}>
                {getLocalizedText(p.title.zh, p.title.en)}
              </h3>
              <div className="flex flex-wrap gap-2 mb-8">
                {p.tags.map((tag) => (
                  <span
                    key={tag}
                    className={cn(
                      "text-[9px] border px-4 py-1.5 rounded-full uppercase tracking-widest font-bold",
                      bgBadge
                    )}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <button
                className={cn(
                  "flex items-center gap-3 px-6 py-3 rounded-full text-xs font-bold transition-all cursor-pointer",
                  isDark ? "bg-white text-black hover:bg-gray-200" : "bg-black text-white hover:bg-gray-800"
                )}
              >
                {t('visitProject')} <ExternalLink size={14} />
              </button>
            </div>

            <div className="lg:col-span-7 flex flex-col justify-end">
              <div className={cn("mb-8 pb-8 border-b", borderColor)}>
                <h4 className="text-xs font-bold uppercase tracking-widest mb-4 opacity-50">
                  {t('techSpecs')}
                </h4>
                <p className={cn("text-xl md:text-2xl leading-relaxed font-medium mb-6", textPrimary)}>
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
