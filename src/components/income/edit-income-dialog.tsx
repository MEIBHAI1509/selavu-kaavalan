"use client";

import { useEffect, useState } from "react";

import {
    useForm,
    type SubmitHandler,
} from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import {
    incomeSchema,
    type IncomeFormValues,
} from "@/lib/validations/income.schema";

import type { Income } from "@/types/income";
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

    income: Income | null;

    wallets: Wallet[];

    onSuccess: () => void;
}

export default function EditIncomeDialog({
    open,
    onOpenChange,
    income,
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
                income_date: "",
            },
        });

    useEffect(() => {
        if (!income) return;

        form.reset({
            wallet_id: income.wallet_id,
            source: income.source,
            amount: income.amount,
            note: income.note ?? "",
            income_date: income.income_date,
        });
    }, [income, form]);
    const onSubmit: SubmitHandler<
        IncomeFormValues
    > = async (values) => {
        if (!income) return;

        try {
            setLoading(true);

            const { error } =
                await incomeService.updateIncome(
                    income.id,
                    {
                        wallet_id:
                            values.wallet_id,

                        source:
                            values.source,

                        amount:
                            values.amount,

                        note:
                            values.note,

                        income_date:
                            values.income_date,
                    }
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
            <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle>
                        Edit Income
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
                                Save Changes
                            </SubmitButton>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}