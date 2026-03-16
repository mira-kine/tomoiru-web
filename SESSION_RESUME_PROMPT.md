# Session Resumption Prompt

Copy and paste this into Claude Code to continue where we left off:

---

## Project Overview

**Tomoiru** - A Japan travel guide web app with an AI chatbot companion named "Tomomi"

**Tech Stack:**
- Frontend: Next.js 14 (App Router), React 18, TypeScript 5, TailwindCSS, DaisyUI
- Backend: FastAPI with PostgreSQL, pgvector RAG, OpenAI GPT-4, Google OAuth + JWT
- Migration: Supabase → Custom FastAPI Backend (IN PROGRESS)

**Project Location:**
- Frontend: `/Users/mkine/personal-projects/tomoiru-web/`
- Backend: `/Users/mkine/personal-projects/tomoiru/tomoiru-backend/tomoiru-backend/`

---

## MVP Vision & Feature Priorities

### Core MVP Flow (COMPLETED ✅)
1. **Authentication**
   - Email/password signup & login
   - Google OAuth
   - JWT tokens (7-day expiration)
   - Protected routes with edge middleware

2. **Welcome Flow**
   - First-time users set their preferred name
   - Animated welcome messages
   - Updates user_name in database

3. **Dashboard**
   - Main hub after login
   - Navigation to all features
   - Audio player (placeholder for now)

4. **Chat with Tomomi**
   - Real-time streaming responses
   - RAG-powered (3 context documents from pgvector)
   - Conversation history maintained
   - "Tomomi" branding throughout

### Pre-MVP Feature (PRIORITY)

**Demo Mode Flow:**
1. **Demo Button on Login Page** (`app/login/page.tsx`)
   - Add "Demo" button on welcome/login landing page
   - Allows users to try the app without creating an account
   - Uses standardized demo user credentials

2. **Demo User Experience**
   - User clicks "Demo" → Auto-login with demo account
   - Full access to chat with Tomomi
   - Can navigate dashboard and interact with features
   - **No data persistence** - Demo user's interactions are not saved
   - Clear indication in UI that user is in demo mode

3. **Implementation Requirements:**
   - **Backend:** Create demo user account with fixed credentials
   - **Frontend:** Add demo login flow in `services/auth.ts`
   - **UI:** "Demo" button next to "Sign In" / "Sign Up"
   - **Dashboard:** Display "Demo Mode" badge/indicator
   - **Restrictions:** Consider read-only access or session-only storage

4. **User Flow:**
   ```
   Landing Page → Click "Demo" → Skip auth/welcome → Dashboard (Demo Mode)
   → Chat with Tomomi → No conversation saved → Logout clears session
   ```

### Post-MVP Features (NEXT TO IMPLEMENT)

**Phase 4 - Audio & Food Diary:**
1. **Audio Player** (`app/dashboard/audio.tsx`, `app/components/Audio/AudioPlayer.tsx`)
   - Background music from Supabase storage OR backend CDN
   - Calming piano tracks for Japan travel ambiance
   - Play/pause controls
   - Need: Backend audio endpoints OR CDN integration

2. **Food Recommendations** (`app/hooks/useFood.tsx`, `app/food/foodrecs/`)
   - Browse Japanese food recommendations
   - View details (name, description, image)
   - Add to personal wishlist
   - Need: Backend `/api/v1/food/recommendations` endpoint

3. **Food Diary** (`app/food/foodrecs/displayinfo.tsx`)
   - Personal wishlist of foods to try
   - Track foods tried in Japan
   - Need: Backend `/api/v1/food/wishlist` endpoints (GET, POST, DELETE)

**Phase 5 - Additional Features:**
- Journal for trip memories
- Itinerary planning
- Location-based recommendations
- Photo gallery

---

## Current Migration Status

### ✅ COMPLETED (Ready for Testing)

**Infrastructure:**
- Root-level directory structure (services/, lib/, utils/, hooks/)
- React Query + Server Components pattern
- Edge middleware for auth optimization
- Token management with js-cookie
- Axios client with JWT interceptors

**Auth System:**
- All auth services, hooks, components migrated
- Login page with email/password + Google OAuth
- OAuth callback handler
- Server-side auth helpers (`getCurrentUser`, `getAuthenticatedUser`)
- NavBar with logout functionality
- Protected routes

**User Features:**
- Welcome flow with username collection
- Dashboard (Server Component + Client Component pattern)
- Chat with streaming Tomomi responses

**Configuration:**
- `.env.local` updated with backend URLs
- `next.config.cjs` cleaned up (no Supabase hostnames)
- `middleware.ts` with edge optimization
- Build successful, no TypeScript errors

### ⏸️ ON HOLD (Waiting for Backend OR Testing)

**Food Features (Need Backend Endpoints):**
- `app/hooks/useFood.tsx` - Commented out Supabase
- `app/food/foodrecs/displayinfo.tsx` - Commented out Supabase
- Marked with TODO comments for backend implementation

**Audio Features (Need Backend Endpoints OR CDN):**
- `app/components/Audio/AudioPlayer.tsx` - Commented out Supabase
- `app/dashboard/audio.tsx` - Commented out Supabase
- Marked with TODO comments for backend implementation

### 🧪 TESTING IN PROGRESS

User is currently testing:
1. Email signup flow
2. Email login flow
3. Google OAuth flow
4. Welcome flow (username setting)
5. Chat with Tomomi
6. Logout flow
7. Protected routes

---

## Key Technical Decisions Made

### 1. Directory Structure
**Decision:** Root-level for shared code (industry standard)
```
services/     # API clients
lib/          # Server-side helpers
utils/        # Utilities (auth tokens, etc.)
hooks/        # React Query hooks
app/          # Routes only
```

### 2. Tomomi Branding Strategy
**Decision:** Frontend always uses "tomomi", transforms to "assistant" for backend
- **Why:** Consistent branding + OpenAI compatibility
- **Implementation:** Transformation layer in `services/chat.ts`
  - `toBackendMessages()`: tomomi → assistant
  - `toFrontendMessages()`: assistant → tomomi
- **Result:** Frontend developers never see "assistant"

### 3. Streaming Chat Architecture
**Decision:** useReducer + ReadableStream (NOT React Query)
- **Why:** React Query doesn't support streaming
- **Implementation:** Direct fetch to `/api/v1/chat/stream`
- **State:** useReducer manages messages, responseContent, loading
- **Display:** Real-time character-by-character streaming

### 4. Cache Strategy
**Decision:** 'no-store' for Server Components, React Query for client
- **Server Components:** Always fetch fresh (security priority)
- **React Query:** 5min stale time, 10min garbage collection
- **Tradeoff:** More DB calls, but secure auth data

### 5. Edge Middleware
**Decision:** Implement edge optimization (user requested)
- **Purpose:** Fast auth checks before page loads
- **How:** Cookie check at edge → Redirect if missing
- **Note:** Server Components still validate full JWT

### 6. Incremental Migration (Option 3)
**Decision:** Auth first, features later
- **Phase 1-3:** Auth system (✅ Complete)
- **Phase 4:** Audio + Food Diary (⏳ Next)
- **Phase 5:** Additional features

---

## Important Code Patterns

### Modern TypeScript
```typescript
// Named imports (no React.ReactNode)
import { ReactNode, useState } from 'react';

// Props interfaces
interface MyComponentProps {
  children: ReactNode;
}

// FormEvent type
const handleSubmit = (e: FormEvent) => {
  e.preventDefault();
  // ...
}
```

### React Query Usage
```typescript
// Query
const { data: user } = useCurrentUser();

// Mutation
const updateUser = useUpdateUser();
await updateUser.mutateAsync({ user_name: 'Alice' });
```

### Server Components Auth
```typescript
import { getCurrentUser } from '@/lib/serverAuth';

export default async function Page() {
  const user = await getCurrentUser(); // Auto-redirects if not authed
  return <div>Hello {user.user_name}</div>;
}
```

---

## Next Steps (After Testing)

### PRIORITY: Demo Mode Implementation

**Before Post-MVP features, implement demo flow for user acquisition:**

**1. Backend Setup:**
- Create demo user account in database
  - Email: `demo@tomoiru.com` (or similar)
  - Password: Fixed demo password
  - Username: "Demo User" or "Guest"
  - Consider: Mark account as `is_demo: true` in database

**2. Frontend Implementation:**

**Add Demo Login Function** (`services/auth.ts`):
```typescript
export const demoLogin = async () => {
  return await apiClient.post('/auth/login', {
    email: 'demo@tomoiru.com',
    password: process.env.NEXT_PUBLIC_DEMO_PASSWORD
  });
};
```

**Update Login Page** (`app/login/page.tsx`):
- Add "Try Demo" or "Demo" button
- Style to be visually distinct from Sign Up/Sign In
- On click: Auto-login with demo credentials → Redirect to dashboard
- Skip welcome flow for demo user

**Dashboard Demo Indicator** (`app/dashboard/dashboard.tsx`):
- Display badge/banner: "Demo Mode - Your changes won't be saved"
- Consider: Different styling for demo mode
- Optional: Add "Create Account" CTA in demo mode

**3. Testing:**
- Verify demo login works
- Confirm no conversation persistence for demo user
- Test logout clears demo session
- Ensure demo user cannot access sensitive operations

### Post-MVP: Audio & Food Diary Implementation

**1. Backend Development (User or Backend Team):**
- Audio endpoints OR CDN integration decision
- Food recommendations endpoint: `GET /api/v1/food/recommendations`
- Food wishlist endpoints: `GET/POST/DELETE /api/v1/food/wishlist/:id`

**2. Frontend Implementation (Our Work):**

**Audio Player:**
- Uncomment `app/dashboard/audio.tsx`
- Uncomment `app/components/Audio/AudioPlayer.tsx`
- Create `services/audio.ts` with backend calls OR CDN URLs
- Create `hooks/useAudio.tsx` with React Query
- Update to fetch from backend/CDN
- Test audio playback

**Food Diary:**
- Uncomment `app/hooks/useFood.tsx`
- Uncomment `app/food/foodrecs/displayinfo.tsx`
- Create `services/food.ts` with backend calls
- Update hooks to use React Query
- Transform to use new backend API
- Test recommendation browsing
- Test wishlist add/remove

**3. Bug Fixes from Testing:**
- Address any issues found during auth flow testing
- Update OAuth callback to check `user_name` and redirect to /welcome if null
- Implement "save progress before logout" (TODO in `services/api.ts`)

---

## Known TODOs in Codebase

**Highest Priority (Pre-MVP):**
1. **DEMO MODE** - Implement demo login flow
   - Backend: Create demo user account
   - `services/auth.ts` - Add `demoLogin()` function
   - `app/login/page.tsx` - Add "Demo" button
   - `app/dashboard/dashboard.tsx` - Add demo mode indicator
   - Skip welcome flow for demo user

**High Priority:**
2. `app/auth/callback/route.ts:44` - Check user_name, redirect to /welcome if null
3. `services/api.ts:35` - Save user progress before auto-logout

**Post-MVP (After Testing):**
4. `app/dashboard/audio.tsx:24` - Uncomment and implement backend audio
5. `app/components/Audio/AudioPlayer.tsx:24` - Uncomment and implement
6. `app/hooks/useFood.tsx:24` - Uncomment and implement backend food API
7. `app/food/foodrecs/displayinfo.tsx:24` - Uncomment and implement wishlist

**Future Enhancements:**
8. `services/chat.ts:95-140` - Conversation persistence endpoints
9. `chatbox.tsx:277-283` - Markdown rendering, copy to clipboard, etc.
10. `next.config.cjs:6` - Add backend image hostname when implemented

---

## Documentation Reference

**Read these files for full context:**
- `MIGRATION_PROGRESS.md` - Complete migration details, tradeoffs, file structure
- `BACKEND_AUTH_ROUTES.md` - Backend API reference (auth endpoints)
- `FRONTEND_MVP_IMPLEMENTATION.md` - Original step-by-step guide (partially outdated)

---

## How to Resume

**When I return, we'll be working on:**
1. **Demo Mode (PRIORITY)** - Allow users to try the app without signing up
2. **Audio features** - Implementing audio player with backend OR CDN
3. **Food diary** - Implementing recommendations and wishlist

**What I need help with:**
- Implementing demo login flow on frontend
- Adding demo button to login page
- Creating demo user indicator in dashboard
- Creating services for audio/food with React Query (post-MVP)
- Testing the features after implementation
- Debugging any issues
- Following the same patterns we established for auth

**Current state:**
- Deployed: Vercel deployment should be successful
- Backend running: `http://localhost:8000` (local) or `https://tomoiru-backend.onrender.com` (production)
- Frontend: Built successfully, deployed to Vercel
- Auth flow: Complete and deployed ✅
- Demo mode: Not yet implemented (NEXT PRIORITY)
- Food/audio: Commented out, waiting for post-MVP

**Start the conversation with:**
"I'm ready to continue working on Tomoiru. I want to implement the demo mode feature so users can try the app without creating an account. Can we add a 'Demo' button to the login page that uses a standardized demo user account?"
