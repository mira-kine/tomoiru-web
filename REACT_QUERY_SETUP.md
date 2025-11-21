# React Query + Server Components Setup Guide

## Modern Next.js 14 Architecture

This guide shows how to set up the best practice pattern:
- **Server Components** for initial auth checks (fast, secure)
- **React Query** for client-side data fetching (caching, refetching)

---

## Step 1: Install Dependencies

```bash
npm install @tanstack/react-query axios
npm install --save-dev @tanstack/react-query-devtools
```

---

## Step 2: Create Query Provider

**File:** `app/providers/QueryProvider.tsx`

```typescript
'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';

export default function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        // Data stays fresh for 5 minutes
        staleTime: 5 * 60 * 1000,
        // Don't refetch on window focus in dev (annoying)
        refetchOnWindowFocus: process.env.NODE_ENV === 'production',
        // Retry failed requests once
        retry: 1,
        // Cache data for 10 minutes
        gcTime: 10 * 60 * 1000,
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* DevTools only in development */}
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
}
```

---

## Step 3: Update Root Layout

**File:** `app/layout.tsx`

```typescript
import type { Metadata } from "next";
import { Toaster } from 'react-hot-toast';
import QueryProvider from './providers/QueryProvider';
import "./global.css";

export const metadata: Metadata = {
  title: "Tomoiru - Travel to Japan with a friend",
  description: "Your personal Japan travel guide powered by AI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          {children}
          <Toaster position="top-center" />
        </QueryProvider>
      </body>
    </html>
  );
}
```

**Note:** Remove `UserContextProvider` - we're replacing it with React Query!

---

## Step 4: Create React Query Hooks

### Hook 1: useCurrentUser

**File:** `app/hooks/useCurrentUser.ts`

```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { authService, User } from '@/app/services/auth';
import { isAuthenticated } from '@/app/utils/auth';

export function useCurrentUser(initialData?: User) {
  return useQuery({
    queryKey: ['currentUser'],
    queryFn: () => authService.getCurrentUser(),
    enabled: isAuthenticated(), // Only fetch if token exists
    staleTime: 5 * 60 * 1000, // 5 minutes
    initialData, // Use server-fetched data as initial cache
  });
}

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { user_name?: string }) =>
      userService.updateProfile(data),
    onSuccess: (updatedUser) => {
      // Update cache immediately
      queryClient.setQueryData(['currentUser'], updatedUser);
    },
  });
}

// Import userService
import { userService } from '@/app/services/users';
```

### Hook 2: useConversations

**File:** `app/hooks/useConversations.ts`

```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { chatService, Conversation, ConversationDetail } from '@/app/services/chat';

export function useConversations() {
  return useQuery({
    queryKey: ['conversations'],
    queryFn: () => chatService.getConversations(),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

export function useConversation(conversationId: string | null) {
  return useQuery({
    queryKey: ['conversation', conversationId],
    queryFn: () => chatService.getConversation(conversationId!),
    enabled: !!conversationId, // Only fetch if ID exists
    staleTime: 1 * 60 * 1000, // 1 minute
  });
}

export function useCreateConversation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (title: string) => chatService.createConversation(title),
    onSuccess: (newConversation) => {
      // Add to conversations list cache
      queryClient.setQueryData(['conversations'], (old: Conversation[] = []) => [
        newConversation,
        ...old,
      ]);
    },
  });
}

export function useDeleteConversation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (conversationId: string) => chatService.deleteConversation(conversationId),
    onSuccess: (_, deletedId) => {
      // Remove from cache
      queryClient.setQueryData(['conversations'], (old: Conversation[] = []) =>
        old.filter((c) => c.id !== deletedId)
      );
      // Invalidate conversation detail
      queryClient.invalidateQueries({ queryKey: ['conversation', deletedId] });
    },
  });
}
```

### Hook 3: useSendMessage

**File:** `app/hooks/useChat.ts`

```typescript
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { chatService, Message } from '@/app/services/chat';

export function useSendMessage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      message,
      conversationHistory,
      numContextDocs = 3,
    }: {
      message: string;
      conversationHistory: Message[];
      numContextDocs?: number;
    }) => chatService.sendMessage(message, conversationHistory, numContextDocs),

    onSuccess: (response, { message }) => {
      // Optionally invalidate conversations to refetch updated list
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
    },
  });
}
```

---

## Step 5: Create Server-Side Auth Helper

**File:** `app/lib/serverAuth.ts`

```typescript
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export interface User {
  id: string;
  email: string;
  user_name: string | null;
  auth_provider: 'google' | 'email';
  created_at: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

/**
 * Server-side function to get current user
 * Used in Server Components
 */
export async function getCurrentUser(): Promise<User> {
  const cookieStore = cookies();
  const token = cookieStore.get('tomoiru_auth_token')?.value;

  if (!token) {
    redirect('/login');
  }

  try {
    const response = await fetch(`${API_URL}/api/v1/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      // Don't cache in development, cache in production
      cache: process.env.NODE_ENV === 'production' ? 'force-cache' : 'no-store',
    });

    if (!response.ok) {
      redirect('/login');
    }

    return response.json();
  } catch (error) {
    console.error('Failed to fetch user:', error);
    redirect('/login');
  }
}

/**
 * Check if user is authenticated (has valid token)
 * Returns null if not authenticated, user object if authenticated
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
    return null;
  }
}
```

---

## Step 6: Convert Dashboard to Server Component

**File:** `app/dashboard/page.tsx` (Server Component)

```typescript
import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/app/lib/serverAuth';
import DashboardClient from './dashboard-client';
import Image from "next/legacy/image";
import matchaBg from '../../public/assets/matcha-bg.png';

export default async function Dashboard() {
  // Fetch user on server (fast, secure)
  const user = await getCurrentUser();

  // If user hasn't set username, redirect to welcome
  if (!user.user_name) {
    redirect('/welcome');
  }

  return (
    <div className="flex flex-col relative items-center align-center justify-center h-full w-full">
      <div className="absolute inset-0">
        <Image
          src={matchaBg}
          alt="drawn background of matcha color with pink hearts"
          layout="fill"
          className="w-full h-full inset-0 object-cover absolute -z-1"
          priority={true}
        />
      </div>
      {/* Pass server-fetched user to client component */}
      <DashboardClient initialUser={user} />
    </div>
  );
}
```

**File:** `app/dashboard/dashboard-client.tsx` (NEW - Client Component)

```typescript
'use client';

import React, { useState } from 'react';
import { User } from '@/app/services/auth';
import { useCurrentUser } from '@/app/hooks/useCurrentUser';
import AudioPlayer from "../components/Audio/AudioPlayer";
import DashboardCarousel from '../components/DashboardCarousel';
import Help from '../components/Help';

interface DashboardClientProps {
  initialUser: User;
}

export default function DashboardClient({ initialUser }: DashboardClientProps) {
  const [helpView, setHelpView] = useState(false);

  // React Query uses initialUser, refetches in background
  const { data: user } = useCurrentUser(initialUser);

  return (
    <>
      {helpView ? (
        <div className="w-11/12 max-w-6xl rounded-2xl p-4 z-20 flex justify-center">
          <Help />
        </div>
      ) : (
        <>
          <div className="w-11/12 max-w-6xl rounded-2xl p-4 z-20 flex justify-center">
            <DashboardCarousel />
          </div>
          <div className="w-3/12 flex justify-center z-50 absolute left-0 bottom-0 tablet:left-6 ml-28 tablet:ml-8 mb-12 tablet:mb-4">
            <AudioPlayer />
          </div>
        </>
      )}
      <button
        onClick={() => setHelpView(!helpView)}
        className="btn glass shadow-xl bg-white hover:bg-peach text-licorice flex justify-center z-50 absolute bottom-0 right-0 mr-12 mb-12 tablet:mb-4"
      >
        Help
      </button>
    </>
  );
}
```

---

## Step 7: Convert Welcome Page to Server Component

**File:** `app/welcome/page.tsx` (Server Component)

```typescript
import WelcomeInput from "./WelcomeInput";
import Image from "next/legacy/image";
import React from "react";
import { getCurrentUser } from '@/app/lib/serverAuth';

export default async function Welcome() {
  const user = await getCurrentUser();

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div className="absolute inset-0">
        <Image
          src="/assets/welcome-bg.png"
          alt="drawn background of japanese style entrance"
          layout="fill"
          className="w-full h-full inset-0 object-cover absolute"
        />
      </div>
      <div className="flex flex-col w-1/3 z-5 justify-center items-center p-1 wrap rounded-lg mb-1 mt-2">
        <Image
          className="w-full"
          src="/assets/tomomi_open.png"
          width={375}
          height={335}
          alt="tomomi character animating talking"
        />
      </div>
      <WelcomeInput initialUser={user} />
    </div>
  );
}
```

**File:** `app/welcome/WelcomeInput.tsx` (Client Component)

Update to accept `initialUser`:

```typescript
'use client';

import React from "react";
import { User } from '@/app/services/auth';
import { useCurrentUser } from '@/app/hooks/useCurrentUser';
import WelcomeTextBox from "./WelcomeTextBox";

interface WelcomeInputProps {
  initialUser: User;
}

export default function WelcomeInput({ initialUser }: WelcomeInputProps) {
  // React Query will use initialUser and refetch in background
  const { data: user } = useCurrentUser(initialUser);

  return (
    <div className="bg-white z-10 w-3/4 p-4 font-sans text-2xl shadow-lg rounded-lg shadow-licorice/30">
      <div className="flex flex-col wrap">
        <WelcomeTextBox />
      </div>
    </div>
  );
}
```

**File:** `app/welcome/WelcomeTextBox.tsx`

Update to use React Query mutation:

```typescript
"use client";
import React, { useReducer, useState } from "react";
import { welcomeText } from "../data/welcome-text";
import { useRouter } from "next/navigation";
import { useUpdateUser } from "../hooks/useCurrentUser";
import toast from 'react-hot-toast';

export default function WelcomeTextBox() {
  const [userMode, setUserMode] = useState(false);
  const [username, setUsername] = useState("");
  const router = useRouter();

  // Use React Query mutation instead of manual API call
  const updateUser = useUpdateUser();

  const handleWelcome = async (username: string) => {
    try {
      await updateUser.mutateAsync({ user_name: username });
      toast.success(`Welcome, ${username}!`);
    } catch (error) {
      console.error('Error updating username:', error);
      toast.error("Failed to save username. Please try again.");
    }
  };

  // ... rest of component stays the same
  const initialState = { index: 0 };
  function reducer(state: any, action: any) {
    switch (action.type) {
      case "next":
        return { index: state.index + 1 };
      case "stop":
        setUserMode(true);
        return { index: state.index };
      default:
        return { index: state.index };
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  const handleUserInput = () => {
    if (state.index < 2 || state.index >= 3) {
      if (state.index === welcomeText.length - 2) {
        router.push("/dashboard");
        router.refresh();
      }
      dispatch({ type: "next" });
    }
    if (state.index === 1) {
      dispatch({ type: "stop" });
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await handleWelcome(username);
    dispatch({ type: "next" });
    setUserMode(false);
  };

  const textToDisplay =
    state?.index !== undefined && welcomeText
      ? welcomeText[state.index]?.text ?? "Hi"
      : "Hi";

  return (
    <>
      <div className="text-2xl">{textToDisplay}</div>
      {!userMode && (
        <div className="flex justify-end">
          <button
            className="text-licorice border-2 border-white bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-sans font-bold rounded-lg text-sm tablet:text-xl laptop:text-2xl desktop:text-2xl px-5 py-1 text-center mr-2 mb-2 shadow-md w-1/3 laptop:w-1/4"
            onClick={() => {
              handleUserInput();
            }}
          >
            <span>Next</span>
          </button>
        </div>
      )}
      {userMode && (
        <div className="flex flex-col p-1 m-2">
          <form
            className="p-0 m-1 mt-1 flex flex-col items-center"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              aria-label="name"
              name="username"
              placeholder="what would you like to be called?"
              className="ring-peach rounded-lg ring-2 ring-inset m-3 p-2 shadow-md shadow-licorice/30 w-1/2 caret-peach text-md"
              required
            />
            <button
              type="submit"
              disabled={updateUser.isPending}
              className="text-licorice border-2 border-white bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-sans font-bold rounded-lg text-sm tablet:text-xl laptop:text-2xl desktop:text-2xl px-5 py-1 text-center mr-2 mb-2 shadow-md w-1/3 laptop:w-1/4 disabled:opacity-50"
            >
              <span>{updateUser.isPending ? 'Saving...' : 'This is Me!'}</span>
            </button>
          </form>
        </div>
      )}
    </>
  );
}
```

---

## Step 8: Update Chat Page with React Query

**File:** `app/chat/page.tsx` (Server Component)

```typescript
import ChatBox from "./chatbox";
import sakurabg from '../../public/assets/sakura-bg.png';
import Image from "next/legacy/image";
import { getCurrentUser } from '@/app/lib/serverAuth';

export default async function Chat() {
  // Verify user is authenticated
  await getCurrentUser();

  return (
    <div className="flex justify-center align-start w-full h-full">
      <div className="absolute inset-0">
        <Image
          src={sakurabg}
          alt="drawn background of blue background with pink hearts"
          layout="fill"
          className="w-full h-full inset-0 object-cover absolute -z-1"
          priority={true}
        />
      </div>
      <ChatBox />
    </div>
  );
}
```

**File:** `app/chat/chatbox.tsx` (Client Component with React Query)

```typescript
"use client";
import React, { useState, useReducer } from "react";
import { useRouter } from "next/navigation";
import { Message } from "../services/chat";
import { useSendMessage } from '../hooks/useChat';
import toast from 'react-hot-toast';

// ... same reducer and state interfaces as before ...

export default function ChatBox() {
  const [message, setMessage] = useState("");
  const [conversationState, dispatch] = useReducer(conversationReducer, {
    messages: [{ role: 'assistant', content: 'Hi! Ask me anything about Japan!' }],
    loading: false,
  });
  const router = useRouter();

  // Use React Query mutation
  const sendMessage = useSendMessage();

  const handleChat = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!message.trim()) return;

    dispatch({ type: 'ADD_USER_MESSAGE', content: message });
    dispatch({ type: 'TOMOMI_TYPING' });

    const userMessage = message;
    setMessage('');

    try {
      const response = await sendMessage.mutateAsync({
        message: userMessage,
        conversationHistory: conversationState.messages,
        numContextDocs: 3,
      });

      dispatch({ type: 'ADD_TOMOMI_RESPONSE', content: response.response });
    } catch (error: any) {
      console.error('Chat error:', error);
      toast.error('Failed to get response. Please try again.');
      dispatch({
        type: 'ADD_TOMOMI_RESPONSE',
        content: "Sorry, I'm having trouble connecting right now. Please try again!"
      });
    }
  };

  // ... rest of component same as before ...
}
```

---

## Summary: What You Gain

### ✅ Server Components Benefits:
- Fast initial page loads (data fetched on server)
- More secure (JWT validation server-side)
- Better SEO
- No loading spinners on initial render

### ✅ React Query Benefits:
- Automatic caching (fetch once, use everywhere)
- Background refetching keeps data fresh
- Optimistic updates
- Request deduplication
- Built-in loading/error states
- DevTools for debugging

### ✅ No More UserContext:
- ❌ Delete `app/context/UserContextProvider.tsx`
- ❌ No more Provider wrapper needed
- ❌ No prop drilling
- ✅ Components request data when they need it
- ✅ Similar to dependency injection in Python

---

## Next Steps

1. ✅ Install React Query
2. ✅ Set up QueryProvider
3. ✅ Create custom hooks
4. ✅ Convert pages to Server Components
5. ✅ Update client components to use hooks
6. ✅ Delete UserContextProvider
7. ✅ Test the new flow

**This is the modern, industry-standard approach for Next.js 14!** 🚀
