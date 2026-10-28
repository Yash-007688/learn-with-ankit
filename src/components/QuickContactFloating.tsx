"use client";

import { useState } from "react";
import { Phone, MessageCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getWhatsAppUrl, getTelUrl } from "@/lib/contact";

export default function QuickContactFloating() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2.5">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.9 }}
            transition={{ duration: 0.18 }}
            className="flex flex-col gap-2 p-2 rounded-2xl bg-stone-950/95 border border-amber-900/50 shadow-2xl backdrop-blur-xl"
          >
            {/* WhatsApp Link */}
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              title="WhatsApp Ankit Sir"
              className="flex items-center justify-center w-10 h-10 rounded-xl bg-green-950/60 hover:bg-green-900/80 border border-green-700/50 text-green-300 hover:text-white transition-all shadow-[0_0_15px_rgba(34,197,94,0.25)]"
            >
              <MessageCircle className="w-5 h-5 text-green-400 shrink-0" />
            </a>

            {/* Call Me Link */}
            <a
              href={getTelUrl()}
              title="Call Ankit Sir"
              className="flex items-center justify-center w-10 h-10 rounded-xl bg-amber-950/60 hover:bg-amber-900/80 border border-amber-700/50 text-amber-300 hover:text-white transition-all shadow-[0_0_15px_rgba(245,158,11,0.25)]"
            >
              <Phone className="w-5 h-5 text-amber-400 shrink-0" />
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Floating Trigger Button */}
      <div className="flex items-center gap-2">
        {!isOpen && (
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-900/90 border border-amber-900/40 text-stone-300 text-xs font-semibold shadow-lg backdrop-blur-md">
            <span>💬 Talk to Ankit Sir</span>
          </div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-12 h-12 rounded-full flex items-center justify-center text-white shadow-2xl transition-all duration-300 cursor-pointer ${
            isOpen
              ? "bg-stone-800 hover:bg-stone-700 border border-stone-600"
              : "bg-gradient-to-r from-green-500 via-emerald-500 to-amber-500 hover:scale-105 shadow-[0_0_20px_rgba(34,197,94,0.4)]"
          }`}
          aria-label="Quick contact Ankit Sir"
        >
          {isOpen ? (
            <X className="w-5 h-5 text-stone-300" />
          ) : (
            <MessageCircle className="w-6 h-6 text-black fill-current" />
          )}
        </button>
      </div>
    </div>
  );
}
