"use client";

import React from "react";
import Link from "next/link";
import { Github, Linkedin, MessageSquare, Twitter } from "lucide-react";
import { useSite } from "@/components/common/SiteContext";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

export function SiteFooter() {
  const { isDark } = useSite();
  const params = useParams();
  const locale = params.locale as string || 'zh';
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');

  const borderColor = isDark ? "border-white/5" : "border-black/5";
  const bgSubtle = isDark ? "bg-white/[0.03]" : "bg-black/[0.03]";
  const textPrimary = isDark ? "text-white" : "text-black";
  const textSecondary = isDark ? "text-gray-400" : "text-gray-600";
  const textMuted = isDark ? "text-gray-500" : "text-gray-400";
  const bgColor = isDark ? "bg-[#080808]" : "bg-[#eee]";

  const navItems = [
    { key: "home", href: `/${locale}/home` },
    { key: "work", href: `/${locale}/work` },
    { key: "archive", href: `/${locale}/archive` },
    { key: "resume", href: "#" },
  ];

  return (
    <footer className={cn("relative py-32 px-8 border-t overflow-hidden", bgColor, borderColor)}>
      {/* 背景装饰大文字 */}
      <div className={cn(
        "absolute -bottom-10 -left-10 text-[15rem] font-black opacity-[0.1] select-none pointer-events-none italic tracking-tighter",
        isDark ? "text-white" : "text-black"
      )}>
        ASCRM
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-24">
          {/* 左侧品牌 */}
          <div className="md:col-span-6">
            <div className="text-5xl font-black mb-6 uppercase tracking-tighter italic">
              Zhang<span className="text-blue-500">_</span>Hengyuan
            </div>
            <p className="max-w-sm text-base leading-relaxed opacity-50 mb-8">
              {t('description')}
            </p>
            <div className="flex gap-4">
              {[Github, Linkedin, Twitter, MessageSquare].map((Icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  className={cn(
                    "p-3 rounded-full border cursor-pointer hover:scale-110 transition-all",
                    borderColor,
                    isDark
                      ? "hover:bg-white hover:text-black"
                      : "hover:bg-black hover:text-white"
                  )}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* 右侧导航 */}
          <div className="md:col-span-3">
            <h4 className="text-[14px] font-bold uppercase tracking-[0.3em] mb-8 opacity-30">
              {t('quickLinks')}
            </h4>
            <ul className="space-y-4 text-base font-medium">
              {navItems.map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    className="hover:translate-x-2 transition-transform cursor-pointer opacity-60 hover:opacity-100 flex items-center gap-2"
                  >
                    <div className="w-1 h-1 rounded-full bg-blue-500"></div>
                    {tNav(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 右侧状态 */}
          <div className="md:col-span-3">
            <h4 className="text-[14px] font-bold uppercase tracking-[0.3em] mb-8 opacity-30">
              {t('status')}
            </h4>
            <div className="flex flex-col gap-4">
              <div className={cn("p-4 border rounded-xl", borderColor, bgSubtle)}>
                <div className="text-[12px] uppercase opacity-40 mb-1">
                  {t('availability')}
                </div>
                <div className="text-sm font-bold text-emerald-500">
                  {t('acceptingProjects')}
                </div>
              </div>
              <div className={cn("p-4 border rounded-xl", borderColor, bgSubtle)}>
                <div className="text-[12px] uppercase opacity-40 mb-1">
                  {t('lastUpdated')}
                </div>
                <div className="text-sm font-bold font-mono">2026.01.31</div>
              </div>
            </div>
          </div>
        </div>

        {/* 底部栏：信息全部靠右对齐 */}
          <div className="flex flex-col items-end pt-12  gap-4">
            <div className="flex gap-8 text-[12px] font-bold uppercase tracking-widest opacity-30">
              <a href="#" className="hover:opacity-100 transition-opacity underline decoration-blue-500/50 underline-offset-4 italic">
                {t('privacy')}
              </a>
              <a href="#" className="hover:opacity-100 transition-opacity underline decoration-blue-500/50 underline-offset-4 italic">
                {t('terms')}
              </a>
            </div>
            <div className="text-[12px] font-mono opacity-30 tracking-widest uppercase">
              © 2026 Zhang Hengyuan. {t('copyright')}
            </div>
          </div>
      </div>
    </footer>
  );
}
