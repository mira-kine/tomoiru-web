import axios, { AxiosResponse } from "axios";
import apiClient from "./api";
import { setAuthToken, removeAuthToken } from "@/utils/auth";
import { API_URL } from "@/lib/config";

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

// The backend runs on Render's free tier and cold starts can take 30-60s,
// well past the client's default 30s timeout. Auth calls get a longer window
// and one retry on timeout/network failure (by then the server is usually up).
const AUTH_TIMEOUT_MS = 90000;

async function postAuth<T>(url: string, body?: object): Promise<AxiosResponse<T>> {
  try {
    return await apiClient.post<T>(url, body, { timeout: AUTH_TIMEOUT_MS });
  } catch (error) {
    if (axios.isAxiosError(error) && !error.response) {
      return await apiClient.post<T>(url, body, { timeout: AUTH_TIMEOUT_MS });
    }
    throw error;
  }
}

export const authService = {
  loginWithGoogle: () => {
    window.location.href = `${API_URL}/api/v1/auth/login/google`;
  },

  demoLogin: async (): Promise<AuthResponse> => {
    const demoEmail = process.env.NEXT_PUBLIC_DEMO_EMAIL;
    const demoKey = process.env.NEXT_PUBLIC_DEMO_KEY;

    if (!demoEmail || !demoKey) {
      throw new Error("Demo credentials not configured");
    }

    const response = await postAuth<AuthResponse>("/api/v1/auth/login/email", {
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
    const response = await postAuth<AuthResponse>("/api/v1/auth/login/email", {
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
    const response = await postAuth<AuthResponse>("/api/v1/auth/signup", {
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
