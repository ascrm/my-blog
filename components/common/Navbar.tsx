"use client";

import React from "react";
import { useSite } from "./SiteContext";
import { Sun, Moon, Languages } from "lucide-react";
import { cn } from "@/lib/utils/utils";
import { useTranslations } from "next-intl";
import { useParams, usePathname } from "next/navigation";

interface NavbarProps {
  scrolled: boolean;
}

export function Navbar({ scrolled }: NavbarProps) {
  const { isDark, toggleTheme } = useSite();
  const params = useParams();
  const pathname = usePathname();
  const locale = params.locale as string || 'zh';
  const t = useTranslations('nav');

  // 计算切换后的路径，保持当前页面
  const otherLocale = locale === 'zh' ? 'en' : 'zh';
  const switchHref = pathname.replace(`/${locale}`, `/${otherLocale}`);

  const textMuted = isDark ? "text-gray-500" : "text-gray-400";
  const textMutedHover = isDark ? "hover:text-white" : "hover:text-black";
  const underlineColor = isDark ? "bg-white" : "bg-black";
  const navBg = isDark ? "bg-black/40" : "bg-white/40";
  const navBorder = isDark ? "border-white/5" : "border-black/5";

  const navItems = [
    { key: "home", href: `/${locale}/home` },
    { key: "work", href: `/${locale}/work` },
    { key: "archive", href: `/${locale}/archive` },
    { key: "contact", href: `/${locale}/contact` },
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
          href={`/${locale}/home`}
          className="text-sm font-bold tracking-[0.2em] hover:opacity-70 transition-opacity cursor-pointer"
        >
          CREATOR<span className={textMuted}>.LAB</span>
        </a>

        <div className="flex items-center gap-8">
          {/* 导航链接 */}
          <div className="hidden md:flex gap-10 text-[13px] uppercase tracking-[0.2em] font-semibold">
            {navItems.map((item) => (
              <a
                key={item.key}
                href={item.href}
                className={cn(
                  "transition-colors relative group",
                  textMuted,
                  textMutedHover
                )}
              >
                {t(item.key)}
                <span
                  className={cn(
                    "absolute -bottom-1 left-0 w-0 h-[1px] transition-all group-hover:w-full",
                    underlineColor
                  )}
                ></span>
              </a>
            ))}
          </div>

          {/* 语言切换和主题切换按钮组 */}
          <div className="flex items-center gap-4 border-l pl-8 border-current/10">
            <a
              href={switchHref}
              className="p-2 hover:opacity-60 transition-opacity flex items-center hover:cursor-pointer"
              title="Switch Language"
            >
              <Languages size={18} />
              <span className="text-[10px] font-bold uppercase">
                {locale === "zh" ? "EN" : "中"}
              </span>
            </a>
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
