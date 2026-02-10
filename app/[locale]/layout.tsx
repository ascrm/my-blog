"use client";

import React from "react";
import { SiteProvider as Provider } from "@/components/common/SiteProvider";

export default function SiteLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider>
      {children}
    </Provider>
  );
}
