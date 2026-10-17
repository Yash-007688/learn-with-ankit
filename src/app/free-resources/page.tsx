"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  Sparkles,
  FileText,
  DownloadCloud,
  Search,
  BookOpen,
  ExternalLink,
  ArrowRight,
  Layers,
  GraduationCap,
  X,
  FileCheck2,
  FileSpreadsheet,
  FileQuestion,
  MessageSquare
} from "lucide-react";
import Footer from "@/components/Footer";

interface FreeResource {
  id: number;
  title: string;
  category: string;
  target_class: string;
  file_url: string;
  file_size?: string | null;
  download_count: number;
  created_at: string;
}

export default function FreeResourcesPage() {
  const [resources, setResources] = useState<FreeResource[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClass, setSelectedClass] = useState<string>("All");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  useEffect(() => {
    async function fetchResources() {
      try {
        const res = await fetch("/api/free-resources");
        if (res.ok) {
          const json = await res.json();
          setResources(json.resources || []);
        }
      } catch (e) {
        console.error("Error loading free resources:", e);
      } finally {
        setLoading(false);
      }
    }
    fetchResources();
  }, []);

  const categories = ["All", "Formula Sheets", "Handwritten Notes", "PYQ Papers", "DPPs"];
  const classFilters = ["All", "Class 11", "Class 12"];

  const filteredResources = resources.filter((res) => {
    const matchesSearch =
      res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || res.category === selectedCategory;

    const matchesClass =
      selectedClass === "All" ||
      res.target_class.toLowerCase().includes(selectedClass.toLowerCase()) ||
      res.target_class === "All";

    return matchesSearch && matchesCategory && matchesClass;
  });

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case "Formula Sheets":
        return <FileSpreadsheet className="w-5 h-5 text-amber-400" />;
      case "PYQ Papers":
        return <FileQuestion className="w-5 h-5 text-orange-400" />;
      case "DPPs":
        return <FileCheck2 className="w-5 h-5 text-yellow-400" />;
      default:
        return <FileText className="w-5 h-5 text-green-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0500] text-stone-200 flex flex-col justify-between">
      {/* Background glow effects */}
      <div className="fixed top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-amber-600/15 blur-[150px] pointer-events-none rounded-full" />
      <div className="fixed bottom-10 left-10 w-[350px] h-[350px] bg-orange-600/10 blur-[120px] pointer-events-none rounded-full" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10 w-full">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-green-700/40 bg-green-950/30 text-green-400 text-xs font-semibold mb-4"
          >
            <DownloadCloud className="w-3.5 h-3.5" />
            100% Free Open Physics Repository
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight mb-4"
          >
            Study Notes &{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-400">
              Formula Sheets
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-stone-400 text-base sm:text-lg leading-relaxed"
          >
            High-yield handwritten formula sheets, chapter revision mindmaps, DPP sets, and past year question collections by Ankit Sir.
          </motion.p>
        </div>

        {/* Organized Filter & Search Controls */}
        <div className="max-w-4xl mx-auto mb-10 p-3 sm:p-4 rounded-3xl bg-stone-950/80 border border-amber-900/40 backdrop-blur-xl shadow-2xl flex flex-col md:flex-row gap-3 items-center justify-between">
          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search formula, topic..."
              className="w-full pl-9 pr-8 py-2.5 rounded-2xl bg-stone-900/90 border border-amber-900/30 text-white placeholder-stone-500 focus:outline-none focus:border-amber-500 text-xs transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-500 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Class Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto">
            {classFilters.map((cls) => (
              <button
                key={cls}
                onClick={() => setSelectedClass(cls)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedClass === cls
                    ? "bg-amber-500 text-black font-bold shadow-[0_0_12px_rgba(245,158,11,0.3)]"
                    : "bg-stone-900/80 text-stone-400 hover:text-white border border-amber-900/20"
                }`}
              >
                {cls}
              </button>
            ))}
          </div>

          {/* Category Dropdown/Pills for Mobile & Desktop */}
          <div className="flex items-center gap-1 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                    : "text-stone-400 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Counter & Clear Bar */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-xs text-stone-400">
            Showing <strong className="text-white">{filteredResources.length}</strong> study materials
          </div>
          {(searchQuery || selectedClass !== "All" || selectedCategory !== "All") && (
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedClass("All");
                setSelectedCategory("All");
              }}
              className="text-xs text-amber-400 hover:underline"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Resources Content Grid */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="h-44 rounded-3xl bg-amber-950/10 border border-amber-900/20 animate-pulse" />
            ))}
          </div>
        ) : filteredResources.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((res) => (
              <motion.div
                key={res.id}
                whileHover={{ y: -5 }}
                className="rounded-3xl bg-stone-950/80 border border-amber-900/30 p-6 flex flex-col justify-between backdrop-blur-xl hover:border-amber-500/60 transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.5)] group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-600/5 rounded-full blur-2xl group-hover:bg-amber-600/15 transition-all" />

                <div>
                  {/* Top Tags */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/30">
                      {res.category}
                    </span>
                    <span className="text-xs text-stone-400 font-medium flex items-center gap-1">
                      <GraduationCap className="w-3.5 h-3.5 text-stone-500" />
                      {res.target_class}
                    </span>
                  </div>

                  {/* Title with Category Icon */}
                  <div className="flex items-start gap-3 mb-3">
                    <div className="p-2.5 rounded-2xl bg-amber-950/30 border border-amber-900/40 shrink-0 group-hover:scale-105 transition-transform">
                      {getCategoryIcon(res.category)}
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-base group-hover:text-amber-300 transition-colors leading-snug">
                        {res.title}
                      </h3>
                      <p className="text-[11px] text-stone-500 mt-1 font-mono">
                        {res.file_size || "PDF Document"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Download Button */}
                <div className="pt-4 border-t border-amber-900/20 mt-4 flex items-center justify-between">
                  <span className="text-[11px] text-stone-500 font-mono">Instant Access</span>
                  <a
                    href={res.file_url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-black font-extrabold text-xs hover:from-amber-400 hover:to-orange-400 transition-all shadow-[0_0_12px_rgba(245,158,11,0.25)]"
                  >
                    <DownloadCloud className="w-3.5 h-3.5" />
                    Download File
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          /* Clean Empty State */
          <div className="max-w-xl mx-auto text-center py-16 p-8 rounded-3xl bg-stone-950/60 border border-amber-900/30">
            <div className="w-16 h-16 rounded-2xl bg-amber-950/40 border border-amber-800/40 flex items-center justify-center text-amber-400 mx-auto mb-4">
              <FileText className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No Matching Materials Found</h3>
            <p className="text-xs text-stone-400 max-w-sm mx-auto mb-6 leading-relaxed">
              We couldn&apos;t find materials matching your current search. You can reset filters or request Ankit Sir to upload a specific chapter&apos;s formula sheet!
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedClass("All");
                  setSelectedCategory("All");
                }}
                className="px-4 py-2 rounded-xl bg-stone-900 border border-amber-800/40 text-stone-300 font-semibold text-xs"
              >
                Clear Filters
              </button>
              <Link
                href="/#contact"
                className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-black font-bold text-xs"
              >
                <MessageSquare className="w-3.5 h-3.5" /> Request a Topic PDF
              </Link>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
