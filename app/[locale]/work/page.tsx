"use client";

import React, { useState, useMemo } from "react";
import { WorkHeader } from "@/components/menu/work/WorkHeader";
import { ProjectList } from "@/components/menu/work/ProjectList";

interface Project {
  id: string;
  type: "video" | "slider" | "image";
  videoIframe?: string;
  images?: string[];
  imageUrl?: string;
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
    type: "video",
    videoIframe:
      "https://player.bilibili.com/player.html?isOutside=true&aid=116007486232628&bvid=BV1bvfDBBE3f&cid=25957372647&p=1&autoplay=0",
    title: { zh: "分布式爬虫系统", en: "Distributed Crawler" },
    category: { zh: "后端 / 基础架构", en: "Backend" },
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
    type: "slider",
    images: [
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=2070",
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=2070",
      "https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&q=80&w=2031",
    ],
    title: { zh: "UI 设计系统", en: "UI Design System" },
    category: { zh: "前端 / 设计", en: "Frontend" },
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
    type: "image",
    imageUrl:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=2070",
    title: { zh: "AI 驱动的代码助手", en: "AI Powered Assistant" },
    category: { zh: "人工智能 / 应用", en: "AI" },
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

export default function WorkPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = useMemo(() => {
    if (activeCategory === "All") return projects;
    return projects.filter((p) => p.category.en.includes(activeCategory));
  }, [activeCategory]);

  return (
    <div className="max-w-7xl mx-auto px-6">
      <WorkHeader
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        filteredCount={filteredProjects.length}
      />
      <ProjectList projects={filteredProjects} />
    </div>
  );
}
