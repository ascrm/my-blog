import "./globals.css";
import React from "react";
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {routing} from '@/i18n/routing';

// 添加 generateStaticParams 以支持静态生成
export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  // Providing all messages to the client
  const messages = await getMessages();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
