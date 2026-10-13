"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, Phone, MessageCircle, ArrowRight } from "lucide-react";

export default function Footer() {
  const socialLinks = [
    {
      name: "WhatsApp",
      href: "https://wa.me/919999999999",
      icon: <MessageCircle className="w-5 h-5" />,
      label: "WhatsApp",
      color: "hover:text-green-400 hover:border-green-500/50 hover:bg-green-500/10",
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
      href: "https://instagram.com/ankitphysics",
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      ),
      label: "Instagram",
      color: "hover:text-pink-400 hover:border-pink-500/50 hover:bg-pink-500/10",
    },
    {
      name: "Phone",
      href: "tel:+919999999999",
      icon: <Phone className="w-5 h-5" />,
      label: "Call Us",
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
          <Link
            href="/signup"
            className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-10 font-bold text-black transition-all hover:scale-105 shadow-[0_0_40px_rgba(245,158,11,0.4)] group"
          >
            Create Free Account
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
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
              className={`flex items-center gap-2.5 px-5 py-3 rounded-2xl border border-amber-900/30 bg-amber-900/10 text-stone-400 text-sm font-medium transition-all duration-300 ${s.color}`}
            >
              {s.icon}
              <span>{s.label}</span>
            </Link>
          ))}
        </motion.div>

        {/* Divider */}
        <div className="border-t border-amber-900/20 pt-8">
          {/* Bottom row */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-stone-500 text-sm">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-stone-600" />
              <span>© 2026 Ankit's Physics. All rights reserved.</span>
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              <Link href="#" className="hover:text-amber-400 transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-amber-400 transition-colors">Terms of Service</Link>
              <Link href="#" className="hover:text-amber-400 transition-colors">Contact</Link>
            </div>
          </div>

          {/* Powered by */}
          <div className="mt-8 flex justify-center">
            <p className="text-xs text-stone-600 tracking-widest uppercase flex items-center gap-2">
              Powered by{" "}
              <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-stone-400 to-stone-500 tracking-widest">
                BUILDING_VOID
              </span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
