"use client";
import React, { useState } from "react";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import type { Database } from "../../types/supabase";
import Image from "next/legacy/image";
import toast from 'react-hot-toast'
import tomoIcon from '../../public/assets/icons/play.png'

// Client Components can be used to trigger the authentication process from event handlers.
// ... aka createClientComponentClient from auth-helpers-nextjs

export default function LogIn() {
  const [email, setEmail] = useState("");
  // set out password component later on in components folder
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState<boolean>(false);
  const [view, setView] = useState("signin");
  const router = useRouter();
  const supabase = createPagesBrowserClient<Database>();

  const handleSignIn = async (e: any) => {
    e.preventDefault();
    await supabase.auth.signInWithPassword({
      email,
      password,
    });

    const {
      data: { session },
    } = await supabase.auth.getSession();

    console.log('session', session)


    if (!session) {
      toast.error("No user found. Try again, or sign up with new account");
    }

    if (session) {
      const { data }: any = await supabase
        .from("users")
        .select("*")
        .match({ id: session.user.id });

      // set this somewhere in session data for future usage

      if (data[0].user_name) {
        router.push("/dashboard");
      } else {
        router.push("/welcome");
      }
      router.refresh();
    }
  };

  const handleSignUp = async (e: any) => {
    e.preventDefault();

    const {
      data: { session },
    } = await supabase.auth.getSession();

    try {
      if(session?.user.email === email) {
        toast.custom((signupToast) => (
          <div
            className={`${
              signupToast.visible ? 'animate-enter' : 'animate-leave'
            } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5 z-40`}
          >
            <div className="flex-1 w-0 p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 pt-0.5">
                  <Image src={tomoIcon} alt="icon of tomomi"/>
                </div>
                <div className="ml-3 flex-1">
                  <p className="mt-1 text-sm text-gray-500">
                    You already have an account!
                  </p>
                </div>
              </div>
            </div>
            <div className="flex border-l border-gray-200">
              <button
                onClick={() => {toast.dismiss(signupToast.id)}}
                className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Close
              </button>
            </div>
          </div>
        ))
      }
        await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${location.origin}/auth/callback`,
          },
        });
    } catch (error) {
      toast.error("Error signing up. Try again");
    }
  };

  const handleSetView = () => {
    setView("signin");
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
            priority={true}
          />
        </div>
        <div className="flex flex-col items-center justify-center m-2 h-3/4 tablet:h-full w-5/6 tablet:w-11/12 z-30">
          <div className="flex flex-col align-center justify-center wrap m-2 h-5/6 tablet:h-full laptop:h-5/6 w-5/6">
            <div className="flex flex-col justify-between wrap align-center mt-1 p-2 bg-melon drop-shadow-lg rounded-xl opacity-80 p-4 items-center w-full tablet:h-3/4 tablet:justify-center laptop:h-full laptop:p-4">
              <div className="flex flex-col justify-center p-2 items-center wrap tablet:m-8">
                {view === "signin" ? (
                  <>
                    <span className="text-5xl tablet:text-8xl laptop:text-9xl p-2 font-script flex">
                      Welcome
                    </span>
                    <span className="text-5xl tablet:text-8xl laptop:text-9xl p-2 font-script">
                      Back
                    </span>
                  </>
                ) : (
                  <>
                    <span className="text-5xl tablet:text-8xl laptop:text-9xl p-1 font-script flex">
                      Glad you
                    </span>
                    <span className="text-5xl tablet:text-8xl laptop:text-9xl p-1 font-script">
                      are here
                    </span>
                  </>
                )}
              </div>
              {/* add check email view for now because current ver pkce + supabase does not auto confirm */}
                <>
                  <form
                    onSubmit={(e) => handleSignIn(e)}
                    className="flex flex-col m-2 justify-center content-center wrap items-center w-5/6"
                  >
                    <div className="m-2 w-full text-md tablet:text-xl max-w-lg">
                      <input
                        value={email}
                        type="email"
                        name="email"
                        aria-label="Email"
                        autoComplete="off"
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                        placeholder="Email"
                        className="p-2 m-2 w-11/12 tablet:w-full text-md tablet:text-xl shadow-lg shadow-licorice/20"
                      />
                    </div>
                    <div className="m-2 w-full text-md tablet:text-xl flex items-center max-w-lg relative">
                      <input
                        value={password}
                        type={visible ? "text" : "password"}
                        name="password"
                        aria-label="Password"
                        placeholder="Password"
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                        className="p-2 m-2 w-full tablet:pr-11 text-md tablet:text-xl shadow-lg shadow-licorice/20"
                      />
                      {visible ? (
                        <span
                          className="text-licorice hover:text-melon hover:cursor-pointer absolute right-4 z-12"
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
                          className="text-licorice hover:text-melon hover:cursor-pointer absolute right-4 z-12"
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
                      {view === "signin" && (
                        <>
                          <button
                            type="submit"
                            className="text-licorice border-2 border-white bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-sans font-bold rounded-lg text-md tablet:text-xl laptop:text-2xl desktop:text-2xl px-5 py-2.5 text-center mr-2 mb-2 shadow-lg shadow-licorice/20"
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
                                setView("signup");
                              }}
                              className="underline hover:text-white p-1"
                            >
                              Sign Up
                            </button>
                          </div>
                        </>
                      )}
                      {view === "signup" && (
                        <>
                          <button
                            type="submit"
                            className="text-licorice border-2 border-white bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-sans font-bold rounded-lg text-md tablet:text-xl laptop:text-2xl desktop:text-2xl px-5 py-2.5 text-center mr-2 mb-2 shadow-md shadow-licorice/20"
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
