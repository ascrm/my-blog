"use client";

import React from "react";
import { Mail, Github, Linkedin, Twitter, MapPin, Clock, Send } from "lucide-react";
import { useSite } from "@/components/common/SiteContext";
import { cn } from "@/lib/utils";

export function ContactHeader() {
  const { isDark, t } = useSite();

  const textSecondary = isDark ? "text-gray-400" : "text-gray-500";
  const borderColor = isDark ? "border-white/10" : "border-black/10";

  return (
    <header className="mb-32 md:mb-32 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <div className={cn("inline-block px-3 py-1 border rounded-full text-[10px] uppercase tracking-widest mb-10", borderColor)}>
        {t("期待你的联系", "Let's Connect")}
      </div>
      <h2 className={cn("text-5xl md:text-8xl font-bold tracking-tighter mb-8 italic", textSecondary)}>
        {t("联系方式", "Get in Touch")}
      </h2>
      <p className={cn("text-xl md:text-2xl max-w-3xl leading-relaxed", textSecondary)}>
        {t(
          "无论你是想探讨技术、讨论设计，还是仅仅想打个招呼，我都很高兴收到你的消息。",
          "Whether you want to discuss technology, talk about design, or just say hi, I'd love to hear from you."
        )}
      </p>
    </header>
  );
}
