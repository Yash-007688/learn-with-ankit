"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  FileText,
  Download,
  BookOpen,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Filter,
  Search,
  ExternalLink,
  Flame,
  Zap,
  HelpCircle
} from "lucide-react";
import Footer from "@/components/Footer";

export default function FreeResourcesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const categories = ["All", "Formula Cheat Sheets", "Handwritten Notes", "PYQ Papers", "DPPs"];

  const resources = [
    {
      id: 1,
      title: "Complete Kinematics & Mechanics Formula Sheet",
      category: "Formula Cheat Sheets",
      chapter: "Class 11 Physics",
      fileType: "PDF",
      size: "2.4 MB",
      downloads: "14.2k",
      badge: "Most Popular",
      description: "Quick revision formula sheet covering 1D/2D motion, projectile motion, Newton's laws, and friction with shortcut tips.",
    },
    {
      id: 2,
      title: "Electrostatics & Capacitance Handwritten Notes",
      category: "Handwritten Notes",
      chapter: "Class 12 Physics",
      fileType: "PDF",
      size: "4.8 MB",
      downloads: "11.8k",
      badge: "High Yield",
      description: "Complete handwritten theory, Gauss law derivations, capacitor combinations, and dielectric calculations by Ankit Sir.",
    },
    {
      id: 3,
      title: "JEE Main & Advanced Last 10 Years Chapterwise PYQs",
      category: "PYQ Papers",
      chapter: "Class 11 & 12",
      fileType: "PDF",
      size: "8.1 MB",
      downloads: "19.5k",
      badge: "Must Solve",
      description: "Curated collection of 450+ previous year questions with step-by-step analytical explanations and difficulty ratings.",
    },
    {
      id: 4,
      title: "Rotational Motion High-Yield DPP (Daily Practice Paper)",
      category: "DPPs",
      chapter: "Class 11 Physics",
      fileType: "PDF",
      size: "1.9 MB",
      downloads: "9.3k",
      badge: "Trending",
      description: "30 challenging practice problems on Moment of Inertia, Rolling without Slipping, and Angular Momentum conservation.",
    },
    {
      id: 5,
      title: "Ray & Wave Optics Comprehensive Revision Sheet",
      category: "Formula Cheat Sheets",
      chapter: "Class 12 Physics",
      fileType: "PDF",
      size: "3.1 MB",
      downloads: "8.7k",
      badge: "Exam Special",
      description: "All mirror/lens formulas, prism derivation, Young's double slit interference, and diffraction summary on 4 pages.",
    },
    {
      id: 6,
      title: "Thermodynamics & Kinetic Theory of Gases Formula Summary",
      category: "Formula Cheat Sheets",
      chapter: "Class 11 Physics",
      fileType: "PDF",
      size: "2.0 MB",
      downloads: "7.9k",
      badge: "Quick Revision",
      description: "Carnot engine efficiency, indicator diagrams, heat capacities Cp & Cv, and adiabatic processes in one clean printable sheet.",
    },
    {
      id: 7,
      title: "Modern Physics & Dual Nature of Radiation Notes",
      category: "Handwritten Notes",
      chapter: "Class 12 Physics",
      fileType: "PDF",
      size: "3.7 MB",
      downloads: "10.4k",
      badge: "Score Booster",
      description: "Photoelectric effect, Bohr atom model, de Broglie wavelength, and nuclear fission/fusion theory notes with exam diagrams.",
    },
    {
      id: 8,
      title: "NEET Physics Most Repeated 200 Questions Bank",
      category: "PYQ Papers",
      chapter: "Complete Syllabus",
      fileType: "PDF",
      size: "5.5 MB",
      downloads: "16.1k",
      badge: "NEET Special",
      description: "Top 200 high-probability questions compiled from the past 15 years of NEET examinations with quick mental tricks.",
    },
  ];

  const filteredResources = resources.filter((res) => {
    const matchesCategory = selectedCategory === "All" || res.category === selectedCategory;
    const matchesSearch =
      res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.chapter.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleDownload = (title: string) => {
    setDownloadSuccess(title);
    setTimeout(() => {
      setDownloadSuccess(null);
    }, 3500);
  };

  return (
    <div className="min-h-screen bg-[#0a0500] text-stone-200">
      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[450px] bg-gradient-to-b from-amber-600/15 via-orange-600/5 to-transparent blur-[140px] pointer-events-none" />

      {/* Hero Header */}
      <section className="relative z-10 pt-20 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-800/40 bg-amber-950/40 text-amber-400 text-xs font-semibold mb-6">
            <Sparkles className="w-4 h-4" />
            100% Free Physics Learning Materials
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight mb-6">
            Free Study Materials & <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-orange-400 to-amber-300">
              Formula Cheat Sheets
            </span>
          </h1>
          <p className="text-stone-400 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed mb-10">
            Download verified formula sheets, handwritten lecture notes, previous years question papers, and high-yield DPPs prepared by Ankit Sir.
          </p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto relative mb-10">
            <Search className="w-5 h-5 text-stone-500 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search topics, formula sheets, notes (e.g. Kinematics, Optics)..."
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-stone-950/80 border border-amber-900/40 text-white placeholder-stone-600 focus:outline-none focus:border-amber-500 text-sm backdrop-blur-md shadow-[0_0_30px_rgba(0,0,0,0.5)] transition-colors"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-gradient-to-r from-amber-500 to-orange-500 text-black shadow-[0_0_20px_rgba(245,158,11,0.3)] scale-105"
                    : "bg-amber-950/20 border border-amber-900/30 text-stone-400 hover:text-white hover:border-amber-700/40"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Download Toast Notification */}
      <AnimatePresence>
        {downloadSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-green-950/90 border border-green-800/60 text-green-300 px-6 py-3 rounded-2xl shadow-2xl backdrop-blur-md flex items-center gap-3 text-sm font-medium"
          >
            <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" />
            <span>
              Download started for: <strong className="text-white">{downloadSuccess}</strong>
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Resources Grid */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">Available Resources</h2>
            <p className="text-xs text-stone-400 mt-1">Showing {filteredResources.length} download items</p>
          </div>
          <span className="text-xs text-amber-400 font-semibold px-3 py-1 rounded-full border border-amber-800/40 bg-amber-950/30">
            Free Instant PDF
          </span>
        </div>

        {filteredResources.length === 0 ? (
          <div className="text-center py-24 rounded-3xl border border-amber-900/20 bg-amber-950/10">
            <BookOpen className="w-12 h-12 text-stone-600 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-white mb-1">No resources found</h3>
            <p className="text-sm text-stone-400">Try adjusting your search query or switching category filter.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
            {filteredResources.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.04 }}
                className="p-6 sm:p-8 rounded-3xl bg-amber-950/20 border border-amber-900/30 hover:border-amber-600/50 backdrop-blur-md flex flex-col justify-between transition-all duration-300 group"
              >
                <div>
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 uppercase tracking-wider">
                      {item.category}
                    </span>
                    <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-stone-900 text-stone-400 border border-stone-800">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-amber-300 transition-colors mb-2 leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs font-medium text-amber-400/90 mb-3">{item.chapter}</p>
                  <p className="text-sm text-stone-400 leading-relaxed mb-6">{item.description}</p>
                </div>

                <div className="border-t border-amber-900/20 pt-4 flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs text-stone-500">
                    <span className="flex items-center gap-1">
                      <FileText className="w-3.5 h-3.5 text-stone-400" />
                      {item.fileType} ({item.size})
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Download className="w-3.5 h-3.5 text-stone-400" />
                      {item.downloads}
                    </span>
                  </div>

                  <button
                    onClick={() => handleDownload(item.title)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-black text-xs font-bold shadow-[0_0_15px_rgba(245,158,11,0.3)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Download PDF
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* Community Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-r from-amber-950/60 via-stone-950 to-orange-950/40 border border-amber-900/40 text-center relative overflow-hidden">
          <div className="max-w-2xl mx-auto relative z-10">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Need structured video courses with Live Doubts?
            </h3>
            <p className="text-stone-300 text-sm sm:text-base mb-8">
              Explore our full-year structured syllabus batches for Class 11, Class 12, JEE Advanced, and NEET.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/courses"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-black font-bold text-sm shadow-[0_0_25px_rgba(245,158,11,0.4)] hover:scale-105 transition-all"
              >
                Browse Full Courses
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-amber-900/20 border border-amber-800/40 text-amber-300 font-bold text-sm hover:bg-amber-900/40 transition-all"
              >
                Create Student Account
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
