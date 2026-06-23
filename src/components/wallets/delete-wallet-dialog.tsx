"use client";

import { Trash2, AlertTriangle } from "lucide-react";

import {
  AlertDialog,
  AlertDialogContent,
} from "@/components/ui/alert-dialog";

interface DeleteWalletDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  walletName?: string;
  onConfirm: () => void;
}

export default function DeleteWalletDialog({
  open,
  onOpenChange,
  walletName,
  onConfirm,
}: DeleteWalletDialogProps) {
  return (
    <AlertDialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <AlertDialogContent className="overflow-hidden border border-red-500/20 bg-card p-0">
        {/* Top Glow */}
        <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-red-500 via-orange-500 to-red-500" />

        <div className="p-8">
          {/* Icon */}
          <div className="mb-6 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-red-500/20 blur-xl" />

              <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-red-500/20 bg-red-500/10">
                <Trash2 className="h-10 w-10 text-red-500" />
              </div>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-center text-2xl font-bold">
            Delete Wallet?
          </h2>

          <p className="mt-3 text-center text-muted-foreground">
            You are about to permanently remove
          </p>

          <p className="mt-2 text-center font-semibold text-foreground">
            {walletName ?? "this wallet"}
          </p>

          {/* Warning Box */}
          <div className="mt-6 rounded-2xl border border-orange-500/20 bg-orange-500/5 p-4">
            <div className="flex gap-3">
              <AlertTriangle className="mt-0.5 h-5 w-5 text-orange-500" />

              <div>
                <p className="font-medium">
                  This action cannot be undone
                </p>

                <p className="mt-1 text-sm text-muted-foreground">
                  All transactions linked to this wallet may become inaccessible.
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 flex gap-3">
            <button
              onClick={() => onOpenChange(false)}
              className="flex-1 rounded-xl border border-border bg-background px-4 py-3 transition hover:bg-accent"
            >
              Keep Wallet
            </button>

            <button
              onClick={onConfirm}
              className="flex-1 rounded-xl bg-gradient-to-r from-red-500 to-red-600 px-4 py-3 font-medium text-white shadow-lg shadow-red-500/20 transition hover:scale-[1.02]"
            >
              Delete Wallet
            </button>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}