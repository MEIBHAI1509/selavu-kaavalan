import { z } from "zod";

export const goalSchema = z.object({
  title: z
    .string()
    .min(2, "Goal title is required"),

  target_amount: z
    .number({
      error: "Target amount is required",
    })
    .positive("Target amount must be greater than 0"),

  target_date: z.string().optional(),

  color: z.string(),

  icon: z.string(),
});

export type GoalFormValues =
  z.infer<typeof goalSchema>;