"use client";

import { useEffect, useState } from "react";
import { Plus, Receipt } from "lucide-react";

import { useUser } from "@/hooks/use-user";
import { useExpenses } from "@/hooks/use-expenses";
import { useWallets } from "@/hooks/use-wallets";
import { useCategories } from "@/hooks/use-categories";

import AddExpenseDialog from "@/components/expenses/add-expense-dialog";

export default function ExpensesPage() {
  const user = useUser();

  const [open, setOpen] = useState(false);

  const {
    expenses,
    loading,
    refetch,
  } = useExpenses(user?.id);

  const {
    wallets,
  } = useWallets(user?.id);

  const {
    categories,
  } = useCategories(user?.id);

  useEffect(() => {
    if (user?.id) {
      void refetch();
    }
  }, [user?.id, refetch]);

  if (!user) {
    return (
      <div className="p-8">
        Loading user...
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Expenses
          </h1>

          <p className="mt-1 text-muted-foreground">
            Track and manage your spending
          </p>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-primary-foreground"
        >
          <Plus className="h-4 w-4" />
          Add Expense
        </button>
      </div>

      {/* Stats */}
      <div className="mb-8 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border bg-card p-6">
          <p className="text-sm text-muted-foreground">
            Total Expenses
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            ₹
            {expenses
              .reduce(
                (sum, expense) =>
                  sum + Number(expense.amount),
                0
              )
              .toLocaleString()}
          </h2>
        </div>

        <div className="rounded-2xl border bg-card p-6">
          <p className="text-sm text-muted-foreground">
            Transactions
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {expenses.length}
          </h2>
        </div>

        <div className="rounded-2xl border bg-card p-6">
          <p className="text-sm text-muted-foreground">
            Categories Used
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {
              new Set(
                expenses.map(
                  (expense) =>
                    expense.category_id
                )
              ).size
            }
          </h2>
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="rounded-2xl border bg-card p-6">
          Loading expenses...
        </div>
      )}

      {/* Empty State */}
      {!loading &&
        expenses.length === 0 && (
          <div className="rounded-3xl border border-dashed p-12 text-center">
            <Receipt className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />

            <h2 className="text-xl font-semibold">
              No Expenses Found
            </h2>

            <p className="mt-2 text-muted-foreground">
              Create your first expense to
              start tracking your money.
            </p>

            <button
              onClick={() =>
                setOpen(true)
              }
              className="mt-6 rounded-xl bg-primary px-4 py-2 text-primary-foreground"
            >
              Add Expense
            </button>
          </div>
        )}

      {/* Expense List */}
      {!loading &&
        expenses.length > 0 && (
          <div className="space-y-4">
            {expenses.map(
              (expense) => (
                <div
                  key={expense.id}
                  className="rounded-2xl border bg-card p-4"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">
                        ₹
                        {Number(
                          expense.amount
                        ).toLocaleString()}
                      </h3>

                      <p className="text-sm text-muted-foreground">
                        {expense.note ||
                          "No note"}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-sm">
                        {
                          expense
                            .categories
                            ?.name
                        }
                      </p>

                      <p className="text-xs text-muted-foreground">
                        {
                          expense
                            .wallets
                            ?.name
                        }
                      </p>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        )}

      <AddExpenseDialog
        open={open}
        onOpenChange={setOpen}
        userId={user.id}
        wallets={wallets}
        categories={categories}
        onSuccess={refetch}
      />
    </div>
  );
}