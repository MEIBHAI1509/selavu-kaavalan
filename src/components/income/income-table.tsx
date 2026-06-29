"use client";

import { Income } from "@/types/income";

import IncomeRow from "./income-row";

import { Wallet } from "lucide-react";

interface IncomeTableProps {
    income: Income[];
    loading: boolean;
    onEdit: (income: Income) => void;
    onDelete: (income: Income) => void;
}

export default function IncomeTable({
    income,
    loading,
    onEdit,
    onDelete,
}: IncomeTableProps) {
    if (loading) {
        return (
            <div className="space-y-4">
                {Array.from({ length: 6 }).map((_, index) => (
                    <div
                        key={index}
                        className="h-24 animate-pulse rounded-3xl bg-muted"
                    />
                ))}
            </div>
        );
    }

    if (income.length === 0) {
        return (
            <div className="rounded-3xl border border-dashed border-border py-20 text-center">
                <Wallet className="mx-auto h-16 w-16 text-muted-foreground" />

                <h2 className="mt-6 text-2xl font-bold">
                    No Income Found
                </h2>

                <p className="mt-2 text-muted-foreground">
                    Your income records will appear here.
                </p>
            </div>
        );
    }

    return (
        <>
            {/* Desktop */}
            <div className="hidden overflow-hidden rounded-3xl border border-border bg-card shadow-sm md:block">
                <table className="w-full">
                    <thead className="bg-muted/40">
                        <tr>
                            <th className="px-6 py-5 text-left text-sm font-semibold">
                                Income
                            </th>

                            <th className="px-6 py-5 text-left text-sm font-semibold">
                                Wallet
                            </th>

                            <th className="px-6 py-5 text-left text-sm font-semibold">
                                Date
                            </th>

                            <th className="px-6 py-5 text-right text-sm font-semibold">
                                Actions
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {income.map((item) => (
                            <IncomeRow
                                key={item.id}
                                income={item}
                                onEdit={onEdit}
                                onDelete={onDelete}
                            />
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile */}
            <div className="md:hidden">
                {income.map((item) => (
                    <IncomeRow
                        key={item.id}
                        income={item}
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />
                ))}
            </div>
        </>
    );
}