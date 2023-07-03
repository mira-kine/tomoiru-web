// These styles apply to every route in the application
import React, { useState } from 'react';
import '../../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '../components/Layout';
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import type Session from '@supabase/auth-helpers-react';

export default function App({
  Component,
  pageProps
}: AppProps<{
  initialSession: Session;
}>) {
  // Create a new supabase browser client on every first render.
  const [supabaseClient] = useState(() => createPagesBrowserClient());

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionContextProvider>
  );
}
