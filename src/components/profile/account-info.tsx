"use client";

import {
    Globe,
    Calendar,
    Coins,
    Clock,
} from "lucide-react";

import { UserSettings } from "@/types/user-settings";

interface Props {
    settings: UserSettings;
}

const items = [
    {
        key: "currency",
        title: "Currency",
        icon: Coins,
    },
    {
        key: "language",
        title: "Language",
        icon: Globe,
    },
    {
        key: "timezone",
        title: "Timezone",
        icon: Clock,
    },
    {
        key: "date_format",
        title: "Date Format",
        icon: Calendar,
    },
] as const;

export default function AccountInfo({
    settings,
}: Props) {
    return (
        <div className="rounded-3xl border bg-card p-6">
            <h2 className="mb-6 text-xl font-bold">
                Account Information
            </h2>

            <div className="grid gap-4 md:grid-cols-2">
                {items.map((item) => {
                    const Icon = item.icon;

                    return (
                        <div
                            key={item.key}
                            className="flex items-center gap-4 rounded-xl border p-4"
                        >
                            <div className="rounded-lg bg-primary/10 p-3">
                                <Icon className="h-5 w-5 text-primary" />
                            </div>

                            <div>
                                <p className="text-sm text-muted-foreground">
                                    {item.title}
                                </p>

                                <p className="font-semibold">
                                    {settings[item.key]}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}