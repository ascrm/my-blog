"use client";

import React, { useState, useMemo } from "react";
import { ArchiveHeader } from "@/components/menu/archive/ArchiveHeader";
import { MOCK_ARCHIVES, ARCHIVE_CATEGORIES, ARCHIVE_YEARS } from "@/mocks/archive";
import { ArchiveFeed } from "@/components/menu/archive/ArchiveFeed";

export default function ArchivePage() {
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedYear, setSelectedYear] = useState("All");

  // 过滤逻辑
  const filteredArchives = useMemo(() => {
    return MOCK_ARCHIVES.filter((article) => {
      const matchesSearch =
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = selectedCategory === "All" || article.category === selectedCategory;
      const matchesYear = selectedYear === "All" || article.year === selectedYear;

      return matchesSearch && matchesCategory && matchesYear;
    });
  }, [searchQuery, selectedCategory, selectedYear]);

  const headerProps = {
    isSearching,
    setIsSearching,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedYear,
    setSelectedYear,
    categories: ARCHIVE_CATEGORIES,
    years: ARCHIVE_YEARS,
  };

  return (
    <div className="max-w-7xl mx-auto px-8">
      <ArchiveHeader {...headerProps} />
      <ArchiveFeed archives={filteredArchives} />
    </div>
  );
}
