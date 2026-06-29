"use client";

import { useMemo } from "react";

import { useUser } from "@/hooks/use-user";
import { useWallets } from "@/hooks/use-wallets";
import { useExpenses } from "@/hooks/use-expenses";
import { useCategories } from "@/hooks/use-categories";

import StatsCards from "@/components/dashboard/stats-cards";

export default function DashboardPage() {
  const user = useUser();

  const {
    wallets,
    loading: walletsLoading,
  } = useWallets(user?.id);

  const {
    expenses,
    loading: expensesLoading,
  } = useExpenses(user?.id);

  const {
    categories,
    loading: categoriesLoading,
  } = useCategories(user?.id);

  const loading =
    walletsLoading ||
    expensesLoading ||
    categoriesLoading;

  const totalBalance = useMemo(
    () =>
      wallets.reduce(
        (sum, wallet) =>
          sum + Number(wallet.balance),
        0
      ),
    [wallets]
  );

  const totalExpenses = useMemo(
    () =>
      expenses.reduce(
        (sum, expense) =>
          sum + Number(expense.amount),
        0
      ),
    [expenses]
  );

  const walletCount = wallets.length;

  const categoryCount =
    categories.length;

  if (!user) {
    return (
      <div className="p-8">
        Loading user...
      </div>
    );
  }

  if (loading) {
    return (
      <div className="p-8">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>

        <p className="mt-1 text-muted-foreground">
          Welcome back 👋
        </p>
      </div>

      <StatsCards
        balance={totalBalance}
        expenses={totalExpenses}
        wallets={walletCount}
      />
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border bg-card p-6">
          <h2 className="mb-4 text-xl font-bold">
            Recent Statistics
          </h2>

          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Total Wallets</span>

              <span className="font-semibold">
                {walletCount}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Categories</span>

              <span className="font-semibold">
                {categoryCount}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Expenses</span>

              <span className="font-semibold">
                {expenses.length}
              </span>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border bg-card p-6">
          <h2 className="mb-4 text-xl font-bold">
            Recent Expenses
          </h2>

          <div className="space-y-3">
            {expenses
              .slice(0, 5)
              .map((expense) => (
                <div
                  key={expense.id}
                  className="flex items-center justify-between"
                >
                  <div>
                    <p className="font-medium">
                      {
                        expense.categories
                          ?.name
                      }
                    </p>

                    <p className="text-sm text-muted-foreground">
                      {
                        expense.wallets
                          ?.name
                      }
                    </p>
                  </div>

                  <span className="font-semibold text-red-500">
                    ₹
                    {Number(
                      expense.amount
                    ).toLocaleString()}
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}