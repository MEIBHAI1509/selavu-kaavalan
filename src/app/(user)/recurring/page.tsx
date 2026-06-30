"use client";

import { useMemo, useState } from "react";

import {
    Plus,
    Repeat,
} from "lucide-react";

import { useUser } from "@/hooks/use-user";
import { useRecurring } from "@/hooks/use-recurring";
import { useWallets } from "@/hooks/use-wallets";
import { useCategories } from "@/hooks/use-categories";

import type { RecurringTransaction } from "@/types/recurring";

import RecurringCard from "@/components/recurring/recurring-card";
import AddRecurringDialog from "@/components/recurring/add-recurring-dialog";
import EditRecurringDialog from "@/components/recurring/edit-recurring-dialog";
import DeleteRecurringDialog from "@/components/recurring/delete-recurring-dialog";

import { recurringService } from "@/services/recurring.service";

export default function RecurringPage() {
    const user = useUser();

    const [open, setOpen] =
        useState(false);

    const [editOpen, setEditOpen] =
        useState(false);

    const [deleteLoading, setDeleteLoading] =
        useState(false);

    const [editingTransaction, setEditingTransaction] =
        useState<RecurringTransaction | null>(null);

    const [deletingTransaction, setDeletingTransaction] =
        useState<RecurringTransaction | null>(null);

    const [search, setSearch] =
        useState("");

    const [typeFilter, setTypeFilter] =
        useState<
            "all" | "income" | "expense"
        >("all");

    const {
        transactions,
        loading,
        refetch,
    } = useRecurring(user?.id);

    const {
        wallets,
    } = useWallets(user?.id);

    const {
        categories,
    } = useCategories(user?.id);

    const filteredTransactions =
        useMemo(() => {
            return transactions.filter(
                (transaction) => {
                    const matchesSearch =
                        search === "" ||
                        transaction.title
                            .toLowerCase()
                            .includes(
                                search.toLowerCase()
                            );

                    const matchesType =
                        typeFilter === "all" ||
                        transaction.type ===
                        typeFilter;

                    return (
                        matchesSearch &&
                        matchesType
                    );
                }
            );
        }, [
            transactions,
            search,
            typeFilter,
        ]);

    const activeCount =
        transactions.filter(
            (t) => t.is_active
        ).length;

    const pausedCount =
        transactions.length -
        activeCount;

    if (!user) {
        return (
            <div className="flex h-[60vh] items-center justify-center">
                Loading user...
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">
                        Recurring Transactions
                    </h1>

                    <p className="mt-1 text-muted-foreground">
                        Automate your recurring income and expenses
                    </p>
                </div>

                <button
                    onClick={() => setOpen(true)}
                    className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-primary-foreground"
                >
                    <Plus className="h-4 w-4" />

                    Add Recurring
                </button>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
                <div className="rounded-3xl border bg-card p-6">
                    <p className="text-muted-foreground">
                        Total
                    </p>

                    <h2 className="mt-3 text-3xl font-bold">
                        {transactions.length}
                    </h2>
                </div>

                <div className="rounded-3xl border bg-card p-6">
                    <p className="text-muted-foreground">
                        Active
                    </p>

                    <h2 className="mt-3 text-3xl font-bold text-green-500">
                        {activeCount}
                    </h2>
                </div>

                <div className="rounded-3xl border bg-card p-6">
                    <p className="text-muted-foreground">
                        Paused
                    </p>

                    <h2 className="mt-3 text-3xl font-bold text-orange-500">
                        {pausedCount}
                    </h2>
                </div>
            </div>
            <div className="flex flex-col gap-4 rounded-3xl border bg-card p-6 md:flex-row">
                <input
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                    placeholder="Search recurring transactions..."
                    className="flex-1 rounded-xl border border-border bg-background px-4 py-3 outline-none"
                />

                <select
                    value={typeFilter}
                    onChange={(e) =>
                        setTypeFilter(
                            e.target.value as
                            | "all"
                            | "income"
                            | "expense"
                        )
                    }
                    className="rounded-xl border border-border bg-background px-4 py-3"
                >
                    <option value="all">
                        All
                    </option>

                    <option value="income">
                        Income
                    </option>

                    <option value="expense">
                        Expense
                    </option>
                </select>
            </div>
            {loading && (
                <div className="rounded-3xl border bg-card p-8">
                    Loading recurring transactions...
                </div>
            )}
            {!loading &&
                filteredTransactions.length === 0 && (
                    <div className="rounded-3xl border border-dashed p-16 text-center">
                        <Repeat className="mx-auto h-16 w-16 text-muted-foreground" />

                        <h2 className="mt-6 text-2xl font-bold">
                            No Recurring Transactions
                        </h2>

                        <p className="mt-2 text-muted-foreground">
                            Create your first recurring transaction.
                        </p>

                        <button
                            onClick={() => setOpen(true)}
                            className="mt-6 rounded-xl bg-primary px-5 py-3 text-primary-foreground"
                        >
                            Create Recurring
                        </button>
                    </div>
                )}
            {!loading &&
                filteredTransactions.length > 0 && (
                    <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
                        {filteredTransactions.map(
                            (transaction) => (
                                <RecurringCard
                                    key={transaction.id}
                                    transaction={transaction}
                                    onEdit={(
                                        transaction
                                    ) => {
                                        setEditingTransaction(
                                            transaction
                                        );
                                        setEditOpen(true);
                                    }}
                                    onDelete={(
                                        transaction
                                    ) => {
                                        setDeletingTransaction(
                                            transaction
                                        );
                                    }}
                                    onToggle={async (
                                        transaction
                                    ) => {
                                        await recurringService.toggleRecurring(
                                            transaction.id,
                                            !transaction.is_active
                                        );

                                        await refetch();
                                    }}
                                />
                            )
                        )}
                    </div>
                )}
            <AddRecurringDialog
                open={open}
                onOpenChange={setOpen}
                userId={user.id}
                wallets={wallets}
                categories={categories}
                onSuccess={refetch}
            />
            <EditRecurringDialog
                open={editOpen}
                onOpenChange={(open) => {
                    setEditOpen(open);

                    if (!open) {
                        setEditingTransaction(null);
                    }
                }}
                transaction={editingTransaction}
                wallets={wallets}
                categories={categories}
                onSuccess={refetch}
            />
            <DeleteRecurringDialog
                open={!!deletingTransaction}
                transaction={deletingTransaction}
                loading={deleteLoading}
                onOpenChange={(open) => {
                    if (!open) {
                        setDeletingTransaction(null);
                    }
                }}
                onConfirm={async () => {
                    if (!deletingTransaction) return;

                    try {
                        setDeleteLoading(true);

                        const { error } =
                            await recurringService.deleteRecurring(
                                deletingTransaction.id
                            );

                        if (error) {
                            throw error;
                        }

                        await refetch();

                        setDeletingTransaction(null);
                    } catch (error) {
                        console.error(error);
                    } finally {
                        setDeleteLoading(false);
                    }
                }}
            />
        </div>
    );
}