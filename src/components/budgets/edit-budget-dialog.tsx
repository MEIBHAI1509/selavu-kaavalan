"use client";

import { useEffect, useState } from "react";
import {
  useForm,
  type SubmitHandler,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  budgetSchema,
  type BudgetFormValues,
} from "@/lib/validations/budget.schema";

import type { Budget } from "@/types/budget";
import type { Category } from "@/types/category";

import { budgetService } from "@/services/budget.service";

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

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  budget: Budget | null;
  categories: Category[];
  onSuccess: () => void;
}

export default function EditBudgetDialog({
  open,
  onOpenChange,
  budget,
  categories,
  onSuccess,
}: Props) {
  const [loading, setLoading] =
    useState(false);

  const form =
    useForm<BudgetFormValues>({
      resolver:
        zodResolver(budgetSchema),

      defaultValues: {
        category_id: "",
        amount: 0,
        month: 1,
        year: new Date().getFullYear(),
      },
    });

  useEffect(() => {
    if (!budget) return;

    form.reset({
      category_id: budget.category_id,
      amount: budget.amount,
      month: budget.month,
      year: budget.year,
    });
  }, [budget, form]);

  const onSubmit: SubmitHandler<
    BudgetFormValues
  > = async (values) => {
    if (!budget) return;

    try {
      setLoading(true);

      const { error } =
        await budgetService.updateBudget(
          budget.id,
          values
        );

      if (error) throw error;

      await onSuccess();

      onOpenChange(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            Edit Budget
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(
              onSubmit
            )}
            className="space-y-6"
          >
            <FormSelect
              control={form.control}
              name="category_id"
              label="Category"
              options={categories.map(
                (category) => ({
                  label:
                    category.name,
                  value:
                    category.id,
                })
              )}
            />

            <FormInput
              control={form.control}
              name="amount"
              label="Budget"
              type="number"
            />

            <FormInput
              control={form.control}
              name="month"
              label="Month"
              type="number"
            />

            <FormInput
              control={form.control}
              name="year"
              label="Year"
              type="number"
            />

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