import type { NextAuthConfig } from "next-auth";
import {
  authRoutes,
  DEFAULT_LOGIN_REDIRECT,
  publicRoutes,
} from "@/shared/utils/routes";

export const authConfig: NextAuthConfig = {
  debug: true,
  providers: [],
  pages: {
    signIn: "/login",
    error: "/error",
    signOut: "/signout",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account }) {
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = `${token.id}`;
        session.user.name = token.name;
        session.user.email = `${token.email}`;
      }
      return session;
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isAuthRoute = authRoutes.some((path) =>
        nextUrl.pathname.startsWith(path)
      );

      if (isAuthRoute) {
        if (isLoggedIn) {
          return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
        }
        return true;
      }

      const isPublicRoute = publicRoutes.some((path) =>
        nextUrl.pathname.startsWith(path)
      );

      if (isPublicRoute) {
        return true;
      }
    },
  },
};
