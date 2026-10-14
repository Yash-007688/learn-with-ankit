"use client";

import Link from "next/link";
import Image from "next/image";
import { Atom } from "lucide-react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { name: "Home", href: "/" },
    { name: "Courses", href: "/courses" },
    { name: "Free Resources", href: "/free-resources" },
  ];

  return (
    <nav className="border-b border-amber-900/30 bg-[#0a0500]/80 backdrop-blur-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo with Ankit Sir's Photo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-11 h-11 rounded-full p-[2px] bg-gradient-to-tr from-amber-500 to-orange-500 group-hover:scale-105 transition-transform duration-300 shadow-[0_0_15px_rgba(245,158,11,0.4)]">
                <div className="w-full h-full rounded-full overflow-hidden bg-black relative">
                  <Image
                    src="/ankit-sir.png"
                    alt="Ankit Sir Logo"
                    fill
                    className="object-cover object-top"
                    sizes="44px"
                    priority
                  />
                </div>
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-[#0a0500] rounded-full" />
            </div>
            <span className="font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-400 tracking-tight group-hover:from-amber-300 group-hover:to-orange-300 transition-colors">
              Learn with Ankit
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-4">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors ${
                    isActive ? "text-white" : "text-stone-400 hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-nav"
                      className="absolute inset-0 bg-amber-900/40 rounded-full -z-10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {link.name}
                </Link>
              );
            })}

            <div className="flex items-center gap-3 ml-4">
              <Link
                href="/login"
                className="px-5 py-2.5 rounded-full text-sm font-semibold text-amber-300 bg-amber-900/20 hover:bg-amber-900/40 border border-amber-800/40 backdrop-blur-md transition-all duration-300"
              >
                Log In
              </Link>
              <Link
                href="/signup"
                className="px-5 py-2.5 rounded-full text-sm font-bold text-black bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 transition-all duration-300 shadow-[0_0_15px_rgba(245,158,11,0.3)]"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
