import { z } from "zod";
export const resetPasswordSchema = z
  .object({
    email: z.string().nonempty("Email is required").email("invalid email"),
    newPassword: z
      .string()
      .nonempty("password is required")
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number and be at least 8 characters long"
      ),
  })

export type resetPasswordFormType = z.infer<typeof resetPasswordSchema>;