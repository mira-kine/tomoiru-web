'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Link from 'next/link';
import type { Database } from '@/lib/database.types';

// Client Components can be used to trigger the authentication process from event handlers.
// ... aka createClientComponentClient from auth-helpers-nextjs
import Image from 'next/image';

export default function SignIn() {
  const [errorMessage, setErrorMessage] = useState('');
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async (): void => {
    try {
      await supabase.auth.signInWithPassword({
        email,
        password
      });
    } catch (error) {
      setErrorMessage('Error signing in. Try again');
    } finally {
      router.refresh();
    }
  };

  return (
    <>
      <div className="flex relative items-center align-center justify-center h-full w-full">
        <div className="absolute inset-0">
          <Image
            src="/assets/auth_background.jpg"
            alt="drawn background of the sky"
            layout="fill"
            className="w-full h-full inset-0 object-cover absolute -z-1"
          />
        </div>
        <div className="flex flex-col items-center justify-center m-2 h-3/4 w-3/4 z-2">
          <div className="flex flex-col align-center justify-center wrap m-2 h-5/6 w-5/6">
            <div className="flex flex-col justify-between wrap align-center mt-1 p-2 bg-melon rounded-lg opacity-80 p-4 items-center">
              <div className="flex flex-col justify-center p-2">
                <span className="text-4xl tablet:text-6xl laptop:text-8xl p-2 font-script flex">
                  Welcome
                </span>
                <span className="text-4xl tablet:text-6xl laptop:text-8xl p-2 font-script">
                  Back
                </span>
              </div>
              <form
                onSubmit={handleSignIn}
                className="flex flex-col m-2 justify-center content-center wrap items-center w-5/6"
              >
                {errorMessage && <p>{errorMessage}</p>}
                <input
                  type="email"
                  name="email"
                  aria-label="Email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  placeholder="Email"
                  className="p-2 m-2 w-3/4 text-md tablet:text-xl"
                />
                <input
                  type="password"
                  name="password"
                  aria-label="Password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  className="p-2 m-2 w-3/4 text-md tablet:text-xl"
                />
                <div className="p-3">
                  <button
                    type="submit"
                    className="text-licorice border-2 border-white bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-sans font-bold rounded-lg text-md tablet:text-xl laptop:text-2xl desktop:text-4xl px-5 py-2.5 text-center mr-2 mb-2"
                    onClick={handleSignIn}
                  >
                    Sign In
                  </button>
                </div>
                <div id="sub-title-auth">
                  <span>First time?</span>
                  <Link href="/auth/signup">Sign Up!</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
