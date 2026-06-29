"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import { Income } from "@/types/income";
import { incomeService } from "@/services/income.service";

export function useIncome(userId?: string) {
  const [income, setIncome] =
    useState<Income[]>([]);

  const [loading, setLoading] =
    useState(true);

  const fetchIncome =
    useCallback(async () => {
      if (!userId) {
        setIncome([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        const { data, error } =
          await incomeService.getIncome(
            userId
          );

        if (error) throw error;

        setIncome(data ?? []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }, [userId]);

  useEffect(() => {
    const timer = setTimeout(() => {
      void fetchIncome();
    }, 0);

    return () =>
      clearTimeout(timer);
  }, [fetchIncome]);

  return {
    income,
    loading,
    refetch: fetchIncome,
  };
}