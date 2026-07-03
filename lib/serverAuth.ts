import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { API_URL } from '@/lib/config';

export interface User {
  id: string;
  email: string;
  user_name: string | null;
  auth_provider: 'google' | 'email';
  created_at: string;
  updated_at: string;
}

async function fetchMe(token: string): Promise<Response> {
  return fetch(`${API_URL}/api/v1/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    // Always fetch fresh for security (React Query handles session caching)
    cache: 'no-store',
  });
}

export async function getCurrentUser(): Promise<User> {
  const cookieStore = cookies();
  const token = cookieStore.get('tomoiru_auth_token')?.value;

  if (!token) {
    redirect('/login');
  }

  let response: Response;
  try {
    response = await fetchMe(token);
  } catch (error) {
    // Network failure (e.g. backend cold start) - the user may still have a
    // valid session, so surface the error instead of bouncing to /login.
    console.error('Server auth error:', error);
    throw new Error('Could not reach the server. Please try again in a moment.');
  }

  if (!response.ok) {
    redirect('/login');
  }

  return response.json();
}

/**
 * Check if user is authenticated without throwing redirect
 *
 * Useful for optional auth checks where you want to handle
 * unauthenticated state differently
 *
 * @returns User object if authenticated, null if not
 */
export async function getAuthenticatedUser(): Promise<User | null> {
  const cookieStore = cookies();
  const token = cookieStore.get('tomoiru_auth_token')?.value;

  if (!token) {
    return null;
  }

  try {
    const response = await fetchMe(token);

    if (!response.ok) {
      return null;
    }

    return response.json();
  } catch (error) {
    console.error('Server auth check error:', error);
    return null;
  }
}
