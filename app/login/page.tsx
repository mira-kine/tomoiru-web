"use client";

import { useState, useEffect, FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/legacy/image";
import toast from 'react-hot-toast';
import tomoIcon from '../../public/assets/icons/play.png';
import { authService } from '@/services/auth';

export default function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState<boolean>(false);
  const [view, setView] = useState<"signin" | "signup">("signin");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  // Show error messages from query params (e.g., session_expired, OAuth errors)
  useEffect(() => {
    const error = searchParams.get('error');
    if (error === 'session_expired') {
      toast.error('Your session has expired. Please log in again.');
    } else if (error === 'missing_token') {
      toast.error('Authentication failed. Please try again.');
    } else if (error) {
      toast.error(`Authentication error: ${error}`);
    }
  }, [searchParams]);

  const handleSignIn = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await authService.loginWithEmail(email, password);
      toast.success('Welcome back!');
      // Backend returns token, authService saves it
      // Redirect handled by backend response or we can check user data
      router.push('/dashboard');
      router.refresh();
    } catch (error: any) {
      console.error('Login error:', error);
      toast.error(error.response?.data?.detail || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await authService.signupWithEmail(email, password);
      toast.success('Account created! Welcome to Tomoiru.');
      router.push('/welcome');
      router.refresh();
    } catch (error: any) {
      console.error('Signup error:', error);
      const errorMessage = error.response?.data?.detail || 'Signup failed. Please try again.';

      if (errorMessage.includes('already registered')) {
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
        ));
      } else {
        toast.error(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    // Redirects to backend OAuth flow
    authService.loginWithGoogle();
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
              <>
                <form
                  onSubmit={(e) => view === "signin" ? handleSignIn(e) : handleSignUp(e)}
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
                      disabled={isLoading}
                      className="p-2 m-2 w-11/12 tablet:w-full text-md tablet:text-xl shadow-lg shadow-licorice/20 disabled:opacity-50"
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
                      disabled={isLoading}
                      className="p-2 m-2 w-full tablet:pr-11 text-md tablet:text-xl shadow-lg shadow-licorice/20 disabled:opacity-50"
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
                          disabled={isLoading}
                          className="text-licorice border-2 border-white bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-sans font-bold rounded-lg text-md tablet:text-xl laptop:text-2xl desktop:text-2xl px-5 py-2.5 text-center mr-2 mb-2 shadow-lg shadow-licorice/20 disabled:opacity-50"
                        >
                          {isLoading ? 'Signing In...' : 'Sign In'}
                        </button>

                        {/* Google OAuth Button */}
                        <button
                          type="button"
                          onClick={handleGoogleLogin}
                          disabled={isLoading}
                          className="text-licorice border-2 border-white bg-white hover:bg-gray-50 focus:ring-4 focus:outline-none focus:ring-gray-100 font-sans font-bold rounded-lg text-md tablet:text-xl laptop:text-2xl desktop:text-2xl px-5 py-2.5 text-center mr-2 mb-2 shadow-lg shadow-licorice/20 disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                          <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                          </svg>
                          Sign in with Google
                        </button>

                        <div className="flex">
                          <span className="p-1">
                            Don&apos;t have an account?
                          </span>
                          <button
                            type="button"
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
                          disabled={isLoading}
                          className="text-licorice border-2 border-white bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-sans font-bold rounded-lg text-md tablet:text-xl laptop:text-2xl desktop:text-2xl px-5 py-2.5 text-center mr-2 mb-2 shadow-md shadow-licorice/20 disabled:opacity-50"
                        >
                          {isLoading ? 'Creating Account...' : 'Sign Up'}
                        </button>

                        {/* Google OAuth Button */}
                        <button
                          type="button"
                          onClick={handleGoogleLogin}
                          disabled={isLoading}
                          className="text-licorice border-2 border-white bg-white hover:bg-gray-50 focus:ring-4 focus:outline-none focus:ring-gray-100 font-sans font-bold rounded-lg text-md tablet:text-xl laptop:text-2xl desktop:text-2xl px-5 py-2.5 text-center mr-2 mb-2 shadow-lg shadow-licorice/20 disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                          <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                          </svg>
                          Sign up with Google
                        </button>

                        <div className="flex">
                          <span className="p-1">
                            Already have an account?
                          </span>
                          <button
                            type="button"
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
