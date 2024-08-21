import NextAuth from "next-auth";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import bcrypt from "bcrypt";
import Credentials from "next-auth/providers/credentials";
import clientPromise from "@/shared/lib/db";
import { authConfig } from "./auth.config";

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: process.env.SECRET,
  trustHost: true,
  adapter: MongoDBAdapter(clientPromise),
  ...authConfig,
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Ensure credentials exist and have the required fields
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        const client = await clientPromise;
        const db = client.db();
        const user = await db
          .collection("users")
          .findOne({ email: credentials.email });

        if (
          user &&
          bcrypt.compareSync(`${credentials.password}`, user.password)
        ) {
          return {
            id: user._id.toHexString(),
            name: user.full_name,
            email: user.email,
          };
        } else {
          return null;
        }
      },
    }),
  ],
});
