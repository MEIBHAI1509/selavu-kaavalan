"use client";

import { Search } from "lucide-react";

import type { Wallet } from "@/types/wallet";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface Props {
    search: string;
    onSearchChange: (value: string) => void;

    walletFilter: string;
    onWalletChange: (value: string) => void;

    wallets: Wallet[];
}

export default function IncomeFilters({
    search,
    onSearchChange,
    walletFilter,
    onWalletChange,
    wallets,
}: Props) {
    return (
        <div className="mb-6 grid gap-4 lg:grid-cols-2">
            {/* Search */}

            <div className="relative">
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                <input
                    value={search}
                    onChange={(e) =>
                        onSearchChange(e.target.value)
                    }
                    placeholder="Search by source..."
                    className="w-full rounded-xl border border-border bg-background py-3 pl-11 pr-4 outline-none transition focus:border-primary"
                />
            </div>

            {/* Wallet */}

            <Select
                value={walletFilter}
                onValueChange={onWalletChange}
            >
                <SelectTrigger>
                    <SelectValue placeholder="All Wallets" />
                </SelectTrigger>

                <SelectContent>
                    <SelectItem value="all">
                        All Wallets
                    </SelectItem>

                    {wallets.map((wallet) => (
                        <SelectItem
                            key={wallet.id}
                            value={wallet.id}
                        >
                            {wallet.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}