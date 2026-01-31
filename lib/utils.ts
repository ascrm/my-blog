import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * 合并 className 的工具函数
 * - 使用 clsx 处理条件 class
 * - 使用 tailwind-merge 合并重复的 Tailwind 类名顺序
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(...inputs));
}
