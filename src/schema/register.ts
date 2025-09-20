import { z } from "zod";
export const registerSchema = z
  .object({
    name: z
      .string()
      .nonempty("Name is required")
      .min(3, "Name must be at least 3 characters long")
      .max(20, "Name must be at most 20 characters long"),
    email: z.string().nonempty("Email is required").email("invalid email"),
    password: z
      .string()
      .nonempty("password is required")
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter one number, and be at least 8 characters long"
      ),
    rePassword: z
      .string()
      .nonempty("rePassword is required")
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter one number, and be at least 8 characters long"
      ),
    phone: z
      .string()
      .nonempty("Phone is required")
      .regex(/^(\+20|00201)?01[0-2,5]{1}[0-9]{8}$/),
  })
  .refine((data) => (data.password === data.rePassword ? true : false), {
    path: ["rePassword"],
    error: "Password & rePassword do not match",
  });

export type RegisterFormType = z.infer<typeof registerSchema>;