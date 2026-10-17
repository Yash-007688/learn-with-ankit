import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { DEFAULT_SITE_UPDATE } from "@/lib/site-update";

const responseHeaders = { "Cache-Control": "no-store" };

export async function GET() {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { data, error } = await supabase
      .from("git_updates")
      .select("github_change_no, github_change_date, github_change_time, updated_by, commit_message")
      .order("github_change_date", { ascending: false })
      .order("github_change_time", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (!error && data) {
      return NextResponse.json({ update: data }, { headers: responseHeaders });
    }

    return NextResponse.json({ update: DEFAULT_SITE_UPDATE }, { headers: responseHeaders });
  } catch {
    return NextResponse.json({ update: DEFAULT_SITE_UPDATE }, { headers: responseHeaders });
  }
}
