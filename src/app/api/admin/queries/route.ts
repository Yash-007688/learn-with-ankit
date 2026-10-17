import { createServerClient } from "@supabase/ssr";
import { createClient as createAdminClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

async function getAdminDb() {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: () => {},
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const adminEmails = [
    "yashrajmoolchandani@gmail.com",
    "yashrajmmolchandani@gmail.com",
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

  if (!isAuthorized) return null;

  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  return serviceKey
    ? createAdminClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, serviceKey, {
        auth: { autoRefreshToken: false, persistSession: false },
      })
    : supabase;
}

export async function GET() {
  try {
    const db = await getAdminDb();
    if (!db) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { data, error } = await db
      .from("queries")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return NextResponse.json({ queries: data || [] });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const db = await getAdminDb();
    if (!db) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const id = body.id;
    if (!id) return NextResponse.json({ error: "Query ID required" }, { status: 400 });

    const updatePayload: any = {};
    if (body.status) updatePayload.status = body.status;
    if (body.admin_notes !== undefined) updatePayload.admin_notes = body.admin_notes;

    const { data, error } = await db
      .from("queries")
      .update(updatePayload)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json({ success: true, query: data });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const db = await getAdminDb();
    if (!db) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    const { error } = await db.from("queries").delete().eq("id", id);
    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
