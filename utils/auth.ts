import Cookies from 'js-cookie';

const TOKEN_KEY = 'tomoiru_auth_token';
const CLIENT_TOKEN_KEY = 'tomoiru_auth_token'; // Client-side accessible token

/**
 * Store JWT token in cookies and localStorage
 *
 * Note: Backend sets httpOnly cookie for server-side requests
 * We also store in a client-accessible location for client-side fetch requests
 */
export const setAuthToken = (token: string): void => {
  console.log('[setAuthToken] ========== START ==========');
  console.log('[setAuthToken] Token received:', token);
  console.log('[setAuthToken] Token type:', typeof token);
  console.log('[setAuthToken] Token length:', token?.length);
  console.log('[setAuthToken] window defined:', typeof window !== 'undefined');

  if (!token) {
    console.error('[setAuthToken] ERROR: Token is empty or undefined!');
    return;
  }

  // Store in client-side accessible cookie
  try {
    Cookies.set(CLIENT_TOKEN_KEY, token, {
      expires: 7,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    });
    console.log('[setAuthToken] Cookie saved');
  } catch (error) {
    console.error('[setAuthToken] Failed to save cookie:', error);
  }

  // Store in localStorage
  if (typeof window !== 'undefined') {
    try {
      console.log('[setAuthToken] Attempting to save to localStorage...');
      localStorage.setItem(TOKEN_KEY, token);
      console.log('[setAuthToken] localStorage.setItem called');

      // Verify it was saved
      const verify = localStorage.getItem(TOKEN_KEY);
      console.log('[setAuthToken] Verification - Token in localStorage:', !!verify);
      console.log('[setAuthToken] Verification - Matches original:', verify === token);
    } catch (error) {
      console.error('[setAuthToken] Failed to save to localStorage:', error);
    }
  } else {
    console.warn('[setAuthToken] window is undefined - cannot use localStorage');
  }

  console.log('[setAuthToken] ========== END ==========');
};

/**
 * Get JWT token from client-accessible storage
 *
 * Note: Backend sets httpOnly cookie which JavaScript cannot read
 * We rely on localStorage for client-side token access
 */
export const getAuthToken = (): string | undefined => {
  console.log('[getAuthToken] Checking localStorage...');

  // Use localStorage (backend's httpOnly cookie can't be read by JS)
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem(TOKEN_KEY) || undefined;
    console.log('[getAuthToken] Token found in localStorage:', !!token);
    if (token) {
      console.log('[getAuthToken] Token preview:', token.substring(0, 20) + '...');
    }
    return token;
  }

  console.log('[getAuthToken] No token found');
  return undefined;
};

export const removeAuthToken = (): void => {
  Cookies.remove(TOKEN_KEY);
  Cookies.remove(CLIENT_TOKEN_KEY);
  if (typeof window !== 'undefined') {
    localStorage.removeItem(TOKEN_KEY);
  }
};

export const isAuthenticated = (): boolean => {
  return !!getAuthToken();
};
