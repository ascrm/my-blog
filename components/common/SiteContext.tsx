"use client";

import { createContext, useContext } from "react";

export type Language = "zh" | "en";

interface SiteContextType {
  lang: Language;
  isDark: boolean;
  t: (zh: string, en: string) => string;
  toggleLang: () => void;
  toggleTheme: () => void;
}

export const SiteContext = createContext<SiteContextType | null>(null);

export function useSite() {
  const context = useContext(SiteContext);
  if (context === null) {
    throw new Error("useSite must be used within a SiteProvider");
  }
  return context;
}
