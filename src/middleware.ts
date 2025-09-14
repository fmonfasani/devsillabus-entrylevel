import { NextResponse } from "next/server";
import { auth } from "@/auth";
export { auth as middleware } from "@/auth";


export default auth((req) => {
  if (!req.auth) {
    const url = new URL("/login", req.nextUrl.origin);
    url.searchParams.set("callbackUrl", req.nextUrl.pathname);
    return NextResponse.redirect(url);
  }
});
export const config = { matcher: ["/dashboard/:path*", "/admin/:path*"] };
