"use client";

import React, { useState, useEffect, ReactNode } from "react";
import { SiteContext } from "./SiteContext";
import { Background } from "./Background";
import { Navbar } from "./Navbar";
import { ScrollToTop } from "./ScrollToTop";
import { SiteFooter } from "./SiteFooter";

interface SiteProviderProps {
  children: ReactNode;
}

// 内部组件 - 包含所有状态和逻辑
function SiteProviderContent({ children }: SiteProviderProps) {
  const [isDark, setIsDark] = useState(true);
  const [lang, setLang] = useState<"zh" | "en">("zh");
  const [scrolled, setScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // 初始化主题和语言
  useEffect(() => {
    // 初始化主题
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = savedTheme
      ? savedTheme === "dark"
      : window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDark(prefersDark);
    document.documentElement.classList.toggle("dark", prefersDark);

    // 初始化语言
    const savedLang = localStorage.getItem("lang");
    if (savedLang === "zh" || savedLang === "en") {
      setLang(savedLang);
    }
  }, []);

  // 切换主题
  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    localStorage.setItem("theme", newIsDark ? "dark" : "light");
    document.documentElement.classList.toggle("dark", newIsDark);
  };

  // 切换语言
  const toggleLang = () => {
    const newLang = lang === "zh" ? "en" : "zh";
    setLang(newLang);
    localStorage.setItem("lang", newLang);
  };

  // 翻译函数
  const t = (zh: string, en: string) => (lang === "zh" ? zh : en);

  // 滚动和鼠标事件
  useEffect(() => {
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

  // 根据主题设置样式
  const bgColor = isDark ? "#111111" : "#fafafa";
  const textColor = isDark ? "#f0f0f0" : "#1a1a1a";

  return (
    <SiteContext.Provider value={{ lang, isDark, t, toggleLang, toggleTheme }}>
      <div
        className="min-h-screen transition-colors duration-500 font-sans"
        style={{ backgroundColor: bgColor, color: textColor }}
      >
        <Background mousePos={mousePos} isDark={isDark} />
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
