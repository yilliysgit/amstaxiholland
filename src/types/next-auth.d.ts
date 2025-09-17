// src/types/next-auth.d.ts
import { DefaultSession } from "next-auth";

// Eén centrale rol-definitie die je in beide modules hergebruikt
type Role = "dispatcher" | "customer";

declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      role?: Role;
    } & DefaultSession["user"]; // behoudt name/email/image types
  }

  interface User {
    id: string;
    role?: Role;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: Role;
  }
}
