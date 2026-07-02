import apiClient from "./api";
import { setAuthToken, removeAuthToken } from "@/utils/auth";

export interface User {
  id: string;
  email: string;
  user_name: string | null; // Set during welcome flow - if null, user needs to complete welcome
  auth_provider: "google" | "email";
  created_at: string;
  updated_at: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  user: User;
}

export const authService = {
  loginWithGoogle: () => {
    const backendUrl = process.env.NEXT_PUBLIC_API_URL;
    window.location.href = `${backendUrl}/api/v1/auth/login/google`;
  },

  demoLogin: async (): Promise<AuthResponse> => {
    const demoEmail = process.env.NEXT_PUBLIC_DEMO_EMAIL;
    const demoKey = process.env.NEXT_PUBLIC_DEMO_KEY;

    if (!demoEmail || !demoKey) {
      throw new Error("Demo credentials not configured");
    }

    const response = await apiClient.post<AuthResponse>("/api/v1/auth/login/email", {
      email: demoEmail,
      password: demoKey,
    });

    if (!response.data.access_token) {
      throw new Error("No access token in response");
    }

    setAuthToken(response.data.access_token);

    return response.data;
  },

  loginWithEmail: async (
    email: string,
    password: string,
  ): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>("/api/v1/auth/login/email", {
      email,
      password,
    });

    if (!response.data.access_token) {
      throw new Error("No access token in response");
    }

    setAuthToken(response.data.access_token);

    return response.data;
  },

  signupWithEmail: async (
    email: string,
    password: string,
  ): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>("/api/v1/auth/signup", {
      email,
      password,
    });

    setAuthToken(response.data.access_token);

    return response.data;
  },

  getCurrentUser: async (): Promise<User> => {
    const response = await apiClient.get<User>("/api/v1/auth/me");
    return response.data;
  },

  logout: () => {
    removeAuthToken();
    window.location.href = "/login";
  },

  refreshToken: async (): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>("/api/v1/auth/refresh");
    setAuthToken(response.data.access_token);
    return response.data;
  },
};
