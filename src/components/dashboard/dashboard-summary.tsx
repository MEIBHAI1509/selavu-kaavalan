"use client";

import {
  Wallet,
  TrendingUp,
  TrendingDown,
  PiggyBank,
} from "lucide-react";

interface Props {
  balance: number;

  income: number;

  expense: number;
}

export default function DashboardSummary({
  balance,
  income,
  expense,
}: Props) {
  const savings =
    income - expense;

  const cards = [
    {
      title: "Balance",
      value: balance,
      icon: Wallet,
      color: "text-cyan-500",
    },
    {
      title: "Income",
      value: income,
      icon: TrendingUp,
      color: "text-green-500",
    },
    {
      title: "Expense",
      value: expense,
      icon: TrendingDown,
      color: "text-red-500",
    },
    {
      title: "Savings",
      value: savings,
      icon: PiggyBank,
      color: "text-primary",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon =
          card.icon;

        return (
          <div
            key={card.title}
            className="rounded-3xl border bg-card p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground">
                  {card.title}
                </p>

                <h2 className="mt-3 text-3xl font-bold">
                  ₹
                  {card.value.toLocaleString()}
                </h2>
              </div>

              <Icon
                className={`h-9 w-9 ${card.color}`}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}