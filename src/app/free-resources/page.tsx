"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Sparkles, FileText, DownloadCloud, BookOpen, ExternalLink, ArrowRight, Layers } from "lucide-react";
import Footer from "@/components/Footer";

interface FreeResource {
  id: number;
  title: string;
  category: string;
  target_class: string;
  file_url: string;
  file_size?: string | null;
  download_count: number;
}

export default function FreeResourcesPage() {
  const [resources, setResources] = useState<FreeResource[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [loading, setLoading] = useState(true);

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

  const filteredResources =
    selectedCategory === "All"
      ? resources
      : resources.filter((r) => r.category === selectedCategory);

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
            100% Free Study Material
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight mb-4"
          >
            Free Physics{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-400">
              Download Center
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-stone-400 text-base sm:text-lg"
          >
            Formula sheets, handwritten class notes, previous year question papers, and high-yield DPPs.
          </motion.p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center justify-center gap-2 mb-12 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "bg-amber-500 text-black shadow-[0_0_15px_rgba(245,158,11,0.3)]"
                  : "bg-stone-900/80 border border-amber-900/30 text-stone-300 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Resources Content */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-44 rounded-2xl bg-amber-950/10 border border-amber-900/20 animate-pulse" />
            ))}
          </div>
        ) : filteredResources.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((res) => (
              <motion.div
                key={res.id}
                whileHover={{ y: -4 }}
                className="rounded-3xl bg-stone-950/80 border border-amber-900/30 p-6 flex flex-col justify-between backdrop-blur-sm hover:border-amber-600/50 transition-all shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/30">
                      {res.category}
                    </span>
                    <span className="text-xs text-stone-500">{res.target_class}</span>
                  </div>

                  <h3 className="font-bold text-white text-base mb-2">{res.title}</h3>
                </div>

                <div className="pt-4 border-t border-amber-900/20 flex items-center justify-between mt-4">
                  <span className="text-xs text-stone-400 font-mono">{res.file_size || "PDF Document"}</span>
                  <a
                    href={res.file_url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-black font-bold text-xs hover:from-amber-400 hover:to-orange-400 transition-all shadow-[0_0_12px_rgba(245,158,11,0.2)]"
                  >
                    <DownloadCloud className="w-3.5 h-3.5" />
                    Download Free
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="max-w-xl mx-auto text-center py-12">
            <div className="w-20 h-20 rounded-2xl bg-amber-950/30 border border-amber-800/40 flex items-center justify-center text-amber-400 mx-auto mb-4">
              <FileText className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Compiling Study Material</h3>
            <p className="text-xs text-stone-400 max-w-sm mx-auto mb-6 leading-relaxed">
              New handwritten notes and formula sheets are being uploaded regularly by Ankit Sir. Check back soon or request a specific topic!
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-black font-bold text-xs"
            >
              Request a Formula Sheet or Notes
            </Link>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
