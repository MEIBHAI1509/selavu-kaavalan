"use client";

import { useCallback, useEffect, useState } from "react";

import { Expense } from "@/types/expense";
import { expenseService } from "@/services/expense.service";

export function useExpenses(userId?: string) {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchExpenses = useCallback(async () => {
    // IMPORTANT
    if (!userId) {
      setExpenses([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const { data, error } =
        await expenseService.getExpenses(userId);

      if (error) throw error;

      setExpenses(data ?? []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    // Delay to avoid the React 19 lint warning
    const timer = setTimeout(() => {
      void fetchExpenses();
    }, 0);

    return () => clearTimeout(timer);
  }, [fetchExpenses]);

  return {
    expenses,
    loading,
    refetch: fetchExpenses,
    setExpenses,
  };
}