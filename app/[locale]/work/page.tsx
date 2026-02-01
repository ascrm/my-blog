"use client";

import React from "react";
import { WorkHeader } from "@/components/menu/work/WorkHeader";
import { ProjectList } from "@/components/menu/work/ProjectList";

export default function WorkPage() {
  return (
    <div className="max-w-7xl mx-auto px-8">
      <WorkHeader />
      <ProjectList />
    </div>
  );
}
