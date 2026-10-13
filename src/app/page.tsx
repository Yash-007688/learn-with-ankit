"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight, Sparkles,
  Users, Trophy, Star, BookOpen, Zap, CheckCircle2
} from "lucide-react";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center overflow-hidden w-full bg-[#0a0500] text-white">

      {/* Warm background glows */}
      <div className="fixed top-[-10%] left-[-10%] w-[45%] h-[45%] rounded-full bg-amber-700/20 blur-[130px] pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[45%] h-[45%] rounded-full bg-orange-800/15 blur-[130px] pointer-events-none" />
      <div className="fixed top-[40%] left-[50%] w-[30%] h-[30%] rounded-full bg-yellow-900/10 blur-[100px] pointer-events-none" />

      {/* SECTION 1: HERO */}
      <section className="w-full relative min-h-screen flex flex-col items-center justify-center pt-20 pb-10 overflow-hidden">
        {/* Grid bg */}
        <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#5a3a1a2e_1px,transparent_1px),linear-gradient(to_bottom,#5a3a1a2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

          {/* LEFT: Text Content */}
          <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-amber-700/40 bg-amber-900/20 text-sm font-medium text-amber-300 backdrop-blur-md">
                <Sparkles className="w-4 h-4 text-amber-400" />
                Next-Gen Physics Learning
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter text-white leading-[1.05] max-w-2xl"
            >
              Master the{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-400">
                Laws of Nature
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 max-w-xl text-lg md:text-xl text-stone-400 mb-10 leading-relaxed font-light"
            >
              Stop memorizing. Start understanding. Experience physics through deep-dive lectures and expert mentorship from{" "}
              <span className="text-amber-300 font-medium">Ankit Yadav Sir</span> — designed for JEE & NEET success.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex gap-4 flex-col sm:flex-row"
            >
              <Link
                href="/courses"
                className="group inline-flex h-14 items-center justify-center rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-8 font-bold text-black transition-all hover:scale-105 shadow-[0_0_30px_rgba(245,158,11,0.4)] gap-2"
              >
                Explore Curriculum
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/signup"
                className="inline-flex h-14 items-center justify-center rounded-full border border-amber-700/40 bg-amber-900/10 px-8 font-semibold text-amber-300 transition-all hover:bg-amber-900/30 hover:scale-105 backdrop-blur-sm"
              >
                Create Free Account
              </Link>
            </motion.div>
          </div>

          {/* RIGHT: Ankit Sir Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 80 }}
            className="flex-shrink-0 order-1 lg:order-2 relative"
          >
            {/* Glow ring behind photo */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-amber-500/30 to-orange-600/20 blur-2xl scale-105" />

            <div className="relative w-72 h-80 md:w-96 md:h-[430px] rounded-3xl overflow-hidden border border-amber-700/30 shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
              <Image
                src="/ankit-sir.png"
                alt="Ankit Yadav Sir — Physics Teacher"
                fill
                className="object-cover object-top"
                priority
              />
              {/* Subtle bottom overlay */}
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="text-white font-bold text-lg">Ankit Yadav Sir</p>
                <p className="text-amber-300 text-sm">Physics Educator · JEE & NEET Expert</p>
              </div>
            </div>

            {/* Floating badge */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -right-4 bg-amber-500 text-black text-xs font-bold px-4 py-2 rounded-full shadow-lg"
            >
              ⭐ 4.9 Rating
            </motion.div>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-4 -left-4 bg-slate-900 border border-amber-700/40 text-amber-300 text-xs font-bold px-4 py-2 rounded-full shadow-lg"
            >
              🎓 500+ Selections
            </motion.div>
          </motion.div>

        </div>
      </section>

      {/* SECTION 2: TRUST BADGES */}
      <section className="w-full py-10 border-y border-amber-900/30 bg-amber-950/10 backdrop-blur-md relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { icon: Users, stat: "10,000+", label: "Students Taught", color: "text-amber-400" },
              { icon: Trophy, stat: "500+", label: "JEE/NEET Selections", color: "text-yellow-400" },
              { icon: Star, stat: "4.9/5", label: "Average Rating", color: "text-orange-400" },
              { icon: BookOpen, stat: "50+", label: "Courses Available", color: "text-amber-300" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center justify-center group"
              >
                <div className={`mb-3 p-3 rounded-2xl bg-amber-900/20 group-hover:bg-amber-900/40 transition-colors border border-amber-800/30 ${item.color}`}>
                  <item.icon className="w-6 h-6" />
                </div>
                <h4 className="text-3xl font-bold text-white mb-1">{item.stat}</h4>
                <p className="text-sm text-stone-400">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: BENTO GRID */}
      <section className="w-full py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4">The Secret to Scoring High</h2>
            <p className="text-stone-400 max-w-xl mx-auto text-lg">We don't just teach syllabus. We build intuition.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Big Card */}
            <motion.div
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="md:col-span-2 p-10 rounded-3xl bg-gradient-to-br from-amber-950/60 to-stone-950 border border-amber-900/30 relative overflow-hidden group"
            >
              <div className="absolute -right-20 -top-20 w-64 h-64 bg-amber-600/15 blur-[100px] rounded-full group-hover:bg-amber-600/25 transition-all duration-500" />
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-amber-500/20 flex items-center justify-center mb-6 border border-amber-500/30">
                  <Zap className="w-7 h-7 text-amber-400" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">Visual & Intuitive Physics</h3>
                <p className="text-stone-400 max-w-md text-lg leading-relaxed">
                  Every complex derivation is broken down into simple, visual parts. When you can see the forces acting in space, the math automatically makes sense.
                </p>
                <ul className="mt-8 space-y-3">
                  {["Step-by-step derivations", "Concept-first approach", "Real world applications"].map((point, i) => (
                    <li key={i} className="flex items-center gap-3 text-stone-300">
                      <CheckCircle2 className="w-5 h-5 text-amber-400 flex-shrink-0" /> {point}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Small Card 1 */}
            <motion.div
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-10 rounded-3xl bg-gradient-to-br from-amber-950/60 to-stone-950 border border-amber-900/30 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-orange-500/20 flex items-center justify-center mb-6 border border-orange-500/30">
                <BookOpen className="w-7 h-7 text-orange-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Zero Fluff Curriculum</h3>
              <p className="text-stone-400 leading-relaxed">
                Focused entirely on what matters for Boards, JEE, and NEET. No wasted time. Pure, highly-testable concepts.
              </p>
            </motion.div>

            {/* Small Card 2 */}
            <motion.div
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-10 rounded-3xl bg-gradient-to-br from-amber-950/60 to-stone-950 border border-amber-900/30 group md:col-span-1"
            >
              <div className="w-14 h-14 rounded-2xl bg-yellow-500/20 flex items-center justify-center mb-6 border border-yellow-500/30">
                <Users className="w-7 h-7 text-yellow-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Direct Mentorship</h3>
              <p className="text-stone-400 leading-relaxed">
                Stuck on a problem? Get direct access to Ankit Sir's doubt solving sessions and community forums.
              </p>
            </motion.div>

            {/* Banner Card */}
            <motion.div
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="md:col-span-2 p-10 rounded-3xl bg-gradient-to-r from-amber-900/30 to-orange-900/20 border border-amber-800/40 flex flex-col md:flex-row items-center justify-between"
            >
              <div className="text-center md:text-left mb-6 md:mb-0">
                <h3 className="text-2xl font-bold text-white mb-2">Explore the Top Courses</h3>
                <p className="text-amber-300/70">Mechanics, Thermodynamics, Electromagnetism & more.</p>
              </div>
              <Link
                href="/courses"
                className="px-8 py-3 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-black font-bold hover:scale-105 transition-all shadow-[0_0_20px_rgba(245,158,11,0.3)] whitespace-nowrap"
              >
                View Curriculum
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 4: TESTIMONIALS MARQUEE */}
      <section className="w-full py-24 bg-black/40 border-y border-amber-900/20 overflow-hidden">
        <div className="text-center mb-16 px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4">Wall of Love</h2>
          <p className="text-stone-400 max-w-xl mx-auto">Don't just take our word for it. Hear from students who transformed their grades.</p>
        </div>

        <div className="relative w-full flex overflow-x-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0a0500] to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0a0500] to-transparent z-10" />

          <motion.div
            className="flex gap-6 px-6 whitespace-nowrap"
            animate={{ x: [0, -1000] }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          >
            {[
              { name: "Rahul S.", exam: "JEE Advanced 2025", text: "I used to hate Rotation Mechanics. Now it's my strongest topic. The clarity completely changed the game for me." },
              { name: "Priya M.", exam: "NEET 2024", text: "Ankit Sir's shortcuts for Electromagnetism saved me so much time in the actual exam!" },
              { name: "Vikram K.", exam: "Class 12 Boards", text: "Scored 95/100 in Physics! The structured syllabus made revision incredibly easy." },
              { name: "Sneha T.", exam: "JEE Mains", text: "The concept-first approach is mind-blowing. Understanding the formulas makes them impossible to forget." },
              { name: "Aditya R.", exam: "Class 11", text: "Best physics teacher on the internet. Period. The energy in the lectures is unmatched." }
            ].map((t, i) => (
              <div key={i} className="inline-block w-[400px] p-8 rounded-3xl bg-amber-950/30 border border-amber-900/30 whitespace-normal flex-shrink-0">
                <div className="flex text-amber-400 mb-4">
                  {[...Array(5)].map((_, idx) => <Star key={idx} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-stone-300 text-lg mb-6">"{t.text}"</p>
                <div>
                  <h5 className="font-bold text-white">{t.name}</h5>
                  <p className="text-sm text-amber-400">{t.exam}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 5: FOOTER */}
      <Footer />
    </div>
  );
}
