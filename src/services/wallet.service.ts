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

  async deleteWallet(id: string) {
    return supabase
      .from("wallets")
      .delete()
      .eq("id", id);
  },
};  