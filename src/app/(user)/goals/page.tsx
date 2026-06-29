"use client";

import { useMemo, useState } from "react";

import {
    Plus,
    Target,
} from "lucide-react";

import { useUser } from "@/hooks/use-user";
import { useGoals } from "@/hooks/use-goals";
import { useWallets } from "@/hooks/use-wallets";

import type { Goal } from "@/types/goal";

import GoalCard from "@/components/goals/goal-card";
import AddGoalDialog from "@/components/goals/add-goal-dialog";
import EditGoalDialog from "@/components/goals/edit-goal-dialog";
import DeleteGoalDialog from "@/components/goals/delete-goal-dialog";
import AddMoneyDialog from "@/components/goals/add-money-dialog";

import { goalService } from "@/services/goal.service";

export default function GoalsPage() {
    const user = useUser();

    const [open, setOpen] =
        useState(false);

    const [editOpen, setEditOpen] =
        useState(false);

    const [addMoneyOpen, setAddMoneyOpen] =
        useState(false);

    const [deleteLoading, setDeleteLoading] =
        useState(false);

    const [editingGoal, setEditingGoal] =
        useState<Goal | null>(null);

    const [selectedGoal, setSelectedGoal] =
        useState<Goal | null>(null);

    const [deletingGoal, setDeletingGoal] =
        useState<Goal | null>(null);

    const {
        goals,
        loading,
        refetch,
    } = useGoals(user?.id);

    const {
        wallets,
    } = useWallets(user?.id);

    const totalTarget = useMemo(
        () =>
            goals.reduce(
                (sum, goal) =>
                    sum +
                    Number(goal.target_amount),
                0
            ),
        [goals]
    );

    const totalSaved = useMemo(
        () =>
            goals.reduce(
                (sum, goal) =>
                    sum +
                    Number(goal.saved_amount),
                0
            ),
        [goals]
    );

    const completedGoals =
        goals.filter(
            (goal) => goal.completed
        ).length;

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
                        Goals
                    </h1>

                    <p className="mt-1 text-muted-foreground">
                        Track your savings goals
                    </p>
                </div>

                <button
                    onClick={() => setOpen(true)}
                    className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-primary-foreground"
                >
                    <Plus className="h-4 w-4" />

                    Add Goal
                </button>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
                <div className="rounded-3xl border bg-card p-6">
                    <p className="text-muted-foreground">
                        Total Target
                    </p>

                    <h2 className="mt-3 text-3xl font-bold">
                        ₹
                        {totalTarget.toLocaleString()}
                    </h2>
                </div>

                <div className="rounded-3xl border bg-card p-6">
                    <p className="text-muted-foreground">
                        Total Saved
                    </p>

                    <h2 className="mt-3 text-3xl font-bold text-green-500">
                        ₹
                        {totalSaved.toLocaleString()}
                    </h2>
                </div>

                <div className="rounded-3xl border bg-card p-6">
                    <p className="text-muted-foreground">
                        Goals Completed
                    </p>

                    <h2 className="mt-3 text-3xl font-bold">
                        {completedGoals}
                    </h2>
                </div>
            </div>
            {loading && (
                <div className="rounded-3xl border bg-card p-8">
                    Loading goals...
                </div>
            )}
            {!loading &&
                goals.length === 0 && (
                    <div className="rounded-3xl border border-dashed p-16 text-center">
                        <Target className="mx-auto h-16 w-16 text-muted-foreground" />

                        <h2 className="mt-6 text-2xl font-bold">
                            No Goals Yet
                        </h2>

                        <p className="mt-2 text-muted-foreground">
                            Create your first savings goal.
                        </p>

                        <button
                            onClick={() => setOpen(true)}
                            className="mt-6 rounded-xl bg-primary px-5 py-3 text-primary-foreground"
                        >
                            Create Goal
                        </button>
                    </div>
                )}
            {!loading &&
                goals.length > 0 && (
                    <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
                        {goals.map((goal) => (
                            <GoalCard
                                key={goal.id}
                                goal={goal}
                                onAddMoney={(goal) => {
                                    setSelectedGoal(goal);
                                    setAddMoneyOpen(true);
                                }}
                                onEdit={(goal) => {
                                    setEditingGoal(goal);
                                    setEditOpen(true);
                                }}
                                onDelete={(goal) => {
                                    setDeletingGoal(goal);
                                }}
                            />
                        ))}
                    </div>
                )}
            <AddGoalDialog
                open={open}
                onOpenChange={setOpen}
                userId={user.id}
                onSuccess={refetch}
            />
            <EditGoalDialog
                open={editOpen}
                onOpenChange={(open) => {
                    setEditOpen(open);

                    if (!open) {
                        setEditingGoal(null);
                    }
                }}
                goal={editingGoal}
                onSuccess={refetch}
            />
            <AddMoneyDialog
                open={addMoneyOpen}
                onOpenChange={(open) => {
                    setAddMoneyOpen(open);

                    if (!open) {
                        setSelectedGoal(null);
                    }
                }}
                goal={selectedGoal}
                wallets={wallets}
                onSuccess={async () => {
                    await refetch();
                }}
            />
            <DeleteGoalDialog
                open={!!deletingGoal}
                goal={deletingGoal}
                loading={deleteLoading}
                onOpenChange={(open) => {
                    if (!open) {
                        setDeletingGoal(null);
                    }
                }}
                onConfirm={async () => {
                    if (!deletingGoal) return;

                    try {
                        setDeleteLoading(true);

                        const { error } =
                            await goalService.deleteGoal(
                                deletingGoal.id
                            );

                        if (error) throw error;

                        await refetch();

                        setDeletingGoal(null);
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