import { z } from "zod";

const loginSchema = z.object({
  email: z.string({ required_error: "Email is required" }).email(),
  password: z.string().min(1, { message: "Password is required" }),
});

export { loginSchema };
