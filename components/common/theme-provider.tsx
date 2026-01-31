 "use client";
import React from "react";
import { ThemeProvider as NextThemeProvider } from "next-themes";

// 客户端 ThemeProvider：使用 next-themes 管理 class-based 主题切换
export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <NextThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </NextThemeProvider>
  );
};

