"use client";

import { useState } from "react";

import {
  useForm,
  type SubmitHandler,
} from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import type { Wallet } from "@/types/wallet";
import type { Category } from "@/types/category";

import {
  expenseSchema,
  type ExpenseFormValues,
} from "@/lib/validations/expense.schema";

import { expenseService } from "@/services/expense.service";

import ExpenseForm from "@/components/forms/expense-form";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Form } from "@/components/ui/form";

import { SubmitButton } from "@/components/forms/submit-button";

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
  const [loading, setLoading] =
    useState(false);

    const form = useForm<ExpenseFormValues>({
      resolver: zodResolver(expenseSchema),
    });

    const onSubmit:
    SubmitHandler<ExpenseFormValues> = async (values) => {
    try {
      setLoading(true);

      const { error } =
        await expenseService.createExpense({
          user_id: userId,

          wallet_id: values.wallet_id,

          category_id:
            values.category_id,

          amount: values.amount,

          note: values.note,

          expense_date:
            values.expense_date,
        });

      if (error) {
        throw error;
      }

      form.reset({
        wallet_id: "",
        category_id: "",
        amount: 0,
        note: "",
        expense_date: new Date()
          .toISOString()
          .split("T")[0],
      });

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
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Add Expense
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <ExpenseForm
              control={form.control}
              watch={form.watch}
              wallets={wallets}
              categories={categories}
            />

            <div className="flex justify-end gap-3 border-t pt-4">
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className="rounded-xl border border-border px-5 py-2 font-medium transition hover:bg-muted"
              >
                Cancel
              </button>

              <SubmitButton loading={loading}>
                Create Expense
              </SubmitButton>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}