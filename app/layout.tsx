import { Suspense, ReactNode } from "react";
import localFont from "next/font/local";
import Loading from "./loading";
import NavBar from "./components/NavBar";
import { Toaster } from 'react-hot-toast';
import QueryProvider from './providers/QueryProvider';
// These styles apply to every route in the application
import type { Metadata } from "next";
import "./global.css";
// adding this line to fix current bug of dyanmic serve error
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Tomoiru",
  description: "Where you can travel Japan with a friend",
};

// font files can be colocated inside of app
const bubbly = localFont({
  src: "../public/fonts/Cherry/CherryBombOne-Regular.ttf",
  display: "swap",
  variable: "--font-cherry",
});

const gruppo = localFont({
  src: "../public/fonts/Gruppo/Gruppo-Regular.ttf",
  display: "swap",
  variable: "--font-gruppo",
});

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={`${bubbly.variable} ${gruppo.variable}`}>
      <body>
        <Suspense fallback={<Loading />}>
          <QueryProvider>
            <NavBar />
            <Toaster />
            {children}
          </QueryProvider>
        </Suspense>
      </body>
    </html>
  );
}
