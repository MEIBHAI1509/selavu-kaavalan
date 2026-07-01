"use client";

import { useUser } from "@/hooks/use-user";
import { useAnalytics } from "@/hooks/use-analytics";

import AnalyticsSummary from "@/components/analytics/analytics-summary";
import IncomeExpenseChart from "@/components/analytics/income-expense-chart";
import ExpenseCategoryChart from "@/components/analytics/expense-category-chart";
import MonthlyTrendChart from "@/components/analytics/monthly-trend-chart";
import WalletDistributionChart from "@/components/analytics/wallet-distribution-chart";

export default function AnalyticsPage() {
    const user = useUser();

    const analytics = useAnalytics(
        user?.id
    );

    if (!user) {
        return (
            <div className="flex h-[60vh] items-center justify-center">
                Loading analytics...
            </div>
        );
    }
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold">
                    Analytics
                </h1>

                <p className="mt-1 text-muted-foreground">
                    Financial insights and spending trends
                </p>
            </div>
            <AnalyticsSummary
                income={
                    analytics.summary.totalIncome
                }
                expense={
                    analytics.summary.totalExpense
                }
            />
            <div className="grid gap-8 xl:grid-cols-2">
                <IncomeExpenseChart
                    data={
                        analytics.incomeVsExpense
                    }
                />

                <ExpenseCategoryChart
                    data={
                        analytics.expenseByCategory
                    }
                />
            </div>
            <div className="grid gap-8 xl:grid-cols-2">
                <MonthlyTrendChart
                    data={
                        analytics.monthlyTrend
                    }
                />

                <WalletDistributionChart
                    data={
                        analytics.walletDistribution
                    }
                />
            </div>
            <div className="grid gap-8 xl:grid-cols-2">
                <div className="flex h-80 items-center justify-center rounded-3xl border bg-card">
                    <div className="text-center">
                        <h2 className="text-xl font-semibold">
                            Budget Analytics
                        </h2>

                        <p className="mt-2 text-muted-foreground">
                            Coming Soon
                        </p>
                    </div>
                </div>

                <div className="flex h-80 items-center justify-center rounded-3xl border bg-card">
                    <div className="text-center">
                        <h2 className="text-xl font-semibold">
                            Goal Analytics
                        </h2>

                        <p className="mt-2 text-muted-foreground">
                            Coming Soon
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}