# Frontend MVP Implementation Guide

## Step 1: Test Your Backend First

Before starting frontend work, verify your backend is working:

### 1.1 Start Backend Server
```bash
cd /Users/mkine/personal-projects/tomoiru/tomoiru-backend/tomoiru-backend
source venv/bin/activate
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

### 1.2 Test Endpoints with cURL

**Health Check:**
```bash
curl http://localhost:8000/health
```

**Test Email Signup:**
```bash
curl -X POST http://localhost:8000/api/v1/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "testpassword123"
  }'
```

Expected response:
```json
{
  "access_token": "eyJhbGc...",
  "token_type": "bearer",
  "user": {
    "id": "...",
    "email": "test@example.com",
    "user_name": null,
    "auth_provider": "email",
    "created_at": "..."
  }
}
```

**Test Login:**
```bash
curl -X POST http://localhost:8000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "testpassword123"
  }'
```

**Test Protected Endpoint (Get User):**
```bash
TOKEN="<paste-token-from-above>"

curl http://localhost:8000/api/v1/users/me \
  -H "Authorization: Bearer $TOKEN"
```

**Test Google OAuth (in browser):**
```
http://localhost:8000/api/v1/auth/login/google
```
Should redirect to Google login.

✅ **If all tests pass, proceed to frontend!**

---

## Step 2: Update Frontend Environment Variables

**File:** `.env.local`

Replace all Supabase variables with:
```bash
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_FRONTEND_URL=http://localhost:3000
```

---

## Step 3: Create API Service Layer

### 3.1 Create Base API Client

**File:** `app/services/api.ts`

```typescript
import axios, { AxiosInstance, AxiosError } from 'axios';
import { getAuthToken, removeAuthToken } from '@/app/utils/auth';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 seconds for chat responses
});

// Request interceptor: Add JWT token to all requests
apiClient.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor: Handle 401 errors
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      removeAuthToken();
      if (typeof window !== 'undefined') {
        window.location.href = '/login?error=session_expired';
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
```

### 3.2 Create Auth Service

**File:** `app/services/auth.ts`

```typescript
import apiClient from './api';
import { setAuthToken, removeAuthToken } from '@/app/utils/auth';

export interface User {
  id: string;
  email: string;
  user_name: string | null;
  auth_provider: 'google' | 'email';
  created_at: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  user: User;
}

export const authService = {
  /**
   * Redirect to Google OAuth
   */
  loginWithGoogle: () => {
    const backendUrl = process.env.NEXT_PUBLIC_API_URL;
    window.location.href = `${backendUrl}/api/v1/auth/login/google`;
  },

  /**
   * Login with email and password
   */
  loginWithEmail: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/api/v1/auth/login', {
      email,
      password,
    });

    // Store token
    setAuthToken(response.data.access_token);

    return response.data;
  },

  /**
   * Sign up with email and password
   */
  signupWithEmail: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/api/v1/auth/signup', {
      email,
      password,
    });

    // Store token
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
   * Logout user
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
```

### 3.3 Create User Service

**File:** `app/services/users.ts`

```typescript
import apiClient from './api';
import { User } from './auth';

export const userService = {
  /**
   * Update user profile (e.g., username during welcome flow)
   */
  updateProfile: async (data: { user_name?: string }): Promise<User> => {
    const response = await apiClient.patch<User>('/api/v1/users/me', data);
    return response.data;
  },
};
```

### 3.4 Create Chat Service

**File:** `app/services/chat.ts`

```typescript
import apiClient from './api';

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatRequest {
  message: string;
  conversation_history?: Message[];
  num_context_docs?: number;
}

export interface ChatResponse {
  response: string;
  model: string;
  tokens_used: number;
}

export const chatService = {
  /**
   * Send message to Tomomi chatbot
   */
  sendMessage: async (
    message: string,
    conversationHistory: Message[] = [],
    numContextDocs: number = 3
  ): Promise<ChatResponse> => {
    const response = await apiClient.post<ChatResponse>('/api/v1/chat/', {
      message,
      conversation_history: conversationHistory,
      num_context_docs: numContextDocs,
    });

    return response.data;
  },
};
```

---

## Step 4: Create Auth Utilities

**File:** `app/utils/auth.ts`

```typescript
import Cookies from 'js-cookie';

const TOKEN_KEY = 'tomoiru_auth_token';

/**
 * Store JWT token in cookies
 */
export const setAuthToken = (token: string): void => {
  Cookies.set(TOKEN_KEY, token, {
    expires: 7, // 7 days
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  });
};

/**
 * Get JWT token from cookies
 */
export const getAuthToken = (): string | undefined => {
  return Cookies.get(TOKEN_KEY);
};

/**
 * Remove JWT token
 */
export const removeAuthToken = (): void => {
  Cookies.remove(TOKEN_KEY);
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = (): boolean => {
  return !!getAuthToken();
};
```

---

## Step 5: Create OAuth Callback Page

**File:** `app/auth/callback/page.tsx`

```typescript
'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { setAuthToken } from '@/app/utils/auth';

export default function AuthCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = searchParams.get('token');
    const newUser = searchParams.get('new_user') === 'true';
    const errorParam = searchParams.get('error');

    if (errorParam) {
      setError('Authentication failed. Please try again.');
      setTimeout(() => router.push('/login'), 3000);
      return;
    }

    if (token) {
      // Store token
      setAuthToken(token);

      // Redirect based on user status
      if (newUser) {
        router.push('/welcome');
      } else {
        router.push('/dashboard');
      }
    } else {
      setError('No token received. Please try again.');
      setTimeout(() => router.push('/login'), 3000);
    }
  }, [searchParams, router]);

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-500 text-xl">{error}</p>
          <p className="text-gray-500 mt-2">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="loading loading-spinner loading-lg"></div>
        <p className="mt-4 text-gray-600">Completing sign in...</p>
      </div>
    </div>
  );
}
```

---

## Step 6: Update Login Page

**File:** `app/login/page.tsx`

Replace entire file with:

```typescript
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/legacy/image";
import toast from 'react-hot-toast';
import { authService } from '../services/auth';

export default function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState<boolean>(false);
  const [view, setView] = useState<"signin" | "signup">("signin");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await authService.loginWithEmail(email, password);

      toast.success("Welcome back!");

      // Redirect based on whether user has completed welcome flow
      if (response.user.user_name) {
        router.push("/dashboard");
      } else {
        router.push("/welcome");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.detail || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await authService.signupWithEmail(email, password);

      toast.success("Account created successfully!");

      // New users always go to welcome flow
      router.push("/welcome");
    } catch (error: any) {
      toast.error(error.response?.data?.detail || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    authService.loginWithGoogle();
  };

  return (
    <div className="flex relative items-center align-center justify-center h-full w-full">
      <div className="absolute inset-0">
        <Image
          src="/assets/auth_background.jpg"
          alt="drawn background of the sky"
          layout="fill"
          className="w-full h-full inset-0 object-cover absolute -z-1"
          priority={true}
        />
      </div>
      <div className="flex flex-col items-center justify-center m-2 h-3/4 tablet:h-full w-5/6 tablet:w-11/12 z-30">
        <div className="flex flex-col align-center justify-center wrap m-2 h-5/6 tablet:h-full laptop:h-5/6 w-5/6">
          <div className="flex flex-col justify-between wrap align-center mt-1 p-2 bg-melon drop-shadow-lg rounded-xl opacity-80 p-4 items-center w-full tablet:h-3/4 tablet:justify-center laptop:h-full laptop:p-4">
            <div className="flex flex-col justify-center p-2 items-center wrap tablet:m-8">
              {view === "signin" ? (
                <>
                  <span className="text-5xl tablet:text-8xl laptop:text-9xl p-2 font-script flex">
                    Welcome
                  </span>
                  <span className="text-5xl tablet:text-8xl laptop:text-9xl p-2 font-script">
                    Back
                  </span>
                </>
              ) : (
                <>
                  <span className="text-5xl tablet:text-8xl laptop:text-9xl p-1 font-script flex">
                    Glad you
                  </span>
                  <span className="text-5xl tablet:text-8xl laptop:text-9xl p-1 font-script">
                    are here
                  </span>
                </>
              )}
            </div>

            {/* Google Sign In Button */}
            <button
              onClick={handleGoogleSignIn}
              className="flex items-center justify-center gap-2 text-licorice border-2 border-white bg-white hover:bg-gray-100 font-sans font-bold rounded-lg text-md tablet:text-xl px-6 py-3 mb-4 shadow-lg"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Sign in with Google
            </button>

            <div className="text-gray-600 mb-2">or</div>

            <form
              onSubmit={view === "signin" ? handleSignIn : handleSignUp}
              className="flex flex-col m-2 justify-center content-center wrap items-center w-5/6"
            >
              <div className="m-2 w-full text-md tablet:text-xl max-w-lg">
                <input
                  value={email}
                  type="email"
                  name="email"
                  aria-label="Email"
                  autoComplete="off"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="p-2 m-2 w-11/12 tablet:w-full text-md tablet:text-xl shadow-lg shadow-licorice/20"
                  required
                />
              </div>
              <div className="m-2 w-full text-md tablet:text-xl flex items-center max-w-lg relative">
                <input
                  value={password}
                  type={visible ? "text" : "password"}
                  name="password"
                  aria-label="Password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="p-2 m-2 w-full tablet:pr-11 text-md tablet:text-xl shadow-lg shadow-licorice/20"
                  required
                  minLength={8}
                />
                <span
                  className="text-licorice hover:text-melon hover:cursor-pointer absolute right-4 z-12"
                  onClick={() => setVisible(!visible)}
                >
                  {visible ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                  )}
                </span>
              </div>
              <div className="p-3 flex flex-col">
                {view === "signin" && (
                  <>
                    <button
                      type="submit"
                      disabled={loading}
                      className="text-licorice border-2 border-white bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-sans font-bold rounded-lg text-md tablet:text-xl laptop:text-2xl desktop:text-2xl px-5 py-2.5 text-center mr-2 mb-2 shadow-lg shadow-licorice/20 disabled:opacity-50"
                    >
                      {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                    <div className="flex">
                      <span className="p-1">Don&apos;t have an account?</span>
                      <button
                        type="button"
                        onClick={() => setView("signup")}
                        className="underline hover:text-white p-1"
                      >
                        Sign Up
                      </button>
                    </div>
                  </>
                )}
                {view === "signup" && (
                  <>
                    <button
                      type="submit"
                      disabled={loading}
                      className="text-licorice border-2 border-white bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-sans font-bold rounded-lg text-md tablet:text-xl laptop:text-2xl desktop:text-2xl px-5 py-2.5 text-center mr-2 mb-2 shadow-md shadow-licorice/20 disabled:opacity-50"
                    >
                      {loading ? 'Creating account...' : 'Sign Up'}
                    </button>
                    <div className="flex">
                      <span className="p-1">Already have an account?</span>
                      <button
                        type="button"
                        onClick={() => setView("signin")}
                        className="underline hover:text-white p-1"
                      >
                        Sign In
                      </button>
                    </div>
                  </>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
```

---

**Continue in next message for Steps 7-10...**
