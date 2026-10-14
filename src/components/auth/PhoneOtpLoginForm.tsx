"use client";

import { useState } from "react";
import { Phone, KeyRound, AlertCircle, CheckCircle2, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { sendPhoneOtp, verifyPhoneOtp } from "@/lib/auth/phoneOtpAuth";

export default function PhoneOtpLoginForm() {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber.trim()) {
      setError("Please enter your mobile phone number.");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const res = await sendPhoneOtp(phoneNumber);
      if (!res.success) {
        setError(res.error || "Failed to send OTP.");
        return;
      }
      setOtpSent(true);
      setSuccessMsg(res.message || "OTP code sent to your phone number.");
    } catch (err: any) {
      setError("Unable to request OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp.trim()) {
      setError("Please enter the 6-digit OTP code received.");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const res = await verifyPhoneOtp(phoneNumber, otp);
      if (!res.success) {
        setError(res.error || "Invalid OTP code entered.");
        return;
      }
      router.push("/");
    } catch (err: any) {
      setError("Verification failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-xs">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {successMsg && !error && (
        <div className="flex items-center gap-2 p-3 bg-green-500/10 border border-green-500/30 rounded-xl text-green-400 text-xs">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {!otpSent ? (
        <form onSubmit={handleSendOtp} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-2">
              Mobile Phone Number
            </label>
            <div className="relative">
              <input
                type="tel"
                required
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="e.g. 9876543210"
                className="w-full px-4 py-3.5 pl-11 rounded-xl bg-amber-950/30 border border-amber-900/40 text-white placeholder-stone-600 focus:outline-none focus:border-amber-500 text-sm transition-colors"
              />
              <Phone className="w-4 h-4 text-stone-500 absolute left-4 top-1/2 -translate-y-1/2" />
            </div>
            <p className="text-[11px] text-stone-500 mt-1.5">
              We will send a 6-digit one-time password (OTP) via SMS.
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 font-bold text-black flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_25px_rgba(245,158,11,0.3)] disabled:opacity-50 cursor-pointer text-sm"
          >
            {loading ? "Sending OTP..." : "Get Login OTP"}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      ) : (
        <form onSubmit={handleVerifyOtp} className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider">
                Enter 6-Digit OTP
              </label>
              <button
                type="button"
                onClick={() => setOtpSent(false)}
                className="text-xs text-amber-400 hover:underline"
              >
                Change Number
              </button>
            </div>
            <div className="relative">
              <input
                type="text"
                required
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="123456"
                className="w-full px-4 py-3.5 pl-11 tracking-widest text-center text-lg font-bold rounded-xl bg-amber-950/30 border border-amber-900/40 text-white placeholder-stone-600 focus:outline-none focus:border-amber-500 transition-colors"
              />
              <KeyRound className="w-4 h-4 text-stone-500 absolute left-4 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 font-bold text-black flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_25px_rgba(245,158,11,0.3)] disabled:opacity-50 cursor-pointer text-sm"
          >
            {loading ? "Verifying..." : "Verify & Log In"}
          </button>

          <div className="text-center">
            <button
              type="button"
              onClick={handleSendOtp}
              disabled={loading}
              className="text-xs text-stone-400 hover:text-amber-400 transition-colors cursor-pointer"
            >
              Didn&apos;t receive code? Resend OTP
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
