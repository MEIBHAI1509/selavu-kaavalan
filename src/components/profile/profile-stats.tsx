"use client";

import {
    Wallet,
    Receipt,
    Landmark,
    Target,
    Repeat,
} from "lucide-react";

interface Props {
    wallets: number;
    expenses: number;
    income: number;
    goals: number;
    recurring: number;
}

const cards = [
    {
        title: "Wallets",
        icon: Wallet,
        color: "text-cyan-500",
        key: "wallets",
    },
    {
        title: "Expenses",
        icon: Receipt,
        color: "text-red-500",
        key: "expenses",
    },
    {
        title: "Income",
        icon: Landmark,
        color: "text-green-500",
        key: "income",
    },
    {
        title: "Goals",
        icon: Target,
        color: "text-yellow-500",
        key: "goals",
    },
    {
        title: "Recurring",
        icon: Repeat,
        color: "text-primary",
        key: "recurring",
    },
] as const;

export default function ProfileStats(
    props: Props
) {
    return (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-5" >
            {
                cards.map((card) => {
                    const Icon = card.icon;

                    return (
                        <div
                            key={card.key}
                            className="rounded-3xl border bg-card p-6 shadow-sm transition hover:border-primary/30"
                        >
                            <div className="flex items-center justify-between" >
                                <div>
                                    <p className="text-sm text-muted-foreground" >
                                        {card.title}
                                    </p>

                                    < h2 className="mt-3 text-3xl font-bold" >
                                        {props[card.key]}
                                    </h2>
                                </div>

                                < Icon
                                    className={`h-9 w-9 ${card.color}`
                                    }
                                />
                            </div>
                        </div>
                    );
                })
            }
        </div>
    );
}