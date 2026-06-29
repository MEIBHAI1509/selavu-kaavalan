"use client";

import { useState } from "react";

import {
  useForm,
  type SubmitHandler,
} from "react-hook-form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Goal } from "@/types/goal";
import { Wallet } from "@/types/wallet";

import { goalService } from "@/services/goal.service";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Form } from "@/components/ui/form";

import { FormInput } from "@/components/forms/form-input";
import { FormSelect } from "@/components/forms/form-select";
import { FormTextarea } from "@/components/forms/form-textarea";
import { SubmitButton } from "@/components/forms/submit-button";

const schema = z.object({
  wallet_id: z.string().min(1),

  amount: z
    .number({
      error: "Amount is required",
    })
    .positive(),

  note: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

interface Props {
  open: boolean;

  onOpenChange: (
    open: boolean
  ) => void;

  goal: Goal | null;

  wallets: Wallet[];

  onSuccess: () => void;
}

export default function AddMoneyDialog({
  open,
  onOpenChange,
  goal,
  wallets,
  onSuccess,
}: Props) {
  const [loading, setLoading] =
    useState(false);

  const form =
    useForm<FormValues>({
      resolver:
        zodResolver(schema),

      defaultValues: {
        wallet_id: "",
        amount: 0,
        note: "",
      },
    });
    const onSubmit: SubmitHandler<FormValues> =
    async (values) => {
      if (!goal) return;

      try {
        setLoading(true);

        const { error } =
          await goalService.addMoneyToGoal({
            goal_id: goal.id,
            wallet_id:
              values.wallet_id,
            amount: values.amount,
            note: values.note,
          });

        if (error) throw error;

        form.reset();

        await onSuccess();

        onOpenChange(false);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

  if (!goal) return null;

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Add Money
          </DialogTitle>
        </DialogHeader>

        <div className="mb-6 rounded-2xl border bg-muted/30 p-4">
          <h3 className="font-semibold">
            {goal.title}
          </h3>

          <p className="mt-2 text-sm text-muted-foreground">
            Saved ₹
            {Number(
              goal.saved_amount
            ).toLocaleString()}
          </p>

          <p className="text-sm text-muted-foreground">
            Target ₹
            {Number(
              goal.target_amount
            ).toLocaleString()}
          </p>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(
              onSubmit
            )}
            className="space-y-6"
          >
            <FormSelect
              control={form.control}
              name="wallet_id"
              label="Wallet"
              placeholder="Select Wallet"
              options={wallets.map(
                (wallet) => ({
                  label: `${wallet.name} (₹${Number(wallet.balance).toLocaleString()})`,
                  value: wallet.id,
                })
              )}
            />

            <FormInput
              control={form.control}
              name="amount"
              label="Amount"
              type="number"
            />

            <FormTextarea
              control={form.control}
              name="note"
              label="Note"
              placeholder="Optional"
            />

            <SubmitButton
              loading={loading}
            >
              Add Money
            </SubmitButton>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}