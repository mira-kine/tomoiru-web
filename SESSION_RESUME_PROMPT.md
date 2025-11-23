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

### Immediate: Audio & Food Diary Implementation

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

**High Priority:**
1. `app/auth/callback/route.ts:44` - Check user_name, redirect to /welcome if null
2. `services/api.ts:35` - Save user progress before auto-logout

**Post-MVP (After Testing):**
3. `app/dashboard/audio.tsx:24` - Uncomment and implement backend audio
4. `app/components/Audio/AudioPlayer.tsx:24` - Uncomment and implement
5. `app/hooks/useFood.tsx:24` - Uncomment and implement backend food API
6. `app/food/foodrecs/displayinfo.tsx:24` - Uncomment and implement wishlist

**Future Enhancements:**
7. `services/chat.ts:95-140` - Conversation persistence endpoints
8. `chatbox.tsx:277-283` - Markdown rendering, copy to clipboard, etc.
9. `next.config.cjs:6` - Add backend image hostname when implemented

---

## Documentation Reference

**Read these files for full context:**
- `MIGRATION_PROGRESS.md` - Complete migration details, tradeoffs, file structure
- `BACKEND_AUTH_ROUTES.md` - Backend API reference (auth endpoints)
- `FRONTEND_MVP_IMPLEMENTATION.md` - Original step-by-step guide (partially outdated)

---

## How to Resume

**When I return, we'll be working on:**
1. **Audio features** - Implementing audio player with backend OR CDN
2. **Food diary** - Implementing recommendations and wishlist

**What I need help with:**
- Creating services for audio/food with React Query
- Updating components to use new backend APIs
- Testing the features after implementation
- Debugging any issues
- Following the same patterns we established for auth

**Current state:**
- Backend running: `http://localhost:8000`
- Frontend: Built successfully, ready for `npm run dev`
- Auth flow: Complete and tested (or being tested)
- Food/audio: Commented out, ready to implement

**Start the conversation with:**
"I'm ready to continue working on Tomoiru. I've finished testing the auth flow [mention any bugs found, or say 'everything works!']. Let's start implementing the audio player and food diary features. Which should we tackle first?"
