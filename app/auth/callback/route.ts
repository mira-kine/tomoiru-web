// The Next.js Auth Helpers are configured to use the server-side auth flow to sign users into your application. This requires you to setup a Code Exchange route, to exchange an auth code for the user's session, which is set as a cookie for future requests made to Supabase.

// To make this work with Next.js, we create a callback Route Handler that performs this exchange:
import type { NextApiHandler } from 'next';
import { createPagesServerClient } from '@supabase/auth-helpers-nextjs';

const handler: NextApiHandler = async (req, res) => {
  const { code } = req.query;

  if (code) {
    const supabase = createPagesServerClient({ req, res });
    await supabase.auth.exchangeCodeForSession(String(code));
  }

  res.redirect('/');
};

export default handler;
