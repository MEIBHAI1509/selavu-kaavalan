"use client";

import { Income } from "@/types/income";

import {
    Pencil,
    Trash2,
    Wallet,
    CalendarDays,
} from "lucide-react";

interface Props {
    income: Income;
    onEdit: (income: Income) => void;
    onDelete: (income: Income) => void;
}

export default function IncomeRow({
    income,
    onEdit,
    onDelete,
}: Props) {
    return (
        <>
            {/* Desktop */}
            <tr className="border-t border-border transition hover:bg-muted/30">
                <td className="px-6 py-5">
                    <div>
                        <p className="text-lg font-bold text-green-500">
                            ₹ {Number(income.amount).toLocaleString()}
                        </p>

                        <p className="mt-1 text-sm text-muted-foreground">
                            {income.source}
                        </p>

                        {income.note && (
                            <p className="mt-1 text-xs text-muted-foreground">
                                {income.note}
                            </p>
                        )}
                    </div>
                </td>

                <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                        <Wallet className="h-4 w-4 text-primary" />

                        <span>
                            {income.wallets?.name}
                        </span>
                    </div>
                </td>

                <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                        <CalendarDays className="h-4 w-4 text-primary" />

                        <span>
                            {new Date(
                                income.income_date
                            ).toLocaleDateString()}
                        </span>
                    </div>
                </td>

                <td className="px-6 py-5">
                    <div className="flex justify-end gap-2">
                        <button
                            onClick={() => onEdit(income)}
                            className="rounded-lg p-2 transition hover:bg-primary/10"
                        >
                            <Pencil className="h-4 w-4 text-primary" />
                        </button>

                        <button
                            onClick={() => onDelete(income)}
                            className="rounded-lg p-2 transition hover:bg-red-500/10"
                        >
                            <Trash2 className="h-4 w-4 text-red-500" />
                        </button>
                    </div>
                </td>
            </tr>

            {/* Mobile */}
            <div className="mb-4 rounded-2xl border border-border bg-card p-5 md:hidden">
                <div className="flex items-start justify-between">
                    <div>
                        <h3 className="text-2xl font-bold text-green-500">
                            ₹ {Number(income.amount).toLocaleString()}
                        </h3>

                        <p className="mt-1 text-muted-foreground">
                            {income.source}
                        </p>

                        {income.note && (
                            <p className="mt-2 text-sm">
                                {income.note}
                            </p>
                        )}
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={() => onEdit(income)}
                            className="rounded-lg p-2 hover:bg-primary/10"
                        >
                            <Pencil className="h-4 w-4 text-primary" />
                        </button>

                        <button
                            onClick={() => onDelete(income)}
                            className="rounded-lg p-2 hover:bg-red-500/10"
                        >
                            <Trash2 className="h-4 w-4 text-red-500" />
                        </button>
                    </div>
                </div>

                <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
                    <span>{income.wallets?.name}</span>

                    <span>
                        {new Date(
                            income.income_date
                        ).toLocaleDateString()}
                    </span>
                </div>
            </div>
        </>
    );
}