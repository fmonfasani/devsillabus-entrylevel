"use client";
import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/login" })}
      style={{
        padding: "8px 14px",
        borderRadius: 8,
        border: "1px solid #e5e7eb",
        background: "white",
        cursor: "pointer",
      }}
    >
      Logout
    </button>
  );
}
