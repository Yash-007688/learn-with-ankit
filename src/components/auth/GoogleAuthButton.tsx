"use client";

import { useState } from "react";
import { AlertCircle } from "lucide-react";
import { signInWithGoogle } from "@/lib/auth/googleAuth";

function GoogleMark() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#EA4335"
        d="M12 10.2v3.6h5.1c-.2 1.2-.8 2.2-1.7 2.9l2.8 2.2c1.6-1.5 2.6-3.7 2.6-6.3 0-.6-.1-1.2-.2-1.8H12z"
      />
      <path
        fill="#34A853"
        d="M6.6 14.3l-.9.7-2.5 1.9C5.1 20.2 8.3 22 12 22c2.7 0 5-.9 6.7-2.4l-2.8-2.2c-.8.5-1.8.9-3.9.9-3 0-5.5-2-6.4-4.7z"
      />
      <path
        fill="#FBBC05"
        d="M3.2 7.1C2.4 8.7 2 10.3 2 12s.4 3.3 1.2 4.9l3.4-2.6C6.3 13.6 6 12.8 6 12s.3-1.6.6-2.3L3.2 7.1z"
      />
      <path
        fill="#4285F4"
        d="M12 6c1.5 0 2.8.5 3.9 1.5l2.9-2.9C16.9 2.9 14.7 2 12 2 8.3 2 5.1 3.8 3.2 7.1l3.4 2.6C6.5 8 9 6 12 6z"
      />
    </svg>
  );
}

export default function GoogleAuthButton({
  label = "Continue with Google",
}: {
  label?: string;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClick = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await signInWithGoogle();
      if (!res.success) {
        setError(res.error || "Google sign-in failed. Please try again.");
        setLoading(false);
      }
    } catch {
      setError("Google sign-in failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-amber-900/40" />
        <span className="text-[10px] uppercase tracking-widest text-stone-500 font-semibold">
          or
        </span>
        <div className="h-px flex-1 bg-amber-900/40" />
      </div>

      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-xs">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <button
        type="button"
        onClick={handleClick}
        disabled={loading}
        className="w-full h-12 rounded-xl bg-white text-stone-800 font-bold flex items-center justify-center gap-2.5 hover:bg-stone-100 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 cursor-pointer text-sm"
      >
        <GoogleMark />
        {loading ? "Redirecting to Google..." : label}
      </button>
    </div>
  );
}
