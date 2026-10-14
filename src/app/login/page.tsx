"use client";

import { useState } from "react";
import { Atom, Phone, KeyRound } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import PasswordLoginForm from "@/components/auth/PasswordLoginForm";
import PhoneOtpLoginForm from "@/components/auth/PhoneOtpLoginForm";

export default function LoginPage() {
  const [authMode, setAuthMode] = useState<"phone" | "password">("phone");

  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center bg-[#0a0500] py-12 px-4 relative overflow-hidden">
      {/* Warm ambient glows */}
      <div className="absolute top-0 left-1/4 w-80 h-80 bg-amber-700/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-orange-700/15 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-amber-950/20 backdrop-blur-2xl border border-amber-900/30 rounded-3xl shadow-2xl p-8 relative z-10"
      >
        {/* Header */}
        <div className="flex flex-col items-center mb-6">
          <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-2xl mb-4 shadow-[0_0_20px_rgba(245,158,11,0.2)]">
            <Atom className="w-8 h-8 text-amber-400 animate-spin-slow" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Student Login</h1>
          <p className="text-stone-400 text-sm mt-1">
            Access your courses, doubt solver, and progress
          </p>
        </div>

        {/* Tab Switcher: Phone OTP vs Password */}
        <div className="p-1 rounded-2xl bg-stone-950/80 border border-amber-900/40 flex mb-6">
          <button
            type="button"
            onClick={() => setAuthMode("phone")}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              authMode === "phone"
                ? "bg-gradient-to-r from-amber-500 to-orange-500 text-black shadow-md"
                : "text-stone-400 hover:text-white"
            }`}
          >
            <Phone className="w-3.5 h-3.5" />
            Phone OTP
          </button>
          <button
            type="button"
            onClick={() => setAuthMode("password")}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              authMode === "password"
                ? "bg-gradient-to-r from-amber-500 to-orange-500 text-black shadow-md"
                : "text-stone-400 hover:text-white"
            }`}
          >
            <KeyRound className="w-3.5 h-3.5" />
            Email
          </button>
        </div>

        {/* Dynamic Form based on Tab */}
        <div className="mb-6">
          {authMode === "phone" ? <PhoneOtpLoginForm /> : <PasswordLoginForm />}
        </div>

        {/* Footer Link */}
        <div className="border-t border-amber-900/20 pt-6 text-center text-xs text-stone-500">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-amber-400 hover:text-amber-300 font-semibold ml-1">
            Sign up for free
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
