"use client";

import { CalendarDays, CreditCard, Pencil, Trash2 } from "lucide-react";

import { Expense } from "@/types/expense";

interface ExpenseRowProps {
  expense: Expense;
  onEdit: (expense: Expense) => void;
  onDelete: (expense: Expense) => void;
}

export default function ExpenseRow({
  expense,
  onEdit,
  onDelete,
}: ExpenseRowProps) {
  return (
    <>
      {/* Desktop */}
      <tr className="hidden border-b border-border transition hover:bg-muted/40 md:table-row">
        <td className="px-6 py-5">
          <div>
            <p className="font-semibold">
              ₹ {Number(expense.amount).toLocaleString()}
            </p>

            <p className="text-sm text-muted-foreground">
              {expense.note || "No notes"}
            </p>
          </div>
        </td>

        <td className="px-6 py-5">
          <div className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
            {expense.categories?.name}
          </div>
        </td>

        <td className="px-6 py-5">
          <div className="flex items-center gap-2">
            <CreditCard className="h-4 w-4 text-primary" />

            <span>{expense.wallets?.name}</span>
          </div>
        </td>

        <td className="px-6 py-5">
          <div className="flex items-center gap-2 text-muted-foreground">
            <CalendarDays className="h-4 w-4" />

            {new Date(expense.expense_date).toLocaleDateString()}
          </div>
        </td>

        <td className="px-6 py-5">
          <div className="flex justify-end gap-2">
            <button
              onClick={() => onEdit(expense)}
              className="rounded-xl border border-border p-2 transition hover:bg-primary hover:text-white"
            >
              <Pencil className="h-4 w-4" />
            </button>

            <button
              onClick={() => onDelete(expense)}
              className="rounded-xl border border-red-500/20 p-2 text-red-500 transition hover:bg-red-500 hover:text-white"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </td>
      </tr>

      {/* Mobile Card */}
      <div className="mb-4 rounded-3xl border border-border bg-card p-5 shadow-sm md:hidden">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-2xl font-bold">
              ₹ {Number(expense.amount).toLocaleString()}
            </p>

            <p className="mt-1 text-sm text-muted-foreground">
              {expense.note || "No notes"}
            </p>
          </div>

          <div className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            {expense.categories?.name}
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <CreditCard className="h-4 w-4 text-primary" />

            {expense.wallets?.name}
          </div>

          <div className="flex items-center gap-2 text-muted-foreground">
            <CalendarDays className="h-4 w-4" />

            {new Date(expense.expense_date).toLocaleDateString()}
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            onClick={() => onEdit(expense)}
            className="flex-1 rounded-xl border border-primary py-2 font-medium text-primary transition hover:bg-primary hover:text-white"
          >
            Edit
          </button>

          <button
            onClick={() => onDelete(expense)}
            className="flex-1 rounded-xl border border-red-500 py-2 font-medium text-red-500 transition hover:bg-red-500 hover:text-white"
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
}