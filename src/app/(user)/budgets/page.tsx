"use client";

import { useMemo, useState } from "react";

import { Plus, PiggyBank } from "lucide-react";

import { useUser } from "@/hooks/use-user";
import { useBudgets } from "@/hooks/use-budgets";
import { useCategories } from "@/hooks/use-categories";

import type { Budget } from "@/types/budget";

import BudgetCard from "@/components/budgets/budget-card";
import AddBudgetDialog from "@/components/budgets/add-budget-dialog";

import { budgetService } from "@/services/budget.service";
import EditBudgetDialog from "@/components/budgets/edit-budget-dialog";
import DeleteBudgetDialog from "@/components/budgets/delete-budget-dialog";

export default function BudgetsPage() {
    const user = useUser();

    const [open, setOpen] = useState(false);

    const [editingBudget, setEditingBudget] =
        useState<Budget | null>(null);

    const [deletingBudget, setDeletingBudget] =
        useState<Budget | null>(null);

    const [editOpen, setEditOpen] =
        useState(false);

    const [deleteLoading, setDeleteLoading] =
        useState(false);

    const {
        budgets,
        loading,
        refetch,
    } = useBudgets(user?.id);

    const {
        categories,
    } = useCategories(user?.id);

    const totalBudget = useMemo(
        () =>
            budgets.reduce(
                (sum, budget) =>
                    sum + Number(budget.amount),
                0
            ),
        [budgets]
    );

    const totalSpent = useMemo(
        () =>
            budgets.reduce(
                (sum, budget) =>
                    sum + (budget.spent ?? 0),
                0
            ),
        [budgets]
    );

    const remaining =
        totalBudget - totalSpent;

    if (!user) {
        return (
            <div className="flex h-[60vh] items-center justify-center">
                Loading user...
            </div>
        );
    }
    return (
        <div className="space-y-8">
            {/* Header */}

            <div className="flex items-center justify-between" >
                <div>
                    <h1 className="text-3xl font-bold">
                        Budgets
                    </h1>

                    <p className="mt-1 text-muted-foreground">
                        Manage your monthly spending limits
                    </p>
                </div>

                <button
                    onClick={() => setOpen(true)}
                    className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-primary-foreground"
                >
                    <Plus className="h-4 w-4" />

                    Add Budget
                </button>
            </div >
            <div className="grid gap-6 md:grid-cols-3">
                <div className="rounded-3xl border bg-card p-6">
                    <p className="text-muted-foreground">
                        Total Budget
                    </p>

                    <h2 className="mt-3 text-3xl font-bold">
                        ₹
                        {totalBudget.toLocaleString()}
                    </h2>
                </div>

                <div className="rounded-3xl border bg-card p-6">
                    <p className="text-muted-foreground">
                        Total Spent
                    </p>

                    <h2 className="mt-3 text-3xl font-bold text-red-500">
                        ₹
                        {totalSpent.toLocaleString()}
                    </h2>
                </div>

                <div className="rounded-3xl border bg-card p-6">
                    <p className="text-muted-foreground">
                        Remaining
                    </p>

                    <h2
                        className={`mt-3 text-3xl font-bold ${remaining >= 0
                            ? "text-green-500"
                            : "text-red-500"
                            }`}
                    >
                        ₹
                        {remaining.toLocaleString()}
                    </h2>
                </div>
            </div>
            {
                loading && (
                    <div className="rounded-3xl border bg-card p-8">
                        Loading budgets...
                    </div>
                )
            }
            {
                !loading &&
                budgets.length === 0 && (
                    <div className="rounded-3xl border border-dashed p-16 text-center">
                        <PiggyBank className="mx-auto h-16 w-16 text-muted-foreground" />

                        <h2 className="mt-6 text-2xl font-bold">
                            No Budgets Yet
                        </h2>

                        <p className="mt-2 text-muted-foreground">
                            Create your first monthly budget.
                        </p>

                        <button
                            onClick={() =>
                                setOpen(true)
                            }
                            className="mt-6 rounded-xl bg-primary px-5 py-3 text-primary-foreground"
                        >
                            Create Budget
                        </button>
                    </div>
                )
            }
            {
                !loading &&
                budgets.length > 0 && (
                    <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
                        {budgets.map(
                            (budget) => (
                                <BudgetCard
                                    key={budget.id}
                                    budget={budget}
                                    onEdit={(budget) => {
                                        setEditingBudget(budget);
                                        setEditOpen(true);
                                    }}
                                    onDelete={(budget) => {
                                        setDeletingBudget(budget);
                                    }}
                                />
                            )
                        )}
                    </div>

                )
            }
            <AddBudgetDialog
                open={open}
                onOpenChange={setOpen}
                userId={user.id}
                categories={categories}
                onSuccess={refetch}
            />

            <EditBudgetDialog
                open={editOpen}
                onOpenChange={(open) => {
                    setEditOpen(open);

                    if (!open) {
                        setEditingBudget(null);
                    }
                }}
                budget={editingBudget}
                categories={categories}
                onSuccess={refetch}
            />

            <DeleteBudgetDialog
                open={!!deletingBudget}
                budget={deletingBudget}
                loading={deleteLoading}
                onOpenChange={(open) => {
                    if (!open) {
                        setDeletingBudget(null);
                    }
                }}
                onConfirm={async () => {
                    if (!deletingBudget) return;

                    try {
                        setDeleteLoading(true);

                        const { error } =
                            await budgetService.deleteBudget(
                                deletingBudget.id
                            );

                        if (error) throw error;

                        await refetch();

                        setDeletingBudget(null);
                    } catch (error) {
                        console.error(error);
                    } finally {
                        setDeleteLoading(false);
                    }
                }}
            />
        </div>
    )
}