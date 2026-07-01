"use client";

import { User } from "@supabase/supabase-js";

interface Props {
  user: User;
}

export default function DashboardHeader({
  user,
}: Props) {
  const today =
    new Intl.DateTimeFormat(
      "en-IN",
      {
        day: "numeric",
        month: "long",
        year: "numeric",
      }
    ).format(new Date());

  return (
    <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
      <div>
        <h1 className="text-4xl font-bold">
          Welcome back,
          {" "}
          {user.user_metadata
            ?.full_name ??
            "User"} 👋
        </h1>

        <p className="mt-2 text-muted-foreground">
          Here&apos;s your financial overview today.
        </p>
      </div>

      <div className="rounded-2xl border bg-card px-5 py-3">
        <p className="text-sm text-muted-foreground">
          Today
        </p>

        <p className="font-semibold">
          {today}
        </p>
      </div>
    </div>
  );
}