'use client'

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { setAuthToken } from '@/utils/auth';
import Loading from '@/app/loading';

/**
 * OAuth Callback Page
 *
 * Backend redirects here after OAuth with:
 * - Success: /auth/callback?token=JWT_TOKEN
 * - Error: /auth/callback?error=error_message
 *
 * This page saves the token to localStorage and redirects
 */
export default function OAuthCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get('token');
    const error = searchParams.get('error');

    console.log('[OAuth Callback] Processing callback...');
    console.log('[OAuth Callback] Token present:', !!token);
    console.log('[OAuth Callback] Error:', error);

    // Handle error from backend
    if (error) {
      console.error('[OAuth Callback] OAuth error:', error);
      router.push(`/login?error=${encodeURIComponent(error)}`);
      return;
    }

    // Token is required
    if (!token) {
      console.error('[OAuth Callback] No token found in URL');
      router.push('/login?error=missing_token');
      return;
    }

    // Save token to localStorage (for client-side fetch requests)
    console.log('[OAuth Callback] Saving token...');
    setAuthToken(token);

    // Redirect to dashboard
    console.log('[OAuth Callback] Redirecting to dashboard');
    router.push('/dashboard');
  }, [searchParams, router]);

  return <Loading />;
}
