import { createServerClient } from "@supabase/ssr";
import { createClient as createAdminClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next");

  if (code) {
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
            } catch (error) {
              // The `setAll` method was called from a Server Component.
            }
          },
        },
      }
    );

    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error && data?.user) {
      const user = data.user;
      const userEmail = (user.email || "").toLowerCase().trim();

      // Check if service role key is available to bypass RLS for profile upsert
      const dbClient = process.env.SUPABASE_SERVICE_ROLE_KEY
        ? createAdminClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.SUPABASE_SERVICE_ROLE_KEY,
            { auth: { autoRefreshToken: false, persistSession: false } }
          )
        : supabase;

      // 1. Fetch user profile from database
      const { data: profile } = await dbClient
        .from("profiles")
        .select("id, role, full_name, avatar_url")
        .eq("id", user.id)
        .maybeSingle();

      const knownAdminEmails = [
        "yashrajmoolchandani@gmail.com",
        "yashrajmmolchandani@gmail.com",
        "ankityadav.vicky@gmail.com",
      ];
      const isAdminEmail = knownAdminEmails.includes(userEmail);

      let effectiveRole = profile?.role;

      if (!profile) {
        // Auto-assign role: admin for known admin emails, student otherwise
        effectiveRole = isAdminEmail ? "admin" : "student";

        const fullName =
          user.user_metadata?.full_name ||
          user.user_metadata?.name ||
          userEmail.split("@")[0] ||
          "Student";

        const avatarUrl =
          user.user_metadata?.avatar_url ||
          user.user_metadata?.picture ||
          null;

        await dbClient.from("profiles").upsert(
          {
            id: user.id,
            email: user.email,
            full_name: fullName,
            avatar_url: avatarUrl,
            role: effectiveRole,
            class: "Class 11",
          },
          { onConflict: "id" }
        );
      } else if (isAdminEmail && profile.role === "student") {
        // Elevate known admin email if currently marked student
        effectiveRole = "admin";
        await dbClient
          .from("profiles")
          .update({ role: "admin" })
          .eq("id", user.id);
      }

      // 2. Redirect based on role
      // Admin or Dev -> /admin
      if (effectiveRole === "admin" || effectiveRole === "dev") {
        return NextResponse.redirect(`${origin}/admin`);
      }

      // Student / default -> Home page (or custom next param)
      return NextResponse.redirect(`${origin}${next ?? "/"}`);
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/login?error=Could not authenticate user`);
}
