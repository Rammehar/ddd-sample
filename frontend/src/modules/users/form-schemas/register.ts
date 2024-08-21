import { z } from "zod";

const registerSchema = z.object({
  full_name: z
    .string()
    .min(2, { message: "Minimum two character is required" }),
  email: z.string({ required_error: "Email is required" }).email(),
  password: z.string({ required_error: "Password is required" }).min(8),
});

export { registerSchema };
