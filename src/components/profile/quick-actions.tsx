"use client";

import { useRouter } from "next/navigation";

import {
    Download,
    Settings,
    Wallet,
} from "lucide-react";

export default function QuickActions() {
    const router = useRouter();

    const actions = [
        {
            title: "Settings",
            icon: Settings,
            onClick: () =>
                router.push("/settings"),
        },
        {
            title: "Wallets",
            icon: Wallet,
            onClick: () =>
                router.push("/wallets"),
        },
        {
            title: "Export",
            icon: Download,
            onClick: () =>
                router.push("/reports"),
        },
    ];

    return (
        <div className="rounded-3xl border bg-card p-6">
            <h2 className="mb-6 text-xl font-bold">
                Quick Actions
            </h2>

            <div className="grid gap-4 sm:grid-cols-3">
                {actions.map((action) => {
                    const Icon = action.icon;

                    return (
                        <button
                            key={action.title}
                            onClick={action.onClick}
                            className="flex flex-col items-center gap-3 rounded-2xl border p-6 transition hover:border-primary hover:bg-primary/5"
                        >
                            <Icon className="h-8 w-8 text-primary" />

                            <span className="font-medium">
                                {action.title}
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}