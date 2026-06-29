"use client";

import { useState } from "react";

import {
  useForm,
  type SubmitHandler,
} from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  goalSchema,
  type GoalFormValues,
} from "@/lib/validations/goal.schema";

import { goalService } from "@/services/goal.service";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Form } from "@/components/ui/form";

import { FormInput } from "@/components/forms/form-input";
import { SubmitButton } from "@/components/forms/submit-button";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  userId: string;

  onSuccess: () => void;
}

export default function AddGoalDialog({
  open,
  onOpenChange,
  userId,
  onSuccess,
}: Props) {
  const [loading, setLoading] =
    useState(false);

  const form =
    useForm<GoalFormValues>({
      resolver:
        zodResolver(goalSchema),

      defaultValues: {
        title: "",
        target_amount: 0,
        target_date: "",
        color: "#10b981",
        icon: "Target",
      },
    });
    const onSubmit: SubmitHandler<
    GoalFormValues
  > = async (values) => {
    try {
      setLoading(true);

      const { error } =
        await goalService.createGoal({
          user_id: userId,
          ...values,
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
  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Create Goal
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
              name="title"
              label="Goal Name"
              placeholder="Buy Bike"
            />

            <FormInput
              control={form.control}
              name="target_amount"
              label="Target Amount"
              type="number"
            />

            <FormInput
              control={form.control}
              name="target_date"
              label="Target Date"
              type="date"
            />

            <SubmitButton
              loading={loading}
            >
              Create Goal
            </SubmitButton>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}