"use client";

import {
    Control,
    FieldValues,
    UseFormWatch,
  } from "react-hook-form";

import type { Wallet } from "@/types/wallet";
import type { Category } from "@/types/category";

import type {
    ExpenseFormValues,
  } from "@/lib/validations/expense.schema";

import { FormInput } from "./form-input";
import { FormSelect } from "./form-select";
import { FormTextarea } from "./form-textarea";

interface Props {
    control: Control<ExpenseFormValues>;
  
    watch: UseFormWatch<ExpenseFormValues>;
  
    wallets: Wallet[];
  
    categories: Category[];
  }

export default function ExpenseForm({
    control,
    watch,
    wallets,
    categories,
}: Props) {
    const amount = watch("amount");
    return (
        <div className="space-y-6">
            <FormSelect
                control={control}
                name="wallet_id"
                label="Wallet"
                placeholder="Select Wallet"
                options={wallets.map((wallet) => ({
                    label: wallet.name,
                    value: wallet.id,
                }))}
            />
            <FormSelect
                control={control}
                name="category_id"
                label="Category"
                placeholder="Select Category"
                options={categories.map(
                    (category) => ({
                        label: category.name,
                        value: category.id,
                    })
                )}
            /><FormInput
                control={control}
                name="amount"
                label="Amount"
                type="number"
                placeholder="0"
            />
            <FormTextarea
                control={control}
                name="note"
                label="Note"
                placeholder="Enter a note (optional)"
                rows={3}
            />
            <FormInput
                control={control}
                name="expense_date"
                label="Expense Date"
                type="date"
            />
            <div className="rounded-2xl border border-border bg-card p-5">
                <p className="mb-3 text-sm text-muted-foreground">
                    Preview
                </p>

                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-semibold">
                            New Expense
                        </h3>

                        <p className="text-sm text-muted-foreground">
                            Review before saving
                        </p>
                    </div>

                    <div className="text-right">
                        <p className="text-2xl font-bold text-red-500">
                            ₹{Number(amount ?? 0).toLocaleString()}
                        </p>

                        <p className="text-xs text-muted-foreground">
                            Expense Amount
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}