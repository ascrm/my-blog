 "use client";
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

// 主题切换按钮：使用 next-themes 的 useTheme 并用 framer-motion 做旋转动画
export const ThemeToggle = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // 在下一个动画帧再设置 mounted，避免同步 setState 导致的级联渲染警告
    const id = typeof window !== "undefined" ? window.requestAnimationFrame(() => setMounted(true)) : null;
    return () => {
      if (id !== null) window.cancelAnimationFrame(id);
    };
  }, []);

  if (!mounted) return null;

  const isDark = (theme === "dark") || (resolvedTheme === "dark");

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="切换主题"
      className="inline-flex items-center justify-center rounded-md p-2 hover:bg-black/5 dark:hover:bg-white/5 hover:cursor-pointer"
    >
      <motion.div
        animate={{ rotate: isDark ? 40 : 0 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </motion.div>
    </Button>
  );
};

