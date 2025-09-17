"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import Logo from "@/app/assets/Logo/Logo"; // ✅ default import

export default function DashboardHeader() {
  const { data: session, status } = useSession();

  return (
    <header className="flex items-center justify-between px-4 py-3 border-b bg-gray-50">
        
     <Logo href="/dashboard" className="w-auto h-12" variant="default" label="Logo" />


      {status === "loading" && <span className="text-sm">...</span>}

      {session ? (
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">
            Hallo, {session.user?.name ?? "gebruiker"}
            {session.user?.role ? ` · ${session.user.role}` : ""}
          </span>

          {session.user?.role === "dispatcher" && (
            <Link href="/dashboard/dispatch" className="text-sm text-blue-600 hover:underline">
              Dispatch
            </Link>
          )}

          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="rounded bg-gray-800 px-3 py-1 text-sm text-white hover:bg-gray-700"
          >
            Logout
          </button>
        </div>
      ) : (
        <Link href="/login" className="rounded bg-blue-600 px-3 py-1 text-sm text-white">
          Login
        </Link>
      )}
    </header>
  );
}
