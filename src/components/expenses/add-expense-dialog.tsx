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

import { expenseService } from "@/services/expense.service";

import { Wallet } from "@/types/wallet";
import { Category } from "@/types/category";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userId: string;
  wallets: Wallet[];
  categories: Category[];
  onSuccess: () => void;
}

export default function AddExpenseDialog({
  open,
  onOpenChange,
  userId,
  wallets,
  categories,
  onSuccess,
}: Props) {
  const [amount, setAmount] =
    useState("");

  const [walletId, setWalletId] =
    useState("");

  const [categoryId, setCategoryId] =
    useState("");

  const [note, setNote] =
    useState("");

  const [expenseDate, setExpenseDate] =
    useState(
      new Date()
        .toISOString()
        .split("T")[0]
    );

  const [loading, setLoading] =
    useState(false);

  async function handleSubmit() {
    if (
      !amount ||
      !walletId ||
      !categoryId
    ) {
      return;
    }

    try {
      setLoading(true);

      const { error } =
        await expenseService.createExpense({
          user_id: userId,
          wallet_id: walletId,
          category_id: categoryId,
          amount: Number(amount),
          note,
          expense_date: expenseDate,
        });

      if (error) {
        throw error;
      }

      onSuccess();

      onOpenChange(false);

      setAmount("");
      setWalletId("");
      setCategoryId("");
      setNote("");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            Add Expense
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) =>
              setAmount(e.target.value)
            }
            className="w-full rounded-xl border border-border bg-background p-3"
          />

          <Select
            value={walletId}
            onValueChange={setWalletId}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Wallet" />
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

          <Select
            value={categoryId}
            onValueChange={setCategoryId}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>

            <SelectContent>
              {categories.map(
                (category) => (
                  <SelectItem
                    key={category.id}
                    value={category.id}
                  >
                    {category.name}
                  </SelectItem>
                )
              )}
            </SelectContent>
          </Select>

          <input
            type="date"
            value={expenseDate}
            onChange={(e) =>
              setExpenseDate(
                e.target.value
              )
            }
            className="w-full rounded-xl border border-border bg-background p-3"
          />

          <textarea
            rows={3}
            placeholder="Notes"
            value={note}
            onChange={(e) =>
              setNote(e.target.value)
            }
            className="w-full rounded-xl border border-border bg-background p-3"
          />

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full rounded-xl bg-primary py-3 text-primary-foreground"
          >
            {loading
              ? "Creating..."
              : "Add Expense"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}