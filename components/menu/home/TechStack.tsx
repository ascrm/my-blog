"use client";

import React from "react";
import { useSite } from "@/components/common/SiteContext";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

const skills = [
  { name: "Next.js", icon: "https://cdn.simpleicons.org/nextdotjs/white" },
  { name: "React", icon: "https://cdn.simpleicons.org/react/61DAFB" },
  { name: "TypeScript", icon: "https://cdn.simpleicons.org/typescript/3178C6" },
  { name: "Tailwind", icon: "https://cdn.simpleicons.org/tailwindcss/06B6D4" },
  { name: "Node.js", icon: "https://cdn.simpleicons.org/nodedotjs/339933" },
  { name: "Go", icon: "https://cdn.simpleicons.org/go/00ADD8" },
  { name: "PostgreSQL", icon: "https://cdn.simpleicons.org/postgresql/4169E1" },
  { name: "Figma", icon: "https://cdn.simpleicons.org/figma/F24E1E" },
  { name: "Docker", icon: "https://cdn.simpleicons.org/docker/2496ED" },
  { name: "Redis", icon: "https://cdn.simpleicons.org/redis/DC382D" },
  { name: "GraphQL", icon: "https://cdn.simpleicons.org/graphql/E10098" },
  { name: "Kubernetes", icon: "https://cdn.simpleicons.org/kubernetes/326CE5" },
];

export function TechStack() {
  const { isDark } = useSite();
  const t = useTranslations('techStack');

  const borderColor = isDark ? "border-white/5" : "border-black/5";
  const bgSubtle = isDark ? "bg-white/[0.02]" : "bg-black/[0.02]";
  const hoverBorderColor = isDark ? "hover:border-white/20" : "hover:border-black/20";
  const bgHover = isDark ? "hover:bg-white/[0.05]" : "hover:bg-black/[0.05]";
  const textOpacity = isDark ? "opacity-40 group-hover:opacity-100" : "opacity-40 group-hover:opacity-100";
  const iconFilter = isDark ? "grayscale brightness-200 group-hover:grayscale-0" : "grayscale group-hover:grayscale-0";

  return (
    <section className="py-32">
      <h2 className="text-xs font-bold tracking-[0.5em] uppercase opacity-20 mb-12 italic">
        {t('title')}
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {skills.map((skill, idx) => (
          <div
            key={idx}
            className={cn(
              "group flex flex-col items-center justify-center p-6 border rounded-xl transition-all duration-300 hover:-translate-y-1",
              borderColor,
              bgSubtle,
              hoverBorderColor,
              bgHover
            )}
          >
            <img
              src={skill.icon}
              alt={skill.name}
              className={cn("w-8 h-8 mb-4 filter transition-all", iconFilter)}
            />
            <span className={cn("text-[10px] font-mono tracking-wider transition-opacity", textOpacity)}>
              {skill.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
