import { z } from "zod";

export const expenseSchema = z.object({
  wallet_id: z.string().min(1, "Please select a wallet"),

  category_id: z.string().min(1, "Please select a category"),

  amount: z
  .number({
    error: "Amount is required",
  })
  .positive("Amount must be greater than 0"),

  note: z.string().optional(),

  expense_date: z.string().min(1, "Please select a date"),
});

export type ExpenseFormValues = z.infer<typeof expenseSchema>;