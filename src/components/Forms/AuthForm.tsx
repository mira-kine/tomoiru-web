'use client';
import React from 'react';
import { Auth } from '@supabase/auth-ui-react';
import {
  // Import predefined theme
  ThemeSupa
} from '@supabase/auth-ui-shared';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import type { Database } from './database.types';

// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;

// const supabase = createClient(supabaseUrl, supabaseKey);

export default function AuthForm() {
  const supabase = createClientComponentClient<Database>();

  return (
    <Auth
      supabaseClient={supabase}
      appearance={{ theme: ThemeSupa }}
      providers={['google', 'facebook', 'twitter']}
      queryParams={{
        access_type: 'offline',
        prompt: 'consent',
        hd: 'domain.com'
      }}
      redirectTo="http://localhost:3000/auth/callback"
    />
  );
}
