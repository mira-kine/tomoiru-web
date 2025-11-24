import Cookies from 'js-cookie';

const TOKEN_KEY = 'tomoiru_auth_token';
const CLIENT_TOKEN_KEY = 'tomoiru_client_token'; // Client-side accessible token

/**
 * Store JWT token in cookies and localStorage
 *
 * Note: Backend sets httpOnly cookie for server-side requests
 * We also store in a client-accessible location for client-side fetch requests
 */
export const setAuthToken = (token: string): void => {
  console.log('[setAuthToken] Saving token...');

  // Store in client-side accessible cookie
  Cookies.set(CLIENT_TOKEN_KEY, token, {
    expires: 7, // 7 days
    secure: process.env.NODE_ENV === 'production', // HTTPS only in production
    sameSite: 'lax', // CSRF protection
    path: '/', // Ensure cookie is accessible on all paths
  });

  // Also store in localStorage as fallback
  if (typeof window !== 'undefined') {
    localStorage.setItem(TOKEN_KEY, token);
  }

  console.log('[setAuthToken] Token saved successfully');
};

/**
 * Get JWT token from client-accessible storage
 */
export const getAuthToken = (): string | undefined => {
  // Try client-side cookie first
  let token = Cookies.get(CLIENT_TOKEN_KEY);

  // Fallback to localStorage
  if (!token && typeof window !== 'undefined') {
    token = localStorage.getItem(TOKEN_KEY) || undefined;
  }

  console.log('[getAuthToken] Token found:', !!token);
  return token;
};

/**
 * Remove JWT token (logout)
 */
export const removeAuthToken = (): void => {
  Cookies.remove(TOKEN_KEY);
  Cookies.remove(CLIENT_TOKEN_KEY);
  if (typeof window !== 'undefined') {
    localStorage.removeItem(TOKEN_KEY);
  }
};

/**
 * Check if user is authenticated (has valid token)
 */
export const isAuthenticated = (): boolean => {
  return !!getAuthToken();
};
