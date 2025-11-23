# Tomoiru Frontend Migration Progress

**Status:** Ready for Testing ✅
**Date:** 2025-11-23
**Migration:** Supabase → Custom FastAPI Backend with JWT Auth

---

## 🎯 What We Accomplished

### ✅ Phase 1: Core Infrastructure (COMPLETED)

**1. Environment Configuration**
- Updated `.env.local` with backend URLs
- Commented out Supabase variables (kept for reference)
- Backend: `http://localhost:8000`
- Frontend: `http://localhost:3000`

**2. Service Layer (All files in root-level directories)**
- ✅ `utils/auth.ts` - Token management with js-cookie (7-day expiration, sameSite: lax)
- ✅ `services/api.ts` - Axios client with JWT interceptors
  - Auto-injects Bearer token on requests
  - Auto-logout on 401 responses
  - TODO: Save progress before redirect (commented in code)
- ✅ `services/auth.ts` - Authentication methods
  - Email/password login & signup
  - Google OAuth redirect
  - getCurrentUser, logout, refreshToken
- ✅ `services/users.ts` - User profile updates (username setting)
- ✅ `services/chat.ts` - Chat with Tomomi
  - **Role transformation**: Frontend uses "tomomi", transforms to "assistant" for backend
  - Non-streaming endpoint (streaming handled separately in chatbox)

**3. Server-Side Helpers**
- ✅ `lib/serverAuth.ts` - Server Component auth
  - `getCurrentUser()` - Auto-redirects to /login if not authenticated
  - `getAuthenticatedUser()` - Returns null instead of redirecting
  - Uses `cache: 'no-store'` for security (always fresh data)

**4. React Query Setup**
- ✅ `app/providers/QueryProvider.tsx` - Client-side data fetching wrapper
  - 5 min stale time
  - 10 min garbage collection
  - Dev tools in development only
- ✅ `hooks/useCurrentUser.ts` - User data queries
  - `useCurrentUser()` - Query with 5min cache
  - `useUpdateUser()` - Mutation with optimistic updates
- ✅ `hooks/useChat.ts` - Chat mutation hook
  - `useSendMessage()` - Mutation for sending messages
  - Default: 3 context docs for RAG

**5. Edge Middleware (Performance Optimization)**
- ✅ `middleware.ts` - Fast auth checks at the edge
  - Checks for token cookie before page loads
  - Redirects to /login if no token
  - Protected routes: /dashboard, /chat, /welcome, /food, /fooddiary, /journal
  - Server Components still validate actual JWT

---

### ✅ Phase 2: Pages & Components (COMPLETED)

**1. Authentication Flow**
- ✅ `app/login/page.tsx` - Complete rewrite
  - Email/password signin & signup
  - Google OAuth button with official branding
  - Loading states, error handling
  - Proper form validation
  - Modern TypeScript with FormEvent
- ✅ `app/auth/callback/route.ts` - OAuth callback handler
  - Saves JWT to httpOnly cookie
  - Redirects to /dashboard
  - TODO: Check user_name and redirect to /welcome if null

**2. Main Pages**
- ✅ `app/dashboard/page.tsx` - Server Component pattern
  - Server-side auth check with `getCurrentUser()`
  - Removed Supabase, uses new auth system
- ✅ `app/welcome/WelcomeTextBox.tsx` - Username collection
  - Uses `useUpdateUser()` mutation
  - Toast notifications for success/error
  - Loading states with disabled inputs
  - Validation for empty username
- ✅ `app/chat/chatbox.tsx` - **Streaming chat with Tomomi**
  - **useReducer for streaming state management** (NOT removed!)
  - Real-time streaming display with ReadableStream API
  - Role transformation: Frontend "tomomi" ↔ Backend "assistant"
  - Auto-scroll to bottom as messages arrive
  - Calls `/api/v1/chat/stream` endpoint
  - Error handling with session expiration detection

**3. Components**
- ✅ `app/components/NavBar.tsx` - Navigation & logout
  - Uses `useCurrentUser()` React Query hook
  - Calls `authService.logout()` for sign out
  - Removed Supabase client
- ✅ `app/unauthenticated/page.tsx` - Unauthenticated message
  - Server Component with `getAuthenticatedUser()`
  - Nice UI with "Go to Login" button
  - Auto-redirects if authenticated

**4. Layout**
- ✅ `app/layout.tsx` - Root layout
  - Wrapped with `<QueryProvider>`
  - Removed `UserContextProvider`
  - Modern TypeScript with props interface

**5. Configuration**
- ✅ `next.config.cjs` - Cleaned up
  - Removed Supabase storage hostname
  - Using local images from `/public`
  - TODO: Add backend image endpoint when implemented

---

### ⏸️ Phase 3: Post-MVP Features (ON HOLD)

**Waiting for Backend Endpoints:**

These files have been updated to comment out Supabase, but need backend APIs:

1. **Food Features**
   - `app/hooks/useFood.tsx` - Food recommendations list
   - `app/food/foodrecs/displayinfo.tsx` - Add to wishlist
   - Backend needs: `GET /api/v1/food/recommendations`, `POST /api/v1/food/wishlist`

2. **Audio Features**
   - `app/components/Audio/AudioPlayer.tsx` - Music player
   - `app/dashboard/audio.tsx` - Dashboard audio
   - Backend needs: `GET /api/v1/audio/tracks` or CDN integration

**Status:** All marked with `// TODO: Re-enable after backend endpoints are built`

---

## 🔑 Key Technical Decisions & Tradeoffs

### 1. **Directory Structure: Root-Level (Industry Standard)**
**Decision:** services/, lib/, utils/, hooks/ at root level
**Why:** Shared code should be accessible everywhere, not under app/ (which is for routes)
**Tradeoff:** ✅ Industry standard, clear separation

### 2. **Cache Strategy: 'no-store' for Auth**
**Decision:** Server Components always fetch fresh user data
**Why:** Security - don't cache sensitive auth data
**How it works:**
- Server Component: Fetches fresh on page navigation (cache: 'no-store')
- React Query: Caches on client for 5 minutes during session
**Tradeoff:** ✅ Secure, ❌ Slightly more DB calls (acceptable for MVP)

### 3. **Tomomi Branding: Role Transformation Layer**
**Decision:** Frontend always uses "tomomi", transforms to "assistant" for backend
**Why:** Consistent branding, backend compatibility with OpenAI format
**Implementation:**
- `services/chat.ts`: toBackendMessages() and toFrontendMessages()
- `chatbox.tsx`: Transforms on send, displays as "tomomi"
**Tradeoff:** ✅ Clean separation, minimal overhead

### 4. **Streaming: Keep useReducer Pattern**
**Decision:** Use useReducer for streaming state management
**Why:** Complex state (messages, responseContent, loading) perfect for reducer
**Note:** React Query doesn't handle streaming well - direct fetch with ReadableStream
**Tradeoff:** ✅ Real-time display, proper error handling

### 5. **Middleware: Edge Optimization (User Requested)**
**Decision:** Implement edge middleware for auth checks
**Why:** Faster redirects, catches unauthenticated users before page loads
**How:**
- Middleware: Quick cookie check at edge
- Server Components: Full JWT validation
**Tradeoff:** ✅ Performance boost, ❌ One more piece to maintain

### 6. **Token Storage: Client-side Cookie (not httpOnly)**
**Decision:** Use js-cookie for client-side token storage
**Why:** Need to access token in axios interceptors (client-side)
**Security:** sameSite: 'lax', secure in production, 7-day expiration
**Tradeoff:** ❌ Slightly less secure than httpOnly, ✅ Required for client API calls

### 7. **Incremental Migration (Option 3)**
**Decision:** Update auth now, food/audio later
**Why:** MVP focus - get auth working first, add features incrementally
**Status:** Auth complete and ready to test
**Tradeoff:** ✅ Faster MVP delivery, clear milestones

---

## 🧪 Ready to Test

### Test Checklist

**Prerequisites:**
- ✅ Backend running at `http://localhost:8000`
- ✅ Frontend built successfully (no TypeScript errors)
- ⏳ Frontend dev server: `npm run dev` (port 3000)

**Test Flows:**

1. **Email Signup Flow**
   - Navigate to http://localhost:3000/login
   - Click "Sign Up"
   - Enter email + password (min 8 chars)
   - Should: Create account → Redirect to /welcome → Set username → /dashboard

2. **Email Login Flow**
   - Navigate to http://localhost:3000/login
   - Enter existing email + password
   - Should: Login → Redirect to /dashboard (if username exists) or /welcome (if not)

3. **Google OAuth Flow**
   - Navigate to http://localhost:3000/login
   - Click "Sign in with Google"
   - Should: Redirect to Google → Backend → /auth/callback → /dashboard

4. **Welcome Flow (Username)**
   - New user after signup
   - Should see animated welcome messages
   - Enter preferred name
   - Should: Save to backend → Update React Query cache → Redirect to /dashboard

5. **Chat with Tomomi**
   - Navigate to /chat (requires auth)
   - Send message: "Where can I find ramen in Tokyo?"
   - Should:
     - Show loading dots
     - Stream response in real-time
     - Display Tomomi's response with RAG context
     - Maintain conversation history

6. **Logout Flow**
   - Click hamburger menu
   - Click "Sign out"
   - Should: Remove token → Redirect to /login

7. **Protected Routes (Middleware)**
   - Try accessing /dashboard without login
   - Should: Middleware catches → Redirect to /login with return_url

8. **Session Expiration**
   - Wait 7 days (or manually delete cookie)
   - Make any API call
   - Should: 401 error → Auto-logout → Redirect to /login?error=session_expired

---

## 📋 Next Steps (After Testing)

### Immediate (If tests pass):
1. Fix any bugs found during testing
2. Test on different browsers
3. Test Google OAuth end-to-end

### Phase 4 (Backend Development Needed):
1. Build backend food recommendation endpoints
2. Build backend audio/music endpoints
3. Uncomment and update food/audio features
4. Test food wishlist functionality
5. Test audio player

### Phase 5 (Production Prep):
1. Update OAuth callback to check user_name and redirect to /welcome if null
2. Implement "save progress before logout" (TODO in services/api.ts)
3. Add conversation persistence (backend + frontend)
4. Add streaming fallback for non-streaming endpoint
5. Add rate limiting UI feedback
6. Optimize images (install sharp: `npm i sharp`)
7. Set up production environment variables
8. Configure production OAuth redirect URLs
9. Add error monitoring (Sentry, LogRocket, etc.)
10. Performance testing and optimization

---

## 🐛 Known TODOs in Code

Search codebase for these TODO comments:

1. **services/api.ts** - Line ~35
   - TODO: Save user progress before auto-logout redirect
   - Suggestion: localStorage draft messages, current route

2. **app/auth/callback/route.ts** - Line ~44
   - TODO: Check if user needs welcome flow (user_name === null)
   - Currently always redirects to /dashboard

3. **services/chat.ts** - Lines 95-140
   - Future conversation management methods (commented out)
   - Uncomment when backend implements these endpoints

4. **app/food/foodrecs/displayinfo.tsx** - Line 24
   - TODO: Implement with backend API for food wishlist

5. **app/hooks/useFood.tsx** - Line 24
   - TODO: Fetch from backend API for food recommendations

6. **app/components/Audio/AudioPlayer.tsx** - Line 24
   - TODO: Fetch from backend API for audio tracks

7. **app/dashboard/audio.tsx** - Line 24
   - TODO: Fetch from backend API or CDN for audio files

8. **next.config.cjs** - Line 6
   - TODO: Add backend image hostname when implemented

9. **chatbox.tsx** - Lines 277-283
   - Future enhancements: Conversation persistence, markdown rendering, etc.

---

## 📁 File Structure Summary

```
tomoiru-web/
├── .env.local                          # ✅ Updated with backend URLs
├── middleware.ts                        # ✅ Edge auth optimization
├── next.config.cjs                      # ✅ Cleaned up (no Supabase)
├── package.json                         # ✅ Added dependencies
│
├── app/
│   ├── layout.tsx                       # ✅ QueryProvider wrapper
│   ├── providers/
│   │   └── QueryProvider.tsx            # ✅ React Query setup
│   │
│   ├── login/page.tsx                   # ✅ Complete rewrite
│   ├── auth/callback/route.ts           # ✅ OAuth callback
│   ├── dashboard/page.tsx               # ✅ Server Component
│   ├── welcome/
│   │   └── WelcomeTextBox.tsx           # ✅ React Query mutation
│   ├── chat/
│   │   ├── page.tsx                     # ✅ Layout (unchanged)
│   │   └── chatbox.tsx                  # ✅ Streaming with Tomomi
│   ├── unauthenticated/page.tsx         # ✅ Server Component
│   │
│   ├── components/
│   │   ├── NavBar.tsx                   # ✅ React Query hook
│   │   └── Audio/
│   │       └── AudioPlayer.tsx          # ⏸️ Commented out (post-MVP)
│   │
│   ├── food/
│   │   └── foodrecs/
│   │       └── displayinfo.tsx          # ⏸️ Commented out (post-MVP)
│   │
│   └── hooks/
│       └── useFood.tsx                  # ⏸️ Commented out (post-MVP)
│
├── lib/
│   └── serverAuth.ts                    # ✅ Server Component helpers
│
├── services/
│   ├── api.ts                           # ✅ Axios client
│   ├── auth.ts                          # ✅ Auth methods
│   ├── users.ts                         # ✅ User profile
│   └── chat.ts                          # ✅ Chat with transformations
│
├── hooks/
│   ├── useCurrentUser.ts                # ✅ React Query user hooks
│   └── useChat.ts                       # ✅ React Query chat hook
│
└── utils/
    └── auth.ts                          # ✅ Token management
```

---

## 🔄 Dependencies Added

```json
{
  "@tanstack/react-query": "^5.x",
  "@tanstack/react-query-devtools": "^5.x",
  "axios": "^1.x",
  "js-cookie": "^3.x"
}
```

**Not removed (kept for reference):**
- @supabase/auth-helpers-nextjs
- @supabase/supabase-js

---

## 🎓 What We Learned

1. **Server Components + React Query** work great together
   - Server: Fast initial load with fresh auth data
   - Client: Cached data for session with optimistic updates

2. **Edge Middleware** is lightweight and fast
   - Just cookie check, not full JWT validation
   - Server Components handle full auth

3. **Streaming requires custom handling**
   - React Query doesn't support streaming
   - Direct fetch with ReadableStream + useReducer works perfectly

4. **Role transformation** keeps code clean
   - Frontend devs always see "tomomi"
   - Backend devs work with standard "assistant"
   - Service layer handles conversion

5. **Incremental migration** reduces risk
   - Get auth working first
   - Add features one at a time
   - Clear TODOs for future work
