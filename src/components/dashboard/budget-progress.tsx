"use client";

import { Progress } from "@/components/ui/progress";

import { Budget } from "@/types/budget";

interface Props {
    budgets: Budget[];
}

export default function BudgetProgress({
    budgets,
}: Props) {
    return (
        <div className="rounded-3xl border bg-card p-6">
            <h2 className="mb-6 text-xl font-bold">
                Budget Progress
            </h2>

            {budgets.length === 0 ? (
                <div className="py-10 text-center text-muted-foreground">
                    No budgets available
                </div>
            ) : (
                <div className="space-y-5">
                    {budgets.map((budget) => {
                        const spent = budget.spent ?? 0;
                        const total = budget.amount;
                        const percentage = budget.percentage ?? 0;

                        return (
                            <div key={budget.id}>
                                <div className="mb-2 flex items-center justify-between">
                                    <span className="font-medium">
                                        {budget.categories?.name ?? "Unknown Category"}
                                    </span>

                                    <span className="text-sm text-muted-foreground">
                                        ₹{spent.toLocaleString()} / ₹{total.toLocaleString()}
                                    </span>
                                </div>

                                <Progress value={percentage} />
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}