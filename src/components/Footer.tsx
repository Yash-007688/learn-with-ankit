"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Clock3, GitCommitHorizontal } from "lucide-react";
import { useAuth } from "@/lib/auth/useAuth";
import { DEFAULT_SITE_UPDATE, type SiteUpdate } from "@/lib/site-update";
import { getWhatsAppUrl, getTelUrl, getTelegramUrl } from "@/lib/contact";

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
      icon: <i className="fa-brands fa-whatsapp text-lg" style={{ color: "#ffd43b" }} />,
      label: "WhatsApp",
      color: "hover:bg-green-500/10 hover:border-green-500/50",
    },
    {
      name: "Phone",
      href: getTelUrl(),
      icon: <i className="fa-solid fa-phone text-lg" style={{ color: "#ffd43b" }} />,
      label: "Call Me",
      color: "hover:bg-amber-500/10 hover:border-amber-500/50",
    },
    {
      name: "YouTube",
      href: "https://youtube.com/@ankitphysics",
      icon: <i className="fa-brands fa-youtube text-lg" style={{ color: "#ffd43b" }} />,
      label: "YouTube",
      color: "hover:bg-red-500/10 hover:border-red-500/50",
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/ankityadav.vicky/",
      icon: <i className="fa-brands fa-instagram text-lg" style={{ color: "#ffd43b" }} />,
      label: "Instagram",
      color: "hover:bg-pink-500/10 hover:border-pink-500/50",
    },
    {
      name: "Email",
      href: "mailto:ankityadav.vicky@gmail.com",
      icon: <i className="fa-solid fa-inbox text-lg" style={{ color: "#ffd43b" }} />,
      label: "Email",
      color: "hover:bg-amber-500/10 hover:border-amber-500/50",
    },
    {
      name: "Telegram",
      href: getTelegramUrl(),
      icon: <i className="fa-brands fa-telegram text-lg" style={{ color: "#ffd43b" }} />,
      label: "Telegram",
      color: "hover:bg-sky-500/10 hover:border-sky-500/50",
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
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          {socialLinks.map((s) => (
            <Link
              key={s.name}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              title={s.label}
              className={`flex items-center justify-center p-3 rounded-2xl border border-amber-900/30 bg-amber-900/10 text-stone-400 transition-all duration-300 ${s.color}`}
            >
              {s.icon}
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
