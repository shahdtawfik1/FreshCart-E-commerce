import { z } from "zod";

export const orderSchema = z.object({
  shippingAddress: z.object({
    details: z.string().min(4, "details must be at least 4 characters long"),
    phone: z
      .string()
      .nonempty("Phone is required")
      .regex(/^(\+20|00201)?01[0-2,5]{1}[0-9]{8}$/, "Invalid Egyptian phone number"),
    city: z
      .string()
      .nonempty("City is required")
      .min(3, "City must be at least 3 characters long"),
  }),
});

export type orderFormType = z.infer<typeof orderSchema>;
