import { createClient } from "@/lib/supabase/client";

export interface PasswordAuthResult {
  success: boolean;
  error?: string;
}

/**
 * Sign in using email/username and password
 */
export async function loginWithPassword(
  emailOrUsername: string,
  password: string
): Promise<PasswordAuthResult> {
  try {
    const supabase = createClient();
    
    // Ensure email formatting or username
    const formattedEmail = emailOrUsername.includes("@")
      ? emailOrUsername.trim()
      : `${emailOrUsername.trim().toLowerCase()}@learnwithankit.com`;

    const { error } = await supabase.auth.signInWithPassword({
      email: formattedEmail,
      password: password,
    });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: any) {
    return {
      success: false,
      error: err.message || "Failed to sign in. Please verify your credentials.",
    };
  }
}

/**
 * Sign up using full name, email/username and password
 */
export async function signupWithPassword(
  fullName: string,
  emailOrUsername: string,
  password: string
): Promise<PasswordAuthResult> {
  try {
    const supabase = createClient();

    const formattedEmail = emailOrUsername.includes("@")
      ? emailOrUsername.trim()
      : `${emailOrUsername.trim().toLowerCase()}@learnwithankit.com`;

    const { data: authData, error } = await supabase.auth.signUp({
      email: formattedEmail,
      password: password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (error) {
      return { success: false, error: error.message };
    }

    if (authData?.user) {
      try {
        await supabase.from("profiles").upsert({
          id: authData.user.id,
          email: formattedEmail,
          full_name: fullName,
          role: "student",
          class: "Class 11",
        });
      } catch (pErr) {
        console.error("Profile creation error on signup:", pErr);
      }
    }

    return { success: true };
  } catch (err: any) {
    return {
      success: false,
      error: err.message || "Signup failed. Please try again.",
    };
  }
}
