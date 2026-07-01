"use client";

interface Props {
    income: number;

    expense: number;
}

export default function AnalyticsSummary({
    income,
    expense,
}: Props) {
    const savings =
        income - expense;

    const averageExpense =
        expense / 12;

    const cards = [
        {
            title: "Income",
            value: income,
            color: "text-green-500",
        },
        {
            title: "Expense",
            value: expense,
            color: "text-red-500",
        },
        {
            title: "Savings",
            value: savings,
            color: "text-primary",
        },
        {
            title: "Avg Monthly Expense",
            value: averageExpense,
            color: "text-orange-500",
        },
    ];

    return (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {cards.map((card) => (
                <div
                    key={card.title}
                    className="rounded-3xl border bg-card p-6"
                >
                    <p className="text-muted-foreground">
                        {card.title}
                    </p>

                    <h2
                        className={`mt-3 text-3xl font-bold ${card.color}`}
                    >
                        ₹
                        {card.value.toLocaleString()}
                    </h2>
                </div>
            ))}
        </div>
    );
}