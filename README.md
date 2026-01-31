# my-blog-3.0

一个简洁的个人博客系统，专注于 Web 端的阅读体验。

## 特性

- **Web Only** - 本项目仅针对桌面端浏览器优化，不支持移动端适配
- **MDX 内容管理** - 使用 MDX 编写文章，支持 React 组件嵌入
- **深色模式** - 完整的主题切换支持
- **响应式布局** - 基于 CSS Grid 的 12 列自适应布局
- **TypeScript** - 全类型安全保障
- **轻量级** - 依赖精简，性能优先

## 技术栈

- **框架**: Next.js 16 (App Router)
- **语言**: TypeScript 5
- **样式**: Tailwind CSS 4
- **UI 组件**: Radix UI + shadcn/ui
- **内容**: MDX + gray-matter
- **动画**: Framer Motion
- **主题**: next-themes

## 项目结构

```
my-blog-3.0/
├── app/
│   ├── (site)/           # 主站点路由组
│   │   ├── home/         # 首页
│   │   └── archive/      # 归档页
│   ├── page.tsx          # 入口页
│   └── layout.tsx        # 根布局
├── components/
│   ├── common/           # 通用组件
│   ├── posts/            # 文章相关组件
│   └── ui/               # UI 组件库
├── content/posts/        # MDX 文章文件
├── lib/                  # 工具函数
└── public/               # 静态资源
```

## 快速开始

```bash
# 安装依赖
npm install

# 开发模式
npm run dev

# 构建生产版本
npm run build

# 启动生产服务器
npm run start

# 代码检查
npm run lint
```

## 写作文章

在 `content/posts/` 目录下创建 `.mdx` 文件：

```mdx
---
title: "文章标题"
date: "2026-01-01"
description: "文章描述"
tags: ["tag1", "tag2"]
cover: "/images/cover.jpg"
---

这里是文章正文...
```

## 部署

推荐部署到 Vercel：

```bash
# 构建并推送到 GitHub
git add .
git commit -m "Update"
git push

# Vercel 会自动部署
```

## License

MIT
