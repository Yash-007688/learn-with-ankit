"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Atom, Eye, EyeOff, Mail, Lock, User, AlertCircle, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const passwordStrength = () => {
    if (password.length === 0) return 0;
    if (password.length < 6) return 1;
    if (password.length < 10) return 2;
    return 3;
  };
  const strengthLabel = ["", "Weak", "Good", "Strong"];
  const strengthColor = ["", "bg-red-500", "bg-yellow-500", "bg-amber-500"];

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) { setError("Please fill in all fields."); return; }
    if (password.length < 6) { setError("Password must be at least 6 characters."); return; }
    try {
      setLoading(true); setError(null);
      const supabase = createClient();
      const { error } = await supabase.auth.signUp({
        email, password,
        options: { data: { full_name: name } },
      });
      if (error) throw error;
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally { setLoading(false); }
  };

  const handleGoogleSignup = async () => {
    try {
      setGoogleLoading(true); setError(null);
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: `${window.location.origin}/auth/callback` },
      });
      if (error) throw error;
    } catch (err: any) {
      setError(err.message || "Google sign-in failed.");
    } finally { setGoogleLoading(false); }
  };

  if (success) {
    return (
      <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center bg-[#0a0500] px-4">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md text-center bg-amber-950/20 backdrop-blur-2xl border border-amber-900/30 rounded-3xl p-10">
          <div className="w-20 h-20 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-amber-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-3">Check your email!</h2>
          <p className="text-stone-400 mb-8">
            We've sent a confirmation link to <span className="text-amber-300 font-medium">{email}</span>. Click the link to activate your account.
          </p>
          <Link href="/login" className="inline-flex h-12 items-center justify-center rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-black font-bold px-8 hover:scale-105 transition-all">
            Go to Login
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center bg-[#0a0500] py-12 px-4 relative overflow-hidden">
      {/* Warm glows */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-orange-700/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-amber-700/15 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-amber-950/20 backdrop-blur-2xl border border-amber-900/30 rounded-3xl shadow-2xl p-8 relative z-10"
      >
        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} className="mb-4">
            <Atom className="w-12 h-12 text-amber-500" />
          </motion.div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Create your account</h1>
          <p className="text-sm text-stone-400 mt-1">Join 10,000+ students learning with Ankit Sir</p>
        </div>

        {/* Google Button */}
        <button
          onClick={handleGoogleSignup}
          disabled={googleLoading}
          className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-2xl border border-amber-900/40 bg-amber-900/10 hover:bg-amber-900/30 text-white text-sm font-medium transition-all disabled:opacity-50 mb-6"
        >
          <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          {googleLoading ? "Connecting..." : "Sign up with Google"}
        </button>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 h-px bg-amber-900/40" />
          <span className="text-xs text-stone-500">or sign up with email</span>
          <div className="flex-1 h-px bg-amber-900/40" />
        </div>

        {/* Error */}
        {error && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
            className="flex items-center gap-2 bg-red-500/10 text-red-400 border border-red-500/20 p-3 rounded-xl text-sm mb-5">
            <AlertCircle className="w-4 h-4 flex-shrink-0" /> {error}
          </motion.div>
        )}

        {/* Form */}
        <form onSubmit={handleSignup} className="space-y-4">
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500" />
            <input type="text" placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)}
              className="w-full bg-amber-900/10 border border-amber-900/30 rounded-2xl pl-11 pr-4 py-3.5 text-sm text-white placeholder-stone-500 focus:outline-none focus:border-amber-500/50 focus:bg-amber-900/20 transition-all" />
          </div>

          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500" />
            <input type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-amber-900/10 border border-amber-900/30 rounded-2xl pl-11 pr-4 py-3.5 text-sm text-white placeholder-stone-500 focus:outline-none focus:border-amber-500/50 focus:bg-amber-900/20 transition-all" />
          </div>

          <div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500" />
              <input type={showPassword ? "text" : "password"} placeholder="Password (min. 6 characters)" value={password} onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-amber-900/10 border border-amber-900/30 rounded-2xl pl-11 pr-11 py-3.5 text-sm text-white placeholder-stone-500 focus:outline-none focus:border-amber-500/50 focus:bg-amber-900/20 transition-all" />
              <button type="button" onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-300 transition-colors">
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {password.length > 0 && (
              <div className="mt-2 flex items-center gap-2">
                <div className="flex gap-1 flex-1">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className={`h-1 flex-1 rounded-full transition-all ${passwordStrength() >= i ? strengthColor[passwordStrength()] : "bg-amber-900/30"}`} />
                  ))}
                </div>
                <span className="text-xs text-stone-400">{strengthLabel[passwordStrength()]}</span>
              </div>
            )}
          </div>

          <button type="submit" disabled={loading}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-black font-bold text-sm hover:from-amber-400 hover:to-orange-400 transition-all shadow-[0_0_20px_rgba(245,158,11,0.3)] disabled:opacity-50 disabled:cursor-not-allowed mt-2">
            {loading ? "Creating account..." : "Create Free Account"}
          </button>
        </form>

        <p className="text-center text-sm text-stone-500 mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-amber-400 hover:text-amber-300 font-medium transition-colors">Log in</Link>
        </p>
      </motion.div>
    </div>
  );
}
