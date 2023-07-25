import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'
import type { Database } from './types/supabase';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient<Database>({ req, res })

  // const {
  //   data: {user},
  // } = await supabase.auth.getUser()
  // if user is signed in and does not have username current path is / redirect to /welcome
  // if (user && req.nextUrl.pathname === '/') {
  //   return NextResponse.redirect(new URL('/login', req.url))
  // }

  // // if user is not signed in and the current path is not / redirect the user to /
  // if (!user && req.nextUrl.pathname !== '/') {
  //   return NextResponse.redirect(new URL('/', req.url))
  // }
  const session = await supabase.auth.getSession()
  return res
}

export const config = {
  matcher:['/', '/login', '/welcome', '/dashboard']
}