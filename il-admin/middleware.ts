import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const pathname = req.nextUrl.pathname;

  const publicRoutes = ["/api/auth/login", "/api/auth/register"];
  const authRoutes = ["/login"];

  // Allow API auth routes
  if (publicRoutes.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // Check if user has valid token
  let isAuthenticated = false;
  if (token) {
    try {
      jwt.verify(token, process.env.JWT_SECRET!);
      isAuthenticated = true;
    } catch (error) {
      // Invalid token - clear it
      const response = NextResponse.redirect(new URL("/login", req.url));
      response.cookies.delete("token");
      if (!authRoutes.includes(pathname)) {
        return response;
      }
    }
  }

  // If user is authenticated and trying to access auth routes (like /login), redirect to dashboard
  if (isAuthenticated && authRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // If user is not authenticated and trying to access protected routes, redirect to login
  if (!isAuthenticated && !authRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
