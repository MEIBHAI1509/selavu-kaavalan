import {
    ArrowDownRight,
    ArrowUpRight,
    Wallet,
    PiggyBank,
  } from "lucide-react";
  
  export default function DashboardPreview() {
    return (
      <section id="preview" className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center">
            <h2 className="text-4xl font-bold">
              See Your Finances At A Glance
            </h2>
  
            <p className="mt-4 text-muted-foreground">
              A clean dashboard to track income, expenses and savings.
            </p>
          </div>
  
          <div className="rounded-3xl border border-border bg-card p-8 shadow-2xl">
            <div className="grid gap-6 md:grid-cols-4">
              <div className="rounded-2xl border border-border bg-background p-6">
                <Wallet className="mb-4 text-primary" />
                <p className="text-sm text-muted-foreground">
                  Total Balance
                </p>
                <h3 className="mt-2 text-3xl font-bold">
                  ₹25,000
                </h3>
              </div>
  
              <div className="rounded-2xl border border-border bg-background p-6">
                <ArrowUpRight className="mb-4 text-green-500" />
                <p className="text-sm text-muted-foreground">
                  Income
                </p>
                <h3 className="mt-2 text-3xl font-bold">
                  ₹40,000
                </h3>
              </div>
  
              <div className="rounded-2xl border border-border bg-background p-6">
                <ArrowDownRight className="mb-4 text-red-500" />
                <p className="text-sm text-muted-foreground">
                  Expenses
                </p>
                <h3 className="mt-2 text-3xl font-bold">
                  ₹15,000
                </h3>
              </div>
  
              <div className="rounded-2xl border border-border bg-background p-6">
                <PiggyBank className="mb-4 text-yellow-500" />
                <p className="text-sm text-muted-foreground">
                  Savings
                </p>
                <h3 className="mt-2 text-3xl font-bold">
                  ₹10,000
                </h3>
              </div>
            </div>
  
            <div className="mt-8">
              <div className="rounded-2xl border border-border bg-background p-6">
                <div className="mb-4 flex justify-between">
                  <span className="font-medium">
                    Monthly Expenses
                  </span>
  
                  <span className="text-primary">
                    +12%
                  </span>
                </div>
  
                <div className="flex h-56 items-end gap-4">
                  <div className="h-20 w-full rounded-t-xl bg-primary/30" />
                  <div className="h-28 w-full rounded-t-xl bg-primary/40" />
                  <div className="h-36 w-full rounded-t-xl bg-primary/50" />
                  <div className="h-24 w-full rounded-t-xl bg-primary/40" />
                  <div className="h-44 w-full rounded-t-xl bg-primary/70" />
                  <div className="h-52 w-full rounded-t-xl bg-primary" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }