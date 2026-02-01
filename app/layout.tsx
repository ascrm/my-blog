import "./globals.css";
import { ThemeProvider } from "@/components/common/theme-provider";
import React from "react";
import { Sora, Inter, Noto_Serif_SC } from "next/font/google";
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {routing} from '@/i18n/routing';

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const notoSerifSC = Noto_Serif_SC({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-serif-sc",
});

// 添加 generateStaticParams 以支持静态生成
export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale: paramsLocale} = await params;
  // Ensure that the incoming `locale` is valid, otherwise use default
  const locale = routing.locales.includes(paramsLocale as any)
    ? paramsLocale 
    : routing.defaultLocale;

  // Providing all messages to the client
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${sora.variable} ${inter.variable} ${notoSerifSC.variable} font-inter`}>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
            <main>{children}</main>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
