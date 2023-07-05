import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';

import type { NextRequest } from 'next/server';
import type { Database } from '@/lib/database.types'

export async function middleware(req: NextRequest) {
    // We need to create a response and hand it to the supabase client to be able to modify the response headers.
  const res = NextResponse.next();
  // Create authenticated Supabase Client.
  const supabase = createMiddlewareClient<Database>({ req, res });
  // check to see if we have session
  const {
    data: { session },
  } = await supabase.auth.getSession()
  // The getSession function must be called for any Server Component routes that use a Supabase client.

  //   get user and verify that there is authenticated supabase user
  const {
    data: { user }
  } = await supabase.auth.getUser();

  // if user is signed in and the current path is / redirect the user to /account
  if (!session?.user.user_name && req.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/welcome', req.url));
  }

  if (session?.user.user_name && req.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }
r
  // if user is not signed in and the current path is not / redirect the user to /
  const redirectUrl = req.nextUrl.clone()
  redirectUrl.pathname = '/'
  redirectUrl.searchParams.set(`redirectedFrom`, req.nextUrl.pathname)
  return NextResponse.redirect(redirectUrl)
  return res;
  }


export const config = {
  matcher: ['/dashboard', '/welcome', '/chat']
};
