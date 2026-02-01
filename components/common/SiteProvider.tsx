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

// 获取初始主题状态
function getInitialTheme(): boolean {
  if (typeof window === 'undefined') return true;
  const savedTheme = localStorage.getItem("theme");
  return savedTheme === "dark" || 
    (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches);
}

// 内部组件 - 包含所有状态和逻辑
function SiteProviderContent({ children }: SiteProviderProps) {
  const [isDark, setIsDark] = useState(getInitialTheme);
  const [scrolled, setScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // 同步主题状态到 DOM
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  // 切换主题
  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    localStorage.setItem("theme", newIsDark ? "dark" : "light");
  };

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
    <SiteContext.Provider value={{ isDark, toggleTheme }}>
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
