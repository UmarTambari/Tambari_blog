import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "@/lib/auth";

/**
 * Middleware runs BEFORE every request
 * We use it to check if user is logged in before accessing admin pages
 */
export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Public routes that don't need authentication
  const isPublicRoute = path === "/admin/login" || path === "/admin/setup";

  // Get the session token from cookies
  const token = request.cookies.get("admin_session")?.value;

  // Verify if token is valid
  const session = token ? await verifyToken(token) : null;

  // If trying to access admin pages without being logged in
  if (path.startsWith("/admin") && !isPublicRoute && !session) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  // If already logged in and trying to access login page, redirect to dashboard
  if (isPublicRoute && session) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  // Allow the request to continue
  return NextResponse.next();
}

/**
 * Configure which routes this middleware should run on
 * Here we're saying: run on all /admin routes
 */
export const config = {
  matcher: ["/admin/:path*"],
};