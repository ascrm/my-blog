"use client";

import React, { useState, useEffect } from "react";
import { Mail, Github, Linkedin, Twitter, Send, User, MessageSquare, ArrowUpRight, CheckCircle2, AlertTriangle } from "lucide-react";
import { NewsletterForm } from "./NewsletterForm";
import { useSite } from "@/components/common/SiteContext";
import { cn } from "@/lib/utils/utils";
import { useTranslations, useLocale } from "next-intl";
import {
  sendContactEmail,
  getLimitStatus,
  updateLimitData,
  getRandomCaptcha,
  MONTHLY_QUOTA,
  RATE_LIMIT,
} from "@/lib/api/emailjs";

const MY_EMAIL = "casrillosylvi@gmail.com";

const contactMethods = [
  {
    icon: Mail,
    labelKey: "email",
    value: MY_EMAIL,
    href: `mailto:${MY_EMAIL}`,
    descriptionKey: "emailDesc",
  },
  {
    icon: Github,
    labelKey: "github",
    value: "@ascrm",
    href: "https://github.com/ascrm",
    descriptionKey: "githubDesc",
  },
  {
    icon: Linkedin,
    labelKey: "linkedin",
    value: "in/ascrm",
    href: "https://linkedin.com/in/ascrm",
    descriptionKey: "linkedinDesc",
  },
  {
    icon: Twitter,
    labelKey: "twitter",
    value: "@ascrm_dev",
    href: "https://twitter.com/ascrm_dev",
    descriptionKey: "twitterDesc",
  },
];

export function ContactInfo() {
  const { isDark } = useSite();
  const locale = useLocale();
  const t = useTranslations('contact');
  const tMethods = useTranslations('contact.methods');

  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [captcha, setCaptcha] = useState("");
  const [captchaQuestion, setCaptchaQuestion] = useState(() => getRandomCaptcha());
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [quotaWarning, setQuotaWarning] = useState(false);

  // 频率限制状态
  const [remainingToday, setRemainingToday] = useState(0);
  const [cooldownEnd, setCooldownEnd] = useState<number | null>(null);
  const [totalSent, setTotalSent] = useState(0);

  // 初始化验证码
  useEffect(() => {
    setCaptchaQuestion(getRandomCaptcha());
  }, []);

  // 从 localStorage 读取限制状态
  useEffect(() => {
    const { remainingToday: remaining, totalSent: sent, quotaWarning: warning } = getLimitStatus();
    setRemainingToday(remaining);
    setTotalSent(sent);
    setQuotaWarning(warning);
  }, []);

  const canSubmit = (errorCallback: (msg: string) => void) => {
    if (quotaWarning || totalSent >= MONTHLY_QUOTA) {
      errorCallback(t('quotaReached'));
      return false;
    }
    if (remainingToday <= 0) {
      errorCallback(t('dailyLimitReached'));
      return false;
    }
    if (cooldownEnd && cooldownEnd > Date.now()) {
      const minutes = Math.ceil((cooldownEnd - Date.now()) / 60000);
      errorCallback(t('cooldownMessage', { minutes }));
      return false;
    }
    if (captcha !== captchaQuestion.answer) {
      errorCallback(t('captchaError'));
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!canSubmit((msg) => setError(msg))) return;

    setSending(true);

    try {
      await sendContactEmail({
        name: formData.name,
        email: formData.email,
        message: formData.message,
      });

      const updateResult = updateLimitData();
      setRemainingToday(updateResult.remainingToday);
      setTotalSent(updateResult.totalSent);
      setCooldownEnd(updateResult.cooldownEnd);
      setQuotaWarning(updateResult.quotaWarning);

      setSent(true);
      setFormData({ name: "", email: "", message: "" });
      setCaptcha("");

      // 重置验证码
      setCaptchaQuestion(getRandomCaptcha());

      setTimeout(() => setSent(false), 3000);
    } catch (error) {
      console.error('发送失败:', error);
      setError(t('sendError'));
    } finally {
      setSending(false);
    }
  };

  const borderColor = isDark ? "border-white/10" : "border-black/10";
  const borderFocus = isDark ? "focus:border-blue-500/50" : "focus:border-blue-500/50";
  const bgSubtle = isDark ? "bg-white/[0.02]" : "bg-black/[0.02]";
  const bgHover = isDark ? "hover:bg-white/[0.03]" : "hover:bg-black/[0.03]";
  const textSecondary = isDark ? "text-gray-400" : "text-gray-500";
  const iconBg = isDark ? "bg-white/5" : "bg-black/5";
  const inputBg = isDark ? "bg-zinc-900/50" : "bg-zinc-100/50";
  const btnBg = isDark ? "bg-white text-black" : "bg-black text-white";

  const currentCaptchaText = locale === 'zh' ? captchaQuestion.question.zh : captchaQuestion.question.en;

  return (
    <div className="grid lg:grid-cols-12 gap-12">
      {/* 联系卡片 */}
      <div className="lg:col-span-7 space-y-6">
        <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-30 mb-8">
          {t('contactMethods')}
        </h3>
        <div className="grid sm:grid-cols-2 gap-6">
          {contactMethods.map((method, idx) => (
            <a
              key={idx}
              href={method.href}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "p-10 rounded-[2.5rem] border transition-all duration-500 group cursor-pointer",
                borderColor,
                bgSubtle,
                bgHover
              )}
            >
              <div className={cn(
                "w-14 h-14 rounded-2xl flex items-center justify-center mb-8 transition-transform duration-500 group-hover:scale-110",
                iconBg
              )}>
                <method.icon size={26} className="opacity-40 group-hover:opacity-100 group-hover:text-blue-500 transition-all" />
              </div>
              <h4 className="text-xl font-bold mb-2">{tMethods(`${method.labelKey}.label`)}</h4>
              <p className="text-sm font-mono opacity-60 mb-3 tracking-tight">{method.value}</p>
              <p className={cn("text-xs font-medium", textSecondary)}>
                {tMethods(`${method.labelKey}.description`)}
              </p>
            </a>
          ))}
        </div>

        {/* 邮件订阅卡片 */}
        <div className={cn(
          "p-10 rounded-[2.5rem] border mt-8",
          borderColor,
          isDark ? "bg-gradient-to-br from-blue-500/10 to-emerald-500/5" : "bg-gradient-to-br from-blue-500/5 to-emerald-500/5"
        )}>
          <div className="flex items-center gap-4 mb-6">
            <div className={cn("p-3 rounded-xl", iconBg)}>
              <Send size={20} className="text-blue-500" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">
              {t('newsletter')}
            </span>
          </div>
          <p className="text-2xl font-bold mb-4 tracking-tight">
            {t('getNewsletter')}
          </p>
          <p className={cn("text-sm leading-relaxed mb-8 max-w-md", textSecondary)}>
            {t('newsletterDescription')}
          </p>
          <NewsletterForm />
        </div>

        {/* 配额提示 */}
        {quotaWarning && (
          <div className={cn(
            "p-6 rounded-2xl border flex items-center gap-4",
            isDark ? "bg-amber-500/10 border-amber-500/30" : "bg-amber-50 border-amber-200"
          )}>
            <AlertTriangle size={24} className="text-amber-500 flex-shrink-0" />
            <div>
              <p className={cn("text-sm font-bold", isDark ? "text-amber-400" : "text-amber-700")}>
                {t('quotaLow')}
              </p>
              <p className={cn("text-xs opacity-70", textSecondary)}>
                {t('quotaLowDesc')}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* 联系表单 */}
      <div className="lg:col-span-5">
        <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-30 mb-8">
          {t('sendMessage')}
        </h3>

        {/* 剩余发送次数 */}
        <div className="mb-6 flex items-center justify-between">
          <span className={cn("text-xs font-mono", textSecondary)}>
            {t('remainingToday')}: {remainingToday}/{RATE_LIMIT.maxPerDay}
          </span>
          <span className={cn("text-xs font-mono", textSecondary)}>
            {t('monthlyUsed')}: {totalSent}/{MONTHLY_QUOTA}
          </span>
        </div>

        <div className={cn(
          "p-10 rounded-[2.5rem] border backdrop-blur-sm relative overflow-hidden",
          borderColor,
          bgSubtle
        )}>
          {sent ? (
            <div className="text-center py-16 animate-success-pop">
              <div className={cn(
                "w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8 border",
                isDark ? "bg-emerald-500/10 border-emerald-500/20" : "bg-emerald-500/10 border-emerald-500/20"
              )}>
                <CheckCircle2 size={40} className="text-emerald-500" />
              </div>
              <h4 className="text-3xl font-bold mb-4 tracking-tighter">
                {t('messageSent')}
              </h4>
              <p className={cn("text-sm mb-10", textSecondary)}>
                {t('messageSentDescription')}
              </p>
              <button
                onClick={() => setSent(false)}
                className={cn(
                  "px-8 py-3 rounded-xl border text-xs font-bold uppercase tracking-widest transition-all active:scale-95 cursor-pointer",
                  isDark
                    ? "border-white/10 hover:bg-white hover:text-black"
                    : "border-black/10 hover:bg-black hover:text-white"
                )}
              >
                {t('returnForm')}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* 错误提示 */}
              {error && (
                <div className={cn(
                  "p-4 rounded-xl text-sm border animate-shake",
                  isDark ? "bg-red-500/10 border-red-500/30 text-red-400" : "bg-red-50 border-red-200 text-red-600"
                )}>
                  {error}
                </div>
              )}

              <div className="space-y-6">
                {/* 名字和邮箱输入框 */}
                {[
                  { id: 'name', labelKey: 'name', placeholderKey: 'namePlaceholder', icon: User, type: 'text' as const },
                  { id: 'email', labelKey: 'email', placeholderKey: 'emailPlaceholder', icon: Mail, type: 'email' as const }
                ].map((field) => (
                  <div key={field.id} className="group space-y-3">
                    <label className={cn(
                      "flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all duration-300 transform",
                      isDark ? "opacity-40 group-focus-within:opacity-100 group-focus-within:text-blue-500" : "opacity-40 group-focus-within:opacity-100 group-focus-within:text-blue-500",
                      "group-focus-within:translate-x-1"
                    )}>
                      <field.icon size={12} />
                      {t(field.labelKey as any)}
                    </label>
                    <input
                      required
                      type={field.type}
                      value={formData[field.id as keyof typeof formData]}
                      onChange={(e) => setFormData({ ...formData, [field.id]: e.target.value })}
                      placeholder={t(field.placeholderKey as any)}
                      className={cn(
                        "w-full px-5 h-14 rounded-2xl text-sm border transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/10",
                        inputBg,
                        borderColor,
                        borderFocus,
                        textSecondary
                      )}
                    />
                  </div>
                ))}

                {/* 消息输入框 */}
                <div className="group space-y-3">
                  <label className={cn(
                    "flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all duration-300 transform",
                    isDark ? "opacity-40 group-focus-within:opacity-100 group-focus-within:text-blue-500" : "opacity-40 group-focus-within:opacity-100 group-focus-within:text-blue-500",
                    "group-focus-within:translate-x-1"
                  )}>
                    <MessageSquare size={12} />
                    {t('messageLabel')}
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={t('messagePlaceholder')}
                    className={cn(
                      "w-full px-5 py-4 rounded-2xl text-sm border transition-all duration-300 resize-none focus:outline-none focus:ring-4 focus:ring-blue-500/10",
                      inputBg,
                      borderColor,
                      borderFocus,
                      textSecondary
                    )}
                  />
                </div>

                {/* 验证码 */}
                <div className="group space-y-3">
                  <label className={cn(
                    "flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all duration-300 transform",
                    isDark ? "opacity-40 group-focus-within:opacity-100 group-focus-within:text-blue-500" : "opacity-40 group-focus-within:opacity-100 group-focus-within:text-blue-500",
                    "group-focus-within:translate-x-1"
                  )}>
                    <AlertTriangle size={12} />
                    {t('verifyHuman')}
                  </label>
                  <div className="flex items-center gap-3">
                    <span className={cn("text-sm font-mono whitespace-nowrap", textSecondary)}>
                      {currentCaptchaText}
                    </span>
                    <input
                      type="text"
                      value={captcha}
                      onChange={(e) => setCaptcha(e.target.value)}
                      placeholder="?"
                      className={cn(
                        "flex-1 px-5 h-14 rounded-2xl text-sm border transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/10",
                        inputBg,
                        borderColor,
                        borderFocus,
                        textSecondary
                      )}
                    />
                  </div>
                </div>
              </div>

              {/* 发送按钮 */}
              <button
                type="submit"
                disabled={sending || remainingToday <= 0 || totalSent >= MONTHLY_QUOTA}
                className={cn(
                  "relative w-full h-16 rounded-2xl font-black text-xs uppercase tracking-[0.3em] flex items-center justify-center gap-3 transition-all duration-300 active:scale-[0.98] cursor-pointer overflow-hidden group",
                  sending ? "opacity-80" : "",
                  (remainingToday <= 0 || totalSent >= MONTHLY_QUOTA) ? "opacity-50 cursor-not-allowed" : "",
                  btnBg
                )}
              >
                {/* Hover时的反光扫过动画 */}
                <div className="absolute inset-0 w-1/2 h-full bg-white/20 -skew-x-[45deg] -translate-x-[150%] group-hover:translate-x-[250%] transition-transform duration-1000 ease-in-out pointer-events-none" />

                {sending ? (
                  <div className="flex items-center gap-3">
                    <div className="relative w-5 h-5">
                      <div className={cn("absolute inset-0 border-2 border-current/20 rounded-full", isDark ? "border-white/20" : "border-black/20")} />
                      <div className="absolute inset-0 border-2 border-current border-t-transparent rounded-full animate-spin-smooth" />
                    </div>
                    <span className="animate-pulse">{t('sending')}</span>
                  </div>
                ) : remainingToday <= 0 ? (
                  <span>{t('limitReached')}</span>
                ) : totalSent >= MONTHLY_QUOTA ? (
                  <span>{t('quotaReached')}</span>
                ) : (
                  <>
                    <span className="group-hover:translate-x-[-4px] transition-transform duration-300">
                      {t('sendButton')}
                    </span>
                    <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:translate-y-[-4px] transition-transform duration-300" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
