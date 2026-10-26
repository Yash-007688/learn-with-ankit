"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  Sparkles,
  ArrowRight,
  BookOpen,
  Clock,
  MessageSquare,
  CheckCircle2,
  Zap,
  Search,
  Filter,
  GraduationCap,
  Layers,
  ChevronRight,
  X,
  FileText,
  Video
} from "lucide-react";
import Footer from "@/components/Footer";

interface Course {
  id: number;
  course_code: string;
  title: string;
  slug: string;
  subtitle?: string | null;
  description: string;
  target_class: string;
  level: string;
  price: number;
  original_price?: number | null;
  thumbnail_url?: string | null;
  total_duration: string;
  total_lectures: number;
  status: string;
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClass, setSelectedClass] = useState<string>("All");
  const [selectedType, setSelectedType] = useState<"all" | "free" | "paid">("all");

  // Selected course for quick details modal
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  useEffect(() => {
    async function fetchCourses() {
      try {
        const res = await fetch("/api/courses");
        if (res.ok) {
          const json = await res.json();
          setCourses(json.courses || []);
        }
      } catch (e) {
        console.error("Error loading courses:", e);
      } finally {
        setLoading(false);
      }
    }
    fetchCourses();
  }, []);

  const classFilters = ["All", "Class 11", "Class 12", "Dropper"];

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.course_code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesClass =
      selectedClass === "All" ||
      course.target_class.toLowerCase().includes(selectedClass.toLowerCase()) ||
      course.target_class === "All";

    const isFree = Number(course.price) === 0;
    const matchesType =
      selectedType === "all" ||
      (selectedType === "free" && isFree) ||
      (selectedType === "paid" && !isFree);

    return matchesSearch && matchesClass && matchesType;
  });

  return (
    <div className="min-h-screen bg-[#0a0500] text-stone-200 flex flex-col justify-between">
      {/* Background glow effects */}
      <div className="fixed top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-amber-600/15 blur-[150px] pointer-events-none rounded-full" />
      <div className="fixed bottom-10 right-10 w-[350px] h-[350px] bg-orange-600/10 blur-[120px] pointer-events-none rounded-full" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10 w-full">
        {/* Hero Banner Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-700/40 bg-amber-950/40 text-amber-300 text-xs font-semibold mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Curated Physics Curriculum
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight mb-4"
          >
            Structured Batches &{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-400">
              Masterclasses
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-stone-400 text-base sm:text-lg leading-relaxed"
          >
            Step-by-step concept derivations, numerical mastery, and direct mentorship by Ankit Sir for Board, JEE & NEET.
          </motion.p>
        </div>

        {/* Organized Search & Filter Bar */}
        <div className="max-w-4xl mx-auto mb-10 p-3 sm:p-4 rounded-3xl bg-stone-950/80 border border-amber-900/40 backdrop-blur-xl shadow-2xl flex flex-col md:flex-row gap-3 items-center justify-between">
          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by topic or code..."
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

          {/* Class Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 no-scrollbar">
            {classFilters.map((cls) => (
              <button
                key={cls}
                onClick={() => setSelectedClass(cls)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                  selectedClass === cls
                    ? "bg-amber-500 text-black font-bold shadow-[0_0_15px_rgba(245,158,11,0.3)]"
                    : "bg-stone-900/80 text-stone-400 hover:text-white border border-amber-900/20"
                }`}
              >
                {cls}
              </button>
            ))}
          </div>

          {/* Free vs Paid Toggle */}
          <div className="flex p-1 bg-stone-900 rounded-2xl border border-amber-900/30 shrink-0">
            <button
              onClick={() => setSelectedType("all")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedType === "all" ? "bg-amber-500/20 text-amber-300 border border-amber-500/30" : "text-stone-400 hover:text-white"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setSelectedType("free")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedType === "free" ? "bg-green-500 text-black shadow" : "text-stone-400 hover:text-white"
              }`}
            >
              Free
            </button>
            <button
              onClick={() => setSelectedType("paid")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedType === "paid" ? "bg-amber-500 text-black shadow" : "text-stone-400 hover:text-white"
              }`}
            >
              Paid
            </button>
          </div>
        </div>

        {/* Courses Results Counter */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-xs text-stone-400">
            Showing <strong className="text-white">{filteredCourses.length}</strong> available batches
          </div>
          {(searchQuery || selectedClass !== "All" || selectedType !== "all") && (
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedClass("All");
                setSelectedType("all");
              }}
              className="text-xs text-amber-400 hover:underline flex items-center gap-1"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Loading Skeleton */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-88 rounded-3xl bg-amber-950/10 border border-amber-900/20 animate-pulse" />
            ))}
          </div>
        ) : filteredCourses.length > 0 ? (
          /* Live Courses Grid */
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => {
              const isFree = Number(course.price) === 0;
              return (
                <motion.div
                  key={course.id}
                  whileHover={{ y: -6 }}
                  className="rounded-3xl bg-stone-950/80 border border-amber-900/30 p-6 flex flex-col justify-between backdrop-blur-xl relative overflow-hidden group hover:border-amber-500/60 transition-all duration-300 shadow-[0_10px_35px_rgba(0,0,0,0.6)]"
                >
                  <div className="absolute top-0 right-0 w-40 h-40 bg-amber-600/10 rounded-full blur-3xl group-hover:bg-amber-600/25 transition-all" />

                  <div>
                    {/* Header Pill & Pricing Badge */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/30 font-mono">
                        {course.course_code}
                      </span>
                      {isFree ? (
                        <span className="px-3 py-1 rounded-full text-xs font-black uppercase bg-green-500/20 text-green-400 border border-green-500/40 shadow-[0_0_10px_rgba(34,197,94,0.2)]">
                          100% Free
                        </span>
                      ) : (
                        <div className="text-right">
                          <span className="text-xl font-extrabold text-white">₹{course.price}</span>
                          {course.original_price && (
                            <span className="text-xs text-stone-500 line-through ml-2">₹{course.original_price}</span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Title & Target Subtitle */}
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-amber-300 transition-colors leading-snug">
                      {course.title}
                    </h3>
                    <p className="text-xs text-stone-400 mb-6 line-clamp-3 leading-relaxed">
                      {course.description}
                    </p>

                    {/* Features Matrix Grid */}
                    <div className="grid grid-cols-2 gap-2 text-xs text-stone-300 mb-6 p-3 rounded-2xl bg-amber-950/20 border border-amber-900/30">
                      <div className="flex items-center gap-1.5">
                        <GraduationCap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span className="truncate">{course.target_class}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span className="truncate">{course.total_duration}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span className="truncate">{course.level}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-green-400 shrink-0" />
                        <span className="truncate">{course.total_lectures || 0} Lectures</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-2 pt-2">
                    <button
                      onClick={() => setSelectedCourse(course)}
                      className="w-full py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 border border-amber-900/40 text-stone-300 hover:text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Layers className="w-3.5 h-3.5 text-amber-400" />
                      View Syllabus & Details
                    </button>

                    <Link
                      href="/#contact"
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(245,158,11,0.25)]"
                    >
                      {isFree ? "Access Free Course" : "Enroll in Batch"}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          /* Empty State */
          <div className="max-w-2xl mx-auto text-center py-16 p-8 rounded-3xl bg-stone-950/60 border border-amber-900/30">
            <div className="relative mb-6 inline-block">
              <div className="w-24 h-24 rounded-3xl p-[2px] bg-gradient-to-tr from-amber-500 to-orange-500 mx-auto shadow-[0_0_25px_rgba(245,158,11,0.3)]">
                <div className="w-full h-full rounded-[22px] overflow-hidden bg-black relative">
                  <Image src="/ankit-sir.png" alt="Ankit Sir" fill className="object-cover object-top" priority />
                </div>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">No Matching Batches Found</h3>
            <p className="text-sm text-stone-400 max-w-md mx-auto mb-6 leading-relaxed">
              We couldn&apos;t find any courses matching your selected filter. Clear your filters or send Ankit Sir an inquiry for upcoming batches!
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedClass("All");
                  setSelectedType("all");
                }}
                className="px-5 py-2.5 rounded-xl bg-stone-900 border border-amber-800/40 text-stone-300 font-semibold text-xs hover:text-white"
              >
                Show All Courses
              </button>
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-black font-bold text-xs"
              >
                <MessageSquare className="w-4 h-4" /> Inquire for Custom Batch
              </Link>
            </div>
          </div>
        )}
      </main>

      {/* QUICK COURSE DETAILS MODAL */}
      <AnimatePresence>
        {selectedCourse && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg bg-stone-950 border border-amber-900/50 rounded-3xl p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setSelectedCourse(null)}
                className="absolute right-5 top-5 p-1 rounded-lg text-stone-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-3">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30 font-mono">
                  {selectedCourse.course_code}
                </span>
                <span className="text-xs text-stone-500">{selectedCourse.target_class} • {selectedCourse.level}</span>
              </div>

              <h2 className="text-2xl font-bold text-white mb-3">{selectedCourse.title}</h2>
              <p className="text-xs text-stone-300 leading-relaxed mb-6 bg-stone-900/60 p-4 rounded-2xl border border-amber-900/20">
                {selectedCourse.description}
              </p>

              <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-3">Batch Highlights</h4>
              <div className="space-y-2 mb-6 text-xs text-stone-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                  <span>{selectedCourse.total_lectures || 0} In-Depth Video Lectures & Notes</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                  <span>{selectedCourse.total_duration} of High-Yield Concept Explanations</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                  <span>Topic-wise Daily Practice Problems (DPPs) with Solutions</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                  <span>Direct Doubt Solving Access with Ankit Sir</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-amber-900/30">
                <div>
                  <span className="text-[11px] text-stone-500 block">Course Fee</span>
                  {Number(selectedCourse.price) === 0 ? (
                    <span className="text-xl font-black text-green-400 uppercase">FREE ACCESS</span>
                  ) : (
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-black text-white">₹{selectedCourse.price}</span>
                      {selectedCourse.original_price && (
                        <span className="text-xs text-stone-500 line-through">₹{selectedCourse.original_price}</span>
                      )}
                    </div>
                  )}
                </div>

                <Link
                  href="/#contact"
                  onClick={() => setSelectedCourse(null)}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-black font-extrabold text-xs uppercase tracking-wider shadow-lg hover:scale-105 transition-all"
                >
                  {Number(selectedCourse.price) === 0 ? "Start Free Now" : "Enroll in Batch"}
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
