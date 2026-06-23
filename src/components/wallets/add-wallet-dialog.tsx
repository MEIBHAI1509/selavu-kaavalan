"use client";

import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";

import { walletService } from "@/services/wallet.service";

const walletTypes = [
  "Cash",
  "Bank",
  "UPI",
  "Credit Card",
  "Savings",
];

interface Props {
  open: boolean;
  onOpenChange: (
    open: boolean
  ) => void;

  userId: string;

  onSuccess: () => void;
}

export default function AddWalletDialog({
  open,
  onOpenChange,
  userId,
  onSuccess,
}: Props) {
  const [name, setName] =
    useState("");

  const [type, setType] =
    useState("Cash");

  const [balance, setBalance] =
    useState("");

  async function handleSubmit() {
    await walletService.createWallet({
      user_id: userId,
      name,
      type,
      balance: Number(balance),
      color: null,
      icon: null,
      is_default: false,
    });

    onSuccess();

    onOpenChange(false);

    setName("");
    setBalance("");
  }

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Add Wallet
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <input
            className="w-full rounded-lg border p-3"
            placeholder="Wallet Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
          />

<Select
  value={type}
  onValueChange={setType}
>
  <SelectTrigger>
    <SelectValue />
  </SelectTrigger>

  <SelectContent>
    {walletTypes.map((walletType) => (
      <SelectItem
        key={walletType}
        value={walletType}
      >
        {walletType}
      </SelectItem>
    ))}
  </SelectContent>
</Select>

          <input
            type="number"
            className="w-full rounded-lg border p-3"
            placeholder="Opening Balance"
            value={balance}
            onChange={(e) =>
              setBalance(e.target.value)
            }
          />

          <button
            onClick={handleSubmit}
            className="w-full rounded-lg bg-primary py-3 text-primary-foreground"
          >
            Create Wallet
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}