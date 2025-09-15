// middleware.ts
import { NextResponse } from "next/server";
import { auth } from "@/auth";

export default auth((req) => {
  const role = (req.auth?.user as any)?.role;
  if (role !== "ADMIN") {
    return NextResponse.redirect(new URL("/", req.nextUrl.origin));
  }
});

export const config = { matcher: ["/admin/:path*"] };
