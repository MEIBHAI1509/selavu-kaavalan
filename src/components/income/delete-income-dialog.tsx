"use client";

import { Income } from "@/types/income";

import {
  AlertDialog,
  AlertDialogContent,
} from "@/components/ui/alert-dialog";

import {
  Trash2,
  Wallet,
  CalendarDays,
  TriangleAlert,
} from "lucide-react";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  income: Income | null;
  onConfirm: () => void;
  loading?: boolean;
}

export default function DeleteIncomeDialog({
  open,
  onOpenChange,
  income,
  onConfirm,
  loading = false,
}: Props) {
  if (!income) return null;

  return (
    <AlertDialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <AlertDialogContent className="overflow-hidden border border-red-500/20 bg-card p-0">
        <div className="h-1 bg-red-500" />

        <div className="p-8">
          <div className="mb-8 flex justify-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-red-500/10">
              <Trash2 className="h-10 w-10 text-red-500" />
            </div>
          </div>

          <h2 className="text-center text-3xl font-bold">
            Delete Income
          </h2>

          <p className="mt-2 text-center text-muted-foreground">
            This action cannot be undone.
          </p>

          <div className="mt-8 rounded-2xl border bg-background p-5">
            <h3 className="text-3xl font-bold text-green-500">
              ₹ {Number(income.amount).toLocaleString()}
            </h3>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="flex items-center gap-3 rounded-xl border p-3">
                <Wallet className="h-5 w-5 text-primary" />

                <div>
                  <p className="text-xs text-muted-foreground">
                    Wallet
                  </p>

                  <p>{income.wallets?.name}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-xl border p-3">
                <CalendarDays className="h-5 w-5 text-primary" />

                <div>
                  <p className="text-xs text-muted-foreground">
                    Date
                  </p>

                  <p>
                    {new Date(
                      income.income_date
                    ).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            {income.note && (
              <div className="mt-4 rounded-xl border p-4">
                <p className="text-xs text-muted-foreground">
                  Note
                </p>

                <p>{income.note}</p>
              </div>
            )}
          </div>

          <div className="mt-6 rounded-xl border border-orange-500/20 bg-orange-500/5 p-4">
            <div className="flex gap-3">
              <TriangleAlert className="mt-1 h-5 w-5 text-orange-500" />

              <div>
                <p className="font-medium">
                  Wallet balance will be reduced.
                </p>

                <p className="text-sm text-muted-foreground">
                  Deleting this income removes the credited amount from the wallet.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex gap-4">
            <button
              onClick={() => onOpenChange(false)}
              className="flex-1 rounded-xl border py-3"
            >
              Cancel
            </button>

            <button
              disabled={loading}
              onClick={onConfirm}
              className="flex-1 rounded-xl bg-red-500 py-3 font-semibold text-white"
            >
              {loading
                ? "Deleting..."
                : "Delete Income"}
            </button>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}