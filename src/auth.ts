// /src/auth.ts
import NextAuth, { type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authConfig = {
  secret: process.env.AUTH_SECRET,
  session: { strategy: "jwt", maxAge: 60 * 60 * 24 * 7 }, // 7 dagen

  providers: [
    Credentials({
      name: "E-mail & wachtwoord",
      credentials: {
        email: { label: "E-mail", type: "email" },
        password: { label: "Wachtwoord", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email?.toString().trim().toLowerCase();
        const password = credentials?.password?.toString() ?? "";
        if (!email || !password) return null;

        // DEMO users — vervang later door DB + hashing
        const users = [
          { id: "1", name: "Dispatch Dani", email: "dispatcher@premium.taxi", password: "Taxi123!", role: "dispatcher" as const },
          { id: "2", name: "Klant Kim",     email: "klant@premium.taxi",      password: "Taxi123!", role: "customer"  as const },
        ];
        const u = users.find(x => x.email === email && x.password === password);
        if (!u) return null;

        return { id: u.id, name: u.name, email: u.email, role: u.role };
      },
    }),
  ],

callbacks: {
  async jwt({ token, user }) {
    if (user) token.role = (user as any).role;
    return token;
  },
  async session({ session, token }) {
    if (session.user) {
      (session.user as any).id = token.sub;      // <— nieuw
      (session.user as any).role = token.role;
    }
    return session;
  },
},
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
