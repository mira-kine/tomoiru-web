import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Edge Middleware for JWT Authentication
 *
 * Runs on Vercel Edge before page loads for fast auth checks
 * Protects routes by checking for auth token in cookies
 * Redirects to /login if token is missing on protected routes
 *
 * Note: This is a performance optimization - Server Components
 * still validate the actual JWT token validity
 */
export async function middleware(req: NextRequest) {
  // Check if user has auth token
  const token = req.cookies.get('tomoiru_auth_token')?.value;

  // If no token, redirect to login
  if (!token) {
    const loginUrl = new URL('/login', req.url);
    // Add return URL so we can redirect back after login (future enhancement)
    loginUrl.searchParams.set('return_url', req.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Token exists, allow request to proceed
  // Note: Actual token validation happens in Server Components via getCurrentUser()
  return NextResponse.next();
}

/**
 * Configure which routes this middleware runs on
 *
 * Protected routes requiring authentication:
 * - /dashboard (and all sub-routes)
 * - /chat
 * - /welcome
 * - /food (and all sub-routes)
 * - /fooddiary (and all sub-routes)
 * - /journal (and all sub-routes)
 *
 * Public routes (not protected):
 * - /login
 * - /auth/callback
 * - / (home/landing page)
 */
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/chat',
    '/welcome',
    '/food/:path*',
    '/fooddiary/:path*',
    '/journal/:path*',
  ],
};
