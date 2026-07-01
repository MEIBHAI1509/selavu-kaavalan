import { supabase } from "@/lib/supabase/client";

export const settingsService = {
  async getSettings(userId: string) {
    return supabase
      .from("user_settings")
      .select("*")
      .eq("user_id", userId)
      .single();
  },

  async createSettings(
    userId: string
  ) {
    return supabase
      .from("user_settings")
      .insert({
        user_id: userId,
      });
  },

  async updateSettings(
    userId: string,
    payload: Record<
      string,
      unknown
    >
  ) {
    return supabase
      .from("user_settings")
      .update(payload)
      .eq("user_id", userId);
  },
};