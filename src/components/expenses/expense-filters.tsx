"use client";

import { Search } from "lucide-react";

import type { Wallet } from "@/types/wallet";
import type { Category } from "@/types/category";

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

  wallets: Wallet[];
  categories: Category[];

  walletFilter: string;
  categoryFilter: string;

  onWalletChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
}

export default function ExpenseFilters({
  search,
  onSearchChange,
  wallets,
  categories,
  walletFilter,
  categoryFilter,
  onWalletChange,
  onCategoryChange,
}: Props) {
  return (
    <div className="mb-6 rounded-3xl border border-border bg-card p-6">
      <div className="grid gap-4 lg:grid-cols-3">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />

          <input
            value={search}
            onChange={(e) =>
              onSearchChange(e.target.value)
            }
            placeholder="Search expenses..."
            className="w-full rounded-xl border border-border bg-background py-3 pl-12 pr-4 outline-none transition focus:border-primary"
          />
        </div>

        {/* Wallet */}
        <Select
          value={walletFilter}
          onValueChange={onWalletChange}
        >
          <SelectTrigger>
            <SelectValue placeholder="Wallet" />
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

        {/* Category */}
        <Select
          value={categoryFilter}
          onValueChange={onCategoryChange}
        >
          <SelectTrigger>
            <SelectValue placeholder="Category" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">
              All Categories
            </SelectItem>

            {categories.map((category) => (
              <SelectItem
                key={category.id}
                value={category.id}
              >
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}