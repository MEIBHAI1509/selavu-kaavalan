"use client";

import { useCallback, useEffect, useState } from "react";

import { Category } from "@/types/category";
import { categoryService } from "@/services/category.service";

export function useCategories(userId?: string) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCategories = useCallback(async () => {
    if (!userId) return;

    try {
      setLoading(true);

      const { data, error } =
        await categoryService.getCategories(userId);

      if (error) throw error;

      setCategories(data ?? []);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    void fetchCategories();
  }, [fetchCategories]);

  return {
    categories,
    loading,
    refetch: fetchCategories,
  };
}