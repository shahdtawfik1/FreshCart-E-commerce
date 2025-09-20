import { z } from "zod";
export const forgetPasswordSchema = z
  .object({
    email: z.string().nonempty("Email is required").email("invalid email"),
  })

export type forgetPasswordFormType = z.infer<typeof forgetPasswordSchema>;