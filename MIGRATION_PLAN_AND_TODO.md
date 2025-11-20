# Tomoiru: Supabase → Custom Backend Migration Plan

## 🎯 Project Goal
Migrate the Tomoiru web app from Supabase authentication to a custom FastAPI backend with Google OAuth + Email/Password authentication, and integrate the RAG-powered chatbot.

---

## ✅ Completed So Far

### 1. Package Updates (DONE)
- ✅ Updated Next.js from 13.5.3 → 14.2.33
- ✅ Updated React from 18.2.0 → 18.3.1
- ✅ Updated TypeScript from 4.9.5 → 5.6.3
- ✅ Updated Tailwind CSS from 3.3.3 → 3.4.18
- ✅ Updated all dev dependencies conservatively
- ✅ Added `js-cookie` for token management
- ✅ Removed Supabase packages from package.json (but code still references them)
- ✅ Updated tsconfig.json for TypeScript 5.x

### 2. Backend Implementation Guides Created (DONE)
- ✅ Created `BACKEND_AUTH_GUIDE.md` - Complete authentication setup guide
- ✅ Created `BACKEND_AUTH_ROUTES.md` - All API endpoint implementations
- ✅ Documented database schema, JWT setup, OAuth configuration

**Backend TODO files contain:**
- Database schema for users table
- JWT token generation and validation
- Google OAuth implementation
- Email/Password authentication
- User management endpoints
- Protected chat endpoint

---

## 📋 Remaining Tasks - Complete Checklist

### Phase 1: Backend Implementation (Do This First)
**Location:** `/Users/mkine/personal-projects/tomoiru/tomoiru-backend/tomoiru-backend`

#### 1.1 Install Dependencies
```bash
cd /path/to/tomoiru-backend
source venv/bin/activate
pip install authlib python-jose[cryptography] passlib[bcrypt] python-multipart itsdangerous
pip freeze > requirements.txt
```

#### 1.2 Set Up Environment Variables
**File:** `.env`
```bash
# Add these to your existing .env file:
JWT_SECRET_KEY="<generate with: openssl rand -hex 32>"
JWT_ALGORITHM="HS256"
JWT_ACCESS_TOKEN_EXPIRE_MINUTES=10080

GOOGLE_CLIENT_ID="<from Google Cloud Console>"
GOOGLE_CLIENT_SECRET="<from Google Cloud Console>"
GOOGLE_REDIRECT_URI="http://localhost:8000/api/v1/auth/callback/google"

FRONTEND_URL="http://localhost:3000"
```

**Action Items:**
- [ ] Generate JWT secret key: `openssl rand -hex 32`
- [ ] Set up Google OAuth credentials at https://console.cloud.google.com/
  - [ ] Create OAuth 2.0 Client ID
  - [ ] Add redirect URI: `http://localhost:8000/api/v1/auth/callback/google`
  - [ ] Copy Client ID and Secret to .env
- [ ] Update .env file with all new variables

#### 1.3 Create Database Schema
**Files to create:**
- [ ] `app/models/user.py` (see BACKEND_AUTH_GUIDE.md Part 3)
- [ ] `alembic/versions/001_create_users_table.py` (migration file)

**Run migration:**
- [ ] `alembic upgrade head`

#### 1.4 Create Security Utilities
**Files to create:**
- [ ] `app/core/security.py` (see BACKEND_AUTH_GUIDE.md Part 4)
  - JWT token creation and validation
  - Password hashing
  - `get_current_user` dependency

#### 1.5 Create Pydantic Schemas
**Files to create:**
- [ ] `app/schemas/auth.py` (see BACKEND_AUTH_GUIDE.md Part 5)
  - UserResponse, UserCreate, UserUpdate
  - TokenResponse, EmailPasswordLogin

#### 1.6 Create Authentication Routes
**Files to create:**
- [ ] `app/routes/auth.py` (see BACKEND_AUTH_ROUTES.md Part 6)
  - Google OAuth login/callback
  - Email/password signup/login
  - Token refresh endpoint

#### 1.7 Create User Management Routes
**Files to create:**
- [ ] `app/routes/users.py` (see BACKEND_AUTH_ROUTES.md Part 7)
  - GET /api/v1/users/me
  - PATCH /api/v1/users/me

#### 1.8 Update Existing Chat Route
**Files to modify:**
- [ ] `app/routes/chat.py` - Add `get_current_user` dependency to make it protected

#### 1.9 Update Main App
**Files to modify:**
- [ ] `app/main.py` (see BACKEND_AUTH_ROUTES.md Part 9)
  - Register auth and users routers
  - Verify CORS configuration includes frontend URL
  - Create user model tables

#### 1.10 Test Backend
- [ ] Start backend: `uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload`
- [ ] Test health: `curl http://localhost:8000/health`
- [ ] Test Google OAuth: Visit `http://localhost:8000/api/v1/auth/login/google`
- [ ] Test signup: `curl -X POST http://localhost:8000/api/v1/auth/signup -H "Content-Type: application/json" -d '{"email":"test@example.com","password":"password123"}'`
- [ ] Test protected chat endpoint with JWT token

---

### Phase 2: Frontend - Remove Supabase Code

#### 2.1 Files to Delete
- [ ] `app/auth/callback/route.ts` (replace with new callback handler)
- [ ] `app/auth/signout/route.ts` (replace with new logout)
- [ ] Any other Supabase-specific utilities

#### 2.2 Files to Update (Remove Supabase Imports)
**Find all files importing from @supabase:**
- [ ] `app/context/UserContextProvider.tsx`
- [ ] `app/login/page.tsx`
- [ ] `app/welcome/WelcomeTextBox.tsx`
- [ ] `app/dashboard/page.tsx`
- [ ] `app/middleware.ts`
- [ ] `app/components/Audio/AudioPlayer.tsx`
- [ ] `app/components/NavBar.tsx`
- [ ] `app/food/fooddiary/displayinfo.tsx`
- [ ] `app/hooks/useFood.tsx`

**Grep to find all Supabase references:**
```bash
grep -r "@supabase" app/ --exclude-dir=node_modules
```

---

### Phase 3: Frontend - Create New Auth System

#### 3.1 Create API Service Layer
**File:** `app/services/api.ts`
```typescript
// Base API client with JWT token handling
// Axios instance configured with baseURL and auth interceptors
```

**File:** `app/services/auth.ts`
```typescript
// loginWithGoogle() - redirect to backend OAuth
// loginWithEmail(email, password) - POST to /api/v1/auth/login
// signupWithEmail(email, password) - POST to /api/v1/auth/signup
// logout() - clear tokens
// getCurrentUser() - GET /api/v1/users/me
// refreshToken() - POST /api/v1/auth/refresh
```

**File:** `app/services/users.ts`
```typescript
// updateUserProfile(data) - PATCH /api/v1/users/me
```

**File:** `app/services/chat.ts`
```typescript
// sendMessage(message, history) - POST /api/v1/chat/
```

**Action Items:**
- [ ] Create `app/services/` directory
- [ ] Create `api.ts` with axios base configuration
- [ ] Create `auth.ts` with all auth functions
- [ ] Create `users.ts` for user management
- [ ] Create `chat.ts` for chatbot integration

#### 3.2 Create Auth Utilities
**File:** `app/utils/auth.ts`
```typescript
// Token storage functions using js-cookie
// setAuthToken(token: string)
// getAuthToken(): string | null
// removeAuthToken()
// isAuthenticated(): boolean
```

**Action Items:**
- [ ] Create `app/utils/auth.ts` with token management functions

#### 3.3 Update Environment Variables
**File:** `.env.local`
```bash
# Remove Supabase variables
# Add:
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_FRONTEND_URL=http://localhost:3000
```

**Action Items:**
- [ ] Update `.env.local` with new variables
- [ ] Remove all Supabase environment variables

---

### Phase 4: Frontend - Update Authentication Flow

#### 4.1 Create OAuth Callback Handler
**File:** `app/auth/callback/page.tsx`
```typescript
// Receive token from backend OAuth redirect
// Extract token from URL params
// Store token using setAuthToken()
// Check if new_user=true → redirect to /welcome
// Otherwise → redirect to /dashboard
```

**Action Items:**
- [ ] Create new `app/auth/callback/page.tsx`

#### 4.2 Update Login Page
**File:** `app/login/page.tsx`

**Changes:**
- [ ] Remove all Supabase imports
- [ ] Add "Sign in with Google" button → redirects to `${API_URL}/api/v1/auth/login/google`
- [ ] Keep email/password form → calls `auth.loginWithEmail()`
- [ ] Keep signup form → calls `auth.signupWithEmail()`
- [ ] Store returned JWT token
- [ ] Redirect based on user.user_name (null → /welcome, exists → /dashboard)

#### 4.3 Update UserContextProvider
**File:** `app/context/UserContextProvider.tsx`

**Changes:**
- [ ] Remove Supabase client
- [ ] Use `auth.getCurrentUser()` to fetch user from backend
- [ ] Use JWT token from cookies/localStorage
- [ ] Update user interface to match backend UserResponse schema

#### 4.4 Update Middleware
**File:** `middleware.ts`

**Changes:**
- [ ] Remove Supabase middleware
- [ ] Check for JWT token in cookies
- [ ] Optionally validate token structure (or let backend validate)
- [ ] Redirect unauthenticated users to /login

#### 4.5 Update Welcome Flow
**File:** `app/welcome/WelcomeTextBox.tsx`

**Changes:**
- [ ] Remove Supabase update call
- [ ] Use `users.updateUserProfile({ user_name: username })` to save username
- [ ] Keep existing welcome text flow

---

### Phase 5: Frontend - Integrate Chat with Backend

#### 5.1 Update Chat Page
**File:** `app/chat/chatbox.tsx`

**Major Changes:**
- [ ] Remove `/prompt/api` and `/chat/api` calls
- [ ] Replace with single call to backend: `chat.sendMessage(message, conversationHistory)`
- [ ] Update to use backend's `ChatResponse` format (no streaming for now)
- [ ] Add JWT token to request headers
- [ ] Update conversation history format to match backend's Message interface

**New Flow:**
```typescript
// Remove: fetch to /prompt/api (embedbase context)
// Remove: fetch to /chat/api (OpenAI streaming)
// Add: Single fetch to backend /api/v1/chat/
const response = await chat.sendMessage(message, conversationState.messages);
// Backend returns: { response: string, model: string, tokens_used: number }
```

**Note:** Backend doesn't stream responses yet. Can add streaming later if needed.

---

### Phase 6: Frontend - Dashboard Enhancement

#### 6.1 Add Interactive Hotspots to Dashboard
**File:** `app/components/DashboardCarousel.tsx`

**Goal:** Make dashboard images clickable to navigate to features

**Implementation:**
```typescript
// Add clickable overlays on dashboard images
// Example: Click on "computer" area → navigate to /chat
// Example: Click on "kitchen" area → navigate to /food
// Use absolute positioned divs or image maps
```

**Action Items:**
- [ ] Design clickable regions for each carousel image
- [ ] Add Link components or onclick handlers
- [ ] Add hover effects for visual feedback
- [ ] Map features to regions:
  - Computer desk → `/chat`
  - Kitchen → `/food` or `/fooddiary`
  - Journal/bed → `/journal`

#### 6.2 Update Dashboard Page
**File:** `app/dashboard/page.tsx`

**Changes:**
- [ ] Remove Supabase session check
- [ ] Use middleware for auth protection instead
- [ ] Or add client-side auth check with redirect

---

### Phase 7: Testing & Polish

#### 7.1 Complete User Flow Testing
**Test Path 1: New User with Google OAuth**
- [ ] Visit http://localhost:3000
- [ ] Click "Sign in with Google"
- [ ] Approve Google OAuth
- [ ] Redirected to /welcome (since user_name is null initially)
- [ ] Enter username in welcome flow
- [ ] Click through welcome messages
- [ ] Land on /dashboard
- [ ] Click interactive dashboard elements
- [ ] Navigate to /chat
- [ ] Send message to Tomomi
- [ ] Verify response from backend

**Test Path 2: New User with Email/Password**
- [ ] Visit /login
- [ ] Click "Sign Up"
- [ ] Enter email and password
- [ ] Submit signup form
- [ ] Redirected to /welcome
- [ ] Complete welcome flow
- [ ] Test dashboard and chat

**Test Path 3: Returning User**
- [ ] Login with existing account
- [ ] Should skip /welcome
- [ ] Go directly to /dashboard
- [ ] Test all features

**Test Path 4: Unauthenticated Access**
- [ ] Clear cookies/localStorage
- [ ] Try to access /dashboard
- [ ] Should redirect to /login
- [ ] Try to access /chat
- [ ] Should redirect to /login

#### 7.2 Error Handling
- [ ] Test expired JWT token
- [ ] Test invalid credentials
- [ ] Test network errors in chat
- [ ] Test backend offline scenario
- [ ] Add loading states everywhere
- [ ] Add error toast notifications

#### 7.3 Build & Deploy Readiness
- [ ] Run `npm run build` - ensure no errors
- [ ] Fix any TypeScript errors
- [ ] Fix any ESLint warnings
- [ ] Test production build locally
- [ ] Update .env.production with production URLs

---

## 🗂️ File Structure Reference

### Backend Files to Create/Modify
```
tomoiru-backend/
├── .env (UPDATE)
├── app/
│   ├── main.py (UPDATE - register routers)
│   ├── database.py (verify get_db exists)
│   ├── models/
│   │   └── user.py (CREATE)
│   ├── schemas/
│   │   └── auth.py (CREATE)
│   ├── core/
│   │   └── security.py (CREATE)
│   └── routes/
│       ├── auth.py (CREATE)
│       ├── users.py (CREATE)
│       └── chat.py (UPDATE - add auth)
└── alembic/
    └── versions/
        └── 001_create_users_table.py (CREATE)
```

### Frontend Files to Create/Modify
```
tomoiru-web/
├── .env.local (UPDATE)
├── app/
│   ├── services/ (CREATE DIRECTORY)
│   │   ├── api.ts (CREATE)
│   │   ├── auth.ts (CREATE)
│   │   ├── users.ts (CREATE)
│   │   └── chat.ts (CREATE)
│   ├── utils/
│   │   └── auth.ts (CREATE - token management)
│   ├── auth/
│   │   └── callback/
│   │       └── page.tsx (REPLACE)
│   ├── login/
│   │   └── page.tsx (UPDATE)
│   ├── context/
│   │   └── UserContextProvider.tsx (UPDATE)
│   ├── middleware.ts (UPDATE)
│   ├── welcome/
│   │   └── WelcomeTextBox.tsx (UPDATE)
│   ├── chat/
│   │   └── chatbox.tsx (UPDATE)
│   ├── components/
│   │   └── DashboardCarousel.tsx (UPDATE)
│   └── dashboard/
│       └── page.tsx (UPDATE)
└── BACKEND_AUTH_GUIDE.md (REFERENCE)
```

---

## 🚀 Quick Start for Next Session

**Copy-paste this prompt:**

```
I'm migrating my Tomoiru travel app from Supabase to a custom FastAPI backend with OAuth + JWT authentication.

Progress so far:
- ✅ Updated all npm packages (Next.js 14, React 18, TypeScript 5)
- ✅ Created comprehensive backend implementation guides (BACKEND_AUTH_GUIDE.md, BACKEND_AUTH_ROUTES.md)
- ⏸️ Backend authentication not yet implemented
- ⏸️ Frontend still has Supabase code (needs removal)

Current working directory: /Users/mkine/personal-projects/tomoiru-web

Backend directory: /Users/mkine/personal-projects/tomoiru/tomoiru-backend/tomoiru-backend

Next steps from MIGRATION_PLAN_AND_TODO.md:
1. Implement backend authentication (Phase 1)
2. Remove Supabase code from frontend (Phase 2)
3. Create frontend API service layer (Phase 3)
4. Update authentication flow (Phase 4)
5. Integrate chat with backend (Phase 5)
6. Add interactive dashboard (Phase 6)
7. Test end-to-end (Phase 7)

Please help me continue where I left off. Let's start with [specify which phase/task you want to start with].

Reference files in this repo:
- MIGRATION_PLAN_AND_TODO.md (complete roadmap)
- BACKEND_AUTH_GUIDE.md (backend setup instructions)
- BACKEND_AUTH_ROUTES.md (API endpoint implementations)
```

---

## 📝 Notes

- Backend base URL: `http://localhost:8000`
- Frontend dev URL: `http://localhost:3000`
- Chat endpoint: `POST /api/v1/chat/` (requires JWT)
- All `/api/v1/*` endpoints require Bearer token except auth endpoints
- Conversation history is client-side (not stored in DB yet)

## 🎯 Success Criteria

When this migration is complete, you will have:
1. ✅ Custom FastAPI backend with OAuth + Email/Password auth
2. ✅ JWT token-based session management
3. ✅ PostgreSQL user database
4. ✅ Protected chat endpoint integrated with RAG backend
5. ✅ Complete user flow: OAuth → Welcome → Dashboard → Chat
6. ✅ Interactive dashboard with feature navigation
7. ✅ No Supabase dependencies
8. ✅ Production-ready authentication system

Good luck! 🚀
