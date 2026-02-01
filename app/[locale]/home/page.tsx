"use client";

import React from "react";
import { Hero } from "@/components/menu/home/Hero";
import { TechStack } from "@/components/menu/home/TechStack";
import { OffsetSections } from "@/components/menu/home/OffsetSections";

export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-8 pb-32">
      <Hero />
      <TechStack />
      <OffsetSections />
    </div>
  );
}
