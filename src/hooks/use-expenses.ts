"use client";

import {
  useCallback,
  useState,
} from "react";

import { Expense } from "@/types/expense";
import { expenseService } from "@/services/expense.service";

export function useExpenses(userId?: string) {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchExpenses = useCallback(async () => {
    if (!userId) {
      setExpenses([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    try {
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

  return {
    expenses,
    loading,
    refetch: fetchExpenses,
    setExpenses,
  };
}