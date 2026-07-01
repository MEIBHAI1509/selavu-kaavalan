"use client";

import { useMemo } from "react";

import { useWallets } from "@/hooks/use-wallets";
import { useExpenses } from "@/hooks/use-expenses";
import { useIncome } from "@/hooks/use-income";
import { useGoals } from "@/hooks/use-goals";
import { useRecurring } from "@/hooks/use-recurring";

export function useProfileStats(
  userId?: string
) {
  const {
    wallets,
  } = useWallets(userId);

  const {
    expenses,
  } = useExpenses(userId);

  const {
    income,
  } = useIncome(userId);

  const {
    goals,
  } = useGoals(userId);

  const {
    transactions,
  } = useRecurring(userId);

  return useMemo(
    () => ({
      wallets: wallets.length,
      expenses: expenses.length,
      income: income.length,
      goals: goals.length,
      recurring:
        transactions.length,
    }),
    [
      wallets,
      expenses,
      income,
      goals,
      transactions,
    ]
  );
}