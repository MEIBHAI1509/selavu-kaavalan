import { supabase } from "@/lib/supabase/client";

export const expenseService = {
  async getExpenses(userId: string) {
    return supabase
      .from("expenses")
      .select(`
        *,
        wallets(name),
        categories(name, icon)
      `)
      .eq("user_id", userId)
      .order("expense_date", {
        ascending: false,
      });
  },

  async createExpense(payload: {
    user_id: string;
    wallet_id: string;
    category_id: string;
    amount: number;
    note?: string;
    expense_date: string;
  }) {
    return supabase.rpc("create_expense", {
      p_user_id: payload.user_id,
      p_wallet_id: payload.wallet_id,
      p_category_id: payload.category_id,
      p_amount: payload.amount,
      p_note: payload.note ?? null,
      p_expense_date: payload.expense_date,
    });
  },

  async deleteExpense(id: string) {
    return supabase
      .from("expenses")
      .delete()
      .eq("id", id);
  },
};