"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import { recurringService } from "@/services/recurring.service";

import { RecurringTransaction } from "@/types/recurring";

export function useRecurring(
  userId?: string
) {
  const [transactions, setTransactions] =
    useState<
      RecurringTransaction[]
    >([]);

  const [loading, setLoading] =
    useState(true);

  const fetchRecurring =
    useCallback(async () => {
      if (!userId) {
        setTransactions([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        const { data, error } =
          await recurringService.getRecurring(
            userId
          );

        if (error) throw error;

        setTransactions(
          data ?? []
        );
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }, [userId]);

  useEffect(() => {
    const timer =
      setTimeout(() => {
        void fetchRecurring();
      }, 0);

    return () =>
      clearTimeout(timer);
  }, [fetchRecurring]);

  return {
    transactions,
    loading,
    refetch:
      fetchRecurring,
  };
}