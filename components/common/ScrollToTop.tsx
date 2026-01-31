"use client";

import React from "react";
import { ArrowUp } from "lucide-react";
import { useSite } from "./SiteContext";
import { cn } from "@/lib/utils";

interface ScrollToTopProps {
  show: boolean;
}

export function ScrollToTop({ show }: ScrollToTopProps) {
  const { isDark } = useSite();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      className={cn(
        "fixed bottom-10 right-10 z-50 p-4 rounded-full transition-all duration-500 shadow-2xl",
        show
          ? "translate-y-0 opacity-100 pointer-events-auto"
          : "translate-y-10 opacity-0 pointer-events-none",
        isDark
          ? "bg-white text-black hover:bg-gray-200 border border-white/10 hover:cursor-pointer"
          : "bg-black text-white hover:bg-gray-800 border border-black/10 hover:cursor-pointer"
      )}
      aria-label="Back to top"
    >
      <ArrowUp size={20} />
    </button>
  );
}
