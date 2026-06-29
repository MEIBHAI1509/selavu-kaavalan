"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import { Goal } from "@/types/goal";

import { goalService } from "@/services/goal.service";

export function useGoals(
  userId?: string
) {
  const [goals, setGoals] =
    useState<Goal[]>([]);

  const [loading, setLoading] =
    useState(true);

  const fetchGoals =
    useCallback(async () => {
      if (!userId) {
        setGoals([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        const { data, error } =
          await goalService.getGoals(
            userId
          );

        if (error) throw error;

        setGoals(data ?? []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }, [userId]);

  useEffect(() => {
    const timer = setTimeout(() => {
      void fetchGoals();
    }, 0);

    return () =>
      clearTimeout(timer);
  }, [fetchGoals]);

  return {
    goals,
    loading,
    refetch: fetchGoals,
  };
}