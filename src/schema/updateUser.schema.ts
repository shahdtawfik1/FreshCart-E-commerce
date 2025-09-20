import { z } from "zod";
export const updateUserSchema = z
  .object({
    name: z
      .string()
      .nonempty("Name is required")
      .min(3, "Name must be at least 3 characters long")
      .max(20, "Name must be at most 20 characters long"),
    email: z.string().nonempty("Email is required").email("invalid email"),
    phone: z
      .string()
      .nonempty("Phone is required")
      .regex(/^(\+20|00201)?01[0-2,5]{1}[0-9]{8}$/),
  })

export type updateUserFormType = z.infer<typeof updateUserSchema>;