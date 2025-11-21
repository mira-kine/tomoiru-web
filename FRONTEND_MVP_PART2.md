# Frontend MVP Implementation - Part 2

## Step 7: Update UserContextProvider

**File:** `app/context/UserContextProvider.tsx`

Replace entire file:

```typescript
'use client';
import { useState, useEffect, useContext, createContext } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { authService, User } from '../services/auth';
import { isAuthenticated } from '../utils/auth';

interface UserProps {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  loading: boolean;
}

const UserContext = createContext<UserProps>({
  user: null,
  setUser: () => {},
  loading: true,
});

const UserContextProvider = ({ children }: any) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      // Only fetch if authenticated
      if (!isAuthenticated()) {
        setLoading(false);
        return;
      }

      try {
        const userData = await authService.getCurrentUser();
        setUser(userData);
      } catch (error) {
        console.error('Failed to fetch user:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};

const useUser = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error('useUser must be defined within a UserContext Provider');
  }
  return context;
};

export { UserContextProvider, useUser };
```

---

## Step 8: Update Middleware

**File:** `middleware.ts`

Replace entire file:

```typescript
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('tomoiru_auth_token');
  const { pathname } = req.nextUrl;

  // Public routes that don't require authentication
  const publicRoutes = ['/', '/login', '/about', '/demo', '/auth/callback'];
  const isPublicRoute = publicRoutes.some(route => pathname === route || pathname.startsWith('/auth/'));

  // If user is not authenticated and trying to access protected route
  if (!token && !isPublicRoute) {
    const loginUrl = new URL('/login', req.url);
    return NextResponse.redirect(loginUrl);
  }

  // If user is authenticated and trying to access login page
  if (token && pathname === '/login') {
    const dashboardUrl = new URL('/dashboard', req.url);
    return NextResponse.redirect(dashboardUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|assets).*)',
  ],
};
```

---

## Step 9: Update Welcome Flow

**File:** `app/welcome/WelcomeTextBox.tsx`

Replace the `handleWelcome` function:

```typescript
"use client";
import React, { useReducer, useState } from "react";
import { welcomeText } from "../data/welcome-text";
import { useRouter } from "next/navigation";
import { useUser } from "../context/UserContextProvider";
import { userService } from "../services/users";
import toast from 'react-hot-toast';

export default function WelcomeTextBox() {
  const [userMode, setUserMode] = useState(false);
  const [username, setUsername] = useState("");
  const { user, setUser } = useUser();
  const router = useRouter();

  const handleWelcome = async (username: string) => {
    try {
      const updatedUser = await userService.updateProfile({ user_name: username });
      setUser(updatedUser);
      toast.success(`Welcome, ${username}!`);
    } catch (error) {
      console.error('Error updating username:', error);
      toast.error("Failed to save username. Please try again.");
    }
  };

  // ... rest of the component stays the same
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
              className="text-licorice border-2 border-white bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-sans font-bold rounded-lg text-sm tablet:text-xl laptop:text-2xl desktop:text-2xl px-5 py-1 text-center mr-2 mb-2 shadow-md w-1/3 laptop:w-1/4"
            >
              <span>This is Me!</span>
            </button>
          </form>
        </div>
      )}
    </>
  );
}
```

---

## Step 10: Update Chat Service with PostgreSQL Integration

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

export interface Conversation {
  id: string;
  user_id: string;
  title: string;
  created_at: string;
  updated_at: string;
}

export interface ConversationDetail {
  id: string;
  title: string;
  messages: Message[];
  created_at: string;
  updated_at: string;
}

export const chatService = {
  /**
   * Send message to Tomomi chatbot
   * NOTE: Backend will automatically save this to PostgreSQL
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

  /**
   * Get all conversations for current user (from PostgreSQL)
   */
  getConversations: async (): Promise<Conversation[]> => {
    const response = await apiClient.get<Conversation[]>('/api/v1/conversations/');
    return response.data;
  },

  /**
   * Get a specific conversation with all messages (from PostgreSQL)
   */
  getConversation: async (conversationId: string): Promise<ConversationDetail> => {
    const response = await apiClient.get<ConversationDetail>(`/api/v1/conversations/${conversationId}`);
    return response.data;
  },

  /**
   * Create a new conversation (optional - backend can auto-create)
   */
  createConversation: async (title: string): Promise<Conversation> => {
    const response = await apiClient.post<Conversation>('/api/v1/conversations/', {
      title,
    });
    return response.data;
  },

  /**
   * Delete a conversation and all its messages
   */
  deleteConversation: async (conversationId: string): Promise<void> => {
    await apiClient.delete(`/api/v1/conversations/${conversationId}`);
  },

  /**
   * Update conversation title
   */
  updateConversation: async (conversationId: string, title: string): Promise<Conversation> => {
    const response = await apiClient.patch<Conversation>(`/api/v1/conversations/${conversationId}`, {
      title,
    });
    return response.data;
  },
};
```

---

## Step 11: Update Chat Page with PostgreSQL Chat History

**File:** `app/chat/chatbox.tsx`

Replace entire file:

```typescript
"use client";
import React, { useState, useReducer, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { chatService, Message } from "../services/chat";
import toast from 'react-hot-toast';

interface ConversationState {
  messages: Message[];
  loading: boolean;
  conversationId: string | null;
}

interface UserMessageAction {
  type: 'ADD_USER_MESSAGE';
  content: string;
}

interface TomomiResponseAction {
  type: 'ADD_TOMOMI_RESPONSE';
  content: string;
}

interface TomomiTypingAction {
  type: 'TOMOMI_TYPING';
}

interface LoadConversationAction {
  type: 'LOAD_CONVERSATION';
  messages: Message[];
  conversationId: string;
}

type ConversationAction =
  | UserMessageAction
  | TomomiResponseAction
  | TomomiTypingAction
  | LoadConversationAction;

function conversationReducer(state: ConversationState, action: ConversationAction): ConversationState {
  switch (action.type) {
    case 'ADD_USER_MESSAGE':
      return {
        ...state,
        messages: [...state.messages, { role: 'user', content: action.content }]
      };
    case 'TOMOMI_TYPING':
      return { ...state, loading: true };
    case 'ADD_TOMOMI_RESPONSE':
      return {
        ...state,
        messages: [...state.messages, { role: 'assistant', content: action.content }],
        loading: false
      };
    case 'LOAD_CONVERSATION':
      return {
        ...state,
        messages: action.messages,
        conversationId: action.conversationId,
        loading: false,
      };
    default:
      return state;
  }
}

export default function ChatBox() {
  const [message, setMessage] = useState("");
  const [conversationState, dispatch] = useReducer(conversationReducer, {
    messages: [{ role: 'assistant', content: 'Hi! Ask me anything about Japan!' }],
    loading: false,
    conversationId: null,
  });
  const router = useRouter();
  const searchParams = useSearchParams();

  // Load conversation from URL parameter if provided
  useEffect(() => {
    const conversationId = searchParams.get('conversation_id');

    if (conversationId) {
      loadConversation(conversationId);
    }
  }, [searchParams]);

  const loadConversation = async (conversationId: string) => {
    try {
      const conversation = await chatService.getConversation(conversationId);
      dispatch({
        type: 'LOAD_CONVERSATION',
        messages: conversation.messages,
        conversationId: conversation.id,
      });
    } catch (error) {
      console.error('Failed to load conversation:', error);
      toast.error('Failed to load conversation history');
    }
  };

  const handleChat = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!message.trim()) return;

    // Add user message to conversation
    dispatch({ type: 'ADD_USER_MESSAGE', content: message });
    dispatch({ type: 'TOMOMI_TYPING' });

    const userMessage = message;
    setMessage(''); // Clear input immediately

    try {
      // Send to backend with conversation history
      // Backend will automatically save to PostgreSQL
      const response = await chatService.sendMessage(
        userMessage,
        conversationState.messages,
        3
      );

      // Add Tomomi's response
      dispatch({ type: 'ADD_TOMOMI_RESPONSE', content: response.response });

    } catch (error: any) {
      console.error('Chat error:', error);
      toast.error(error.response?.data?.detail || 'Failed to get response. Please try again.');

      // Add error message to chat
      dispatch({
        type: 'ADD_TOMOMI_RESPONSE',
        content: "Sorry, I'm having trouble connecting right now. Please try again!"
      });
    }
  };

  const handleBack = () => {
    router.push("/dashboard");
  };

  return (
    <div className="flex justify-center items-center w-4/5 h-3/4 absolute bg-licorice/80 rounded-3xl shadow-xl shadow-black mt-32">
      <div className="flex flex-col justify-start items-center relative w-11/12 h-5/6 min-w-[75%] shadow-white bg-black/70 rounded-3xl pb-8">
        <div className="w-full">
          <button className="text-white btn glass ml-6 mt-2" onClick={handleBack}>
            Back
          </button>
        </div>
        <div className="w-11/12 h-full mt-6 bg-white relative rounded-xl p-12 font-sans overflow-y-auto font-bold">
          {conversationState.messages.map((msg, index) => (
            <div
              key={index}
              className={msg.role === 'user' ? "chat chat-end h-1/4 w-full mb-4" : "chat chat-start h-1/4 w-full mb-4"}
            >
              <div className={msg.role === 'user' ? 'chat-bubble bg-periwinkle text-licorice mb-4' : 'chat-bubble bg-grey text-white mb-4'}>
                {msg.content}
              </div>
            </div>
          ))}
          {conversationState.loading && (
            <div className="chat chat-start h-1/4 w-full mb-4">
              <div className="chat-bubble bg-grey">
                <span className="loading loading-dots loading-sm"></span>
              </div>
            </div>
          )}
        </div>
        <form
          className="w-10/12 bg-pink flex justify-start mt-8"
          onSubmit={handleChat}
        >
          <div className="w-full form-control">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              aria-label="user chat input"
              name="query"
              placeholder="write your message here"
              className="rounded-xl w-full p-4 truncate overflow-y-scroll outline color-periwinkle"
              disabled={conversationState.loading}
            />
          </div>
          <button
            type="submit"
            className="text-white btn bg-licorice glass ml-4 p-4"
            disabled={conversationState.loading}
          >
            Ask
          </button>
        </form>
      </div>
    </div>
  );
}
```

---

## Step 12: Update Food Diary to Use Backend PostgreSQL

**Find all Supabase database calls:**
```bash
grep -r "supabase.from" app/ --exclude-dir=node_modules
```

**Common patterns to replace:**

### Old Supabase Pattern:
```typescript
const { data } = await supabase
  .from('food_entries')
  .select()
  .eq('user_id', user.id);
```

### New Backend API Pattern:
```typescript
// Create app/services/food.ts
import apiClient from './api';

export interface FoodEntry {
  id: string;
  user_id: string;
  name: string;
  location: string;
  rating: number;
  notes: string;
  created_at: string;
}

export const foodService = {
  getFoodEntries: async (): Promise<FoodEntry[]> => {
    const response = await apiClient.get<FoodEntry[]>('/api/v1/food/');
    return response.data;
  },

  createFoodEntry: async (entry: Omit<FoodEntry, 'id' | 'user_id' | 'created_at'>): Promise<FoodEntry> => {
    const response = await apiClient.post<FoodEntry>('/api/v1/food/', entry);
    return response.data;
  },

  updateFoodEntry: async (id: string, entry: Partial<FoodEntry>): Promise<FoodEntry> => {
    const response = await apiClient.patch<FoodEntry>(`/api/v1/food/${id}`, entry);
    return response.data;
  },

  deleteFoodEntry: async (id: string): Promise<void> => {
    await apiClient.delete(`/api/v1/food/${id}`);
  },
};
```

---

## Step 13: Update Journal to Use Backend PostgreSQL

**File:** `app/services/journal.ts`

```typescript
import apiClient from './api';

export interface JournalEntry {
  id: string;
  user_id: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export const journalService = {
  getJournalEntries: async (): Promise<JournalEntry[]> => {
    const response = await apiClient.get<JournalEntry[]>('/api/v1/journal/');
    return response.data;
  },

  getJournalEntry: async (id: string): Promise<JournalEntry> => {
    const response = await apiClient.get<JournalEntry>(`/api/v1/journal/${id}`);
    return response.data;
  },

  createJournalEntry: async (entry: { title: string; content: string }): Promise<JournalEntry> => {
    const response = await apiClient.post<JournalEntry>('/api/v1/journal/', entry);
    return response.data;
  },

  updateJournalEntry: async (id: string, entry: { title?: string; content?: string }): Promise<JournalEntry> => {
    const response = await apiClient.patch<JournalEntry>(`/api/v1/journal/${id}`, entry);
    return response.data;
  },

  deleteJournalEntry: async (id: string): Promise<void> => {
    await apiClient.delete(`/api/v1/journal/${id}`);
  },
};
```

---

## Step 14: Find and Update All Supabase Database Calls

**Script to find all Supabase usage:**

```bash
# Find all files with Supabase imports
grep -r "@supabase" app/ --exclude-dir=node_modules -l

# Find all database queries
grep -r "\.from(" app/ --exclude-dir=node_modules -l

# Find all auth calls
grep -r "supabase.auth" app/ --exclude-dir=node_modules -l
```

**Files to update (replace Supabase calls):**
- [ ] `app/food/fooddiary/displayinfo.tsx`
- [ ] `app/hooks/useFood.tsx`
- [ ] `app/journal/page.tsx` (if exists)
- [ ] `app/components/NavBar.tsx` (if has database calls)
- [ ] `app/components/Audio/AudioPlayer.tsx` (if has database calls)
- [ ] Any other files found by grep

**For each file:**
1. Remove `import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"`
2. Import appropriate service from `app/services/`
3. Replace Supabase queries with service method calls
4. Use `useUser()` hook for user data instead of `supabase.auth.getUser()`

---

## Step 15: Backend PostgreSQL Endpoints Checklist

**Verify your backend has these endpoints implemented:**

### User Endpoints (Already documented):
- ✅ GET `/api/v1/users/me` - Get current user
- ✅ PATCH `/api/v1/users/me` - Update user profile

### Chat/Conversation Endpoints (Need to implement if not done):
- [ ] POST `/api/v1/chat/` - Send message (auto-saves to DB)
- [ ] GET `/api/v1/conversations/` - List all conversations for user
- [ ] GET `/api/v1/conversations/{id}` - Get conversation with messages
- [ ] POST `/api/v1/conversations/` - Create new conversation
- [ ] PATCH `/api/v1/conversations/{id}` - Update conversation title
- [ ] DELETE `/api/v1/conversations/{id}` - Delete conversation

### Food Diary Endpoints (Need to implement):
- [ ] GET `/api/v1/food/` - Get all food entries for user
- [ ] POST `/api/v1/food/` - Create food entry
- [ ] PATCH `/api/v1/food/{id}` - Update food entry
- [ ] DELETE `/api/v1/food/{id}` - Delete food entry

### Journal Endpoints (Need to implement):
- [ ] GET `/api/v1/journal/` - Get all journal entries
- [ ] GET `/api/v1/journal/{id}` - Get specific journal entry
- [ ] POST `/api/v1/journal/` - Create journal entry
- [ ] PATCH `/api/v1/journal/{id}` - Update journal entry
- [ ] DELETE `/api/v1/journal/{id}` - Delete journal entry

---

## Step 16: Backend Database Schema for Chat History

**If not already created, add to backend:**

**File:** `app/models/conversation.py`

```python
from sqlalchemy import Column, String, DateTime, ForeignKey, Text, Enum as SQLEnum
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from datetime import datetime
import uuid
import enum

from app.database import Base

class MessageRole(str, enum.Enum):
    USER = "user"
    ASSISTANT = "assistant"

class Conversation(Base):
    """Conversation/chat session"""
    __tablename__ = "conversations"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    title = Column(String, default="New Conversation")
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationship to messages
    messages = relationship("ChatMessage", back_populates="conversation", cascade="all, delete-orphan")
    user = relationship("User")

class ChatMessage(Base):
    """Individual chat message in a conversation"""
    __tablename__ = "chat_messages"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    conversation_id = Column(UUID(as_uuid=True), ForeignKey("conversations.id"), nullable=False)
    role = Column(SQLEnum(MessageRole), nullable=False)
    content = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationship
    conversation = relationship("Conversation", back_populates="messages")
```

**Migration:**
```bash
# In backend directory
alembic revision --autogenerate -m "add conversations and chat_messages tables"
alembic upgrade head
```

---

## Step 17: Install Missing Dependencies

```bash
npm install axios
```

---

## Step 18: Create Missing Directories

```bash
mkdir -p app/services
mkdir -p app/utils
```

---

## Step 19: Quick Testing Checklist

### Backend (must be running first):
```bash
cd /Users/mkine/personal-projects/tomoiru/tomoiru-backend/tomoiru-backend
source venv/bin/activate
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

Verify at: http://localhost:8000/docs

**Test PostgreSQL endpoints:**
- Check /conversations/ endpoints exist
- Check /food/ endpoints exist (if applicable)
- Check /journal/ endpoints exist (if applicable)

### Frontend:
```bash
cd /Users/mkine/personal-projects/tomoiru-web
npm run dev
```

### Test Flow:

**1. Email Signup:**
- Visit http://localhost:3000/login
- Click "Sign Up"
- Enter email: `test@example.com`, password: `password123`
- Should redirect to /welcome
- Enter username
- Click through welcome messages
- Should land on /dashboard

**2. Chat with PostgreSQL storage:**
- From dashboard, navigate to /chat
- Send message: "Where can I find good ramen in Tokyo?"
- Should get response from Tomomi
- Check backend database to verify conversation was saved
- Refresh page - conversation should persist (if you implement loading)

**3. Test conversation history (if implemented):**
- In backend database, check `conversations` and `chat_messages` tables
- Should see your conversation and messages stored

**4. Logout & Login:**
- Clear cookies
- Login again
- Navigate to chat
- Previous conversations should be available (if you implement list view)

---

## Common Issues & Fixes

### Issue: "Cannot find module 'axios'"
**Fix:**
```bash
npm install axios
```

### Issue: Backend conversation endpoints don't exist
**Fix:** Implement conversation routes in backend following the pattern in BACKEND_AUTH_ROUTES.md

### Issue: Chat messages not saving to database
**Fix:** Check backend chat endpoint - modify to save messages to PostgreSQL after generating response

---

## Files That Still Reference Supabase (Must Update)

After completing the above, search for remaining Supabase code:

```bash
grep -r "@supabase" app/ --exclude-dir=node_modules
```

**Update these files to use backend services:**
- [ ] `app/components/NavBar.tsx`
- [ ] `app/components/Audio/AudioPlayer.tsx`
- [ ] `app/food/fooddiary/displayinfo.tsx`
- [ ] `app/hooks/useFood.tsx`
- [ ] `app/dashboard/page.tsx`
- [ ] Any journal-related components

**For each file:**
1. Remove Supabase imports
2. Import appropriate service from `app/services/`
3. Replace database queries with API calls
4. Use `useUser()` hook for user data

---

## Summary: PostgreSQL Migration

✅ **What You're Replacing:**
- ❌ Supabase Auth → ✅ Custom JWT authentication
- ❌ Supabase Database (users) → ✅ PostgreSQL users table
- ❌ Supabase Database (chat) → ✅ PostgreSQL conversations + chat_messages
- ❌ Supabase Database (food) → ✅ PostgreSQL food_entries
- ❌ Supabase Database (journal) → ✅ PostgreSQL journal_entries
- ❌ Supabase Realtime → ✅ Standard REST API calls

✅ **New Architecture:**
```
Frontend (Next.js)
    ↓ (HTTP + JWT)
Backend (FastAPI)
    ↓ (SQL)
PostgreSQL Database
    - users
    - conversations
    - chat_messages
    - food_entries (if applicable)
    - journal_entries (if applicable)
    - documents (RAG data)
```

✅ **Benefits:**
- Single backend handles everything
- No third-party dependency (Supabase)
- Better control over data and logic
- All data in one PostgreSQL database
- Simpler architecture

---

## Next Steps After Migration

1. **Implement Conversation List UI:**
   - Show past conversations in sidebar
   - Click to load conversation
   - New conversation button

2. **Add Features:**
   - Edit conversation titles
   - Delete conversations
   - Search conversations
   - Export conversation as PDF/text

3. **Production Deployment:**
   - Update environment variables
   - Deploy backend with PostgreSQL
   - Deploy frontend
   - Update OAuth redirect URIs

**You're ready to migrate! Start with backend PostgreSQL setup, then update frontend service calls.** 🚀
