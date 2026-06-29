import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().min(2),

  icon: z.string(),

  color: z.string(),
});

export type CategoryFormInput = z.input<typeof categorySchema>;
export type CategoryFormValues = z.output<typeof categorySchema>;