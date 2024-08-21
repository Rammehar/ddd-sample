"use server";

import { AuthError } from "next-auth";
import { signIn } from "../../../../auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/shared/utils/routes";

export const login = async (
  values: {
    email?: string;
    password?: string;
  },
  callbackUrl?: string | null
) => {
  try {
    await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        case "CallbackRouteError":
          return { error: "Email or password was invalid" };
        default:
          return { error: `Something went wrong` };
      }
    }

    throw error;
  }
};
