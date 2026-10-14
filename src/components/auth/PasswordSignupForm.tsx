"use client";

import { useState } from "react";
import { User, Mail, Lock, Eye, EyeOff, AlertCircle, CheckCircle2 } from "lucide-react";
import { signupWithPassword } from "@/lib/auth/passwordAuth";

export default function PasswordSignupForm({ onSuccess }: { onSuccess?: () => void }) {
  const [fullName, setFullName] = useState("");
  const [emailOrUser, setEmailOrUser] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDone, setIsDone] = useState(false);

  const passwordStrength = () => {
    if (password.length === 0) return 0;
    if (password.length < 6) return 1;
    if (password.length < 10) return 2;
    return 3;
  };
  const strengthLabel = ["", "Weak", "Good", "Strong"];
  const strengthColor = ["", "bg-red-500", "bg-yellow-500", "bg-amber-500"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !emailOrUser.trim() || !password) {
      setError("Please fill in all required fields.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const res = await signupWithPassword(fullName, emailOrUser, password);
      if (!res.success) {
        setError(res.error || "Failed to create account.");
        return;
      }
      setIsDone(true);
      if (onSuccess) onSuccess();
    } catch (err: any) {
      setError("Unable to complete sign up. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (isDone) {
    return (
      <div className="text-center py-6">
        <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500/40 text-green-400 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Account Created!</h3>
        <p className="text-sm text-stone-400 mb-6 leading-relaxed">
          Welcome to Learn with Ankit. Your student profile has been created successfully.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-xs">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div>
        <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-2">
          Full Name
        </label>
        <div className="relative">
          <input
            type="text"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="e.g. Aryan Sharma"
            className="w-full px-4 py-3.5 pl-11 rounded-xl bg-amber-950/30 border border-amber-900/40 text-white placeholder-stone-600 focus:outline-none focus:border-amber-500 text-sm transition-colors"
          />
          <User className="w-4 h-4 text-stone-500 absolute left-4 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-2">
          Email or Username
        </label>
        <div className="relative">
          <input
            type="text"
            required
            value={emailOrUser}
            onChange={(e) => setEmailOrUser(e.target.value)}
            placeholder="student@example.com or aryan_physics"
            className="w-full px-4 py-3.5 pl-11 rounded-xl bg-amber-950/30 border border-amber-900/40 text-white placeholder-stone-600 focus:outline-none focus:border-amber-500 text-sm transition-colors"
          />
          <Mail className="w-4 h-4 text-stone-500 absolute left-4 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-2">
          Create Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="At least 6 characters"
            className="w-full px-4 py-3.5 pl-11 pr-11 rounded-xl bg-amber-950/30 border border-amber-900/40 text-white placeholder-stone-600 focus:outline-none focus:border-amber-500 text-sm transition-colors"
          />
          <Lock className="w-4 h-4 text-stone-500 absolute left-4 top-1/2 -translate-y-1/2" />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-300"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>

        {/* Password Strength Meter */}
        {password.length > 0 && (
          <div className="mt-2 space-y-1">
            <div className="flex gap-1.5 h-1">
              {[1, 2, 3].map((lvl) => (
                <div
                  key={lvl}
                  className={`flex-1 rounded-full transition-all duration-300 ${
                    passwordStrength() >= lvl ? strengthColor[passwordStrength()] : "bg-stone-800"
                  }`}
                />
              ))}
            </div>
            <p className="text-[10px] text-stone-400 text-right">
              Strength: <span className="font-semibold">{strengthLabel[passwordStrength()]}</span>
            </p>
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full h-12 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 font-bold text-black flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_25px_rgba(245,158,11,0.3)] disabled:opacity-50 cursor-pointer text-sm"
      >
        {loading ? "Creating Account..." : "Create Account with Password"}
      </button>
    </form>
  );
}
