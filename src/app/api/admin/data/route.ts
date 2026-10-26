import { createServerClient } from "@supabase/ssr";
import { createClient as createAdminClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) =>
                cookieStore.set(name, value, options)
              );
            } catch {
              // Ignore
            }
          },
        },
      }
    );

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const adminEmails = [
      "yashrajmoolchandani@gmail.com",
      "yashrajmmolchandani@gmail.com",
      "ankityadav.vicky@gmail.com",
    ];

    let isAuthorized = false;

    if (user) {
      const email = (user.email || "").toLowerCase().trim();
      if (adminEmails.includes(email)) {
        isAuthorized = true;
      } else {
        const { data: profile } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", user.id)
          .maybeSingle();

        if (profile?.role === "admin" || profile?.role === "dev") {
          isAuthorized = true;
        }
      }
    }

    // Also support admin header verification for portal login
    const headerAuth = request.headers.get("x-admin-auth");
    const headerEmail = (request.headers.get("x-admin-email") || "").toLowerCase().trim();
    if (headerAuth === "true" && (adminEmails.includes(headerEmail) || headerEmail === "admin")) {
      isAuthorized = true;
    }

    if (!isAuthorized) {
      return NextResponse.json(
        { error: "Unauthorized access to admin data" },
        { status: 401 }
      );
    }

    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const db = serviceKey
      ? createAdminClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, serviceKey, {
          auth: { autoRefreshToken: false, persistSession: false },
        })
      : supabase;

    // 1. Fetch live Auth users directly from Supabase Auth admin API
    let authUsers: any[] = [];
    if (serviceKey) {
      try {
        const { data: authData, error: authErr } = await db.auth.admin.listUsers({
          perPage: 1000,
        });
        if (!authErr && authData?.users) {
          authUsers = authData.users;
        }
      } catch (authError) {
        console.error("Error listing Supabase auth users:", authError);
      }
    }

    // 2. Fetch profiles from database
    const [profilesRes, queriesRes] = await Promise.all([
      db.from("profiles").select("*").order("created_at", { ascending: false }),
      db.from("queries").select("*").order("created_at", { ascending: false }),
    ]);

    let profiles = profilesRes.data || [];
    const queries = queriesRes.data || [];

    // 3. Auto-sync any registered auth user into profiles table
    if (authUsers.length > 0) {
      const existingProfileIds = new Set(profiles.map((p: any) => p.id));
      const missingUsers = authUsers.filter((u: any) => !existingProfileIds.has(u.id));

      if (missingUsers.length > 0 && serviceKey) {
        for (const u of missingUsers) {
          const userEmail = (u.email || "").toLowerCase().trim();
          const isAdmin = adminEmails.includes(userEmail);
          const fullName =
            u.user_metadata?.full_name ||
            u.user_metadata?.name ||
            userEmail.split("@")[0] ||
            "Student";
          const avatarUrl =
            u.user_metadata?.avatar_url ||
            u.user_metadata?.picture ||
            null;

          try {
            const { data: newProfile } = await db
              .from("profiles")
              .upsert({
                id: u.id,
                email: u.email,
                full_name: fullName,
                avatar_url: avatarUrl,
                role: isAdmin ? "admin" : "student",
                class: "Class 11",
                created_at: u.created_at,
              })
              .select()
              .maybeSingle();

            if (newProfile) {
              profiles.unshift(newProfile);
            } else {
              profiles.unshift({
                id: u.id,
                email: u.email,
                full_name: fullName,
                avatar_url: avatarUrl,
                role: isAdmin ? "admin" : "student",
                class: "Class 11",
                created_at: u.created_at,
              });
            }
          } catch (upsertErr) {
            console.error("Failed to auto-sync user to profiles:", upsertErr);
          }
        }
      }
    }

    return NextResponse.json({
      profiles: profiles,
      queries: queries,
    });
  } catch (error) {
    console.error("Admin data API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

