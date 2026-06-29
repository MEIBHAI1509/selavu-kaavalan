"use client";

interface Props {
  budget: number;
  spent: number;
}

export default function BudgetProgress({
  budget,
  spent,
}: Props) {
  const percentage =
    budget === 0
      ? 0
      : Math.min(
          (spent / budget) * 100,
          100
        );

  const remaining =
    budget - spent;

  const overBudget =
    spent > budget;

  return (
    <div className="space-y-4">
      {/* Numbers */}

      <div className="flex justify-between text-sm">
        <div>
          <p className="text-muted-foreground">
            Budget
          </p>

          <p className="font-semibold">
            ₹
            {budget.toLocaleString()}
          </p>
        </div>

        <div className="text-center">
          <p className="text-muted-foreground">
            Spent
          </p>

          <p className="font-semibold text-red-500">
            ₹
            {spent.toLocaleString()}
          </p>
        </div>

        <div className="text-right">
          <p className="text-muted-foreground">
            Remaining
          </p>

          <p
            className={`font-semibold ${
              overBudget
                ? "text-red-500"
                : "text-green-500"
            }`}
          >
            ₹
            {remaining.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Progress */}

      <div className="h-3 overflow-hidden rounded-full bg-muted">
        <div
          className={`h-full rounded-full transition-all ${
            overBudget
              ? "bg-red-500"
              : percentage > 80
              ? "bg-yellow-500"
              : "bg-primary"
          }`}
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>

      {/* Footer */}

      <div className="flex items-center justify-between text-sm">
        <span>
          {percentage.toFixed(0)}%
          Used
        </span>

        {overBudget ? (
          <span className="font-semibold text-red-500">
            Over Budget
          </span>
        ) : (
          <span className="text-green-500">
            On Track
          </span>
        )}
      </div>
    </div>
  );
}