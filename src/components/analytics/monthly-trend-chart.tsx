"use client";

import {
    ResponsiveContainer,
    BarChart,
    Bar,
    CartesianGrid,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

interface Props {
    data: {
        month: string;
        amount: number;
    }[];
}

export default function MonthlyTrendChart({
    data,
}: Props) {
    return (
        <div className="rounded-3xl border bg-card p-6">
            <h2 className="mb-6 text-xl font-bold">
                Monthly Expense Trend
            </h2>

            <div className="h-80">
                <ResponsiveContainer
                    width="100%"
                    height="100%"
                >
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />

                        <XAxis dataKey="month" />

                        <YAxis />

                        <Tooltip />

                        <Bar
                            dataKey="amount"
                            radius={[8, 8, 0, 0]}
                            fill="#10b981"
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}