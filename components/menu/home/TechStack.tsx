"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useSite } from "@/components/common/SiteContext";
import { cn } from "@/lib/utils/utils";
import { useTranslations } from "next-intl";
import { Code2, Cpu, Palette } from "lucide-react";

export function TechStack() {
  const t = useTranslations('techStack');
  const { isDark } = useSite();
  const [activeTab, setActiveTab] = useState<'frontend' | 'backend' | 'design'>('frontend');
  const [sliderStyle, setSliderStyle] = useState<React.CSSProperties>({});
  const tabsRef = useRef<Record<string, HTMLButtonElement | null>>({});

  const categories = [
    { id: 'frontend', label: t('frontend'), icon: Code2 },
    { id: 'backend', label: t('backend'), icon: Cpu },
    { id: 'design', label: t('tools'), icon: Palette },
  ];

  interface Skill {
    name: string;
    slug: string;
    color: string;
  }

  const skills: Record<'frontend' | 'backend' | 'design', Skill[]> = {
    frontend: [
      { name: "Next.js", slug: "nextdotjs", color: isDark ? "FFFFFF" : "000000" },
      { name: "React", slug: "react", color: "61DAFB" },
      { name: "Vue", slug: "vuedotjs", color: "4FC08D" },
      { name: "Angular", slug: "angular", color: "DD0031" },
      { name: "Flutter", slug: "flutter", color: "02569B" },
      { name: "TypeScript", slug: "typescript", color: "3178C6" },
      { name: "Vite", slug: "vite", color: "646CFF" },
    ],
    backend: [
      { name: "Java", slug: "openjdk", color: isDark ? "FFFFFF" : "ED8B00" },
      { name: "Spring", slug: "spring", color: "6DB33F" },
      { name: "Node.js", slug: "nodedotjs", color: "339933" },
      { name: "PostgreSQL", slug: "postgresql", color: "4169E1" },
      { name: "MongoDB", slug: "mongodb", color: "47A248" },
      { name: "MySQL", slug: "mysql", color: "4479A1" },
      { name: "Redis", slug: "redis", color: "DC382D" },
      { name: "Docker", slug: "docker", color: "2496ED" },
      { name: "K8s", slug: "kubernetes", color: "326CE5" },
      { name: "Nginx", slug: "nginx", color: "009639" },
    ],
    design: [
      { name: "Git", slug: "git", color: "F05032" },
      { name: "GitHub", slug: "github", color: isDark ? "FFFFFF" : "181717" },
      { name: "GitLab", slug: "gitlab", color: "FC6D26" },
      { name: "Gemini", slug: "googlegemini", color: "4E75E6" },
      { name: "Claude Code", slug: "claude", color: "FC6D26" },
    ]
  };

  useEffect(() => {
    const activeBtn = tabsRef.current[activeTab];
    if (activeBtn) {
      setSliderStyle({
        width: `${activeBtn.offsetWidth}px`,
        transform: `translateX(${activeBtn.offsetLeft}px)`,
      });
    }
  }, [activeTab]);

  return (
    <section className="pb-80 relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-[1px] bg-blue-500" />
              <span className="text-blue-500 font-mono text-xs font-bold uppercase tracking-widest">Capabilities</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase leading-none text-[#2D2A26] dark:text-white">
              {t('title')}
            </h2>
          </div>

          <div className={cn(
            "relative flex p-1.5 rounded-2xl border backdrop-blur-md overflow-hidden",
            isDark ? "bg-white/5 border-white/10" : "bg-white border-black/[0.05]"
          )}>
            <div
              className={cn(
                "absolute top-1.5 bottom-1.5 left-0 rounded-xl transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] shadow-xl",
                isDark ? "bg-white" : "bg-black"
              )}
              style={sliderStyle}
            />

            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeTab === cat.id;
              return (
                <button
                  key={cat.id}
                  ref={(el: HTMLButtonElement | null) => { tabsRef.current[cat.id] = el; }}
                  onClick={() => setActiveTab(cat.id as 'frontend' | 'backend' | 'design')}
                  className={cn(
                    "relative z-10 flex items-center gap-2 px-6 py-2.5 rounded-xl transition-all duration-300 text-xs font-black uppercase tracking-widest active:scale-95 cursor-pointer",
                    isActive
                      ? (isDark ? "text-black" : "text-white")
                      : "text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white"
                  )}
                >
                  <Icon size={14} className={cn("transition-transform duration-300", isActive && "scale-110")} />
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {skills[activeTab].map((skill) => (
            <div
              key={skill.slug}
              className={cn(
                "group flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300",
                isDark
                  ? "bg-white/[0.04] border-white/5 hover:bg-white/[0.08] hover:border-white/15 hover:shadow-2xl hover:shadow-black hover:-translate-y-1"
                  : "bg-white border-black/[0.03] shadow-sm hover:border-black/[0.1] hover:shadow-xl hover:shadow-black/[0.04] hover:-translate-y-1"
              )}
            >
              <div className="relative w-8 h-8 flex-shrink-0">
                <div
                  className="absolute inset-0 blur-lg opacity-0 group-hover:opacity-60 transition-opacity duration-300"
                  style={{ backgroundColor: `#${skill.color}` }}
                />
                <Image
                  key={`${skill.slug}-${skill.color}`}
                  src={`https://cdn.simpleicons.org/${skill.slug}/${skill.color}`}
                  alt={skill.name}
                  fill
                  className="object-contain relative z-10 transition-transform duration-500 group-hover:scale-125 group-hover:rotate-6"
                  unoptimized
                />
              </div>
              <span className="font-bold text-sm tracking-tight text-[#2D2A26] dark:text-white truncate">
                {skill.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
