"use client";

interface Props {
  target: number;
  saved: number;
}

export default function GoalProgress({
  target,
  saved,
}: Props) {
  const percentage =
    target === 0
      ? 0
      : Math.min((saved / target) * 100, 100);

  const remaining = Math.max(target - saved, 0);

  const completed = saved >= target;

  return (
    <div className="space-y-4">
      {/* Stats */}

      <div className="flex justify-between text-sm">
        <div>
          <p className="text-muted-foreground">
            Target
          </p>

          <p className="font-semibold">
            ₹{target.toLocaleString()}
          </p>
        </div>

        <div className="text-center">
          <p className="text-muted-foreground">
            Saved
          </p>

          <p className="font-semibold text-primary">
            ₹{saved.toLocaleString()}
          </p>
        </div>

        <div className="text-right">
          <p className="text-muted-foreground">
            Remaining
          </p>

          <p
            className={`font-semibold ${
              completed
                ? "text-green-500"
                : "text-orange-500"
            }`}
          >
            ₹{remaining.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Progress Bar */}

      <div className="h-3 overflow-hidden rounded-full bg-muted">
        <div
          className={`h-full rounded-full transition-all ${
            completed
              ? "bg-green-500"
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
          {percentage.toFixed(0)}% Saved
        </span>

        {completed ? (
          <span className="font-semibold text-green-500">
            Goal Achieved 🎉
          </span>
        ) : (
          <span className="text-muted-foreground">
            Keep Saving
          </span>
        )}
      </div>
    </div>
  );
}