import { supabase } from "@/lib/supabase/client";

export const incomeService = {
  async getIncome(userId: string) {
    return supabase
      .from("income")
      .select(`
        *,
        wallets(name)
      `)
      .eq("user_id", userId)
      .order("income_date", {
        ascending: false,
      });
  },

  async createIncome(payload: {
    user_id: string;
    wallet_id: string;
    amount: number;
    source: string;
    note?: string;
    income_date: string;
  }) {
    return supabase.rpc(
      "create_income",
      {
        p_user_id: payload.user_id,
        p_wallet_id: payload.wallet_id,
        p_amount: payload.amount,
        p_source: payload.source,
        p_note: payload.note ?? null,
        p_income_date:
          payload.income_date,
      }
    );
  },

  async updateIncome(
    id: string,
    payload: {
      wallet_id: string;
      amount: number;
      source: string;
      note?: string;
      income_date: string;
    }
  ) {
    return supabase.rpc(
      "update_income",
      {
        p_income_id: id,
        p_wallet_id: payload.wallet_id,
        p_amount: payload.amount,
        p_source: payload.source,
        p_note: payload.note ?? null,
        p_income_date:
          payload.income_date,
      }
    );
  },

  async deleteIncome(id: string) {
    return supabase.rpc(
      "delete_income",
      {
        p_income_id: id,
      }
    );
  },
};