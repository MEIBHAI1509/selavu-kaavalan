"use client";

import {
    ArrowDownCircle,
    ArrowUpCircle,
    Target,
    Repeat,
} from "lucide-react";

interface Activity {
    id: string;
    title: string;
    type:
    | "expense"
    | "income"
    | "goal"
    | "recurring";
    date: string;
}

interface Props {
    activities: Activity[];
}

const icons = {
    expense: ArrowUpCircle,
    income: ArrowDownCircle,
    goal: Target,
    recurring: Repeat,
};

const colors = {
    expense: "text-red-500",
    income: "text-green-500",
    goal: "text-yellow-500",
    recurring: "text-primary",
};

export default function RecentActivity({
    activities,
}: Props) {
    return (
        <div className="rounded-3xl border bg-card p-6">
            <h2 className="mb-6 text-xl font-bold">
                Recent Activity
            </h2>

            {activities.length === 0 ? (
                <div className="py-10 text-center text-muted-foreground">
                    No recent activity
                </div>
            ) : (
                <div className="space-y-4">
                    {activities.map(
                        (activity) => {
                            const Icon =
                                icons[activity.type];

                            return (
                                <div
                                    key={activity.id}
                                    className="flex items-center justify-between rounded-xl border p-4"
                                >
                                    <div className="flex items-center gap-4">
                                        <Icon
                                            className={`h-5 w-5 ${colors[
                                                activity.type
                                                ]
                                                }`}
                                        />

                                        <div>
                                            <p className="font-medium">
                                                {activity.title}
                                            </p>

                                            <p className="text-sm capitalize text-muted-foreground">
                                                {activity.type}
                                            </p>
                                        </div>
                                    </div>

                                    <span className="text-sm text-muted-foreground">
                                        {new Date(
                                            activity.date
                                        ).toLocaleDateString()}
                                    </span>
                                </div>
                            );
                        }
                    )}
                </div>
            )}
        </div>
    );
}