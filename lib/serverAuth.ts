import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export interface User {
  id: string;
  email: string;
  user_name: string | null;
  auth_provider: 'google' | 'email';
  created_at: string;
  updated_at: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
export async function getCurrentUser(): Promise<User> {
  const cookieStore = cookies();
  const token = cookieStore.get('tomoiru_auth_token')?.value;

  if (!token) {
    redirect('/login');
  }

  try {
    const response = await fetch(`${API_URL}/api/v1/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      // Always fetch fresh for security (React Query handles session caching)
      cache: 'no-store',
    });

    if (!response.ok) {
      redirect('/login');
    }

    return response.json();
  } catch (error) {
    console.error('Server auth error:', error);
    redirect('/login');
  }
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
    const response = await fetch(`${API_URL}/api/v1/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      return null;
    }

    return response.json();
  } catch (error) {
    console.error('Server auth check error:', error);
    return null;
  }
}
