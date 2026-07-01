"use client";

import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
} from "recharts";

interface Props {
    data: {
        name: string;
        value: number;
    }[];
}

const COLORS = [
    "#10b981",
    "#3b82f6",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
    "#06b6d4",
    "#ec4899",
];

export default function ExpenseCategoryChart({
    data,
}: Props) {
    return (
        <div className="rounded-3xl border bg-card p-6">
            <h2 className="mb-6 text-xl font-bold">
                Expense by Category
            </h2>

            <div className="h-80">
                <ResponsiveContainer
                    width="100%"
                    height="100%"
                >
                    <PieChart>
                        <Pie
                            data={data}
                            dataKey="value"
                            nameKey="name"
                            outerRadius={110}
                            label
                        >
                            {data.map(
                                (_, index) => (
                                    <Cell
                                        key={index}
                                        fill={
                                            COLORS[
                                            index %
                                            COLORS.length
                                            ]
                                        }
                                    />
                                )
                            )}
                        </Pie>

                        <Tooltip />

                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}