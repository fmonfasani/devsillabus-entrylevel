import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import prisma from "@/lib/prisma";

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
        return { id: String(u.id), email: u.email, name: u.name ?? undefined };
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  callbacks: {
    async session({ session, token }) {
      if (session.user) (session.user as any).id = token.sub ?? "";
      return session;
    },
  },
});
