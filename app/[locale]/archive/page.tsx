"use client";

import React, { useState, useMemo } from "react";
import { ArchiveHeader, ArchiveHeaderProps } from "@/components/menu/archive/ArchiveHeader";
import { ArchiveFeed } from "@/components/menu/archive/ArchiveFeed";

// 模拟数据
const MOCK_ARCHIVES = [
  {
    date: "2024.05.20",
    year: "2024",
    title: "深度解析现代前端工程化架构演进：从单体应用到微前端再到生成式 UI 的全路径探索与实践指南",
    excerpt: "探索 AI 如何重塑我们构建界面（UI）的方式，从静态组件转向基于用户意图的动态体验。",
    category: "Engineering",
    status: "Evergreen" as const,
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
    status: "Sprouting" as const,
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
    status: "Evolving" as const,
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
    status: "Evergreen" as const,
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
    status: "Fading" as const,
    views: "1.1k",
    slug: "typography-basics",
    cover: null,
  },
];

// 提取唯一的分类和年份用于筛选器
const categories = [...new Set(MOCK_ARCHIVES.map((a) => a.category))].sort();
const years = [...new Set(MOCK_ARCHIVES.map((a) => a.year))].sort((a, b) => b.localeCompare(a));

export default function ArchivePage() {
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedYear, setSelectedYear] = useState("All");

  // 过滤逻辑
  const filteredArchives = useMemo(() => {
    return MOCK_ARCHIVES.filter((article) => {
      const matchesSearch =
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = selectedCategory === "All" || article.category === selectedCategory;
      const matchesYear = selectedYear === "All" || article.year === selectedYear;

      return matchesSearch && matchesCategory && matchesYear;
    });
  }, [searchQuery, selectedCategory, selectedYear]);

  const headerProps: ArchiveHeaderProps = {
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
  };

  return (
    <div className="max-w-7xl mx-auto px-8">
      <ArchiveHeader {...headerProps} />
      <ArchiveFeed archives={filteredArchives} />
    </div>
  );
}
