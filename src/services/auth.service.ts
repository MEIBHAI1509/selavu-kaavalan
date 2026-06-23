import { supabase } from "@/lib/supabase/client";

export const authService = {
  async signIn(email: string, password: string) {
    return supabase.auth.signInWithPassword({
      email,
      password,
    });
  },

  async signUp(email: string, password: string) {
    return supabase.auth.signUp({
      email,
      password,
    });
  },

  async signInWithGoogle() {
    return supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    });
  },

  async signOut() {
    return supabase.auth.signOut();
  },
};