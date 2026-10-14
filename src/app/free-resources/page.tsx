"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Sparkles, ArrowRight, FileText, Clock, MessageSquare, DownloadCloud } from "lucide-react";
import Footer from "@/components/Footer";

export default function FreeResourcesPage() {
  return (
    <div className="min-h-screen bg-[#0a0500] text-stone-200 flex flex-col justify-between">
      {/* Background glow effects */}
      <div className="fixed top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-amber-600/15 blur-[150px] pointer-events-none rounded-full" />
      <div className="fixed bottom-10 left-10 w-[350px] h-[350px] bg-orange-600/10 blur-[120px] pointer-events-none rounded-full" />

      {/* Main Empty State Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10 flex flex-col items-center text-center my-auto">
        {/* Ankit Sir photo with decorative badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative mb-8"
        >
          <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-3xl p-[3px] bg-gradient-to-tr from-amber-500 via-orange-500 to-amber-300 shadow-[0_0_50px_rgba(245,158,11,0.35)]">
            <div className="w-full h-full rounded-[22px] overflow-hidden bg-black relative">
              <Image
                src="/ankit-sir.png"
                alt="Ankit Sir"
                fill
                className="object-cover object-top"
                priority
              />
            </div>
          </div>

          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-amber-950/90 border border-amber-500/50 text-amber-300 text-xs font-bold tracking-wider uppercase flex items-center gap-1.5 shadow-xl whitespace-nowrap">
            <DownloadCloud className="w-3.5 h-3.5 text-amber-400" />
            Compiling Study Material
          </div>
        </motion.div>

        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-800/40 bg-amber-950/40 text-amber-400 text-xs font-semibold mb-6"
        >
          <Clock className="w-4 h-4" />
          Resources Releasing Soon
        </motion.div>

        {/* Heading & Subtitle */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight mb-6"
        >
          Free Study Material & Notes <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-orange-400 to-amber-300">
            Will Be Uploaded Shortly
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-stone-400 text-base sm:text-lg max-w-xl mx-auto leading-relaxed mb-10"
        >
          Ankit Sir and team are finalizing handwritten notes, formula cheat sheets, and previous 10 years chapter-wise solved papers. They will be free to download here soon!
        </motion.p>

        {/* What to expect list */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid sm:grid-cols-3 gap-4 w-full max-w-2xl mb-12"
        >
          <div className="p-5 rounded-2xl bg-amber-950/20 border border-amber-900/30 backdrop-blur-sm">
            <FileText className="w-6 h-6 text-amber-400 mx-auto mb-2" />
            <h3 className="font-bold text-white text-sm">Formula Sheets</h3>
            <p className="text-xs text-stone-400 mt-1">High-yield revision PDFs</p>
          </div>
          <div className="p-5 rounded-2xl bg-amber-950/20 border border-amber-900/30 backdrop-blur-sm">
            <Sparkles className="w-6 h-6 text-amber-400 mx-auto mb-2" />
            <h3 className="font-bold text-white text-sm">Handwritten Notes</h3>
            <p className="text-xs text-stone-400 mt-1">Direct classroom notes</p>
          </div>
          <div className="p-5 rounded-2xl bg-amber-950/20 border border-amber-900/30 backdrop-blur-sm">
            <DownloadCloud className="w-6 h-6 text-amber-400 mx-auto mb-2" />
            <h3 className="font-bold text-white text-sm">Chapterwise PYQs</h3>
            <p className="text-xs text-stone-400 mt-1">JEE & NEET 10 Years</p>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-black font-extrabold text-sm shadow-[0_0_30px_rgba(245,158,11,0.4)] hover:scale-105 transition-all"
          >
            <MessageSquare className="w-4 h-4" />
            Request a Topic / Inquiry
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-amber-950/30 border border-amber-800/40 text-stone-300 font-semibold text-sm hover:text-white hover:bg-amber-900/40 transition-all"
          >
            ← Back to Home
          </Link>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
