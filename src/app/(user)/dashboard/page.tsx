"use client";

import { useUser } from "@/hooks/use-user";
import { useAnalytics } from "@/hooks/use-analytics";
import { useRecurring } from "@/hooks/use-recurring";

import DashboardHeader from "@/components/dashboard/dashboard-header";
import DashboardSummary from "@/components/dashboard/dashboard-summary";

import BudgetProgress from "@/components/dashboard/budget-progress";
import GoalProgress from "@/components/dashboard/goal-progress";

import RecentTransactions from "@/components/dashboard/recent-transactions";
import UpcomingRecurring from "@/components/dashboard/upcoming-recurring";
import QuickActions from "@/components/dashboard/quick-actions";

import IncomeExpenseChart from "@/components/analytics/income-expense-chart";
import ExpenseCategoryChart from "@/components/analytics/expense-category-chart";
import MonthlyTrendChart from "@/components/analytics/monthly-trend-chart";
import WalletDistributionChart from "@/components/analytics/wallet-distribution-chart";

export default function DashboardPage() {
    const user = useUser();

    const analytics =
        useAnalytics(user?.id);

    const {
        transactions,
    } = useRecurring(user?.id);

    if (!user) {
        return (
            <div className="flex h-[60vh] items-center justify-center">
                Loading dashboard...
            </div>
        );
    }

    const totalBalance =
        analytics.wallets.reduce(
            (sum, wallet) =>
                sum +
                Number(wallet.balance),
            0
        );

    return (
        <div className="space-y-8">

            <DashboardHeader
                user={user}
            />

            <DashboardSummary
                balance={totalBalance}
                income={
                    analytics.summary
                        .totalIncome
                }
                expense={
                    analytics.summary
                        .totalExpense
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

                <BudgetProgress
                    budgets={
                        analytics.budgets
                    }
                />

                <GoalProgress
                    goals={
                        analytics.goals
                    }
                />

            </div>

            <div className="grid gap-8 xl:grid-cols-2">

                <RecentTransactions
                    expenses={
                        analytics.expenses
                    }
                />

                <UpcomingRecurring
                    transactions={
                        transactions
                    }
                />

            </div>

            <QuickActions />

        </div>
    );
}