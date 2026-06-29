"use client";

import {
  CreditCard,
  Receipt,
  Wallet,
} from "lucide-react";

interface Props {
  balance: number;
  expenses: number;
  wallets: number;
}

export default function StatsCards({
  balance,
  expenses,
  wallets,
}: Props) {
  const cards = [
    {
      title: "Total Balance",
      value: `₹${balance.toLocaleString()}`,
      icon: Wallet,
    },
    {
      title: "Expenses",
      value: `₹${expenses.toLocaleString()}`,
      icon: Receipt,
    },
    {
      title: "Wallets",
      value: wallets,
      icon: CreditCard,
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {cards.map((card) => (
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
                {card.value}
              </h2>
            </div>

            <card.icon className="h-10 w-10 text-primary" />
          </div>
        </div>
      ))}
    </div>
  );
}