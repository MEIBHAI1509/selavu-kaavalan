"use client";

import {
  Pencil,
  Trash2,
} from "lucide-react";

import type { Budget } from "@/types/budget";

import BudgetProgress from "./budget-progress";

import {
  categoryIcons,
} from "@/constants/category-icons";

interface Props {
  budget: Budget;

  onEdit: (budget: Budget) => void;

  onDelete: (budget: Budget) => void;
}

export default function BudgetCard({
  budget,
  onEdit,
  onDelete,
}: Props) {
  const Icon =
    categoryIcons[
      budget.categories?.icon as keyof typeof categoryIcons
    ];

  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-sm transition hover:border-primary/30">
      {/* Header */}

      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="flex h-12 w-12 items-center justify-center rounded-2xl"
            style={{
              backgroundColor: `${budget.categories?.color}20`,
            }}
          >
            {Icon && (
              <Icon
                className="h-6 w-6"
                style={{
                  color:
                    budget.categories?.color ??
                    "#10b981",
                }}
              />
            )}
          </div>

          <div>
            <h3 className="font-semibold">
              {budget.categories?.name}
            </h3>

            <p className="text-sm text-muted-foreground">
              {budget.month}/
              {budget.year}
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() =>
              onEdit(budget)
            }
            className="rounded-lg p-2 transition hover:bg-primary/10"
          >
            <Pencil className="h-4 w-4 text-primary" />
          </button>

          <button
            onClick={() =>
              onDelete(budget)
            }
            className="rounded-lg p-2 transition hover:bg-red-500/10"
          >
            <Trash2 className="h-4 w-4 text-red-500" />
          </button>
        </div>
      </div>

      <BudgetProgress
        budget={budget.amount}
        spent={budget.spent ?? 0}
      />
    </div>
  );
}