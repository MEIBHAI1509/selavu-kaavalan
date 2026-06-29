"use client";

import { Expense } from "@/types/expense";
import ExpenseRow from "./expense-row";
import { ReceiptText } from "lucide-react";

interface ExpenseTableProps {
  expenses: Expense[];
  loading: boolean;
  onEdit: (expense: Expense) => void;
  onDelete: (expense: Expense) => void;
}

export default function ExpenseTable({
  expenses,
  loading,
  onEdit,
  onDelete,
}: ExpenseTableProps) {
  if (loading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="h-24 animate-pulse rounded-3xl bg-muted"
          />
        ))}
      </div>
    );
  }

  if (expenses.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-border py-20 text-center">
        <ReceiptText className="mx-auto h-16 w-16 text-muted-foreground" />

        <h2 className="mt-6 text-2xl font-bold">
          No Expenses Found
        </h2>

        <p className="mt-2 text-muted-foreground">
          Your expenses will appear here once you add them.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Desktop Table */}
      <div className="hidden overflow-hidden rounded-3xl border border-border bg-card shadow-sm md:block">
        <table className="w-full">
          <thead className="sticky top-0 bg-muted/40 backdrop-blur">
            <tr>
              <th className="px-6 py-5 text-left text-sm font-semibold">
                Amount
              </th>

              <th className="px-6 py-5 text-left text-sm font-semibold">
                Category
              </th>

              <th className="px-6 py-5 text-left text-sm font-semibold">
                Wallet
              </th>

              <th className="px-6 py-5 text-left text-sm font-semibold">
                Date
              </th>

              <th className="px-6 py-5 text-right text-sm font-semibold">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {expenses.map((expense) => (
              <ExpenseRow
                key={expense.id}
                expense={expense}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile */}
      <div className="md:hidden">
        {expenses.map((expense) => (
          <ExpenseRow
            key={expense.id}
            expense={expense}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </>
  );
}