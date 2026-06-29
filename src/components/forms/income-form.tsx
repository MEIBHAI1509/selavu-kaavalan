"use client";

import {
    Control,
    UseFormWatch,
} from "react-hook-form";

import type { Wallet } from "@/types/wallet";

import type {
    IncomeFormValues,
} from "@/lib/validations/income.schema";

import { FormInput } from "./form-input";
import { FormSelect } from "./form-select";
import { FormTextarea } from "./form-textarea";

interface Props {
    control: Control<IncomeFormValues>;

    watch: UseFormWatch<IncomeFormValues>;

    wallets: Wallet[];
}

export default function IncomeForm({
    control,
    watch,
    wallets,
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
            <FormInput
                control={control}
                name="source"
                label="Income Source"
                placeholder="Salary"
            />
            <FormInput
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
                placeholder="Optional note..."
                rows={3}
            />
            <FormInput
                control={control}
                name="income_date"
                label="Income Date"
                type="date"
            />
            <div className="rounded-2xl border border-border bg-card p-5">
                <p className="mb-3 text-sm text-muted-foreground">
                    Preview
                </p>

                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-xl font-bold text-green-500">
                            + ₹
                            {Number(amount || 0).toLocaleString()}
                        </h3>

                        <p className="text-sm text-muted-foreground">
                            Income Amount
                        </p>
                    </div>

                    <div className="rounded-full bg-green-500/10 px-4 py-2">
                        <span className="font-medium text-green-500">
                            Income
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}