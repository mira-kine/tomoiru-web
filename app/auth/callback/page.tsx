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

    // Handle error from backend
    if (error) {
      router.push(`/login?error=${encodeURIComponent(error)}`);
      return;
    }

    // Token is required
    if (!token) {
      router.push('/login?error=missing_token');
      return;
    }

    setAuthToken(token);
    router.push('/dashboard');
  }, [searchParams, router]);

  return <Loading />;
}
