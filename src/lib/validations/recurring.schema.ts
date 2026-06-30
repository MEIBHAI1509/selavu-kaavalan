import { z } from "zod";

export const recurringSchema = z.object({
  wallet_id: z
    .string()
    .min(1, "Please select a wallet"),

  category_id: z.string().optional(),

  type: z.enum([
    "income",
    "expense",
  ]),

  title: z
    .string()
    .min(2, "Title is required"),

  amount: z
    .number({
      error: "Amount is required",
    })
    .positive(),

  frequency: z.enum([
    "daily",
    "weekly",
    "monthly",
    "yearly",
  ]),

  start_date: z.string(),

  note: z.string().optional(),
});

export type RecurringFormValues =
  z.infer<typeof recurringSchema>;