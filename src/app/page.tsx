"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight, Sparkles,
  Users, Trophy, Star, BookOpen, Zap, CheckCircle2,
  ChevronDown, Mail, Phone, MessageSquare, Send, HelpCircle, X, ShieldCheck
} from "lucide-react";
import Footer from "@/components/Footer";

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Course Inquiry",
    message: "",
  });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitted(true);
    setTimeout(() => {
      setContactForm({ name: "", email: "", phone: "", subject: "Course Inquiry", message: "" });
      setContactSubmitted(false);
    }, 4000);
  };

  const faqs = [
    {
      q: "Which courses are suitable for JEE & NEET aspirants?",
      a: "Our Classical Mechanics, Electromagnetism, Modern Physics, and Optics modules are curated strictly according to the latest JEE Advanced, JEE Main, and NEET patterns with numerical problem-solving sessions.",
    },
    {
      q: "Are the lectures recorded or live?",
      a: "You get access to HD recorded concept lectures anytime with weekly scheduled live doubt-clearing sessions and formula derivation masterclasses.",
    },
    {
      q: "How can I ask doubts directly to Ankit Sir?",
      a: "Enrolled students get access to our dedicated doubt portal and community group where doubts are answered within 24 hours.",
    },
    {
      q: "Can I watch the videos on mobile and desktop?",
      a: "Yes! Learn with Ankit is fully responsive and optimized to run seamlessly across all smartphones, tablets, and computers.",
    },
    {
      q: "Is there any refund policy?",
      a: "Yes, you can check our detailed Terms & Conditions and refund rules on the Terms page before making any purchase.",
    },
  ];

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

      {/* SECTION 5: PRICING & PLAN DIFFERENTIATION */}
      <section id="pricing" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10 border-t border-amber-900/20">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-800/40 bg-amber-950/40 text-amber-400 text-xs font-semibold mb-4">
            <Sparkles className="w-4 h-4" />
            Clear & Transparent Pricing
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Choose Your Physics Batch
          </h2>
          <p className="text-stone-400 max-w-2xl mx-auto text-base">
            Select the tier that fits your exam target. Whether strengthening one weak topic or aiming for top AIR ranks.
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
              <p className="text-xs text-stone-400 mb-6">Target your weakest physics topic with full conceptual depth.</p>
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
              className="w-full py-3.5 rounded-xl border border-amber-800/40 text-amber-300 font-bold text-center text-sm hover:bg-amber-900/30 transition-all block"
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
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 to-orange-500 text-black text-xs font-extrabold uppercase tracking-widest px-4 py-1 rounded-full shadow-lg whitespace-nowrap">
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
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-black font-extrabold text-center text-sm shadow-[0_0_25px_rgba(245,158,11,0.4)] hover:scale-105 transition-all block"
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
              className="w-full py-3.5 rounded-xl border border-amber-800/40 text-amber-300 font-bold text-center text-sm hover:bg-amber-900/30 transition-all block"
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

      {/* SECTION 6: FAQS (FREQUENTLY ASKED QUESTIONS) */}
      <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-800/40 bg-amber-950/40 text-amber-400 text-xs font-semibold mb-4">
            <HelpCircle className="w-4 h-4" />
            Got Questions?
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-stone-400 max-w-xl mx-auto text-base">
            Everything you need to know about our courses, lectures, doubt resolution, and batch timings.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="rounded-2xl border border-amber-900/30 bg-amber-950/20 backdrop-blur-sm overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left font-semibold text-base sm:text-lg text-white hover:text-amber-400 transition-colors cursor-pointer"
                >
                  <span className="pr-4">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-amber-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-1 text-stone-300 text-sm sm:text-base leading-relaxed border-t border-amber-900/20">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* SECTION 6: CONTACT US */}
      <section id="contact" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10 border-t border-amber-900/20">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column: Contact Info */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-800/40 bg-amber-950/40 text-amber-400 text-xs font-semibold mb-4">
              <MessageSquare className="w-4 h-4" />
              Get In Touch
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-6">
              Have doubts or need counseling? <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-400">
                Talk to us directly.
              </span>
            </h2>
            <p className="text-stone-400 leading-relaxed mb-8 text-base">
              Whether you want guidance on selecting the right physics module for JEE/NEET or need help with course enrollment, Ankit Sir&apos;s academic team is here to assist you.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-amber-950/20 border border-amber-900/30">
                <div className="w-12 h-12 rounded-xl bg-amber-900/30 border border-amber-800/40 flex items-center justify-center text-amber-400">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs uppercase font-semibold text-stone-400">Direct Phone Support</h4>
                  <p className="text-white font-bold">+91 99999 99999</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-2xl bg-amber-950/20 border border-amber-900/30">
                <div className="w-12 h-12 rounded-xl bg-amber-900/30 border border-amber-800/40 flex items-center justify-center text-amber-400">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs uppercase font-semibold text-stone-400">Official Email</h4>
                  <p className="text-white font-bold">support@learnwithankit.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-2xl bg-amber-950/20 border border-amber-900/30">
                <div className="w-12 h-12 rounded-xl bg-amber-900/30 border border-amber-800/40 flex items-center justify-center text-amber-400">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs uppercase font-semibold text-stone-400">Response Speed</h4>
                  <p className="text-white font-bold">Within 2 to 4 hours on working days</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="p-8 sm:p-10 rounded-3xl bg-stone-950/80 border border-amber-900/40 backdrop-blur-xl shadow-[0_0_50px_rgba(0,0,0,0.8)]">
            <h3 className="text-2xl font-bold text-white mb-2">Send a Message</h3>
            <p className="text-xs text-stone-400 mb-6">Fill in the form below and we will get back to you shortly.</p>

            {contactSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 rounded-2xl bg-amber-950/40 border border-amber-800/50 text-center"
              >
                <div className="w-14 h-14 rounded-full bg-green-500/20 border border-green-500/40 text-green-400 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="text-xl font-bold text-white mb-2">Message Sent Successfully!</h4>
                <p className="text-sm text-stone-300">
                  Thank you for reaching out. Ankit Sir&apos;s counseling team will contact you soon.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-300 uppercase mb-2">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      placeholder="e.g. Aryan Sharma"
                      className="w-full px-4 py-3.5 rounded-xl bg-stone-900/80 border border-amber-900/40 text-white placeholder-stone-600 focus:outline-none focus:border-amber-500 text-sm transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-300 uppercase mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={contactForm.phone}
                      onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-3.5 rounded-xl bg-stone-900/80 border border-amber-900/40 text-white placeholder-stone-600 focus:outline-none focus:border-amber-500 text-sm transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-300 uppercase mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    placeholder="student@example.com"
                    className="w-full px-4 py-3.5 rounded-xl bg-stone-900/80 border border-amber-900/40 text-white placeholder-stone-600 focus:outline-none focus:border-amber-500 text-sm transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-300 uppercase mb-2">
                    I am interested in
                  </label>
                  <select
                    value={contactForm.subject}
                    onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl bg-stone-900/80 border border-amber-900/40 text-white focus:outline-none focus:border-amber-500 text-sm transition-colors"
                  >
                    <option value="JEE Advanced & Mains">JEE Advanced & Mains Physics</option>
                    <option value="NEET Preparation">NEET Physics Batch</option>
                    <option value="Class 11 Foundation">Class 11 Foundation</option>
                    <option value="Class 12 Boards">Class 12 Boards</option>
                    <option value="Doubt Clearing Session">Direct Doubt Clearing</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-300 uppercase mb-2">
                    Your Question / Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    placeholder="Tell us what you need help with..."
                    className="w-full px-4 py-3.5 rounded-xl bg-stone-900/80 border border-amber-900/40 text-white placeholder-stone-600 focus:outline-none focus:border-amber-500 text-sm transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full h-13 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 font-bold text-black flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_25px_rgba(245,158,11,0.3)] cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  Submit Inquiry
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* SECTION 7: FOOTER */}
      <Footer />
    </div>
  );
}
