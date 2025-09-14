"use client";
import { signOut } from "next-auth/react";
export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-xl p-6">
      <h1 className="mb-4 text-xl font-semibold">Dashboard</h1>
      <button className="rounded bg-gray-800 px-4 py-2 text-white hover:bg-gray-900"
        onClick={() => signOut({ callbackUrl: "/login" })}>
        Logout
      </button>
    </div>
  );
}
