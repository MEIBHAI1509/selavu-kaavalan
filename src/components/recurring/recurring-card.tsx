"use client";

import {
  CalendarDays,
  CreditCard,
  Pencil,
  Play,
  Pause,
  Repeat,
  Trash2,
} from "lucide-react";

import { RecurringTransaction } from "@/types/recurring";

interface Props {
  transaction: RecurringTransaction;

  onEdit: (
    transaction: RecurringTransaction
  ) => void;

  onDelete: (
    transaction: RecurringTransaction
  ) => void;

  onToggle: (
    transaction: RecurringTransaction
  ) => void;
}

export default function RecurringCard({
  transaction,
  onEdit,
  onDelete,
  onToggle,
}: Props) {
  const dueToday =
    new Date(
      transaction.next_due_date
    ).toDateString() ===
    new Date().toDateString();

  return (
    <div className="rounded-3xl border border-border bg-card p-6 transition hover:border-primary/30">
      {/* Header */}

      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Repeat className="h-5 w-5 text-primary" />

            <h3 className="text-lg font-semibold">
              {transaction.title}
            </h3>
          </div>

          <p className="mt-2 text-sm text-muted-foreground">
            {transaction.frequency}
          </p>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            transaction.type ===
            "income"
              ? "bg-green-500/10 text-green-500"
              : "bg-red-500/10 text-red-500"
          }`}
        >
          {transaction.type}
        </span>
      </div>

      {/* Amount */}

      <div className="mt-6">
        <h2
          className={`text-3xl font-bold ${
            transaction.type ===
            "income"
              ? "text-green-500"
              : "text-red-500"
          }`}
        >
          ₹
          {Number(
            transaction.amount
          ).toLocaleString()}
        </h2>
      </div>

      {/* Info */}

      <div className="mt-6 space-y-3">
        <div className="flex items-center gap-3">
          <CreditCard className="h-4 w-4 text-primary" />

          <span className="text-sm">
            {transaction.wallets?.name}
          </span>
        </div>

        {transaction.categories && (
          <div className="flex items-center gap-3">
            <Repeat className="h-4 w-4 text-primary" />

            <span className="text-sm">
              {transaction.categories.name}
            </span>
          </div>
        )}

        <div className="flex items-center gap-3">
          <CalendarDays className="h-4 w-4 text-primary" />

          <span className="text-sm">
            Next:
            {" "}
            {new Date(
              transaction.next_due_date
            ).toLocaleDateString()}
          </span>
        </div>
      </div>

      {/* Due Today */}

      {dueToday && (
        <div className="mt-5 rounded-xl bg-orange-500/10 p-3 text-center">
          <p className="font-medium text-orange-500">
            Due Today
          </p>
        </div>
      )}

      {/* Actions */}

      <div className="mt-6 flex gap-2">
        <button
          onClick={() =>
            onToggle(transaction)
          }
          className="flex-1 rounded-xl border py-3 transition hover:bg-accent"
        >
          {transaction.is_active ? (
            <Pause className="mx-auto h-5 w-5" />
          ) : (
            <Play className="mx-auto h-5 w-5" />
          )}
        </button>

        <button
          onClick={() =>
            onEdit(transaction)
          }
          className="rounded-xl border p-3 transition hover:bg-accent"
        >
          <Pencil className="h-4 w-4 text-primary" />
        </button>

        <button
          onClick={() =>
            onDelete(transaction)
          }
          className="rounded-xl border border-red-500/20 p-3 transition hover:bg-red-500/10"
        >
          <Trash2 className="h-4 w-4 text-red-500" />
        </button>
      </div>
    </div>
  );
}