"use client";

import React from "react";
import { SiteProvider as Provider } from "@/components/common/SiteProvider";

export default function SiteLayout({
  children
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  return (
    <Provider>
      {children}
    </Provider>
  );
}
