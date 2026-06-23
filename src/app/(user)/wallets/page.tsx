"use client";

import { useState } from "react";
import { Wallet as WalletIcon } from "lucide-react";

import WalletCard from "@/components/wallets/wallet-card";
import AddWalletDialog from "@/components/wallets/add-wallet-dialog";

import { useWallets } from "@/hooks/use-wallets";
import { useUser } from "@/hooks/use-user";

import { walletService } from "@/services/wallet.service";
import DeleteWalletDialog from "@/components/wallets/delete-wallet-dialog";

export default function WalletsPage() {
  const user = useUser();

  const [open, setOpen] = useState(false);
  const [walletToDelete, setWalletToDelete] =
  useState<{
    id: string;
    name: string;
  } | null>(null);

  const {
    wallets,
    loading,
    refetch,
  } = useWallets(user?.id);

//   async function handleDelete(id: string) {
//     const confirmed = window.confirm(
//       "Delete this wallet?"
//     );

//     if (!confirmed) return;

//     await walletService.deleteWallet(id);

//     await refetch();
//   }

async function confirmDelete() {
    if (!walletToDelete) return;
  
    await walletService.deleteWallet(
        walletToDelete.id
      );
    await refetch();
  
    setWalletToDelete(null);
  }

  if (!user) {
    return <div>Loading user...</div>;
  }

  if (loading) {
    return <div>Loading wallets...</div>;
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          Wallets
        </h1>

        <button
          onClick={() => setOpen(true)}
          className="rounded-xl bg-primary px-4 py-2 text-primary-foreground"
        >
          Add Wallet
        </button>
      </div>

      {wallets.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-border p-12 text-center">
          <WalletIcon className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />

          <h2 className="text-xl font-semibold">
            Create Your First Wallet
          </h2>

          <p className="mt-2 text-muted-foreground">
            Start tracking your money by adding a wallet.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {wallets.map((wallet) => (
            <WalletCard
              key={wallet.id}
              wallet={wallet}
              onDelete={(id, name) =>
                setWalletToDelete({
                  id,
                  name,
                })
              }
            />
          ))}
        </div>
      )}

      <AddWalletDialog
        open={open}
        onOpenChange={setOpen}
        userId={user.id}
        onSuccess={refetch}
      />

<DeleteWalletDialog
  open={!!walletToDelete}
  walletName={walletToDelete?.name}
  onOpenChange={(open) => {
    if (!open) {
      setWalletToDelete(null);
    }
  }}
  onConfirm={confirmDelete}
/>
    </div>
  );
}