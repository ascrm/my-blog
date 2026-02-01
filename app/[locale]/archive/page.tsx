"use client";

import React from "react";
import { ArchiveHeader } from "@/components/menu/archive/ArchiveHeader";
import { ArchiveFeed } from "@/components/menu/archive/ArchiveFeed";

export default function ArchivePage() {
  return (
    <div className="max-w-7xl mx-auto px-8 pb-32">
      <ArchiveHeader />
      <ArchiveFeed />
    </div>
  );
}
