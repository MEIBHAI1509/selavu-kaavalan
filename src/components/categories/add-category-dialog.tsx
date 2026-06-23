"use client";

import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { categoryService } from "@/services/category.service";

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

interface AddCategoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userId: string;
  onSuccess: () => void;
}

export default function AddCategoryDialog({
  open,
  onOpenChange,
  userId,
  onSuccess,
}: AddCategoryDialogProps) {
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("food");
  const [color, setColor] = useState("#10b981");
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (!name.trim()) return;

    try {
      setLoading(true);

      const { error } =
        await categoryService.createCategory({
          user_id: userId,
          name,
          icon,
          color,
        });

      if (error) {
        console.error(error);
        return;
      }

      await onSuccess();

      setName("");
      setIcon("food");
      setColor("#10b981");

      onOpenChange(false);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            Create Category
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5">
          {/* Category Name */}
          <div>
            <label className="mb-2 block text-sm font-medium">
              Category Name
            </label>

            <input
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              placeholder="Food"
              className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none transition focus:border-primary"
            />
          </div>

          {/* Icon */}
          <div>
            <label className="mb-2 block text-sm font-medium">
              Icon
            </label>

            <Select
              value={icon}
              onValueChange={setIcon}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                {categoryOptions.map(
                  (category) => (
                    <SelectItem
                      key={category.value}
                      value={category.value}
                    >
                      {category.label}
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>
          </div>

          {/* Color Picker */}
          <div>
            <label className="mb-2 block text-sm font-medium">
              Color
            </label>

            <div className="flex flex-wrap gap-3">
              {categoryColors.map(
                (categoryColor) => (
                  <button
                    key={categoryColor}
                    type="button"
                    onClick={() =>
                      setColor(
                        categoryColor
                      )
                    }
                    className={`h-10 w-10 rounded-full border-2 transition ${
                      color === categoryColor
                        ? "scale-110 border-white"
                        : "border-transparent"
                    }`}
                    style={{
                      backgroundColor:
                        categoryColor,
                    }}
                  />
                )
              )}
            </div>
          </div>

          {/* Preview */}
          <div className="rounded-2xl border border-border bg-card p-4">
            <p className="mb-3 text-sm text-muted-foreground">
              Preview
            </p>

            <div className="inline-flex items-center gap-3 rounded-xl border border-border px-4 py-3">
              <div
                className="h-4 w-4 rounded-full"
                style={{
                  backgroundColor: color,
                }}
              />

              <span>
                {name || "Category Name"}
              </span>
            </div>
          </div>

          {/* Button */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full rounded-xl bg-primary py-3 font-medium text-primary-foreground transition hover:opacity-90 disabled:opacity-50"
          >
            {loading
              ? "Creating..."
              : "Create Category"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}