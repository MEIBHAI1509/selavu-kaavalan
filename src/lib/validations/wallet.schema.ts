import { z } from "zod";

export const walletSchema = z.object({
  name: z.string().min(2, "Wallet name is required"),

  type: z.string().min(1, "Wallet type is required"),

  balance: z.coerce
    .number()
    .min(0, "Balance cannot be negative"),
});

export type WalletFormInput = z.input<typeof walletSchema>;
export type WalletFormValues = z.output<typeof walletSchema>;