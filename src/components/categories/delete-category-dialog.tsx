"use client";

import {
  AlertTriangle,
  Trash2,
//   X,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";

interface Props {
  open: boolean;
  categoryName?: string;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export default function DeleteCategoryDialog({
  open,
  categoryName,
  onOpenChange,
  onConfirm,
}: Props) {
  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="max-w-md overflow-hidden rounded-3xl p-0">
        <div className="relative bg-linear-to-r from-red-500 to-red-600 p-8 text-white">
          {/* <button
            onClick={() =>
              onOpenChange(false)
            }
            className="absolute right-4 top-4 rounded-full bg-white/20 p-2 transition hover:bg-white/30"
          >
            <X className="h-4 w-4" />
          </button> */}

          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white/20">
            <AlertTriangle className="h-10 w-10" />
          </div>

          <h2 className="mt-5 text-center text-2xl font-bold">
            Delete Category
          </h2>

          <p className="mt-2 text-center text-red-100">
            This action cannot be undone.
          </p>
        </div>

        <div className="space-y-6 p-8">
          <div className="rounded-2xl border border-red-200 bg-red-50 p-4 dark:border-red-900 dark:bg-red-950/30">
            <p className="text-center text-sm">
              Are you sure you want to
              delete
            </p>

            <p className="mt-2 text-center text-lg font-bold">
              {categoryName}
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() =>
                onOpenChange(false)
              }
              className="flex-1 rounded-xl border border-border py-3 font-medium transition hover:bg-muted"
            >
              Cancel
            </button>

            <button
              onClick={onConfirm}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-600 py-3 font-semibold text-white transition hover:bg-red-700"
            >
              <Trash2 className="h-4 w-4" />
              Delete
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}