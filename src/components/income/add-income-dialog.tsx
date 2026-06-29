"use client";

import { useState } from "react";

import {
    useForm,
    type SubmitHandler,
} from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import {
    incomeSchema,
    type IncomeFormValues,
} from "@/lib/validations/income.schema";

import type { Wallet } from "@/types/wallet";

import { incomeService } from "@/services/income.service";

import IncomeForm from "@/components/forms/income-form";

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

    onSuccess: () => void;
}

export default function AddIncomeDialog({
    open,
    onOpenChange,
    userId,
    wallets,
    onSuccess,
}: Props) {
    const [loading, setLoading] =
        useState(false);

    const form =
        useForm<IncomeFormValues>({
            resolver:
                zodResolver(incomeSchema),

            defaultValues: {
                wallet_id: "",
                source: "",
                amount: 0,
                note: "",
                income_date: new Date()
                    .toISOString()
                    .split("T")[0],
            },
        });
    const onSubmit: SubmitHandler<
        IncomeFormValues
    > = async (values) => {
        try {
            setLoading(true);

            const { error } =
                await incomeService.createIncome({
                    user_id: userId,

                    wallet_id:
                        values.wallet_id,

                    source: values.source,

                    amount: values.amount,

                    note: values.note,

                    income_date:
                        values.income_date,
                });

            if (error) {
                throw error;
            }

            form.reset({
                wallet_id: "",
                source: "",
                amount: 0,
                note: "",
                income_date: new Date()
                    .toISOString()
                    .split("T")[0],
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
            <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">
                        Add Income
                    </DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(
                            onSubmit
                        )}
                        className="space-y-6"
                    >
                        <IncomeForm
                            control={form.control}
                            watch={form.watch}
                            wallets={wallets}
                        />

                        <div className="flex justify-end">
                            <SubmitButton
                                loading={loading}
                            >
                                Add Income
                            </SubmitButton>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}