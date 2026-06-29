"use client";

import type { Budget } from "@/types/budget";

import {
  AlertDialog,
  AlertDialogContent,
} from "@/components/ui/alert-dialog";

import {
  PiggyBank,
  TriangleAlert,
  Trash2,
} from "lucide-react";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  budget: Budget | null;

  onConfirm: () => void;

  loading?: boolean;
}

export default function DeleteBudgetDialog({
  open,
  onOpenChange,
  budget,
  onConfirm,
  loading = false,
}: Props) {
  if (!budget) return null;

  return (
    <AlertDialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <AlertDialogContent className="overflow-hidden border border-red-500/20 bg-card p-0 shadow-xl">
        <div className="h-1 bg-red-500" />

        <div className="p-8">
          <div className="mb-8 flex justify-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-red-500/10">
              <Trash2 className="h-10 w-10 text-red-500" />
            </div>
          </div>

          <h2 className="text-center text-3xl font-bold">
            Delete Budget
          </h2>

          <p className="mt-2 text-center text-muted-foreground">
            This action cannot be undone.
          </p>

          <div className="mt-8 rounded-2xl border bg-background p-5">
            <div className="flex items-center gap-4">
              <PiggyBank className="h-10 w-10 text-primary" />

              <div>
                <h3 className="text-xl font-semibold">
                  {budget.categories?.name}
                </h3>

                <p className="text-muted-foreground">
                  {budget.month}/{budget.year}
                </p>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <span className="text-muted-foreground">
                Budget Amount
              </span>

              <span className="text-2xl font-bold">
                ₹
                {Number(
                  budget.amount
                ).toLocaleString()}
              </span>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-orange-500/20 bg-orange-500/5 p-4">
            <div className="flex gap-3">
              <TriangleAlert className="mt-1 h-5 w-5 text-orange-500" />

              <div>
                <p className="font-medium">
                  This budget will be permanently deleted.
                </p>

                <p className="text-sm text-muted-foreground">
                  This will not delete any expenses. Only the budget target will be removed.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex gap-4">
            <button
              onClick={() =>
                onOpenChange(false)
              }
              className="flex-1 rounded-xl border border-border py-3 font-medium transition hover:bg-accent"
            >
              Cancel
            </button>

            <button
              disabled={loading}
              onClick={onConfirm}
              className="flex-1 rounded-xl bg-red-500 py-3 font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
            >
              {loading
                ? "Deleting..."
                : "Delete Budget"}
            </button>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}