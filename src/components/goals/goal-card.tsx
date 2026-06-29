"use client";

import {
  Pencil,
  Plus,
  Target,
  Trash2,
  CalendarDays,
} from "lucide-react";

import type { Goal } from "@/types/goal";

import GoalProgress from "./goal-progress";

interface Props {
  goal: Goal;

  onAddMoney: (goal: Goal) => void;

  onEdit: (goal: Goal) => void;

  onDelete: (goal: Goal) => void;
}

export default function GoalCard({
  goal,
  onAddMoney,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-sm transition hover:border-primary/30">
      {/* Header */}

      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div
            className="flex h-12 w-12 items-center justify-center rounded-2xl"
            style={{
              backgroundColor: `${goal.color}20`,
            }}
          >
            <Target
              className="h-6 w-6"
              style={{
                color: goal.color,
              }}
            />
          </div>

          <div>
            <h3 className="text-lg font-semibold">
              {goal.title}
            </h3>

            {goal.target_date && (
              <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                <CalendarDays className="h-4 w-4" />

                <span>
                  {new Date(
                    goal.target_date
                  ).toLocaleDateString()}
                </span>
              </div>
            )}
          </div>
        </div>

        {goal.completed && (
          <span className="rounded-full bg-green-500 px-3 py-1 text-xs font-semibold text-white">
            Completed
          </span>
        )}
      </div>

      {/* Progress */}

      <div className="mt-6">
        <GoalProgress
          target={goal.target_amount}
          saved={goal.saved_amount}
        />
      </div>

      {/* Days Left */}

      {goal.daysLeft !== undefined &&
        !goal.completed && (
          <div className="mt-5 rounded-xl bg-muted p-3 text-center">
            <p className="text-sm text-muted-foreground">
              Days Remaining
            </p>

            <p className="mt-1 text-lg font-bold">
              {goal.daysLeft > 0
                ? `${goal.daysLeft} Days`
                : "Expired"}
            </p>
          </div>
        )}

      {/* Buttons */}

      <div className="mt-6 flex gap-2">
        <button
          onClick={() =>
            onAddMoney(goal)
          }
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary py-3 font-medium text-primary-foreground transition hover:opacity-90"
        >
          <Plus className="h-4 w-4" />

          Add Money
        </button>

        <button
          onClick={() =>
            onEdit(goal)
          }
          className="rounded-xl border border-border p-3 transition hover:bg-accent"
        >
          <Pencil className="h-4 w-4 text-primary" />
        </button>

        <button
          onClick={() =>
            onDelete(goal)
          }
          className="rounded-xl border border-red-500/20 p-3 transition hover:bg-red-500/10"
        >
          <Trash2 className="h-4 w-4 text-red-500" />
        </button>
      </div>
    </div>
  );
}