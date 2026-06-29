"use client";

import { useMemo, useState } from "react";

import { Plus, Wallet } from "lucide-react";

import { useUser } from "@/hooks/use-user";
import { useIncome } from "@/hooks/use-income";
import { useWallets } from "@/hooks/use-wallets";

import AddIncomeDialog from "@/components/income/add-income-dialog";
import { Income } from "@/types/income";

import IncomeTable from "@/components/income/income-table";
import IncomeFilters from "@/components/income/income-filters";
import EditIncomeDialog from "@/components/income/edit-income-dialog";
import DeleteIncomeDialog from "@/components/income/delete-income-dialog";

import { incomeService } from "@/services/income.service";

export default function IncomePage() {
    const user = useUser();

    const [open, setOpen] = useState(false);

    const [search, setSearch] =
        useState("");

    const [walletFilter, setWalletFilter] =
        useState("all");

    const [editingIncome, setEditingIncome] =
        useState<Income | null>(null);

    const [editOpen, setEditOpen] =
        useState(false);

    const [deletingIncome, setDeletingIncome] =
        useState<Income | null>(null);

    const {
        income,
        loading,
        refetch,
    } = useIncome(user?.id);

    const {
        wallets,
    } = useWallets(user?.id);

    const filteredIncome = useMemo(() => {
        return income.filter((item) => {
            const matchesSearch =
                search === "" ||
                item.source
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                item.note
                    ?.toLowerCase()
                    .includes(search.toLowerCase());

            const matchesWallet =
                walletFilter === "all" ||
                item.wallet_id === walletFilter;

            return (
                matchesSearch &&
                matchesWallet
            );
        });
    }, [
        income,
        search,
        walletFilter,
    ]);

    const totalIncome = useMemo(
        () =>
            filteredIncome.reduce(
                (sum, item) =>
                    sum + Number(item.amount),
                0
            ),
        [filteredIncome]
    );

    const walletCount =
        new Set(
            filteredIncome.map(
                (item) => item.wallet_id
            )
        ).size;

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
                        Income
                    </h1>

                    <p className="mt-1 text-muted-foreground">
                        Manage your income records
                    </p>
                </div>

                <button
                    onClick={() => setOpen(true)}
                    className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-primary-foreground"
                >
                    <Plus className="h-4 w-4" />

                    Add Income
                </button>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                <div className="rounded-3xl border bg-card p-6">
                    <p className="text-muted-foreground">
                        Total Income
                    </p>

                    <h2 className="mt-3 text-3xl font-bold text-green-500">
                        ₹
                        {totalIncome.toLocaleString()}
                    </h2>
                </div>

                <div className="rounded-3xl border bg-card p-6">
                    <p className="text-muted-foreground">
                        Transactions
                    </p>

                    <h2 className="mt-3 text-3xl font-bold">
                        {income.length}
                    </h2>
                </div>

                <div className="rounded-3xl border bg-card p-6">
                    <p className="text-muted-foreground">
                        Wallets Used
                    </p>

                    <h2 className="mt-3 text-3xl font-bold">
                        {
                            new Set(
                                income.map(
                                    (item) =>
                                        item.wallet_id
                                )
                            ).size
                        }
                    </h2>
                </div>
            </div>
            {loading && (
                <div className="rounded-2xl border bg-card p-6">
                    Loading income...
                </div>
            )}

            {!loading && income.length === 0 ? (
                <div className="rounded-3xl border border-dashed p-12 text-center">
                    <Wallet className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />

                    <h2 className="text-xl font-semibold">
                        No Income Found
                    </h2>

                    <p className="mt-2 text-muted-foreground">
                        Start by adding your first income.
                    </p>
                </div>
            ) : (
                <>
                    <IncomeFilters
                        search={search}
                        onSearchChange={setSearch}
                        walletFilter={walletFilter}
                        onWalletChange={setWalletFilter}
                        wallets={wallets}
                    />

                    <IncomeTable
                        income={filteredIncome}
                        loading={loading}
                        onEdit={(income) => {
                            setEditingIncome(income);
                            setEditOpen(true);
                        }}
                        onDelete={(income) => {
                            setDeletingIncome(income);
                        }}
                    />
                </>
            )}

            <AddIncomeDialog
                open={open}
                onOpenChange={setOpen}
                userId={user.id}
                wallets={wallets}
                onSuccess={refetch}
            />

            <EditIncomeDialog
                open={editOpen}
                onOpenChange={setEditOpen}
                income={editingIncome}
                wallets={wallets}
                onSuccess={refetch}
            />

            <DeleteIncomeDialog
                open={!!deletingIncome}
                income={deletingIncome}
                loading={loading}
                onOpenChange={(open) => {
                    if (!open) {
                        setDeletingIncome(null);
                    }
                }}
                onConfirm={async () => {
                    if (!deletingIncome) return;

                    const { error } =
                        await incomeService.deleteIncome(
                            deletingIncome.id
                        );

                    if (error) {
                        console.error(error);
                        return;
                    }

                    await refetch();

                    setDeletingIncome(null);
                }}
            />
        </div>
    );
}