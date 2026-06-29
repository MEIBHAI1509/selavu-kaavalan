"use client";

import { useEffect, useState } from "react";

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

import { Wallet } from "@/types/wallet";
import { Category } from "@/types/category";
import { Expense } from "@/types/expense";

interface EditExpenseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  expense: Expense | null;

  wallets: Wallet[];
  categories: Category[];

  loading?: boolean;

  onSave: (payload: {
    wallet_id: string;
    category_id: string;
    amount: number;
    note: string;
    expense_date: string;
  }) => Promise<void>;
}

export default function EditExpenseDialog({
  open,
  onOpenChange,
  expense,
  wallets,
  categories,
  loading = false,
  onSave,
}: EditExpenseDialogProps) {
  const [amount, setAmount] = useState("");
  const [walletId, setWalletId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [note, setNote] = useState("");
  const [expenseDate, setExpenseDate] = useState("");

  useEffect(() => {
    if (!expense) return;

    setAmount(String(expense.amount));
    setWalletId(expense.wallet_id);
    setCategoryId(expense.category_id);
    setNote(expense.note ?? "");
    setExpenseDate(expense.expense_date);
  }, [expense]);

  if (!expense) return null;

  async function handleSave() {
    await onSave({
      wallet_id: walletId,
      category_id: categoryId,
      amount: Number(amount),
      note,
      expense_date: expenseDate,
    });

    onOpenChange(false);
  }

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            Edit Expense
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">

          {/* Amount */}

          <div>
            <label className="mb-2 block text-sm font-medium">
              Amount
            </label>

            <input
              type="number"
              value={amount}
              onChange={(e) =>
                setAmount(e.target.value)
              }
              className="w-full rounded-2xl border border-border bg-background p-4 text-2xl font-semibold outline-none focus:border-primary"
            />
          </div>

          {/* Wallet */}

          <div>
            <label className="mb-2 block text-sm font-medium">
              Wallet
            </label>

            <Select
              value={walletId}
              onValueChange={setWalletId}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                {wallets.map((wallet) => (
                  <SelectItem
                    key={wallet.id}
                    value={wallet.id}
                  >
                    {wallet.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Category */}

          <div>
            <label className="mb-2 block text-sm font-medium">
              Category
            </label>

            <Select
              value={categoryId}
              onValueChange={setCategoryId}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                {categories.map((category) => (
                  <SelectItem
                    key={category.id}
                    value={category.id}
                  >
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Date */}

          <div>
            <label className="mb-2 block text-sm font-medium">
              Date
            </label>

            <input
              type="date"
              value={expenseDate}
              onChange={(e) =>
                setExpenseDate(e.target.value)
              }
              className="w-full rounded-xl border border-border bg-background p-3"
            />
          </div>

          {/* Note */}

          <div>
            <label className="mb-2 block text-sm font-medium">
              Notes
            </label>

            <textarea
              rows={4}
              value={note}
              onChange={(e) =>
                setNote(e.target.value)
              }
              placeholder="Add some notes..."
              className="w-full rounded-2xl border border-border bg-background p-4 outline-none focus:border-primary"
            />
          </div>

          {/* Buttons */}

          <div className="flex gap-4">
            <button
              onClick={() =>
                onOpenChange(false)
              }
              className="flex-1 rounded-xl border border-border py-3"
            >
              Cancel
            </button>

            <button
              disabled={loading}
              onClick={handleSave}
              className="flex-1 rounded-xl bg-primary py-3 font-semibold text-primary-foreground transition hover:opacity-90"
            >
              {loading
                ? "Saving..."
                : "Save Changes"}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}