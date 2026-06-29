"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import { Budget } from "@/types/budget";

import { budgetService } from "@/services/budget.service";

export function useBudgets(
  userId?: string
) {
  const [budgets, setBudgets] =
    useState<Budget[]>([]);

  const [loading, setLoading] =
    useState(true);

  const fetchBudgets =
    useCallback(async () => {
      if (!userId) {
        setBudgets([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        const { data, error } =
          await budgetService.getBudgets(
            userId
          );

        if (error) throw error;

        setBudgets(data ?? []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }, [userId]);

  useEffect(() => {
    const timer = setTimeout(() => {
      void fetchBudgets();
    }, 0);

    return () =>
      clearTimeout(timer);
  }, [fetchBudgets]);

  return {
    budgets,
    loading,
    refetch: fetchBudgets,
  };
}