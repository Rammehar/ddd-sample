import NextAuth, { type DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {};

declare module "next-auth" {
  interface User {}
  interface Session {
    user: ExtendedUser;
  }
}
