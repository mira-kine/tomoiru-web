import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

/**
 * OAuth Callback Handler
 *
 * After successful OAuth authentication with backend:
 * 1. Backend redirects here with JWT token in query params
 * 2. We save the token to httpOnly cookies
 * 3. Redirect to dashboard (or welcome if user_name is null)
 *
 * URL format from backend:
 * http://localhost:3000/auth/callback?token=JWT_TOKEN_HERE&error=optional_error
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const token = searchParams.get('token');
  const error = searchParams.get('error');

  // Handle OAuth error from backend
  if (error) {
    console.error('OAuth error:', error);
    return NextResponse.redirect(
      new URL(`/login?error=${encodeURIComponent(error)}`, request.url)
    );
  }

  // Token is required
  if (!token) {
    return NextResponse.redirect(
      new URL('/login?error=missing_token', request.url)
    );
  }

  // Save token to httpOnly cookie (more secure than client-side cookie)
  const cookieStore = cookies();
  cookieStore.set('tomoiru_auth_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days (matches backend JWT expiration)
    path: '/',
  });

  // TODO: Check if user needs welcome flow (user_name === null)
  // For now, always redirect to dashboard
  // Future: Fetch user data and conditionally redirect to /welcome
  return NextResponse.redirect(new URL('/dashboard', request.url));
}
