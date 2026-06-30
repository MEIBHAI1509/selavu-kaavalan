import { supabase } from "@/lib/supabase/client";

export const recurringService = {
  async getRecurring(userId: string) {
    return supabase
      .from("recurring_transactions")
      .select(`
        *,
        wallets(name),
        categories(name, icon)
      `)
      .eq("user_id", userId)
      .order("next_due_date", {
        ascending: true,
      });
  },

  async createRecurring(payload: {
    user_id: string;
    wallet_id: string;
    category_id?: string;
    type: "income" | "expense";
    title: string;
    amount: number;
    frequency:
      | "daily"
      | "weekly"
      | "monthly"
      | "yearly";
    start_date: string;
    note?: string;
  }) {
    return supabase
      .from(
        "recurring_transactions"
      )
      .insert({
        ...payload,
        next_due_date:
          payload.start_date,
      });
  },

  async updateRecurring(
    id: string,
    payload: {
      wallet_id: string;
      category_id?: string;
      type: "income" | "expense";
      title: string;
      amount: number;
      frequency:
        | "daily"
        | "weekly"
        | "monthly"
        | "yearly";
      start_date: string;
      note?: string;
    }
  ) {
    return supabase
      .from(
        "recurring_transactions"
      )
      .update({
        ...payload,
      })
      .eq("id", id);
  },

  async toggleRecurring(
    id: string,
    is_active: boolean
  ) {
    return supabase
      .from(
        "recurring_transactions"
      )
      .update({
        is_active,
      })
      .eq("id", id);
  },

  async processRecurring() {
    return supabase.rpc(
      "process_recurring_transactions"
    );
  },

  async deleteRecurring(
    id: string
  ) {
    return supabase
      .from(
        "recurring_transactions"
      )
      .delete()
      .eq("id", id);
  },
};