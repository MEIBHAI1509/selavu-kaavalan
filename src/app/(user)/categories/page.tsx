"use client";

import { useState } from "react";
import { Shapes } from "lucide-react";

import { useUser } from "@/hooks/use-user";
import { useCategories } from "@/hooks/use-categories";

import type { Category } from "@/types/category";

import { categoryService } from "@/services/category.service";

import CategoryCard from "@/components/categories/category-card";
import AddCategoryDialog from "@/components/categories/add-category-dialog";
import EditCategoryDialog from "@/components/categories/edit-category-dialog";
import DeleteCategoryDialog from "@/components/categories/delete-category-dialog";

export default function CategoriesPage() {
  const user = useUser();

  const {
    categories,
    loading,
    refetch,
  } = useCategories(user?.id);

  const [addOpen, setAddOpen] =
    useState(false);

  const [editOpen, setEditOpen] =
    useState(false);

  const [editingCategory, setEditingCategory] =
    useState<Category | null>(null);

  const [
    categoryToDelete,
    setCategoryToDelete,
  ] = useState<{
    id: string;
    name: string;
  } | null>(null);

  async function confirmDelete() {
    if (!categoryToDelete) return;

    await categoryService.deleteCategory(
      categoryToDelete.id
    );

    await refetch();

    setCategoryToDelete(null);
  }

  if (!user || loading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {Array.from({
          length: 4,
        }).map((_, index) => (
          <div
            key={index}
            className="h-44 animate-pulse rounded-3xl bg-card"
          />
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          Categories
        </h1>

        <button
          onClick={() =>
            setAddOpen(true)
          }
          className="rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground transition hover:scale-105"
        >
          Add Category
        </button>
      </div>

      {categories.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-primary/30 bg-card p-16 text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <Shapes className="h-10 w-10 text-primary" />
          </div>

          <h2 className="text-3xl font-bold">
            No Categories Yet
          </h2>

          <p className="mx-auto mt-3 max-w-md text-muted-foreground">
            Create categories to organize
            your expenses.
          </p>

          <button
            onClick={() =>
              setAddOpen(true)
            }
            className="mt-8 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground transition hover:scale-105"
          >
            Create Category
          </button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              onEdit={() => {
                setEditingCategory(
                  category
                );
                setEditOpen(true);
              }}
              onDelete={(
                id,
                name
              ) =>
                setCategoryToDelete({
                  id,
                  name,
                })
              }
            />
          ))}
        </div>
      )}

      <AddCategoryDialog
        open={addOpen}
        onOpenChange={setAddOpen}
        userId={user.id}
        onSuccess={refetch}
      />

      <EditCategoryDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        category={editingCategory}
        onSuccess={async () => {
          await refetch();
          setEditOpen(false);
        }}
      />

      <DeleteCategoryDialog
        open={!!categoryToDelete}
        categoryName={
          categoryToDelete?.name
        }
        onOpenChange={(open) => {
          if (!open) {
            setCategoryToDelete(
              null
            );
          }
        }}
        onConfirm={confirmDelete}
      />
    </div>
  );
}