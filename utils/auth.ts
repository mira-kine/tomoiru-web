import Cookies from 'js-cookie';

const CLIENT_TOKEN_KEY = 'tomoiru_auth_token';

/**
 * Store JWT token in a client-readable cookie (read by middleware for
 * route protection) and localStorage (read by the axios client).
 */
export const setAuthToken = (token: string): void => {
  if (!token) return;

  Cookies.set(CLIENT_TOKEN_KEY, token, {
    expires: 7,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  });

  if (typeof window !== 'undefined') {
    localStorage.setItem(CLIENT_TOKEN_KEY, token);
  }
};

export const getAuthToken = (): string | undefined => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(CLIENT_TOKEN_KEY) || undefined;
  }
  return undefined;
};

export const removeAuthToken = (): void => {
  Cookies.remove(CLIENT_TOKEN_KEY);
  if (typeof window !== 'undefined') {
    localStorage.removeItem(CLIENT_TOKEN_KEY);
  }
};

export const isAuthenticated = (): boolean => {
  return !!getAuthToken();
};
