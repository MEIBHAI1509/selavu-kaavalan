"use client";

import { RecurringTransaction } from "@/types/recurring";

import {
  AlertDialog,
  AlertDialogContent,
} from "@/components/ui/alert-dialog";

import {
  CalendarDays,
  CreditCard,
  Repeat,
  Trash2,
  TriangleAlert,
} from "lucide-react";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  transaction: RecurringTransaction | null;

  onConfirm: () => void;

  loading?: boolean;
}

export default function DeleteRecurringDialog({
  open,
  onOpenChange,
  transaction,
  onConfirm,
  loading = false,
}: Props) {
  if (!transaction) return null;

  return (
    <AlertDialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <AlertDialogContent className="overflow-hidden border border-red-500/20 bg-card p-0 shadow-xl">
        <div className="h-1 bg-red-500" />

        <div className="p-8">
          {/* Icon */}

          <div className="mb-8 flex justify-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-red-500/10">
              <Trash2 className="h-10 w-10 text-red-500" />
            </div>
          </div>

          {/* Title */}

          <h2 className="text-center text-3xl font-bold">
            Delete Recurring Transaction
          </h2>

          <p className="mt-2 text-center text-muted-foreground">
            This action cannot be undone.
          </p>

          {/* Card */}

          <div className="mt-8 rounded-2xl border bg-background p-5">
            <div className="flex items-center gap-4">
              <Repeat className="h-10 w-10 text-primary" />

              <div>
                <h3 className="text-xl font-semibold">
                  {transaction.title}
                </h3>

                <p className="text-muted-foreground capitalize">
                  {transaction.frequency}
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">
                  Amount
                </span>

                <span className="text-xl font-bold">
                  ₹
                  {Number(
                    transaction.amount
                  ).toLocaleString()}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-primary" />

                <span>
                  {transaction.wallets?.name}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-primary" />

                <span>
                  {new Date(
                    transaction.next_due_date
                  ).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          {/* Warning */}

          <div className="mt-6 rounded-xl border border-orange-500/20 bg-orange-500/5 p-4">
            <div className="flex gap-3">
              <TriangleAlert className="mt-1 h-5 w-5 text-orange-500" />

              <div>
                <p className="font-medium">
                  Future automatic transactions will stop.
                </p>

                <p className="text-sm text-muted-foreground">
                  Existing income or expenses already created will not be deleted.
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
              className="flex-1 rounded-xl bg-red-500 py-3 font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
            >
              {loading
                ? "Deleting..."
                : "Delete"}
            </button>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}