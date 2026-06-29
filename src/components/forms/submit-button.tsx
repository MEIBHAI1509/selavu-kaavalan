"use client";

import { Loader2 } from "lucide-react";

interface Props {
  loading: boolean;
  children: React.ReactNode;
}

export function SubmitButton({
  loading,
  children,
}: Props) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="w-full rounded-xl bg-primary py-3 font-semibold text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {loading ? (
        <span className="flex items-center justify-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin" />
          Loading...
        </span>
      ) : (
        children
      )}
    </button>
  );
}