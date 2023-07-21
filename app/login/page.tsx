'use client';
import React, { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import type { Database } from '../../types/supabase';

// Client Components can be used to trigger the authentication process from event handlers.
// ... aka createClientComponentClient from auth-helpers-nextjs
import Image from 'next/legacy/image';

export default function LogIn() {
  const [errorMessage, setErrorMessage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [view, setView] = useState('signin');
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();

  const handleSignIn = async (e: any) => {
    e.preventDefault();
    setErrorMessage('');
    await supabase.auth.signInWithPassword({
      email,
      password
    });
    const {
      data: { session }
    } = await supabase.auth.getSession();
    if (!session) {
      setErrorMessage('No user found. Try again, or sign up with new account');
    }
    if (session) {
      const { data } = await supabase
        .from('users')
        .select('user_name')
        .match({ id: session.user.id });
      // set this somewhere in a cookie for future usage
      if (session && data) {
        router.push('/dashboard');
      } else {
        router.push('/welcome');
      }
    }
    router.refresh();
  };

  const handleSignUp = async (e: any) => {
    e.preventDefault();
    setErrorMessage('');
    try {
      await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${location.origin}/auth/callback`
        }
      });
      setView('check-email');
    } catch (error) {
      setErrorMessage('Error signing up. Try again');
    }
  };

  const handleSwitchView = () => {
    setErrorMessage('');
    setView('signin');
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
                {view === 'signin' ? (
                  <>
                    <span className="text-4xl tablet:text-6xl laptop:text-8xl p-2 font-script flex">
                      Welcome
                    </span>
                    <span className="text-4xl tablet:text-6xl laptop:text-8xl p-2 font-script">
                      Back
                    </span>
                  </>
                ) : (
                  <>
                    <span className="text-4xl tablet:text-6xl laptop:text-8xl p-2 font-script flex">
                      Glad you
                    </span>
                    <span className="text-4xl tablet:text-6xl laptop:text-8xl p-2 font-script">
                      are here
                    </span>
                  </>
                )}
              </div>
              {/* add check email view for now because current ver pkce + supabase does not auto confirm */}
              {view === 'check-email' ? (
                <>
                  <span>
                    Check <span>{email}</span> to continue signing up
                  </span>
                </>
              ) : (
                <>
                  <form
                    onSubmit={(e) => handleSignIn(e)}
                    className="flex flex-col m-2 justify-center content-center wrap items-center w-5/6"
                  >
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
                      {errorMessage && <p>{errorMessage}</p>}
                      {view === 'signin' && (
                        <>
                          <button
                            type="submit"
                            className="text-licorice border-2 border-white bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-sans font-bold rounded-lg text-md tablet:text-xl laptop:text-2xl desktop:text-2xl px-5 py-2.5 text-center mr-2 mb-2"
                            onClick={handleSignIn}
                          >
                            Sign In
                          </button>
                          <span>Don&apos;t have an account?</span>
                          <button
                            onClick={() => {
                              setView('signup');
                            }}
                            className="text-bold"
                          >
                            Sign Up
                          </button>
                        </>
                      )}
                      {view === 'signup' && (
                        <>
                          <button
                            type="submit"
                            className="text-licorice border-2 border-white bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-sans font-bold rounded-lg text-md tablet:text-xl laptop:text-2xl desktop:text-2xl px-5 py-2.5 text-center mr-2 mb-2"
                            onClick={handleSignUp}
                          >
                            Sign Up
                          </button>
                          <span>Already have an account?</span>
                          <button
                            onClick={() => {
                              handleSwitchView();
                            }}
                          >
                            Sign In
                          </button>
                        </>
                      )}
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
