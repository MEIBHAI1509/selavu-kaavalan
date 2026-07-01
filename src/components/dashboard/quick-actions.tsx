"use client";

import { useRouter } from "next/navigation";

import {
    Plus,
    Wallet,
    Receipt,
    Target,
} from "lucide-react";

export default function QuickActions() {
    const router =
        useRouter();

    const actions = [
        {
            title: "Add Expense",
            icon: Receipt,
            href: "/expenses",
        },
        {
            title: "Add Wallet",
            icon: Wallet,
            href: "/wallets",
        },
        {
            title: "Add Goal",
            icon: Target,
            href: "/goals",
        },
        {
            title: "Add Income",
            icon: Plus,
            href: "/income",
        },
    ];

    return (
        <div className="rounded-3xl border bg-card p-6">
            <h2 className="mb-6 text-xl font-bold">
                Quick Actions
            </h2>

            <div className="grid grid-cols-2 gap-4">
                {actions.map((action) => {
                    const Icon =
                        action.icon;

                    return (
                        <button
                            key={action.title}
                            onClick={() =>
                                router.push(
                                    action.href
                                )
                            }
                            className="rounded-2xl border p-6 transition hover:border-primary hover:bg-primary/5"
                        >
                            <Icon className="mx-auto mb-3 h-8 w-8 text-primary" />

                            <p className="font-medium">
                                {action.title}
                            </p>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}