import { Trash2 } from "lucide-react";

import { Category } from "@/types/category";
import { categoryIcons } from "@/constants/category-icons";

interface Props {
  category: Category;
  onDelete: (
    id: string,
    name: string
  ) => void;
}

export default function CategoryCard({
  category,
  onDelete,
}: Props) {
  const Icon =
    categoryIcons[
      category.icon as keyof typeof categoryIcons
    ];

  return (
    <div className="group rounded-2xl border border-border bg-card p-4 transition-all hover:border-primary/30">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {Icon && (
            <div className="rounded-xl bg-primary/10 p-2">
              <Icon className="h-5 w-5 text-primary" />
            </div>
          )}

          <span className="font-medium">
            {category.name}
          </span>
        </div>

        <button
          onClick={() =>
            onDelete(
              category.id,
              category.name
            )
          }
          className="opacity-0 transition-opacity group-hover:opacity-100"
        >
          <Trash2 className="h-4 w-4 text-destructive" />
        </button>
      </div>
    </div>
  );
}