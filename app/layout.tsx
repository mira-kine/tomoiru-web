import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import localFont from 'next/font/local';
// These styles apply to every route in the application
import '../../styles/globals.css';
import type { AppProps } from 'next/app';
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import type Session from '@supabase/auth-helpers-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tomoiru',
  description: 'Where you can travel Japan with a friend'
};

// font files can be colocated inside of app
const bubbly = localFont({
  src: './fonts/Cherry/CherryBombOne-Regular.ttf',
  display: 'swap',
  variable: '--font-cherry'
});

const gruppo = localFont({
  src: './fonts/Gruppo/Gruppo-Regular.ttf',
  display: 'swap',
  variable: '--font-gruppo'
});

const [supabaseClient] = useState(() => createPagesBrowserClient());

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <SessionContextProvider
        supabaseClient={supabaseClient}
        initialSession={pageProps.initialSession}
      >
        <body>{children}</body>
      </SessionContextProvider>
    </html>
  );
}
