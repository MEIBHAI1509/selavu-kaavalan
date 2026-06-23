// src/app/(user)/categories/page.tsx

"use client";

import { useState } from "react";

import { useUser } from "@/hooks/use-user";
import { useCategories } from "@/hooks/use-categories";

import CategoryCard from "@/components/categories/category-card";
import AddCategoryDialog from "@/components/categories/add-category-dialog";

export default function CategoriesPage() {
  const user = useUser();

  const {
    categories,
    loading,
    refetch,
  } = useCategories(user?.id);

  const [open, setOpen] =
    useState(false);

    if (loading) {
        return <div>Loading...</div>;
      }
      
      if (!user) {
        return null;
      }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          Categories
        </h1>

        <button
          onClick={() => setOpen(true)}
          className="rounded-xl bg-primary px-4 py-2 text-primary-foreground"
        >
          Add Category
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            onDelete={() => {}}
          />
        ))}
      </div>
      <AddCategoryDialog
  open={open}
  onOpenChange={setOpen}
  userId={user.id}
  onSuccess={refetch}
/>
    </div>
  );
}