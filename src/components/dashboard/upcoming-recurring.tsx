"use client";

import { RecurringTransaction } from "@/types/recurring";

import { Repeat } from "lucide-react";

interface Props {
    transactions: RecurringTransaction[];
}

export default function UpcomingRecurring({
    transactions,
}: Props) {
    const upcoming =
        transactions
            .filter(
                (item) => item.is_active
            )
            .sort(
                (a, b) =>
                    new Date(
                        a.next_due_date
                    ).getTime() -
                    new Date(
                        b.next_due_date
                    ).getTime()
            )
            .slice(0, 5);

    return (
        <div className="rounded-3xl border bg-card p-6">
            <h2 className="mb-6 text-xl font-bold">
                Upcoming Recurring
            </h2>

            {upcoming.length === 0 ? (
                <div className="py-10 text-center text-muted-foreground">
                    No recurring transactions
                </div>
            ) : (
                <div className="space-y-4">
                    {upcoming.map((item) => (
                        <div
                            key={item.id}
                            className="flex items-center justify-between rounded-xl border p-4"
                        >
                            <div className="flex items-center gap-3">
                                <Repeat className="h-5 w-5 text-primary" />

                                <div>
                                    <p className="font-medium">
                                        {item.title}
                                    </p>

                                    <p className="text-sm capitalize text-muted-foreground">
                                        {item.frequency}
                                    </p>
                                </div>
                            </div>

                            <div className="text-right">
                                <p className="font-semibold">
                                    ₹
                                    {Number(
                                        item.amount
                                    ).toLocaleString()}
                                </p>

                                <p className="text-xs text-muted-foreground">
                                    {new Date(
                                        item.next_due_date
                                    ).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}