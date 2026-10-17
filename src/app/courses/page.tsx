"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Sparkles, ArrowRight, BookOpen, Clock, MessageSquare, CheckCircle2, Zap } from "lucide-react";
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

  return (
    <div className="min-h-screen bg-[#0a0500] text-stone-200 flex flex-col justify-between">
      {/* Background glow effects */}
      <div className="fixed top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-amber-600/15 blur-[150px] pointer-events-none rounded-full" />
      <div className="fixed bottom-10 right-10 w-[350px] h-[350px] bg-orange-600/10 blur-[120px] pointer-events-none rounded-full" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10 w-full">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
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
            Master Physics with{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-400">
              Ankit Sir
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-stone-400 text-base sm:text-lg"
          >
            Structured video lectures, problem sets, DPPs, and live doubt solving for Class 11, 12, JEE & NEET.
          </motion.p>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-80 rounded-3xl bg-amber-950/10 border border-amber-900/20 animate-pulse" />
            ))}
          </div>
        ) : courses.length > 0 ? (
          /* Live Courses Grid */
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => {
              const isFree = Number(course.price) === 0;
              return (
                <motion.div
                  key={course.id}
                  whileHover={{ y: -5 }}
                  className="rounded-3xl bg-stone-950/80 border border-amber-900/30 p-6 flex flex-col justify-between backdrop-blur-sm relative overflow-hidden group hover:border-amber-600/50 transition-all shadow-xl"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-amber-600/10 rounded-full blur-2xl group-hover:bg-amber-600/20 transition-all" />

                  <div>
                    {/* Top Tag & Code */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/30 font-mono">
                        {course.course_code}
                      </span>
                      {isFree ? (
                        <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase bg-green-500/20 text-green-400 border border-green-500/40">
                          100% Free
                        </span>
                      ) : (
                        <div className="text-right">
                          <span className="text-lg font-extrabold text-white">₹{course.price}</span>
                          {course.original_price && (
                            <span className="text-xs text-stone-500 line-through ml-2">₹{course.original_price}</span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Title & Description */}
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-amber-300 transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-xs text-stone-400 mb-6 line-clamp-3 leading-relaxed">
                      {course.description}
                    </p>

                    {/* Features pill */}
                    <div className="grid grid-cols-2 gap-2 text-xs text-stone-300 mb-6 pt-4 border-t border-amber-900/20">
                      <div className="flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                        <span>{course.target_class}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-amber-400" />
                        <span>{course.total_duration}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Zap className="w-3.5 h-3.5 text-amber-400" />
                        <span>{course.level}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
                        <span>{course.total_lectures || 0} Lectures</span>
                      </div>
                    </div>
                  </div>

                  <Link
                    href={`/#contact`}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(245,158,11,0.25)]"
                  >
                    {isFree ? "Access Free Course" : "Enroll Now"}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        ) : (
          /* Empty State if no courses created yet */
          <div className="max-w-2xl mx-auto text-center py-12">
            <div className="relative mb-6 inline-block">
              <div className="w-28 h-28 rounded-3xl p-[2px] bg-gradient-to-tr from-amber-500 to-orange-500 mx-auto shadow-[0_0_30px_rgba(245,158,11,0.3)]">
                <div className="w-full h-full rounded-[22px] overflow-hidden bg-black relative">
                  <Image src="/ankit-sir.png" alt="Ankit Sir" fill className="object-cover object-top" priority />
                </div>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Curriculum Launching Soon</h3>
            <p className="text-sm text-stone-400 max-w-md mx-auto mb-6 leading-relaxed">
              New batches for Class 11, Class 12, and JEE/NEET are currently being scheduled. Inquire below to reserve your seat or access early demo material!
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-black font-bold text-sm shadow-lg hover:scale-105 transition-all"
            >
              <MessageSquare className="w-4 h-4" /> Inquire for Upcoming Batches
            </Link>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
