import { useState } from "react";

import {
  Pencil,
  Trash2,
  Wallet2,
} from "lucide-react";

import EditWalletDialog from "./edit-wallet-dialog";
import { Wallet } from "@/types/wallet";

interface Props {
  wallet: Wallet;
  onDelete: (id: string, name: string) => void;
  onEdit: () => void;
}

export default function WalletCard({
  wallet,
  onDelete,
  onEdit,
}: Props) {
  const [editOpen, setEditOpen] = useState(false);
  return (
    <div className="rounded-3xl border border-border bg-card p-6">
      <div className="mb-5 flex items-center justify-between">
  <div className="flex items-center gap-3">
    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
      <Wallet2 className="h-6 w-6 text-primary" />
    </div>

    <div>
      <h3 className="font-semibold">
        {wallet.name}
      </h3>

      <p className="text-sm text-muted-foreground">
        {wallet.type}
      </p>
    </div>
  </div>

  <div className="flex gap-2">
    <button
      onClick={onEdit}
      className="rounded-xl p-2 transition hover:bg-primary/10"
    >
      <Pencil className="h-4 w-4 text-primary" />
    </button>

    <button
      onClick={() =>
        onDelete(wallet.id, wallet.name)
      }
      className="rounded-xl p-2 transition hover:bg-destructive/10"
    >
      <Trash2 className="h-4 w-4 text-destructive" />
    </button>
  </div>
</div>


<p className="mt-8 text-4xl font-bold tracking-tight">
        ₹ {Number(wallet.balance).toLocaleString()}
      </p>

      <p className="mt-2 text-muted-foreground">
        Available Balance
      </p>
    </div>
  );
}