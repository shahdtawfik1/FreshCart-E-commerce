import { z } from "zod";
export const resetCodeSchema = z
  .object({
    resetCode: z.string().nonempty("code is required").min(4,"please enter 4 numbers").min(6,"please enter 7 numbers"),
  })

export type resetCodeFormType = z.infer<typeof resetCodeSchema>;