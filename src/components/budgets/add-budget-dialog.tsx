"use client";

import { useState } from "react";

import {
    useForm,
    type SubmitHandler,
} from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import {
    budgetSchema,
    type BudgetFormValues,
} from "@/lib/validations/budget.schema";

import { budgetService } from "@/services/budget.service";

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

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;

    userId: string;

    categories: Category[];

    onSuccess: () => void;
}

export default function AddBudgetDialog({
    open,
    onOpenChange,
    userId,
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
                month:
                    new Date().getMonth() + 1,
                year:
                    new Date().getFullYear(),
            },
        });
    const onSubmit: SubmitHandler<
        BudgetFormValues
    > = async (values) => {
        try {
            setLoading(true);

            const { error } =
                await budgetService.createBudget({
                    user_id: userId,
                    category_id:
                        values.category_id,
                    amount: values.amount,
                    month: values.month,
                    year: values.year,
                });

            if (error) {
                throw error;
            }

            form.reset({
                category_id: "",
                amount: 0,
                month:
                    new Date().getMonth() + 1,
                year:
                    new Date().getFullYear(),
            });

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
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">
                        Add Budget
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
                            placeholder="Select Category"
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
                            label="Budget Amount"
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
                            Create Budget
                        </SubmitButton>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}