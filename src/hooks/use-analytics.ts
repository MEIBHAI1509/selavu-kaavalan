"use client";

import { useMemo } from "react";

import { useExpenses } from "@/hooks/use-expenses";
import { useIncome } from "@/hooks/use-income";
import { useWallets } from "@/hooks/use-wallets";
import { useGoals } from "@/hooks/use-goals";
import { useBudgets } from "@/hooks/use-budgets";

export function useAnalytics(
    userId?: string
) {
    const { expenses } =
        useExpenses(userId);

    const { income } =
        useIncome(userId);

    const { wallets } =
        useWallets(userId);

    const { goals } =
        useGoals(userId);

    const { budgets } =
        useBudgets(userId);

    const summary = {
        totalIncome: income.reduce(
            (sum, item) => sum + Number(item.amount),
            0
        ),

        totalExpense: expenses.reduce(
            (sum, item) => sum + Number(item.amount),
            0
        ),
    };

    const incomeVsExpense = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ].map((month, index) => {
        const monthNumber = index;

        const monthIncome = income
            .filter(
                (item) =>
                    new Date(item.income_date).getMonth() ===
                    monthNumber
            )
            .reduce(
                (sum, item) =>
                    sum + Number(item.amount),
                0
            );

        const monthExpense = expenses
            .filter(
                (item) =>
                    new Date(
                        item.expense_date
                    ).getMonth() === monthNumber
            )
            .reduce(
                (sum, item) =>
                    sum + Number(item.amount),
                0
            );

        return {
            month,
            income: monthIncome,
            expense: monthExpense,
        };
    });

    const expenseByCategory =
        Object.values(
            expenses.reduce(
                (acc, expense) => {
                    const name =
                        expense.categories
                            ?.name ??
                        "Others";

                    if (!acc[name]) {
                        acc[name] = {
                            name,
                            value: 0,
                        };
                    }

                    acc[name].value += Number(
                        expense.amount
                    );

                    return acc;
                },
                {} as Record<
                    string,
                    {
                        name: string;
                        value: number;
                    }
                >
            )
        );

    const monthlyTrend = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ].map((month, index) => {
        const amount = expenses
            .filter(
                (expense) =>
                    new Date(
                        expense.expense_date
                    ).getMonth() === index
            )
            .reduce(
                (sum, expense) =>
                    sum + Number(expense.amount),
                0
            );

        return {
            month,
            amount,
        };
    });

    const walletDistribution =
        wallets.map((wallet) => ({
            name: wallet.name,
            value: Number(wallet.balance),
        }));

    return {
        summary,
        incomeVsExpense,
        expenseByCategory,
        monthlyTrend,
        walletDistribution,
        wallets,
        budgets,
        goals,
        expenses,
    };
}