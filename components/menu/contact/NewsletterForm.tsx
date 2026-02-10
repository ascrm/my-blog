"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils/utils";
import { useSite } from "@/components/common/SiteContext";
import { useTranslations, useLocale } from "next-intl";

interface NewsletterFormProps {
  className?: string;
}

export function NewsletterForm({ className }: NewsletterFormProps) {
  const { isDark } = useSite();
  const locale = useLocale();
  const t = useTranslations('contact');
  const tCommon = useTranslations('common');

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  // Substack 订阅页面地址
  const SUBSTACK_URL = "https://ascrm.substack.com/subscribe";

  const textSecondary = isDark ? "text-gray-400" : "text-gray-500";
  const borderColor = isDark ? "border-white/10" : "border-black/10";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) return;

    setStatus("loading");

    // 跳转到 Substack 订阅页面，带上 email 参数
    const subscribeUrl = `${SUBSTACK_URL}?email=${encodeURIComponent(email)}`;
    window.open(subscribeUrl, "_blank", "noopener,noreferrer");

    // 显示成功提示
    setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 500);
  };

  return (
    <div className={className}>
      {/* 自定义 UI 表单 */}
      <form onSubmit={handleSubmit}>
        <div
          className={cn(
            "flex gap-4 border-b-2 pb-3 focus-within:border-blue-500 transition-all duration-300",
            borderColor
          )}
        >
          <input
            type="email"
            placeholder={t("subscribePlaceholder")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={cn(
              "flex-grow bg-transparent text-sm focus:outline-none placeholder:opacity-30",
              textSecondary
            )}
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className={cn(
              "text-[10px] font-black uppercase tracking-widest hover:text-blue-500 transition-colors active:scale-90 cursor-pointer",
              status === "loading" && "opacity-50"
            )}
          >
            {status === "loading" ? tCommon("loading") : t("subscribe")}
          </button>
        </div>
      </form>

      {/* 成功提示 */}
      {status === "success" && (
        <div className="mt-4 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
          <p className="text-sm text-emerald-500 font-medium">
            {locale === "zh"
              ? "✓ 已打开订阅页面，请在浏览器新标签页中完成订阅"
              : "✓ Subscription page opened. Please complete subscription in the new tab."}
          </p>
        </div>
      )}

      {/* 提示信息 */}
      <p className={cn("text-xs mt-3 opacity-50", textSecondary)}>
        {locale === "zh"
          ? "订阅周刊后，你将每周收到我的技术文章、设计灵感和生活思考"
          : "Subscribe to receive weekly tech articles, design inspiration and thoughts."}
      </p>
    </div>
  );
}
