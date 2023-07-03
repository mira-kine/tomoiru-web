import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type NextRequest from 'next/server';

export async function GET(req: NextRequest) {
  const supabase = createRouteHandlerClient({ cookies });
  const { searchParams } = new URL(req.url);
  //   retrieve code sent back from supabase auth server using code query parameter
  const code = searchParams.get('code');
  // exchange code for session in cookies
  if (code) {
    await supabase.auth.exchangeCodeForSession(code);
  }
  // redirect user to dashboard page
  return NextResponse.redirect(new URL('/dashboard', req.url));
}
