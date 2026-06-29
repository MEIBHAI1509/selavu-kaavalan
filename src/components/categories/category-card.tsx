"use client";

import {
  Pencil,
  Trash2,
} from "lucide-react";

import { Category } from "@/types/category";
import { categoryIcons } from "@/constants/category-icons";

interface Props {
  category: Category;
  onEdit: () => void;
  onDelete: (
    id: string,
    name: string
  ) => void;
}

export default function CategoryCard({
  category,
  onEdit,
  onDelete,
}: Props) {
  const Icon =
    categoryIcons[
      category.icon as keyof typeof categoryIcons
    ];

  return (
    <div className="group rounded-3xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg">
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="flex h-12 w-12 items-center justify-center rounded-2xl"
            style={{
              backgroundColor:
                category.color ?? "#10b981",
            }}
          >
            {Icon && (
              <Icon className="h-6 w-6 text-white" />
            )}
          </div>

          <div>
            <h3 className="font-semibold">
              {category.name}
            </h3>

            <p className="text-sm text-muted-foreground">
              Expense Category
            </p>
          </div>
        </div>

        <div className="flex gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <button
            onClick={onEdit}
            className="rounded-xl p-2 transition hover:bg-primary/10"
          >
            <Pencil className="h-4 w-4 text-primary" />
          </button>

          <button
            onClick={() =>
              onDelete(
                category.id,
                category.name
              )
            }
            className="rounded-xl p-2 transition hover:bg-destructive/10"
          >
            <Trash2 className="h-4 w-4 text-destructive" />
          </button>
        </div>
      </div>

      <div className="mt-8">
        <div
          className="h-2 rounded-full"
          style={{
            backgroundColor:
              category.color ?? "#10b981",
          }}
        />
      </div>
    </div>
  );
}