"use client";

import { useState } from "react";
import { Wallet as WalletIcon } from "lucide-react";

import WalletCard from "@/components/wallets/wallet-card";
import AddWalletDialog from "@/components/wallets/add-wallet-dialog";

import type { Wallet } from "@/types/wallet";

import { useWallets } from "@/hooks/use-wallets";
import { useUser } from "@/hooks/use-user";

import { walletService } from "@/services/wallet.service";
import DeleteWalletDialog from "@/components/wallets/delete-wallet-dialog";
import EditWalletDialog from "@/components/wallets/edit-wallet-dialog";

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

  const [editingWallet, setEditingWallet] =
    useState<Wallet | null>(null);

  const [editOpen, setEditOpen] =
    useState(false);

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

  if (!user || loading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="h-48 animate-pulse rounded-3xl bg-card"
          />
        ))}
      </div>
    );
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
        <div className="rounded-3xl border border-dashed border-primary/30 bg-card p-16 text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <WalletIcon className="h-10 w-10 text-primary" />
          </div>

          <h2 className="text-xl font-bold">
            Create Your First Wallet
          </h2>

          <p className="mx-auto mt-3 max-w-md text-muted-foreground">
            Start tracking your money by adding a wallet.
          </p>
          <button
            onClick={() => setOpen(true)}
            className="mt-8 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground transition hover:scale-105"
          >
            Create Wallet
          </button>
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
              onEdit={() => {
                setEditingWallet(wallet);
                setEditOpen(true);
              }}
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
      <EditWalletDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        wallet={editingWallet}
        onSuccess={async () => {
          await refetch();
          setEditOpen(false);
        }}
      />
    </div>
  );
}