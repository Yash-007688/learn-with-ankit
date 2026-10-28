import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { DEFAULT_SITE_UPDATE } from "@/lib/site-update";

const responseHeaders = { "Cache-Control": "no-store" };

// GitHub repo details — fetched from the remote URL
const GITHUB_OWNER = "Yash-007688";
const GITHUB_REPO = "learn-with-ankit";

interface SiteUpdate {
  github_change_no: string;
  github_change_date: string;
  github_change_time: string;
  updated_by: string;
  commit_message: string;
}

/**
 * Fetch the latest commit from the GitHub REST API (no auth needed for public repos).
 * Returns null if the request fails or is rate-limited.
 */
async function fetchLatestGitHubCommit(): Promise<SiteUpdate | null> {
  try {
    const res = await fetch(
      `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/commits?per_page=1`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          "User-Agent": "learn-with-ankit",
        },
        next: { revalidate: 0 },
      }
    );

    if (!res.ok) return null;

    const commits = await res.json();
    if (!Array.isArray(commits) || commits.length === 0) return null;

    const latest = commits[0];
    const sha: string = latest.sha || "";
    const dateStr: string = latest.commit?.author?.date || "";
    const message: string = (latest.commit?.message || "").trim();

    // dateStr looks like "2026-10-17T22:14:57Z"
    const isoDate = dateStr ? new Date(dateStr) : null;

    // Convert to IST (UTC+5:30) — GitHub stores commit time in the author's TZ or UTC
    const istDate = isoDate
      ? new Date(isoDate.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }))
      : new Date();

    const yyyy = istDate.getFullYear();
    const mm = String(istDate.getMonth() + 1).padStart(2, "0");
    const dd = String(istDate.getDate()).padStart(2, "0");
    const github_change_date = `${yyyy}-${mm}-${dd}`;

    const hh = String(istDate.getHours()).padStart(2, "0");
    const mi = String(istDate.getMinutes()).padStart(2, "0");
    const ss = String(istDate.getSeconds()).padStart(2, "0");
    const github_change_time = `${hh}:${mi}:${ss}`;

    return {
      github_change_no: sha.slice(0, 7),
      github_change_date,
      github_change_time,
      updated_by: "itdept@buildingvoid.com",
      commit_message: message,
    };
  } catch {
    return null;
  }
}

export async function GET() {
  // 1. Try GitHub API first (always fresh)
  const ghUpdate = await fetchLatestGitHubCommit();
  if (ghUpdate) {
    return NextResponse.json({ update: ghUpdate }, { headers: responseHeaders });
  }

  // 2. Fall back to the git_updates table in Supabase
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
  } catch {
    // ignore DB errors
  }

  // 3. Final fallback — hardcoded default
  return NextResponse.json({ update: DEFAULT_SITE_UPDATE }, { headers: responseHeaders });
}
