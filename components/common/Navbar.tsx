"use client";

import React from "react";
import { useSite } from "./SiteContext";
import { Sun, Moon, Languages } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavbarProps {
  scrolled: boolean;
}

export function Navbar({ scrolled }: NavbarProps) {
  const { lang, isDark, toggleLang, toggleTheme, t } = useSite();

  const textMuted = isDark ? "text-gray-500" : "text-gray-400";
  const textMutedHover = isDark ? "hover:text-white" : "hover:text-black";
  const underlineColor = isDark ? "bg-white" : "bg-black";
  const navBg = isDark ? "bg-black/40" : "bg-white/40";
  const navBorder = isDark ? "border-white/5" : "border-black/5";

  const navItems = [
    { zh: "首页", en: "Home", href: "/home" },
    { zh: "作品", en: "Work", href: "/work" },
    { zh: "归档", en: "Archive", href: "/archive" },
    { zh: "联系", en: "Contact", href: "/contact" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-500",
        scrolled
          ? cn(navBg, "backdrop-blur-xl", navBorder, "border-b py-4")
          : "py-10 bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-8 flex justify-between items-center">
        <a
          href="/home"
          className="text-sm font-bold tracking-[0.2em] hover:opacity-70 transition-opacity cursor-pointer"
        >
          CREATOR<span className={textMuted}>.LAB</span>
        </a>

        <div className="flex items-center gap-8">
          {/* 导航链接 */}
          <div className="hidden md:flex gap-10 text-[13px] uppercase tracking-[0.2em] font-semibold">
            {navItems.map((item) => (
              <a
                key={item.zh}
                href={item.href}
                className={cn(
                  "transition-colors relative group",
                  textMuted,
                  textMutedHover
                )}
              >
                {t(item.zh, item.en)}
                <span
                  className={cn(
                    "absolute -bottom-1 left-0 w-0 h-[1px] transition-all group-hover:w-full",
                    underlineColor
                  )}
                ></span>
              </a>
            ))}
          </div>

          {/* 切换按钮组 */}
          <div className="flex items-center gap-4 border-l pl-8 border-current/10">
            <button
              onClick={toggleLang}
              className="p-2 hover:opacity-60 transition-opacity flex items-center hover:cursor-pointer"
              title="Switch Language"
            >
              <Languages size={18} />
              <span className="text-[10px] font-bold uppercase">
                {lang === "zh" ? "EN" : "中"}
              </span>
            </button>
            <button
              onClick={toggleTheme}
              className="p-2 hover:opacity-60 transition-opacity hover:cursor-pointer"
              title="Toggle Theme"
            >
              {isDark ? <Sun size={18} /> : <Moon size={16} />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
