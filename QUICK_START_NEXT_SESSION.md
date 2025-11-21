# 🚀 Quick Start for Next Session

## What We Decided Today

✅ **Architecture:** React Query (client-side) + Server Components (initial auth)
✅ **Backend:** Custom FastAPI with PostgreSQL for auth + chat + data
✅ **Package Updates:** Completed (Next.js 14, React 18, TypeScript 5)

---

## 📁 Implementation Guides Created

1. **MIGRATION_PLAN_AND_TODO.md** - Overall roadmap
2. **BACKEND_AUTH_GUIDE.md** - Backend authentication setup
3. **BACKEND_AUTH_ROUTES.md** - All backend API endpoints
4. **FRONTEND_MVP_IMPLEMENTATION.md** - Frontend services layer
5. **FRONTEND_MVP_PART2.md** - PostgreSQL integration
6. **REACT_QUERY_SETUP.md** ⭐ **START HERE** - Modern architecture

---

## 🎯 Implementation Order

### Phase 1: Backend Setup (if not done)
Follow `BACKEND_AUTH_GUIDE.md` and `BACKEND_AUTH_ROUTES.md`

**Test backend works:**
```bash
cd /Users/mkine/personal-projects/tomoiru/tomoiru-backend/tomoiru-backend
source venv/bin/activate
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

Visit: http://localhost:8000/docs

---

### Phase 2: Frontend - React Query Setup ⭐

**Follow: `REACT_QUERY_SETUP.md`**

**Step-by-step:**

1. **Install dependencies:**
   ```bash
   npm install @tanstack/react-query axios
   npm install --save-dev @tanstack/react-query-devtools
   ```

2. **Create these files (in order):**
   ```
   app/providers/QueryProvider.tsx          ← Step 2
   app/utils/auth.ts                        ← From FRONTEND_MVP_IMPLEMENTATION.md Step 4
   app/services/api.ts                      ← Step 3.1
   app/services/auth.ts                     ← Step 3.2
   app/services/users.ts                    ← Step 3.3
   app/services/chat.ts                     ← Step 3.4 + FRONTEND_MVP_PART2.md Step 10
   app/lib/serverAuth.ts                    ← Step 5
   app/hooks/useCurrentUser.ts              ← Step 4.1
   app/hooks/useConversations.ts            ← Step 4.2
   app/hooks/useChat.ts                     ← Step 4.3
   app/auth/callback/page.tsx               ← FRONTEND_MVP_IMPLEMENTATION.md Step 5
   ```

3. **Update root layout:**
   ```typescript
   // app/layout.tsx
   import QueryProvider from './providers/QueryProvider';

   export default function RootLayout({ children }) {
     return (
       <html>
         <body>
           <QueryProvider>
             {children}
           </QueryProvider>
         </body>
       </html>
     );
   }
   ```

4. **Delete old Context:**
   ```bash
   rm app/context/UserContextProvider.tsx
   ```

5. **Update pages (in order):**
   - `app/login/page.tsx` → FRONTEND_MVP_IMPLEMENTATION.md Step 6
   - `app/dashboard/page.tsx` → REACT_QUERY_SETUP.md Step 6
   - `app/dashboard/dashboard-client.tsx` → NEW FILE (Step 6)
   - `app/welcome/page.tsx` → REACT_QUERY_SETUP.md Step 7
   - `app/chat/page.tsx` → REACT_QUERY_SETUP.md Step 8

6. **Update .env.local:**
   ```bash
   NEXT_PUBLIC_API_URL=http://localhost:8000
   NEXT_PUBLIC_FRONTEND_URL=http://localhost:3000
   ```

7. **Remove remaining Supabase code:**
   ```bash
   # Find all Supabase references
   grep -r "@supabase" app/ --exclude-dir=node_modules

   # Update each file to use new services
   ```

---

### Phase 3: Test Everything

**Start backend:**
```bash
cd /path/to/tomoiru-backend
source venv/bin/activate
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

**Start frontend:**
```bash
cd /Users/mkine/personal-projects/tomoiru-web
npm run dev
```

**Test flow:**
1. Visit http://localhost:3000/login
2. Sign up with email/password
3. Complete welcome flow
4. See dashboard
5. Navigate to chat
6. Send message to Tomomi
7. Verify response

**Check React Query DevTools:**
- Click floating icon in bottom corner
- See cached queries
- Watch data refetch

---

## 🔑 Key Concepts

### Server Components (for auth checks):
```typescript
// app/dashboard/page.tsx
export default async function Dashboard() {
  const user = await getCurrentUser(); // Server-side!
  return <DashboardClient initialUser={user} />;
}
```

### React Query (for data fetching):
```typescript
// app/dashboard/dashboard-client.tsx
'use client';

export default function DashboardClient({ initialUser }) {
  // Uses initialUser as cache, refetches in background
  const { data: user } = useCurrentUser(initialUser);
  return <div>Welcome, {user.user_name}!</div>;
}
```

### Benefits:
- ✅ Fast initial load (server component)
- ✅ Automatic refetching (React Query)
- ✅ Smart caching
- ✅ No UserContext needed
- ✅ Similar to Python dependency injection

---

## 🐛 Common Issues

### Issue: "Cannot find module '@tanstack/react-query'"
```bash
npm install @tanstack/react-query
```

### Issue: "cookies() is not a function"
**Solution:** Only use `cookies()` in Server Components, not Client Components

### Issue: Build error "useCurrentUser is not defined"
**Solution:** Check import paths - use `@/app/hooks/useCurrentUser`

### Issue: CORS error
**Solution:** Check backend `allow_origins` includes `http://localhost:3000`

### Issue: Infinite loop in React Query
**Solution:** Make sure `queryKey` arrays are stable (no object literals inside)

---

## 📊 File Structure After Migration

```
tomoiru-web/
├── app/
│   ├── providers/
│   │   └── QueryProvider.tsx          ← NEW
│   ├── lib/
│   │   └── serverAuth.ts              ← NEW (server-side auth)
│   ├── services/
│   │   ├── api.ts                     ← NEW (axios client)
│   │   ├── auth.ts                    ← NEW
│   │   ├── users.ts                   ← NEW
│   │   ├── chat.ts                    ← NEW (with conversations)
│   │   ├── food.ts                    ← NEW (if applicable)
│   │   └── journal.ts                 ← NEW (if applicable)
│   ├── hooks/
│   │   ├── useCurrentUser.ts          ← NEW (React Query)
│   │   ├── useConversations.ts        ← NEW
│   │   └── useChat.ts                 ← NEW
│   ├── utils/
│   │   └── auth.ts                    ← NEW (token management)
│   ├── auth/callback/
│   │   └── page.tsx                   ← UPDATED
│   ├── login/
│   │   └── page.tsx                   ← UPDATED
│   ├── dashboard/
│   │   ├── page.tsx                   ← UPDATED (Server Component)
│   │   └── dashboard-client.tsx       ← NEW (Client Component)
│   ├── welcome/
│   │   ├── page.tsx                   ← UPDATED (Server Component)
│   │   ├── WelcomeInput.tsx           ← UPDATED
│   │   └── WelcomeTextBox.tsx         ← UPDATED
│   ├── chat/
│   │   ├── page.tsx                   ← UPDATED (Server Component)
│   │   └── chatbox.tsx                ← UPDATED (React Query)
│   ├── context/
│   │   └── UserContextProvider.tsx    ← DELETE THIS
│   └── layout.tsx                     ← UPDATED (add QueryProvider)
├── .env.local                         ← UPDATED (remove Supabase)
└── package.json                       ← UPDATED (React Query added)
```

---

## ✅ Checklist for Next Session

### Backend:
- [ ] Backend authentication endpoints working
- [ ] Can test with cURL or Postman
- [ ] PostgreSQL tables created (users, conversations, chat_messages)
- [ ] Backend running at http://localhost:8000

### Frontend:
- [ ] Install React Query
- [ ] Create QueryProvider
- [ ] Create services layer (api.ts, auth.ts, etc.)
- [ ] Create React Query hooks
- [ ] Create server auth helper
- [ ] Update login page
- [ ] Convert dashboard to Server Component
- [ ] Update welcome flow
- [ ] Update chat page
- [ ] Delete UserContextProvider
- [ ] Remove all Supabase code
- [ ] Test complete flow

---

## 🎯 Copy-Paste Prompt for Next Session

```
I'm continuing the Tomoiru migration from Supabase to custom backend.

Progress so far:
- ✅ Packages updated (Next.js 14, React 18, TypeScript 5)
- ✅ Decided on architecture: React Query + Server Components
- ✅ Backend authentication guides created
- ⏸️ Need to implement frontend

Current directory: /Users/mkine/personal-projects/tomoiru-web
Backend directory: /Users/mkine/personal-projects/tomoiru/tomoiru-backend/tomoiru-backend

Please help me implement the frontend using React Query + Server Components approach.

Reference files:
- REACT_QUERY_SETUP.md (primary guide)
- FRONTEND_MVP_IMPLEMENTATION.md (services layer)
- FRONTEND_MVP_PART2.md (PostgreSQL integration)
- QUICK_START_NEXT_SESSION.md (this file)

Let's start by setting up React Query and creating the services layer.
```

---

## 💡 Pro Tips

1. **Start backend first** - Test all endpoints work before touching frontend
2. **Follow REACT_QUERY_SETUP.md in order** - Don't skip steps
3. **Use React Query DevTools** - Great for debugging cache
4. **Server Components for initial loads** - Client components for interactions
5. **Test incrementally** - Don't build everything before testing

---

## 🚀 You're Ready!

All the guides are created. The architecture is modern and scalable. Follow the steps in order and you'll have a production-ready app.

**Main guide:** `REACT_QUERY_SETUP.md`

Good luck! 🎉
