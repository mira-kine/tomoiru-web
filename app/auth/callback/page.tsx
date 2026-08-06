'use client'

import { Suspense, useEffect } from 'react';
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
 * This page saves the token to localStorage and redirects.
 * useSearchParams requires a Suspense boundary, so the param-reading logic
 * lives in an inner component wrapped by the default export.
 */
function OAuthCallbackInner() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get('token');
    const error = searchParams.get('error');

    if (error) {
      router.push(`/login?error=${encodeURIComponent(error)}`);
      return;
    }

    if (!token) {
      router.push('/login?error=missing_token');
      return;
    }

    setAuthToken(token);
    router.push('/dashboard');
  }, [searchParams, router]);

  return <Loading />;
}

export default function OAuthCallback() {
  return (
    <Suspense fallback={<Loading />}>
      <OAuthCallbackInner />
    </Suspense>
  );
}
