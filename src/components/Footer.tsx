"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, Phone, MessageCircle, ArrowRight, Clock3, GitCommitHorizontal, Mail, Send } from "lucide-react";
import { useAuth } from "@/lib/auth/useAuth";
import { DEFAULT_SITE_UPDATE, type SiteUpdate } from "@/lib/site-update";
import { getWhatsAppUrl, getTelUrl } from "@/lib/contact";

type FooterProps = {
  showSiteUpdate?: boolean;
};

function formatGitHubDate(date: string) {
  const day = date.slice(0, 10);
  return new Intl.DateTimeFormat("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${day}T00:00:00Z`));
}

function formatGitHubTime(time: string) {
  const normalized = time.length >= 8 ? time.slice(0, 8) : time;
  return new Intl.DateTimeFormat("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "UTC",
  }).format(new Date(`1970-01-01T${normalized}Z`));
}

export default function Footer({ showSiteUpdate = false }: FooterProps) {
  const { isLoggedIn, isAdmin } = useAuth();
  const [siteUpdate, setSiteUpdate] = useState<SiteUpdate>(DEFAULT_SITE_UPDATE);

  useEffect(() => {
    if (!showSiteUpdate) return;

    const loadSiteUpdate = async () => {
      try {
        const response = await fetch("/api/site-update", { cache: "no-store" });
        const payload = await response.json();

        if (response.ok && payload.update) {
          setSiteUpdate(payload.update as SiteUpdate);
        }
      } catch {
        // The latest known update remains visible if the API is temporarily unavailable.
      }
    };

    void loadSiteUpdate();
  }, [showSiteUpdate]);
  const socialLinks = [
    {
      name: "WhatsApp",
      href: getWhatsAppUrl(),
      icon: <MessageCircle className="w-5 h-5 text-green-400" />,
      label: "💬 WhatsApp",
      color: "hover:text-green-400 hover:border-green-500/50 hover:bg-green-500/10",
    },
    {
      name: "Phone",
      href: getTelUrl(),
      icon: <Phone className="w-5 h-5 text-amber-400" />,
      label: "📞 Call Me",
      color: "hover:text-amber-400 hover:border-amber-500/50 hover:bg-amber-500/10",
    },
    {
      name: "YouTube",
      href: "https://youtube.com/@ankitphysics",
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      ),
      label: "YouTube",
      color: "hover:text-red-400 hover:border-red-500/50 hover:bg-red-500/10",
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/ankityadav.vicky/",
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      ),
      label: "Instagram",
      color: "hover:text-pink-400 hover:border-pink-500/50 hover:bg-pink-500/10",
    },
    {
      name: "Telegram",
      href: "https://t.me/ankitphysics",
      icon: <Send className="w-5 h-5 text-sky-400" />,
      label: "✈️ Telegram",
      color: "hover:text-sky-400 hover:border-sky-500/50 hover:bg-sky-500/10",
    },
    {
      name: "Twitter",
      href: "https://twitter.com/ankitphysics",
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.66l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ),
      label: "X (Twitter)",
      color: "hover:text-stone-100 hover:border-stone-400/50 hover:bg-stone-500/10",
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com/in/ankitphysics",
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
      label: "LinkedIn",
      color: "hover:text-blue-400 hover:border-blue-500/50 hover:bg-blue-500/10",
    },
    {
      name: "Facebook",
      href: "https://facebook.com/ankitphysics",
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
      label: "Facebook",
      color: "hover:text-blue-300 hover:border-blue-500/50 hover:bg-blue-500/10",
    },
    {
      name: "Email",
      href: "mailto:ankityadav.vicky@gmail.com",
      icon: <Mail className="w-5 h-5 text-amber-400" />,
      label: "✉️ Email",
      color: "hover:text-amber-400 hover:border-amber-500/50 hover:bg-amber-500/10",
    },
  ];

  return (
    <footer className="w-full relative border-t border-amber-900/20 bg-[#0a0500]">
      {/* Warm glow top */}
      <div className="absolute inset-0 bg-gradient-to-b from-amber-900/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20">

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to change your trajectory?
          </h2>
          <p className="text-stone-400 mb-8 max-w-xl mx-auto">
            Join thousands of students mastering physics with Ankit Sir. Start for free today.
          </p>
          {isLoggedIn ? (
            <Link
              href={isAdmin ? "/admin" : "/courses"}
              className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-10 font-bold text-black transition-all hover:scale-105 shadow-[0_0_40px_rgba(245,158,11,0.4)] group"
            >
              {isAdmin ? "Open Admin Portal" : "Explore Physics Curriculum"}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          ) : (
            <Link
              href="/signup"
              className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-10 font-bold text-black transition-all hover:scale-105 shadow-[0_0_40px_rgba(245,158,11,0.4)] group"
            >
              Create Free Account
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          )}
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="flex flex-col items-center gap-3 mb-16 max-w-xs mx-auto"
        >
          {socialLinks.map((s) => (
            <Link
              key={s.name}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2.5 w-full px-5 py-3 rounded-2xl border border-amber-900/30 bg-amber-900/10 text-stone-400 text-sm font-medium transition-all duration-300 ${s.color}`}
            >
              {s.icon}
              <span>{s.label}</span>
            </Link>
          ))}
        </motion.div>

        {/* Divider */}
        <div className="border-t border-amber-900/20 pt-8">
          {showSiteUpdate && (
            <div className="mb-8 overflow-hidden rounded-2xl border border-amber-800/30 bg-amber-950/20">
              <div className="flex items-center justify-center gap-1.5 border-b border-amber-800/20 px-4 py-2.5 text-xs font-medium uppercase tracking-wider text-amber-300">
                <GitCommitHorizontal className="h-4 w-4" />
                Last GitHub update
              </div>
              <div className="grid grid-cols-1 gap-3 px-4 py-3 text-xs sm:grid-cols-2 sm:text-sm lg:grid-cols-4">
                <div>
                  <p className="text-stone-500">GitHub change no</p>
                  <p className="mt-1 font-mono text-amber-200">{siteUpdate.github_change_no}</p>
                </div>
                <div>
                  <p className="text-stone-500">GitHub date</p>
                  <p className="mt-1 text-stone-300">{formatGitHubDate(siteUpdate.github_change_date)}</p>
                </div>
                <div>
                  <p className="text-stone-500">GitHub time</p>
                  <p className="mt-1 inline-flex items-center gap-1.5 text-stone-300">
                    <Clock3 className="h-3.5 w-3.5 text-stone-500" />
                    {formatGitHubTime(siteUpdate.github_change_time)} IST
                  </p>
                </div>
                <div>
                  <p className="text-stone-500">Updated by</p>
                  <p className="mt-1 break-all text-stone-300">{siteUpdate.updated_by}</p>
                </div>
              </div>
              <p className="border-t border-amber-800/20 px-4 py-2.5 text-center text-xs text-stone-500">
                {siteUpdate.commit_message}
              </p>
            </div>
          )}

          {/* Bottom row */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-stone-500 text-sm">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-stone-600" />
              <span>© 2026 Building_void. All rights reserved.</span>
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              <Link href="/privacy" className="hover:text-amber-400 transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-amber-400 transition-colors">Terms & Conditions</Link>
              <Link href="/#contact" className="hover:text-amber-400 transition-colors">Contact</Link>
            </div>
          </div>

          {/* Managed and Powered by */}
          <div className="mt-8 flex justify-center">
            <Link
              href="https://build-void.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-stone-500 tracking-widest uppercase flex items-center gap-2 hover:text-amber-400 transition-colors group"
            >
              Managed and Powered by{" "}
              <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400 group-hover:from-amber-300 group-hover:to-orange-300 tracking-widest underline decoration-amber-500/40 underline-offset-4">
                Building_Void
              </span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
