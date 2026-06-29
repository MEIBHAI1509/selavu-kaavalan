"use client";

import { useState } from "react";

import { useForm } from "react-hook-form";

import { SubmitHandler } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  walletSchema,
  type WalletFormInput,
  type WalletFormValues,
} from "@/lib/validations/wallet.schema";

import { walletService } from "@/services/wallet.service";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Form } from "@/components/ui/form";

import { FormInput } from "@/components/forms/form-input";

import { FormSelect } from "@/components/forms/form-select";

import { SubmitButton } from "@/components/forms/submit-button";

const walletTypes = [
  {
    label: "Cash",
    value: "Cash",
  },
  {
    label: "Bank",
    value: "Bank",
  },
  {
    label: "UPI",
    value: "UPI",
  },
  {
    label: "Credit Card",
    value: "Credit Card",
  },
  {
    label: "Savings",
    value: "Savings",
  },
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
  const [loading, setLoading] =
    useState(false);

    const form = useForm<
    WalletFormInput,
    undefined,
    WalletFormValues
  >({
    resolver: zodResolver(walletSchema),
  
    defaultValues: {
      name: "",
      type: "Cash",
      balance: 0,
    },
  });

  const onSubmit: SubmitHandler<WalletFormValues> = async (
    values
  ) => {
    try {
      setLoading(true);
  
      const { error } =
        await walletService.createWallet({
          user_id: userId,
          name: values.name,
          type: values.type,
          balance: values.balance,
          color: null,
          icon: null,
          is_default: false,
        });
  
      if (error) throw error;
  
      form.reset();
  
      onSuccess();
  
      onOpenChange(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Add Wallet
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(
              onSubmit
            )}
            className="space-y-6"
          >
            <FormInput
              control={form.control}
              name="name"
              label="Wallet Name"
              placeholder="Enter wallet name"
            />

            <FormSelect
              control={form.control}
              name="type"
              label="Wallet Type"
              placeholder="Select wallet type"
              options={walletTypes}
            />

            <FormInput
              control={form.control}
              name="balance"
              label="Opening Balance"
              placeholder="0"
              type="number"
            />

            <SubmitButton
              loading={loading}
            >
              Create Wallet
            </SubmitButton>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}