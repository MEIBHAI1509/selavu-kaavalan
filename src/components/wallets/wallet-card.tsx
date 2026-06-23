import { Trash2 } from "lucide-react";
import { Wallet } from "@/types/wallet";

interface Props {
  wallet: Wallet;
  onDelete: (id: string, name: string) => void;
}

export default function WalletCard({
  wallet,
  onDelete,
}: Props) {
  return (
    <div className="rounded-3xl border border-border bg-card p-6">
      <div className="mb-4 flex items-center justify-between">
        <span className="rounded-full bg-primary/20 px-3 py-1 text-xs text-primary">
          {wallet.type}
        </span>

        <button
          onClick={() => onDelete(wallet.id, wallet.name)}
          className="rounded-lg p-2 hover:bg-destructive/10"
        >
          <Trash2 className="h-4 w-4 text-destructive" />
        </button>
      </div>

      <h3 className="text-xl font-semibold">
        {wallet.name}
      </h3>

      <p className="mt-4 text-4xl font-bold">
        ₹ {Number(wallet.balance).toLocaleString()}
      </p>

      <p className="mt-2 text-muted-foreground">
        Available Balance
      </p>
    </div>
  );
}