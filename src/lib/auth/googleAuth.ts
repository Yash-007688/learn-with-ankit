import { createClient } from "@/lib/supabase/client";

export interface GoogleAuthResult {
  success: boolean;
  error?: string;
}

export async function signInWithGoogle(): Promise<GoogleAuthResult> {
  try {
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Failed to start Google sign-in.";
    return { success: false, error: message };
  }
}
