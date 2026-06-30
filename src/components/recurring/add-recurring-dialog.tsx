"use client";

import { useMemo, useState } from "react";

import {
    useForm,
    type SubmitHandler,
} from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import {
    recurringSchema,
    type RecurringFormValues,
} from "@/lib/validations/recurring.schema";

import { recurringService } from "@/services/recurring.service";

import type { Wallet } from "@/types/wallet";
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
import { FormTextarea } from "@/components/forms/form-textarea";
import { SubmitButton } from "@/components/forms/submit-button";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;

    userId: string;

    wallets: Wallet[];

    categories: Category[];

    onSuccess: () => void;
}

export default function AddRecurringDialog({
    open,
    onOpenChange,
    userId,
    wallets,
    categories,
    onSuccess,
}: Props) {
    const [loading, setLoading] =
        useState(false);

    const form =
        useForm<RecurringFormValues>({
            resolver:
                zodResolver(recurringSchema),

            defaultValues: {
                wallet_id: "",
                category_id: "",
                type: "expense",
                title: "",
                amount: 0,
                frequency: "monthly",
                start_date: new Date()
                    .toISOString()
                    .split("T")[0],
                note: "",
            },
        });

    const type =
        form.watch("type");
    const filteredCategories =
        useMemo(() => {
            if (type === "income") {
                return [];
            }

            return categories;
        }, [type, categories]);

    const onSubmit: SubmitHandler<
        RecurringFormValues
    > = async (values) => {
        try {
            setLoading(true);

            const { error } =
                await recurringService.createRecurring({
                    user_id: userId,
                    wallet_id: values.wallet_id,
                    category_id:
                        values.type === "expense"
                            ? values.category_id
                            : undefined,
                    type: values.type,
                    title: values.title,
                    amount: values.amount,
                    frequency: values.frequency,
                    start_date: values.start_date,
                    note: values.note,
                });

            if (error) {
                throw error;
            }

            form.reset({
                wallet_id: "",
                category_id: "",
                type: "expense",
                title: "",
                amount: 0,
                frequency: "monthly",
                start_date: new Date()
                    .toISOString()
                    .split("T")[0],
                note: "",
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
            <DialogContent className="sm:max-w-xl">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">
                        Add Recurring Transaction
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
                            name="type"
                            label="Transaction Type"
                            options={[
                                {
                                    label: "Expense",
                                    value: "expense",
                                },
                                {
                                    label: "Income",
                                    value: "income",
                                },
                            ]}
                        />
                        <FormSelect
                            control={form.control}
                            name="wallet_id"
                            label="Wallet"
                            placeholder="Select Wallet"
                            options={wallets.map(
                                (wallet) => ({
                                    label: wallet.name,
                                    value: wallet.id,
                                })
                            )}
                        />
                        {type === "expense" && (
                            <FormSelect
                                control={form.control}
                                name="category_id"
                                label="Category"
                                placeholder="Select Category"
                                options={filteredCategories.map(
                                    (category) => ({
                                        label: category.name,
                                        value: category.id,
                                    })
                                )}
                            />
                        )}
                        <FormInput
                            control={form.control}
                            name="title"
                            label="Title"
                            placeholder="Netflix Subscription"
                        />
                        <FormInput
                            control={form.control}
                            name="amount"
                            label="Amount"
                            type="number"
                        />
                        <FormSelect
                            control={form.control}
                            name="frequency"
                            label="Frequency"
                            options={[
                                {
                                    label: "Daily",
                                    value: "daily",
                                },
                                {
                                    label: "Weekly",
                                    value: "weekly",
                                },
                                {
                                    label: "Monthly",
                                    value: "monthly",
                                },
                                {
                                    label: "Yearly",
                                    value: "yearly",
                                },
                            ]}
                        />
                        <FormInput
                            control={form.control}
                            name="start_date"
                            label="Start Date"
                            type="date"
                        />
                        <FormTextarea
                            control={form.control}
                            name="note"
                            label="Note"
                            placeholder="Optional note"
                        />
                        <SubmitButton
                            loading={loading}
                        >
                            Create Recurring Transaction
                        </SubmitButton>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}