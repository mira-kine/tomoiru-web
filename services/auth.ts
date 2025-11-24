import apiClient from './api';
import { setAuthToken, removeAuthToken } from '@/utils/auth';

export interface User {
  id: string;
  email: string;
  user_name: string | null; // Set during welcome flow - if null, user needs to complete welcome
  auth_provider: 'google' | 'email';
  created_at: string;
  updated_at: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  user: User;
}

export const authService = {
  /**
   * Redirect to Google OAuth (backend handles OAuth flow)
   */
  loginWithGoogle: () => {
    const backendUrl = process.env.NEXT_PUBLIC_API_URL;
    window.location.href = `${backendUrl}/api/v1/auth/login/google`;
  },

  /**
   * Login with email and password
   *
   * After login, check user.user_name:
   * - If null → redirect to /welcome
   * - If set → redirect to /dashboard
   */
  loginWithEmail: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/api/v1/auth/login', {
      email,
      password,
    });

    console.log('Login response:', response.data);
    console.log('Access token:', response.data.access_token);

    // Store token in cookies
    setAuthToken(response.data.access_token);

    // Verify token was saved
    const savedToken = document.cookie.split('; ').find(row => row.startsWith('tomoiru_auth_token='));
    console.log('Token saved to cookie:', !!savedToken);
    console.log('Cookie value:', savedToken);

    return response.data;
  },

  /**
   * Sign up with email and password
   *
   * New users always have user_name = null, so they'll go through welcome flow
   */
  signupWithEmail: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/api/v1/auth/signup', {
      email,
      password,
    });

    // Store token in cookies
    setAuthToken(response.data.access_token);

    return response.data;
  },

  /**
   * Get current user profile
   */
  getCurrentUser: async (): Promise<User> => {
    const response = await apiClient.get<User>('/api/v1/users/me');
    return response.data;
  },

  /**
   * Logout user (clear token and redirect)
   */
  logout: () => {
    removeAuthToken();
    window.location.href = '/login';
  },

  /**
   * Refresh token (extends expiration)
   */
  refreshToken: async (): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/api/v1/auth/refresh');
    setAuthToken(response.data.access_token);
    return response.data;
  },
};
