"use client";

import { useEffect, useState } from "react";

import {
  useForm,
  type SubmitHandler,
} from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  goalSchema,
  type GoalFormValues,
} from "@/lib/validations/goal.schema";

import type { Goal } from "@/types/goal";

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

  goal: Goal | null;

  onSuccess: () => void;
}

export default function EditGoalDialog({
  open,
  onOpenChange,
  goal,
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
    useEffect(() => {
        if (!goal) return;
      
        form.reset({
          title: goal.title,
          target_amount: goal.target_amount,
          target_date:
            goal.target_date ?? "",
          color: goal.color,
          icon: goal.icon,
        });
      }, [goal, form]);
      
      const onSubmit: SubmitHandler<
        GoalFormValues
      > = async (values) => {
        if (!goal) return;
      
        try {
          setLoading(true);
      
          const { error } =
            await goalService.updateGoal(
              goal.id,
              values
            );
      
          if (error) throw error;
      
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
          Edit Goal
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
            Save Changes
          </SubmitButton>
        </form>
      </Form>
    </DialogContent>
  </Dialog>
);
}