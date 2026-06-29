import { supabase } from "@/lib/supabase/client";
import { Wallet } from "@/types/wallet";

export const walletService = {
  async getWallets(userId: string) {
    return supabase
      .from("wallets")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", {
        ascending: false,
      });
  },

  async createWallet(
    wallet: Omit<Wallet, "id" | "created_at">
  ) {
    return supabase
      .from("wallets")
      .insert(wallet)
      .select()
      .single();
  },

  async updateWallet(
    id: string,
    payload: {
      name: string;
      type: string;
      balance: number;
    }
  ) {
    return supabase
      .from("wallets")
      .update({
        name: payload.name,
        type: payload.type,
        balance: payload.balance,
      })
      .eq("id", id);
  },

  async deleteWallet(id: string) {
    return supabase
      .from("wallets")
      .delete()
      .eq("id", id);
  },
};  