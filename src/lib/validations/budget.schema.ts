import { z } from "zod";

export const budgetSchema = z.object({
    category_id: z
        .string()
        .min(1, "Please select a category"),

    amount: z
        .number({
            error: "Budget amount is required",
        })
        .positive("Budget must be greater than 0"),

    month: z
        .number()
        .min(1)
        .max(12),

    year: z
        .number()
        .min(2024),
});

export type BudgetFormValues =
    z.infer<typeof budgetSchema>;