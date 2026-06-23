"use client";

import { useCallback, useEffect, useState } from "react";

import { Wallet } from "@/types/wallet";
import { walletService } from "@/services/wallet.service";

export function useWallets(userId?: string) {
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchWallets = useCallback(async () => {
    if (!userId) return;

    try {
      setLoading(true);

      const { data, error } =
        await walletService.getWallets(userId);

      if (error) throw error;

      setWallets(data ?? []);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    void fetchWallets();
  }, [fetchWallets]);

  return {
    wallets,
    loading,
    refetch: fetchWallets,
  };
}