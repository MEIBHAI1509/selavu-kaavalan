import { z } from "zod";

export const incomeSchema = z.object({
  wallet_id: z.string().min(1, "Please select a wallet"),

  source: z
    .string()
    .min(2, "Source is required"),

  amount: z
    .number({
      error: "Amount is required",
    })
    .positive("Amount must be greater than 0"),

  note: z.string().optional(),

  income_date: z
    .string()
    .min(1, "Please select a date"),
});

export type IncomeFormValues =
  z.infer<typeof incomeSchema>;