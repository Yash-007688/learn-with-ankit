"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock, BarChart, ArrowRight, Sparkles, BookOpen,
  Users, Star, CheckCircle2, Filter, Zap, Atom, Flame, X, ShieldCheck
} from "lucide-react";
import Link from "next/link";
import Footer from "@/components/Footer";

const COURSES = [
  {
    id: 1,
    title: "Classical Mechanics",
    subtitle: "Foundation of Physics",
    description: "Master Newton's laws, kinematics, rotational motion, and dynamics from scratch. The most important chapter for any competitive exam.",
    level: "Intermediate",
    duration: "40 Hours",
    lectures: 62,
    students: "3,200+",
    rating: 4.9,
    category: "Class 11",
    badge: "Bestseller",
    badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    gradient: "from-amber-500/20 to-yellow-500/20",
    borderHover: "group-hover:border-amber-500/50",
    accentColor: "text-amber-400",
    glowColor: "bg-amber-500/20",
    icon: <Zap className="w-6 h-6 text-amber-400" />,
    topics: ["Kinematics in 1D & 2D", "Newton's Laws of Motion", "Work, Energy & Power", "Rotational Motion", "Gravitation", "Simple Harmonic Motion"],
  },
  {
    id: 2,
    title: "Electromagnetism",
    subtitle: "Electric & Magnetic Fields",
    description: "Deep dive into electrostatics, current electricity, magnetic effects, and electromagnetic induction — the most high-weightage unit for JEE & NEET.",
    level: "Advanced",
    duration: "50 Hours",
    lectures: 78,
    students: "2,800+",
    rating: 4.8,
    category: "Class 12",
    badge: "Top Rated",
    badgeColor: "bg-orange-500/20 text-orange-300 border-orange-500/30",
    gradient: "from-orange-500/20 to-red-500/20",
    borderHover: "group-hover:border-orange-500/50",
    accentColor: "text-orange-400",
    glowColor: "bg-orange-500/20",
    icon: <Atom className="w-6 h-6 text-orange-400" />,
    topics: ["Electrostatics & Gauss's Law", "Current Electricity & Circuits", "Magnetic Field & Force", "Electromagnetic Induction", "Alternating Current", "Maxwell's Equations"],
  },
  {
    id: 3,
    title: "Thermodynamics",
    subtitle: "Heat, Work & Energy",
    description: "Understand the laws of thermodynamics, heat transfer, kinetic theory of gases, and entropy. Essential scoring chapter for Boards, JEE & NEET.",
    level: "Intermediate",
    duration: "30 Hours",
    lectures: 45,
    students: "2,100+",
    rating: 4.9,
    category: "Class 11",
    badge: "High Scoring",
    badgeColor: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
    gradient: "from-yellow-500/20 to-amber-500/20",
    borderHover: "group-hover:border-yellow-500/50",
    accentColor: "text-yellow-400",
    glowColor: "bg-yellow-500/20",
    icon: <Flame className="w-6 h-6 text-yellow-400" />,
    topics: ["Kinetic Theory of Gases", "Laws of Thermodynamics", "Carnot Engine & Efficiency", "Heat Transfer Modes", "Entropy & Disorder", "Real Gas Behavior"],
  },
  {
    id: 4,
    title: "Optics & Wave Physics",
    subtitle: "Light, Sound & Waves",
    description: "From reflection and refraction to interference and diffraction — master wave optics and ray optics for a perfect score.",
    level: "Beginner",
    duration: "28 Hours",
    lectures: 40,
    students: "1,900+",
    rating: 4.7,
    category: "Class 12",
    badge: "New",
    badgeColor: "bg-amber-600/20 text-amber-200 border-amber-600/30",
    gradient: "from-amber-600/20 to-orange-400/20",
    borderHover: "group-hover:border-amber-400/50",
    accentColor: "text-amber-300",
    glowColor: "bg-amber-600/20",
    icon: <Sparkles className="w-6 h-6 text-amber-300" />,
    topics: ["Ray Optics & Mirrors", "Refraction & Lenses", "Wave Nature of Light", "Interference & Diffraction", "Sound & Doppler Effect", "Polarization"],
  },
  {
    id: 5,
    title: "Modern Physics",
    subtitle: "Quantum & Nuclear",
    description: "Unlock the secrets of the quantum world — photoelectric effect, atomic models, nuclear physics, and radioactivity.",
    level: "Advanced",
    duration: "25 Hours",
    lectures: 38,
    students: "1,600+",
    rating: 4.8,
    category: "Class 12",
    badge: "JEE Special",
    badgeColor: "bg-orange-600/20 text-orange-200 border-orange-600/30",
    gradient: "from-orange-600/20 to-red-400/20",
    borderHover: "group-hover:border-orange-400/50",
    accentColor: "text-orange-300",
    glowColor: "bg-orange-600/20",
    icon: <Atom className="w-6 h-6 text-orange-300" />,
    topics: ["Photoelectric Effect", "Bohr's Atomic Model", "de Broglie Waves", "Nuclear Fission & Fusion", "Radioactive Decay", "Semiconductor Basics"],
  },
  {
    id: 6,
    title: "Fluid Mechanics",
    subtitle: "Fluids, Surface Tension & More",
    description: "A complete guide to fluid statics and dynamics, viscosity, Bernoulli's theorem, and surface tension. A must-have for NEET aspirants.",
    level: "Beginner",
    duration: "20 Hours",
    lectures: 30,
    students: "1,200+",
    rating: 4.6,
    category: "Class 11",
    badge: "NEET Special",
    badgeColor: "bg-yellow-600/20 text-yellow-200 border-yellow-600/30",
    gradient: "from-yellow-600/20 to-amber-400/20",
    borderHover: "group-hover:border-yellow-400/50",
    accentColor: "text-yellow-300",
    glowColor: "bg-yellow-600/20",
    icon: <BookOpen className="w-6 h-6 text-yellow-300" />,
    topics: ["Fluid Pressure & Pascal's Law", "Archimedes' Principle", "Bernoulli's Theorem", "Viscosity & Stokes' Law", "Surface Tension", "Capillarity"],
  },
];

const FILTERS = ["All", "Class 11", "Class 12", "Beginner", "Intermediate", "Advanced"];

export default function CoursesPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = COURSES.filter((c) => {
    if (activeFilter === "All") return true;
    return c.category === activeFilter || c.level === activeFilter;
  });

  return (
    <div className="min-h-screen bg-[#0a0500] text-white overflow-hidden">

      {/* Warm background glows */}
      <div className="absolute top-0 left-[20%] w-[40%] h-[40%] rounded-full bg-amber-700/10 blur-[130px] pointer-events-none" />
      <div className="absolute top-0 right-[10%] w-[30%] h-[30%] rounded-full bg-orange-700/10 blur-[130px] pointer-events-none" />

      {/* HERO BANNER */}
      <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8 border-b border-amber-900/30">
        <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#5a3a1a2e_1px,transparent_1px),linear-gradient(to_bottom,#5a3a1a2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,#000_60%,transparent_100%)]" />

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex justify-center mb-5">
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-amber-900/20 border border-amber-800/40 text-sm text-amber-300 backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-amber-400" /> Physics Curriculum
            </span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-5xl md:text-7xl font-extrabold tracking-tighter text-white mb-6 leading-tight">
            Structured to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-400">Succeed</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-lg md:text-xl text-stone-400 max-w-2xl mx-auto font-light">
            6 carefully crafted courses covering the complete Class 11 & 12 Physics syllabus. Built for Boards, JEE & NEET — taught by Ankit Sir.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex flex-wrap justify-center gap-8 mt-10 text-sm text-stone-400">
            {[
              { icon: BookOpen, label: "6 Courses", color: "text-amber-400" },
              { icon: Clock, label: "193+ Hours of Content", color: "text-orange-400" },
              { icon: Users, label: "12,800+ Enrolled", color: "text-yellow-400" },
              { icon: Star, label: "4.8 Avg. Rating", color: "text-amber-300" },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-2">
                <s.icon className={`w-4 h-4 ${s.color}`} />
                <span>{s.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FILTER BAR */}
      <div className="sticky top-20 z-30 bg-[#0a0500]/90 backdrop-blur-xl border-b border-amber-900/20 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-3 overflow-x-auto">
          <Filter className="w-4 h-4 text-stone-500 flex-shrink-0" />
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                activeFilter === f
                  ? "bg-gradient-to-r from-amber-500 to-orange-500 text-black shadow-[0_0_15px_rgba(245,158,11,0.3)]"
                  : "text-stone-400 hover:text-white bg-amber-900/10 hover:bg-amber-900/30 border border-amber-900/30"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* COURSES GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid md:grid-cols-2 xl:grid-cols-3 gap-8"
          >
            {filtered.map((course, idx) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.07 }}
                className={`group relative bg-amber-950/20 backdrop-blur-md border border-amber-900/30 rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-2 flex flex-col ${course.borderHover}`}
              >
                <div className={`absolute top-0 left-0 w-full h-40 bg-gradient-to-b ${course.gradient} to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className={`absolute -top-10 -right-10 w-32 h-32 ${course.glowColor} blur-[60px] rounded-full group-hover:opacity-100 opacity-40 transition-opacity duration-500`} />

                <div className="relative z-10 p-8 flex flex-col flex-1">
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-amber-900/30 border border-amber-800/40 flex items-center justify-center">
                      {course.icon}
                    </div>
                    <span className={`text-xs font-semibold px-3 py-1.5 rounded-full border ${course.badgeColor}`}>
                      {course.badge}
                    </span>
                  </div>

                  <p className={`text-xs font-semibold uppercase tracking-widest mb-2 ${course.accentColor}`}>{course.subtitle}</p>
                  <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">{course.title}</h3>
                  <p className="text-stone-400 leading-relaxed text-sm mb-6">{course.description}</p>

                  <div className="mb-6 space-y-2">
                    {course.topics.map((topic, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-stone-300">
                        <CheckCircle2 className={`w-4 h-4 flex-shrink-0 ${course.accentColor}`} />
                        {topic}
                      </div>
                    ))}
                  </div>

                  <div className="mt-auto">
                    <div className="flex flex-wrap items-center gap-3 text-xs text-stone-400 mb-6 pb-6 border-b border-amber-900/30">
                      <span className="flex items-center gap-1.5 bg-amber-900/20 px-3 py-1.5 rounded-full">
                        <BarChart className={`w-3.5 h-3.5 ${course.accentColor}`} /> {course.level}
                      </span>
                      <span className="flex items-center gap-1.5 bg-amber-900/20 px-3 py-1.5 rounded-full">
                        <Clock className={`w-3.5 h-3.5 ${course.accentColor}`} /> {course.duration}
                      </span>
                      <span className="flex items-center gap-1.5 bg-amber-900/20 px-3 py-1.5 rounded-full">
                        <BookOpen className={`w-3.5 h-3.5 ${course.accentColor}`} /> {course.lectures} Lectures
                      </span>
                      <span className="flex items-center gap-1.5 bg-amber-900/20 px-3 py-1.5 rounded-full">
                        <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" /> {course.rating}
                      </span>
                    </div>

                    <Link href="/login" className="flex items-center justify-between w-full group/btn">
                      <span className="text-base font-semibold text-white group-hover/btn:text-amber-300 transition-colors">Enroll Now</span>
                      <div className="w-10 h-10 rounded-full bg-amber-900/30 border border-amber-800/40 flex items-center justify-center group-hover/btn:bg-gradient-to-r group-hover/btn:from-amber-500 group-hover/btn:to-orange-500 group-hover/btn:border-transparent transition-all duration-300">
                        <ArrowRight className="w-5 h-5 text-amber-400 group-hover/btn:text-black transition-colors duration-300" />
                      </div>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="text-center py-24 text-stone-500">
            <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-30" />
            <p className="text-lg">No courses found for this filter.</p>
          </div>
        )}
      </section>

      {/* PRICING & PLAN DIFFERENTIATION SECTION */}
      <section className="border-t border-amber-900/30 py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-800/40 bg-amber-950/40 text-amber-400 text-xs font-semibold mb-4">
            <Sparkles className="w-4 h-4" />
            Transparent Pricing
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Choose Your Learning Plan
          </h2>
          <p className="text-stone-400 max-w-2xl mx-auto text-base">
            Select the tier that fits your preparation goals. Upgrade or switch plans anytime.
          </p>
        </div>

        {/* 3 Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {/* Card 1: Single Topic */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl p-8 bg-amber-950/20 border border-amber-900/30 backdrop-blur-md flex flex-col justify-between hover:border-amber-700/50 transition-all duration-300"
          >
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-stone-400 block mb-2">Subject Starter</span>
              <h3 className="text-2xl font-bold text-white mb-2">Single Chapter</h3>
              <p className="text-xs text-stone-400 mb-6">Target your weakest physics topic with full depth.</p>
              <div className="mb-6 flex items-baseline gap-2">
                <span className="text-4xl font-extrabold text-white">₹1,999</span>
                <span className="text-xs text-stone-500">/ per chapter</span>
              </div>
              <ul className="space-y-3 text-sm text-stone-300 mb-8 border-t border-amber-900/20 pt-6">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  Full Chapter HD Video Lectures
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  PDF Formula Sheet & DPPs
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  1 Year Unlimited Access
                </li>
                <li className="flex items-center gap-2.5 text-stone-600 line-through">
                  <X className="w-4 h-4 text-stone-600 shrink-0" />
                  Live Doubt Sessions
                </li>
                <li className="flex items-center gap-2.5 text-stone-600 line-through">
                  <X className="w-4 h-4 text-stone-600 shrink-0" />
                  Personal Mentorship
                </li>
              </ul>
            </div>
            <Link
              href="/signup"
              className="w-full py-3.5 rounded-xl border border-amber-800/40 text-amber-300 font-bold text-center text-sm hover:bg-amber-900/30 transition-all"
            >
              Enroll Single Topic
            </Link>
          </motion.div>

          {/* Card 2: Complete Physics (Most Popular) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="rounded-3xl p-8 bg-gradient-to-b from-amber-950/50 to-stone-950 border-2 border-amber-500/80 backdrop-blur-md flex flex-col justify-between shadow-[0_0_50px_rgba(245,158,11,0.2)] relative hover:scale-[1.02] transition-all duration-300"
          >
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 to-orange-500 text-black text-xs font-extrabold uppercase tracking-widest px-4 py-1 rounded-full shadow-lg">
              Most Popular • Best Value
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block mb-2">Full Year Batch</span>
              <h3 className="text-2xl font-bold text-white mb-2">Class 11 or 12 Complete</h3>
              <p className="text-xs text-stone-400 mb-6">Complete syllabus coverage for Board + JEE/NEET.</p>
              <div className="mb-6 flex items-baseline gap-2">
                <span className="text-4xl font-extrabold text-amber-400">₹8,999</span>
                <span className="text-xs text-stone-500 line-through">₹14,999</span>
                <span className="text-xs text-green-400 font-semibold ml-1">40% OFF</span>
              </div>
              <ul className="space-y-3 text-sm text-stone-300 mb-8 border-t border-amber-900/30 pt-6">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  All 6 Core Physics Modules
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  Weekly Live Doubt-Solving Sessions
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  5000+ Practice MCQs & PYQs
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  Full Length Mock Test Series
                </li>
                <li className="flex items-center gap-2.5 text-stone-600 line-through">
                  <X className="w-4 h-4 text-stone-600 shrink-0" />
                  1-on-1 Personal Call with Ankit Sir
                </li>
              </ul>
            </div>
            <Link
              href="/signup"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-black font-extrabold text-center text-sm shadow-[0_0_25px_rgba(245,158,11,0.4)] hover:scale-105 transition-all"
            >
              Get Full Batch
            </Link>
          </motion.div>

          {/* Card 3: Elite Mentorship */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="rounded-3xl p-8 bg-amber-950/20 border border-amber-900/30 backdrop-blur-md flex flex-col justify-between hover:border-amber-700/50 transition-all duration-300"
          >
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-stone-400 block mb-2">Rankers Program</span>
              <h3 className="text-2xl font-bold text-white mb-2">Elite Rankers Pro</h3>
              <p className="text-xs text-stone-400 mb-6">Full syllabus + personal 1-on-1 guidance by Ankit Sir.</p>
              <div className="mb-6 flex items-baseline gap-2">
                <span className="text-4xl font-extrabold text-white">₹16,499</span>
                <span className="text-xs text-stone-500">/ 2 Years Valid</span>
              </div>
              <ul className="space-y-3 text-sm text-stone-300 mb-8 border-t border-amber-900/20 pt-6">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  Everything in Full Batch
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  1-on-1 Mentorship Calls with Ankit Sir
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  Priority Instant Doubt WhatsApp Group
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  Personal Study Roadmap & Analysis
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  JEE Adv / NEET Rank Booster Problem Sets
                </li>
              </ul>
            </div>
            <Link
              href="/signup"
              className="w-full py-3.5 rounded-xl border border-amber-800/40 text-amber-300 font-bold text-center text-sm hover:bg-amber-900/30 transition-all"
            >
              Apply for Rankers Pro
            </Link>
          </motion.div>
        </div>

        {/* DIFFERENTIATION COMPARISON MATRIX TABLE */}
        <div className="mt-16">
          <div className="text-center mb-10">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Plan Differentiation & Feature Matrix
            </h3>
            <p className="text-xs sm:text-sm text-stone-400">
              Detailed side-by-side comparison of every feature included in our programs.
            </p>
          </div>

          <div className="rounded-2xl border border-amber-900/30 bg-stone-950/60 overflow-hidden backdrop-blur-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-amber-950/40 text-stone-400 uppercase text-xs font-semibold tracking-wider border-b border-amber-900/30">
                  <tr>
                    <th className="px-6 py-5">Features & Deliverables</th>
                    <th className="px-6 py-5 text-center">Single Topic (₹1,999)</th>
                    <th className="px-6 py-5 text-center text-amber-400">Full Batch (₹8,999)</th>
                    <th className="px-6 py-5 text-center">Rankers Pro (₹16,499)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-amber-900/20 text-stone-300">
                  {[
                    { feature: "Comprehensive Video Lectures", single: "1 Chapter", full: "All 6 Modules", pro: "All 6 Modules + Revision" },
                    { feature: "Formula Sheets & Handwritten Notes", single: true, full: true, pro: true },
                    { feature: "Daily Practice Problem Sets (DPPs)", single: "Topic wise", full: "Complete (5000+ MCQs)", pro: "Advanced & Olympiad Level" },
                    { feature: "Previous 10 Years Solved Questions", single: true, full: true, pro: true },
                    { feature: "Live Doubt Clearing Classes", single: false, full: "Weekly Live Sessions", pro: "Unlimited Daily Priority" },
                    { feature: "Full Syllabus Mock Test Series", single: false, full: "20 Mock Tests", pro: "40+ All-India Tests" },
                    { feature: "1-on-1 Guidance with Ankit Sir", single: false, full: false, pro: "Bi-Weekly Calls" },
                    { feature: "Dedicated Telegram/WhatsApp Group", single: false, full: "Community Access", pro: "Direct VIP Channel" },
                    { feature: "Validity Period", single: "1 Year", full: "1 Year", pro: "2 Full Years" },
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-amber-900/10 transition-colors">
                      <td className="px-6 py-4 font-medium text-white">{row.feature}</td>

                      {/* Single */}
                      <td className="px-6 py-4 text-center">
                        {typeof row.single === "boolean" ? (
                          row.single ? (
                            <CheckCircle2 className="w-5 h-5 text-amber-400 mx-auto" />
                          ) : (
                            <X className="w-5 h-5 text-stone-600 mx-auto" />
                          )
                        ) : (
                          <span className="text-xs text-stone-300">{row.single}</span>
                        )}
                      </td>

                      {/* Full */}
                      <td className="px-6 py-4 text-center bg-amber-950/20">
                        {typeof row.full === "boolean" ? (
                          row.full ? (
                            <CheckCircle2 className="w-5 h-5 text-amber-400 mx-auto" />
                          ) : (
                            <X className="w-5 h-5 text-stone-600 mx-auto" />
                          )
                        ) : (
                          <span className="text-xs font-semibold text-amber-400">{row.full}</span>
                        )}
                      </td>

                      {/* Pro */}
                      <td className="px-6 py-4 text-center">
                        {typeof row.pro === "boolean" ? (
                          row.pro ? (
                            <CheckCircle2 className="w-5 h-5 text-green-400 mx-auto" />
                          ) : (
                            <X className="w-5 h-5 text-stone-600 mx-auto" />
                          )
                        ) : (
                          <span className="text-xs font-semibold text-green-400">{row.pro}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="border-t border-amber-900/20 py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-900/10 to-orange-900/10" />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Not sure where to start?</h2>
            <p className="text-stone-400 text-lg mb-8">
              Start with Classical Mechanics — the foundation every physics student needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/login" className="inline-flex h-14 items-center justify-center rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-8 font-bold text-black transition-all hover:scale-105 shadow-[0_0_30px_rgba(245,158,11,0.4)]">
                Start with Mechanics
              </Link>
              <Link href="/" className="inline-flex h-14 items-center justify-center rounded-full bg-amber-900/20 border border-amber-800/40 px-8 font-semibold text-amber-300 transition-all hover:bg-amber-900/40">
                Back to Home
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
