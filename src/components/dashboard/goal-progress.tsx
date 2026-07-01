"use client";

import { Progress } from "@/components/ui/progress";

import { Goal } from "@/types/goal";

interface Props {
    goals: Goal[];
}

export default function GoalProgress({
    goals,
}: Props) {
    return (
        <div className="rounded-3xl border bg-card p-6">
            <h2 className="mb-6 text-xl font-bold">
                Goal Progress
            </h2>

            {goals.length === 0 ? (
                <div className="py-10 text-center text-muted-foreground">
                    No goals available
                </div>
            ) : (
                <div className="space-y-5">
                    {goals.map((goal) => {
                        const saved = goal.saved_amount;
                        const target = goal.target_amount;
                        const percentage = goal.percentage ?? 0;

                        return (
                            <div key={goal.id}>
                                <div className="mb-2 flex items-center justify-between">
                                    <span className="font-medium">
                                        {goal.title}
                                    </span>

                                    <span className="text-sm text-muted-foreground">
                                        ₹{saved.toLocaleString()} / ₹{target.toLocaleString()}
                                    </span>
                                </div>

                                <Progress value={percentage} />
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}