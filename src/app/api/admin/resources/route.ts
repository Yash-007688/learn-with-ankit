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

    const [freeRes, paidRes] = await Promise.all([
      db.from("free_resources").select("*").order("created_at", { ascending: false }),
      db.from("paid_resources").select("*").order("created_at", { ascending: false }),
    ]);

    return NextResponse.json({
      freeResources: freeRes.data || [],
      paidResources: paidRes.data || [],
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const db = await getAdminDb();
    if (!db) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const uploadCategory = body.upload_type; // 'free' or 'paid'

    if (uploadCategory === "free") {
      const title = (body.title || "").trim();
      if (!title) return NextResponse.json({ error: "Title is required" }, { status: 400 });

      const { data, error } = await db
        .from("free_resources")
        .insert({
          title,
          category: body.category || "Handwritten Notes",
          target_class: body.target_class || "Class 11",
          file_url: body.file_url || "https://example.com/notes.pdf",
          file_size: body.file_size || "2.5 MB",
          is_published: body.is_published !== false,
        })
        .select()
        .single();

      if (error) throw error;
      return NextResponse.json({ success: true, resource: data, type: "free" });
    } else if (uploadCategory === "paid") {
      const courseId = body.course_id;
      if (!courseId) return NextResponse.json({ error: "Course selection is required" }, { status: 400 });

      const title = (body.title || "").trim();
      if (!title) return NextResponse.json({ error: "Title is required" }, { status: 400 });

      const { data, error } = await db
        .from("paid_resources")
        .insert({
          course_id: Number(courseId),
          course_name: body.course_name || "Physics Course",
          title,
          resource_type: body.resource_type || "video",
          video_url: body.video_url || null,
          file_url: body.file_url || null,
          chapter_order: Number(body.chapter_order || 1),
          is_preview: body.is_preview === true,
        })
        .select()
        .single();

      if (error) throw error;
      return NextResponse.json({ success: true, resource: data, type: "paid" });
    } else {
      return NextResponse.json({ error: "Invalid upload type. Must be 'free' or 'paid'" }, { status: 400 });
    }
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
    const type = searchParams.get("type"); // 'free' or 'paid'

    if (!id || !type) return NextResponse.json({ error: "ID and type are required" }, { status: 400 });

    const table = type === "free" ? "free_resources" : "paid_resources";
    const { error } = await db.from(table).delete().eq("id", id);
    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
