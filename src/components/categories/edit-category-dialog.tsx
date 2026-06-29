"use client";

import { useEffect, useState } from "react";

import {
  useForm,
  type SubmitHandler,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  categorySchema,
  type CategoryFormInput,
  type CategoryFormValues,
} from "@/lib/validations/category.schema";

import { categoryService } from "@/services/category.service";

import type { Category } from "@/types/category";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Form } from "@/components/ui/form";

import { FormInput } from "@/components/forms/form-input";
import { FormSelect } from "@/components/forms/form-select";
import { SubmitButton } from "@/components/forms/submit-button";

import { categoryOptions } from "@/constants/category-icons";

const categoryColors = [
  "#10b981",
  "#06b6d4",
  "#8b5cf6",
  "#f59e0b",
  "#ef4444",
  "#ec4899",
  "#14b8a6",
  "#6366f1",
];

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category: Category | null;
  onSuccess: () => void;
}

export default function EditCategoryDialog({
  open,
  onOpenChange,
  category,
  onSuccess,
}: Props) {
  const [loading, setLoading] =
    useState(false);

  const form = useForm<
    CategoryFormInput,
    undefined,
    CategoryFormValues
  >({
    resolver: zodResolver(categorySchema),

    defaultValues: {
      name: "",
      icon: "food",
      color: "#10b981",
    },
  });

  useEffect(() => {
    if (open && category) {
      form.reset({
        name: category.name,
        icon: category.icon ?? "food",
        color: category.color ?? "#10b981",
      });
    }
  }, [open, category, form]);

  const onSubmit: SubmitHandler<
    CategoryFormValues
  > = async (values) => {
    if (!category) return;

    try {
      setLoading(true);

      const { error } =
        await categoryService.updateCategory(
          category.id,
          values
        );

      if (error) throw error;

      onSuccess();

      onOpenChange(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            Edit Category
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(
              onSubmit
            )}
            className="space-y-5"
          >
            <FormInput
              control={form.control}
              name="name"
              label="Category Name"
              placeholder="Food"
            />

            <FormSelect
              control={form.control}
              name="icon"
              label="Icon"
              options={categoryOptions}
            />

            <div>
              <label className="mb-2 block text-sm font-medium">
                Color
              </label>

              <div className="flex flex-wrap gap-3">
                {categoryColors.map(
                  (color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() =>
                        form.setValue(
                          "color",
                          color
                        )
                      }
                      className={`h-10 w-10 rounded-full border-2 transition ${
                        form.watch(
                          "color"
                        ) === color
                          ? "scale-110 border-white"
                          : "border-transparent"
                      }`}
                      style={{
                        backgroundColor:
                          color,
                      }}
                    />
                  )
                )}
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-4">
              <p className="mb-3 text-sm text-muted-foreground">
                Preview
              </p>

              <div className="inline-flex items-center gap-3 rounded-xl border border-border px-4 py-3">
                <div
                  className="h-4 w-4 rounded-full"
                  style={{
                    backgroundColor:
                      form.watch("color"),
                  }}
                />

                <span>
                  {form.watch("name") ||
                    "Category Name"}
                </span>
              </div>
            </div>

            <SubmitButton
              loading={loading}
            >
              Save Changes
            </SubmitButton>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}