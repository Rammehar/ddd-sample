"use server";

import bcrypt from "bcrypt";
import { z } from "zod";

import { registerSchema } from "../form-schemas/register";
import clientPromise from "@/shared/lib/db";

export async function registerUser(data: z.infer<typeof registerSchema>) {
  const result = registerSchema.safeParse(data);

  if (result.success === false) {
    return {
      errors: result.error.format(),
    };
  }

  const { full_name, email, password } = result.data;

  try {
    const client = await clientPromise;
    const db = client.db();

    // Check if the user already exists
    const existingUser = await db.collection("users").findOne({ email });
    if (existingUser) {
      return {
        errors: { email: "Email already exists" },
      };
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user
    await db.collection("users").insertOne({
      full_name,
      email,
      password: hashedPassword,
    });

    return {
      success: true,
    };
  } catch (err) {
    return {
      errors: { server: `${err}` },
    };
  }
}
