import Cookies from 'js-cookie';

const TOKEN_KEY = 'tomoiru_auth_token';

/**
 * Store JWT token in cookies
 */
export const setAuthToken = (token: string): void => {
  Cookies.set(TOKEN_KEY, token, {
    expires: 7, // 7 days
    secure: process.env.NODE_ENV === 'production', // HTTPS only in production
    sameSite: 'lax', // CSRF protection
  });
};

/**
 * Get JWT token from cookies
 */
export const getAuthToken = (): string | undefined => {
  return Cookies.get(TOKEN_KEY);
};

/**
 * Remove JWT token (logout)
 */
export const removeAuthToken = (): void => {
  Cookies.remove(TOKEN_KEY);
};

/**
 * Check if user is authenticated (has valid token)
 */
export const isAuthenticated = (): boolean => {
  return !!getAuthToken();
};
