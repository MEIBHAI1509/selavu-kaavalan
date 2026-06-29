import { supabase } from "@/lib/supabase/client";

export const categoryService = {
  async getCategories(userId: string) {
    return supabase
      .from("categories")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", {
        ascending: false,
      });
  },

  async createCategory(payload: {
    user_id: string;
    name: string;
    icon: string;
    color: string;
  }) {
    return supabase
      .from("categories")
      .insert(payload);
  },

  async updateCategory(
    id: string,
    payload: {
      name: string;
      icon: string;
      color: string;
    }
  ) {
    return supabase
      .from("categories")
      .update(payload)
      .eq("id", id);
  },

  async deleteCategory(id: string) {
    return supabase
      .from("categories")
      .delete()
      .eq("id", id);
  },
};