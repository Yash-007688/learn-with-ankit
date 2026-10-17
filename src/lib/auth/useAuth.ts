"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export interface AuthProfile {
  id: string;
  email?: string;
  name?: string;
  avatarUrl?: string | null;
  role: "admin" | "dev" | "student";
}

export function useAuth() {
  const [user, setUser] = useState<AuthProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    async function checkUser() {
      try {
        // Fast local check from session first
        const { data: { session } } = await supabase.auth.getSession();
        const authUser = session?.user;

        if (authUser) {
          const userEmail = (authUser.email || "").toLowerCase().trim();
          const isKnownAdmin =
            userEmail === "yashrajmoolchandani@gmail.com" ||
            userEmail === "yashrajmmolchandani@gmail.com" ||
            userEmail === "ankityadav.vicky@gmail.com";

          const { data: profile } = await supabase
            .from("profiles")
            .select("role, full_name, avatar_url")
            .eq("id", authUser.id)
            .maybeSingle();

          const role =
            (profile?.role as "admin" | "dev" | "student") ||
            (isKnownAdmin ? "admin" : "student");

          const name =
            profile?.full_name ||
            authUser.user_metadata?.full_name ||
            authUser.user_metadata?.name ||
            userEmail.split("@")[0] ||
            "Student";

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
          // Check if admin is logged in via sessionStorage fallback
          const adminAuth = sessionStorage.getItem("admin_auth");
          if (adminAuth === "true") {
            setUser({
              id: "admin-session",
              email: sessionStorage.getItem("admin_email") || "admin",
              name: "Admin",
              avatarUrl: null,
              role: "admin",
            });
          } else {
            setUser(null);
          }
        }
      } catch (err) {
        console.error("Auth hook error:", err);
      } finally {
        setLoading(false);
      }
    }

    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user) {
          checkUser();
        } else {
          setUser(null);
          setLoading(false);
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return {
    user,
    role: user?.role || "student",
    isLoggedIn: !!user,
    isAdmin: user?.role === "admin" || user?.role === "dev",
    loading,
  };
}
