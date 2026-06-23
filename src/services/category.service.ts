import { supabase } from "@/lib/supabase/client";
import { Category } from "@/types/category";

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

  async createCategory(
    category: Omit<Category, "id" | "created_at">
  ) {
    return supabase
      .from("categories")
      .insert(category)
      .select()
      .single();
  },

  async deleteCategory(id: string) {
    return supabase
      .from("categories")
      .delete()
      .eq("id", id);
  },
};