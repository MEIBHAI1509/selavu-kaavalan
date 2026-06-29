"use client";

import { Expense } from "@/types/expense";

import {
  AlertDialog,
  AlertDialogContent,
} from "@/components/ui/alert-dialog";

import {
  CalendarDays,
  CreditCard,
  Receipt,
  Trash2,
  TriangleAlert,
} from "lucide-react";

interface DeleteExpenseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  expense: Expense | null;
  onConfirm: () => void;
  loading?: boolean;
}

export default function DeleteExpenseDialog({
  open,
  onOpenChange,
  expense,
  onConfirm,
  loading = false,
}: DeleteExpenseDialogProps) {
  if (!expense) return null;

  return (
    <AlertDialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <AlertDialogContent className="overflow-hidden border border-red-500/20 bg-card p-0 shadow-2xl">
        {/* Top Gradient */}
        <div className="h-1 w-full bg-linear-to-r from-red-500 via-orange-500 to-red-500" />

        <div className="p-8">
          {/* Icon */}

          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-red-500/20 blur-2xl" />

              <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-red-500/20 bg-red-500/10">
                <Trash2 className="h-10 w-10 text-red-500" />
              </div>
            </div>
          </div>

          {/* Title */}

          <div className="text-center">
            <h2 className="text-3xl font-bold">
              Delete Expense
            </h2>

            <p className="mt-2 text-muted-foreground">
              This action cannot be undone.
            </p>
          </div>

          {/* Expense Card */}

          <div className="mt-8 rounded-3xl border border-border bg-background p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">
                  Amount
                </p>

                <h3 className="mt-1 text-3xl font-bold text-red-500">
                  ₹ {Number(expense.amount).toLocaleString()}
                </h3>
              </div>

              <Receipt className="h-10 w-10 text-primary" />
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="flex items-center gap-3 rounded-xl border border-border p-3">
                <CreditCard className="h-5 w-5 text-primary" />

                <div>
                  <p className="text-xs text-muted-foreground">
                    Wallet
                  </p>

                  <p className="font-medium">
                    {expense.wallets?.name}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-xl border border-border p-3">
                <CalendarDays className="h-5 w-5 text-primary" />

                <div>
                  <p className="text-xs text-muted-foreground">
                    Date
                  </p>

                  <p className="font-medium">
                    {new Date(
                      expense.expense_date
                    ).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            {expense.note && (
              <div className="mt-4 rounded-xl border border-border bg-card p-4">
                <p className="text-xs text-muted-foreground">
                  Note
                </p>

                <p className="mt-1">
                  {expense.note}
                </p>
              </div>
            )}
          </div>

          {/* Warning */}

          <div className="mt-6 rounded-2xl border border-orange-500/20 bg-orange-500/5 p-4">
            <div className="flex gap-3">
              <TriangleAlert className="mt-1 h-5 w-5 text-orange-500" />

              <div>
                <p className="font-medium">
                  Wallet balance will be restored.
                </p>

                <p className="mt-1 text-sm text-muted-foreground">
                  The deleted expense amount should be added
                  back to the selected wallet.
                </p>
              </div>
            </div>
          </div>

          {/* Buttons */}

          <div className="mt-8 flex gap-4">
            <button
              onClick={() => onOpenChange(false)}
              className="flex-1 rounded-xl border border-border py-3 font-medium transition hover:bg-accent"
            >
              Cancel
            </button>

            <button
              disabled={loading}
              onClick={onConfirm}
              className="flex-1 rounded-xl bg-linear-to-r from-red-500 to-red-600 py-3 font-semibold text-white shadow-lg shadow-red-500/30 transition hover:scale-[1.02] disabled:opacity-50"
            >
              {loading
                ? "Deleting..."
                : "Delete Expense"}
            </button>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}