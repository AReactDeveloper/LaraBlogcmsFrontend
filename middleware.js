import { NextResponse } from "next/server";

export function middleware(request) {
  // Check token in cookies
  const token = request.cookies.get("token")?.value;

  // If no token, redirect to login
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Token exists, continue
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
