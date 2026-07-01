"use client";

import { useMemo } from "react";

import { useExpenses } from "@/hooks/use-expenses";
import { useIncome } from "@/hooks/use-income";
import { useGoals } from "@/hooks/use-goals";
import { useRecurring } from "@/hooks/use-recurring";

export function useRecentActivity(
    userId?: string
) {
    const { expenses } =
        useExpenses(userId);

    const { income } =
        useIncome(userId);

    const { goals } =
        useGoals(userId);

    const { transactions } =
        useRecurring(userId);

    return useMemo(() => {
        const items = [
            ...expenses.map((expense) => ({
                id: expense.id,
                title: `Expense • ₹${Number(expense.amount).toLocaleString()}`,
                type: "expense" as const,
                date: expense.created_at,
            })),

            ...income.map((item) => ({
                id: item.id,
                title: item.source,
                type: "income" as const,
                date: item.created_at,
            })),

            ...goals.map((goal) => ({
                id: goal.id,
                title: goal.title,
                type: "goal" as const,
                date: goal.created_at,
            })),

            ...transactions.map((item) => ({
                id: item.id,
                title: item.title,
                type: "recurring" as const,
                date: item.created_at,
            })),
        ];

        return items
            .sort(
                (a, b) =>
                    new Date(
                        b.date
                    ).getTime() -
                    new Date(
                        a.date
                    ).getTime()
            )
            .slice(0, 10);
    }, [
        expenses,
        income,
        goals,
        transactions,
    ]);
}