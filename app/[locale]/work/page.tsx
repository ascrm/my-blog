"use client";

import React, { useState, useMemo } from "react";
import { WorkHeader } from "@/components/menu/work/WorkHeader";
import { projects } from "@/mocks/work";
import { ProjectList } from "@/components/menu/work/ProjectList";

export default function WorkPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = useMemo(() => {
    if (activeCategory === "All") return projects;
    return projects.filter((p) => p.category.en.includes(activeCategory));
  }, [activeCategory]);

  return (
    <div className="max-w-7xl mx-auto px-6">
      <WorkHeader
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        filteredCount={filteredProjects.length}
      />
      <ProjectList projects={filteredProjects} />
    </div>
  );
}
