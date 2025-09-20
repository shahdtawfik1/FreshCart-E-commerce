import { z } from "zod";
export const changePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .nonempty("old password is required")
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number and be at least 8 characters long"
      ),
    password: z
      .string()
      .nonempty("password is required")
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number and be at least 8 characters long"
      ),
    rePassword: z
      .string()
      .nonempty("confirm is required")
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number and be at least 8 characters long"
      ),
  })
  .refine((data) => (data.password === data.rePassword ? true : false), {
    path: ["rePassword"],
    error: "Password & rePassword do not match",
  });

export type changePasswordFormType = z.infer<typeof changePasswordSchema>;
