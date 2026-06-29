"use client";

import { Search, X } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Wallet } from "@/types/wallet";
import { Category } from "@/types/category";

interface ExpenseFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;

  wallet: string;
  onWalletChange: (value: string) => void;

  category: string;
  onCategoryChange: (value: string) => void;

  date: string;
  onDateChange: (value: string) => void;

  wallets: Wallet[];
  categories: Category[];

  onClear: () => void;
}

export default function ExpenseFilters({
  search,
  onSearchChange,
  wallet,
  onWalletChange,
  category,
  onCategoryChange,
  date,
  onDateChange,
  wallets,
  categories,
  onClear,
}: ExpenseFiltersProps) {
  return (
    <div className="mb-8 rounded-3xl border border-border bg-card p-5">
      <div className="grid gap-4 lg:grid-cols-5">
        {/* Search */}

        <div className="relative lg:col-span-2">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <input
            value={search}
            onChange={(e) =>
              onSearchChange(e.target.value)
            }
            placeholder="Search expenses..."
            className="h-11 w-full rounded-xl border border-border bg-background pl-11 pr-4 outline-none transition focus:border-primary"
          />
        </div>

        {/* Wallet */}

        <Select
          value={wallet}
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
          value={category}
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

        {/* Date */}

        <Select
          value={date}
          onValueChange={onDateChange}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">
              All Time
            </SelectItem>

            <SelectItem value="today">
              Today
            </SelectItem>

            <SelectItem value="week">
              This Week
            </SelectItem>

            <SelectItem value="month">
              This Month
            </SelectItem>

            <SelectItem value="year">
              This Year
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="mt-5 flex justify-end">
        <button
          onClick={onClear}
          className="inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2 transition hover:bg-muted"
        >
          <X className="h-4 w-4" />

          Clear Filters
        </button>
      </div>
    </div>
  );
}