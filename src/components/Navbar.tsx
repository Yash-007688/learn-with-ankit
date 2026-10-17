"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, LogOut, ChevronDown, User as UserIcon } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface AuthUser {
  id: string;
  email?: string;
  name?: string;
  avatarUrl?: string | null;
  role: "admin" | "dev" | "student";
}

export default function Navbar() {
  const pathname = usePathname();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const links = [
    { name: "Home", href: "/" },
    { name: "Courses", href: "/courses" },
    { name: "Free Resources", href: "/free-resources" },
  ];

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch Supabase user and profile
  useEffect(() => {
    const supabase = createClient();

    async function loadUser() {
      try {
        const { data: { user: authUser } } = await supabase.auth.getUser();
        if (authUser) {
          const userEmail = (authUser.email || "").toLowerCase().trim();
          const { data: profile } = await supabase
            .from("profiles")
            .select("role, full_name, avatar_url")
            .eq("id", authUser.id)
            .maybeSingle();

          const isKnownAdmin =
            userEmail === "yashrajmoolchandani@gmail.com" ||
            userEmail === "yashrajmmolchandani@gmail.com";

          const role = (profile?.role as "admin" | "dev" | "student") || (isKnownAdmin ? "admin" : "student");
          const name =
            profile?.full_name ||
            authUser.user_metadata?.full_name ||
            authUser.user_metadata?.name ||
            userEmail.split("@")[0] ||
            "User";
          const avatarUrl =
            profile?.avatar_url ||
            authUser.user_metadata?.avatar_url ||
            authUser.user_metadata?.picture ||
            null;

          setUser({
            id: authUser.id,
            email: authUser.email,
            name,
            avatarUrl,
            role,
          });
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error("Error loading auth user:", err);
      } finally {
        setLoading(false);
      }
    }

    loadUser();

    // Listen for auth state changes (login, logout, token refresh)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      loadUser();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    sessionStorage.removeItem("admin_auth");
    sessionStorage.removeItem("admin_email");
    setUser(null);
    setDropdownOpen(false);
    window.location.href = "/";
  };

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

            {/* Auth section */}
            <div className="flex items-center gap-3 ml-4">
              {loading ? (
                <div className="w-24 h-9 bg-amber-950/30 rounded-full animate-pulse" />
              ) : user ? (
                <div className="flex items-center gap-3">
                  {/* Admin Panel button if role is admin or dev */}
                  {(user.role === "admin" || user.role === "dev") && (
                    <Link
                      href="/admin"
                      className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-amber-300 bg-amber-950/60 hover:bg-amber-900/80 border border-amber-600/40 transition-colors shadow-[0_0_12px_rgba(245,158,11,0.2)]"
                    >
                      <Shield className="w-3.5 h-3.5 text-amber-400" />
                      Admin Panel
                    </Link>
                  )}

                  {/* Google Profile Dropdown */}
                  <div className="relative" ref={dropdownRef}>
                    <button
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-stone-900/90 border border-amber-800/40 hover:border-amber-600/60 transition-all text-left"
                    >
                      {/* Avatar */}
                      <div className="w-8 h-8 rounded-full overflow-hidden bg-amber-900/50 relative border border-amber-500/40 shrink-0">
                        {user.avatarUrl ? (
                          <img
                            src={user.avatarUrl}
                            alt={user.name || "User"}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-amber-300 text-xs font-bold">
                            {user.name ? user.name[0]?.toUpperCase() : <UserIcon className="w-4 h-4" />}
                          </div>
                        )}
                      </div>

                      {/* Name & Role tag */}
                      <div className="hidden lg:flex flex-col">
                        <span className="text-xs font-semibold text-white max-w-[120px] truncate">
                          {user.name}
                        </span>
                        <span className="text-[10px] uppercase tracking-wider font-bold text-amber-400">
                          {user.role}
                        </span>
                      </div>

                      <ChevronDown
                        className={`w-3.5 h-3.5 text-stone-400 transition-transform duration-200 ${
                          dropdownOpen ? "rotate-180 text-amber-400" : ""
                        }`}
                      />
                    </button>

                    {/* Dropdown Menu */}
                    <AnimatePresence>
                      {dropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.95 }}
                          transition={{ duration: 0.15 }}
                          className="absolute right-0 mt-2 w-64 rounded-2xl bg-stone-950/95 border border-amber-900/40 backdrop-blur-2xl shadow-[0_10px_35px_rgba(0,0,0,0.8)] p-3 z-50"
                        >
                          {/* User info box */}
                          <div className="px-3 py-2 border-b border-stone-800 mb-2">
                            <p className="text-sm font-semibold text-white truncate">{user.name}</p>
                            <p className="text-xs text-stone-400 truncate">{user.email}</p>
                            <span className="inline-block mt-1.5 px-2 py-0.5 rounded-full text-[10px] uppercase font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">
                              Role: {user.role}
                            </span>
                          </div>

                          {/* Links */}
                          {(user.role === "admin" || user.role === "dev") && (
                            <Link
                              href="/admin"
                              onClick={() => setDropdownOpen(false)}
                              className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-amber-300 hover:bg-amber-950/40 rounded-xl transition-colors mb-1"
                            >
                              <Shield className="w-3.5 h-3.5" />
                              Go to Admin Portal
                            </Link>
                          )}

                          {/* Sign Out */}
                          <button
                            onClick={handleSignOut}
                            className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-red-400 hover:bg-red-950/30 hover:text-red-300 rounded-xl transition-colors"
                          >
                            <LogOut className="w-3.5 h-3.5" />
                            Sign Out
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              ) : (
                <>
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
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
