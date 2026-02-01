"use client";

import { createContext, useContext } from "react";

interface SiteContextType {
  isDark: boolean;
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
