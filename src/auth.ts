import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import prisma from "@/lib/prisma";
import { Role } from "@prisma/client";

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth({
  providers: [
    Credentials({
      credentials: { email: {}, password: {} },
      authorize: async (c) => {
        const email = c?.email as string | undefined;
        const password = c?.password as string | undefined;
        if (!email || !password) return null;
        const u = await prisma.user.findUnique({ where: { email } });
        if (!u) return null;
        if (!(await compare(password, u.passwordHash))) return null;
        return {
          id: String(u.id),
          email: u.email,
          name: u.name ?? undefined,
          role: u.role as Role,
        };
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) (token as any).role = (user as any).role;
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.sub ?? "";
        (session.user as any).role = (token as any).role as Role;
      }
      return session;
    },
  },
});
