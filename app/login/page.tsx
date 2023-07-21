'use client';
import React, { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import type { Database } from '../types/supabase';
import Image from 'next/legacy/image';

// Client Components can be used to trigger the authentication process from event handlers.
// ... aka createClientComponentClient from auth-helpers-nextjs

export default function LogIn() {
  const [errorMessage, setErrorMessage] = useState('');
  const [email, setEmail] = useState('');
  // set out password component later on in components folder
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState<boolean>(false);
  const [view, setView] = useState('signin');
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
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

    const { data } = await supabase
      .from('users')
      .select('user_name')
      .match({ id: session.user.id });
    // set this somewhere in a cookie for future usage
    console.log('session', session);
    if (session && data) {
      router.push('/dashboard');
    } else {
      router.push('/welcome');
    }
    router.refresh();
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
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

  const handleSetView = () => {
    setErrorMessage('');
    setView('signin');
  };

  return (
    <>
      <div className="flex relative items-center align-center justify-center h-full w-full">
        <div className="absolute inset-0">
          {errorMessage && (
            <div
              className="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md"
              role="alert"
            >
              <div className="flex">
                <div className="py-1">
                  <svg
                    className="fill-current h-6 w-6 text-teal-500 mr-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold">Our privacy policy has changed</p>
                  <p className="text-sm">{errorMessage}</p>
                </div>
              </div>
            </div>
          )}
          {view === 'check-email' ? (
            <>
              <div
                className="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3"
                role="alert"
              >
                <p className="font-bold">Please check your email to confirm</p>
                <p className="text-sm">then sign back in to meet Tomomi!</p>
              </div>
            </>
          ) : null}

          <Image
            src="/assets/auth_background.jpg"
            alt="drawn background of the sky"
            layout="fill"
            className="w-full h-full inset-0 object-cover absolute -z-1"
          />
        </div>
        <div className="flex flex-col items-center justify-center m-2 h-3/4 w-3/4 z-2">
          <div className="flex flex-col align-center justify-center wrap m-2 h-5/6 w-5/6">
            <div className="flex flex-col justify-between wrap align-center mt-1 p-2 bg-melon rounded-lg opacity-80 p-4 items-center w-full">
              <div className="flex flex-col justify-center p-2 items-center">
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
                <></>
              ) : (
                <>
                  <form
                    onSubmit={(e) => handleSignIn(e)}
                    className="flex flex-col m-2 justify-center content-center wrap items-center w-5/6"
                  >
                    <div className="m-2 w-5/6 text-md tablet:text-xl">
                      <input
                        value={email}
                        type="email"
                        name="email"
                        aria-label="Email"
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                        placeholder="Email"
                        className="p-2 m-2 w-full text-md tablet:text-xl"
                      />
                    </div>
                    <div className="m-2 w-full text-md tablet:text-xl flex items-center justify-center">
                      <input
                        value={password}
                        type={visible ? 'text' : 'password'}
                        name="password"
                        aria-label="Password"
                        placeholder="Password"
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                        className="p-2 m-2 w-3/4 text-md tablet:text-xl"
                      />
                      {visible ? (
                        <span
                          className="hover:text-white p-3 hover:cursor-pointer"
                          onClick={() => {
                            setVisible(!visible);
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                        </span>
                      ) : (
                        <span
                          className="hover:text-white p-3 hover:cursor-pointer"
                          onClick={() => {
                            setVisible(!visible);
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                            />
                          </svg>
                        </span>
                      )}
                    </div>
                    <div className="p-3 flex flex-col">
                      {view === 'signin' && (
                        <>
                          <button
                            type="submit"
                            className="text-licorice border-2 border-white bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-sans font-bold rounded-lg text-md tablet:text-xl laptop:text-2xl desktop:text-2xl px-5 py-2.5 text-center mr-2 mb-2"
                            onClick={handleSignIn}
                          >
                            Sign In
                          </button>
                          <div className="flex">
                            <span className="p-1">
                              Don&apos;t have an account?
                            </span>
                            <button
                              onClick={() => {
                                setView('signup');
                              }}
                              className="underline hover:text-white p-1"
                            >
                              Sign Up
                            </button>
                          </div>
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
                          <div className="flex">
                            <span className="p-1">
                              Already have an account?
                            </span>
                            <button
                              onClick={() => {
                                handleSetView();
                              }}
                              className="underline hover:text-white p-1"
                            >
                              Sign In
                            </button>
                          </div>
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
