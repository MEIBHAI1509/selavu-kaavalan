"use client";

import { useEffect, useState } from "react";

import {
  useForm,
  type SubmitHandler,
} from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import type { Wallet } from "@/types/wallet";
import type { Category } from "@/types/category";
import type { Expense } from "@/types/expense";

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

  expense: Expense | null;

  wallets: Wallet[];
  categories: Category[];

  onSuccess: () => void;
}

export default function EditExpenseDialog({
  open,
  onOpenChange,
  expense,
  wallets,
  categories,
  onSuccess,
}: Props) {
  const [loading, setLoading] =
    useState(false);

  const form =
    useForm<ExpenseFormValues>({
      resolver:
        zodResolver(expenseSchema),

      defaultValues: {
        wallet_id: "",
        category_id: "",
        amount: 0,
        note: "",
        expense_date: "",
      },
    });

  useEffect(() => {
    if (!expense) return;

    form.reset({
      wallet_id: expense.wallet_id,
      category_id:
        expense.category_id,
      amount: expense.amount,
      note: expense.note ?? "",
      expense_date:
        expense.expense_date,
    });
  }, [expense, form]);
  const onSubmit: SubmitHandler<
  ExpenseFormValues
> = async (values) => {
  if (!expense) return;

  try {
    setLoading(true);

    const { error } =
      await expenseService.updateExpense(
        expense.id,
        {
          wallet_id: values.wallet_id,
          category_id:
            values.category_id,
          amount: values.amount,
          note: values.note,
          expense_date:
            values.expense_date,
        }
      );

    if (error) {
      throw error;
    }

    await onSuccess();

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
          Edit Expense
        </DialogTitle>
      </DialogHeader>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(
            onSubmit
          )}
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
              onClick={() =>
                onOpenChange(false)
              }
              className="rounded-xl border border-border px-5 py-2 transition hover:bg-muted"
            >
              Cancel
            </button>

            <SubmitButton
              loading={loading}
            >
              Save Changes
            </SubmitButton>
          </div>
        </form>
      </Form>
    </DialogContent>
  </Dialog>
);
}