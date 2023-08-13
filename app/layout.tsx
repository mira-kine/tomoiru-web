import React, {Suspense} from 'react';
import localFont from 'next/font/local';
import Loading from './loading'
import NavBar from './components/NavBar'
// These styles apply to every route in the application
import type { Metadata } from 'next';
import './global.css';
// adding this line to fix current bug of dyanmic serve error
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Tomoiru',
  description: 'Where you can travel Japan with a friend'
};

// font files can be colocated inside of app
const bubbly = localFont({
  src: '../public/fonts/Cherry/CherryBombOne-Regular.ttf',
  display: 'swap',
  variable: '--font-cherry'
});

const gruppo = localFont({
  src: '../public/fonts/Gruppo/Gruppo-Regular.ttf',
  display: 'swap',
  variable: '--font-gruppo'
});


export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${bubbly.variable} ${gruppo.variable}`}>
      <body>
        <Suspense fallback={<Loading />}>
        <NavBar />
        {children}
        </Suspense>
      </body>
    </html>
  );
}
