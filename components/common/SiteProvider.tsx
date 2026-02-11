"use client";

import React, { useState, useEffect, ReactNode } from "react";
import { SiteContext } from "./SiteContext";
import { Spotlight } from "./Spotlight";
import { Navbar } from "./Navbar";
import { ScrollToTop } from "./ScrollToTop";
import { SiteFooter } from "./SiteFooter";

interface SiteProviderProps {
  children: ReactNode;
}

// 内部组件 - 包含所有状态和逻辑
function SiteProviderContent({ children }: SiteProviderProps) {
  // 初始化为 true，服务端和客户端保持一致
  // 在 useEffect 中根据实际情况修正，避免 hydration 不匹配
  const [isDark, setIsDark] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  const [scrolled, setScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // 初始化主题（只在客户端执行一次）
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldBeDark = savedTheme === "dark" || (!savedTheme && prefersDark);
    setIsDark(shouldBeDark);
    setIsInitialized(true);
  }, []);

  // 同步主题状态到 DOM（初始化后执行）
  useEffect(() => {
    if (isInitialized) {
      document.documentElement.classList.toggle("dark", isDark);
    }
  }, [isDark, isInitialized]);

  // 切换主题
  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    if (typeof window !== 'undefined') {
      localStorage.setItem("theme", newIsDark ? "dark" : "light");
    }
  };

  // 滚动和鼠标事件
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      setShowScrollTop(window.scrollY > 500);
    };
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // 背景色和文本颜色直接使用 CSS 变量（由 Tailwind 自动处理深色模式）
  // 无需手动切换，因为 globals.css 中的 :root 和 .dark 已定义对应变量

  return (
    <SiteContext.Provider value={{ isDark, toggleTheme }}>
      <div
        className="min-h-screen transition-colors duration-500 font-sans"
        style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}
      >
        <Spotlight mousePos={mousePos} isDark={isDark} />
        <Navbar scrolled={scrolled} />
        <main className="pt-32 px-8 pb-16 max-w-8xl mx-auto relative z-10">
          {children}
        </main>
        <SiteFooter />
        <ScrollToTop show={showScrollTop} />
      </div>
    </SiteContext.Provider>
  );
}

// 主组件
export function SiteProvider({ children }: SiteProviderProps) {
  return <SiteProviderContent>{children}</SiteProviderContent>;
}
