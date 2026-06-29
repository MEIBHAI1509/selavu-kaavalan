"use client";

import { useState, useEffect } from "react";

import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    walletSchema,
    type WalletFormInput,
    type WalletFormValues,
} from "@/lib/validations/wallet.schema";

import { walletService } from "@/services/wallet.service";

import type { Wallet } from "@/types/wallet";

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

const walletTypes = [
    {
        label: "💵 Cash",
        value: "Cash",
    },
    {
        label: "🏦 Bank",
        value: "Bank",
    },
    {
        label: "📱 UPI",
        value: "UPI",
    },
    {
        label: "💳 Credit Card",
        value: "Credit Card",
    },
    {
        label: "💰 Savings",
        value: "Savings",
    },
];

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;

    wallet: Wallet | null;

    onSuccess: () => void;
}

export default function EditWalletDialog({
    open,
    onOpenChange,
    wallet,
    onSuccess,
}: Props) {
    const [loading, setLoading] = useState(false);

    const form = useForm<
        WalletFormInput,
        undefined,
        WalletFormValues
    >({
        resolver: zodResolver(walletSchema),

        defaultValues: {
            name: "",
            type: "Cash",
            balance: 0,
        },
    });

    useEffect(() => {
        if (open && wallet) {
            form.reset({
                name: wallet.name,
                type: wallet.type,
                balance: wallet.balance,
            });
        }
    }, [open, wallet, form]);

    const onSubmit: SubmitHandler<WalletFormValues> =
        async (values) => {
            if (!wallet) return;

            try {
                setLoading(true);

                const { error } =
                    await walletService.updateWallet(
                        wallet.id,
                        {
                            name: values.name,
                            type: values.type,
                            balance: values.balance,
                        }
                    );

                if (error) throw error;

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
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">
                        Edit Wallet
                    </DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6"
                    >
                        <FormInput
                            control={form.control}
                            name="name"
                            label="Wallet Name"
                            placeholder="Wallet Name"
                        />

                        <FormSelect
                            control={form.control}
                            name="type"
                            label="Wallet Type"
                            placeholder="Select Wallet Type"
                            options={walletTypes}
                        />

                        <FormInput
                            control={form.control}
                            name="balance"
                            label="Balance"
                            type="number"
                            placeholder="0"
                        />

                        <SubmitButton loading={loading}>
                            Save Changes
                        </SubmitButton>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}