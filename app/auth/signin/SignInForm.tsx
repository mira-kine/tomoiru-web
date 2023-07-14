import React from 'react';
import { useForm } from '../../hooks/useForm';
import Link from 'next/link';

export default function SignInForm({
  errorMessage,
  setErrorMessage,
  handleSignIn
}) {
  const { formState, handleForm } = useForm({
    email: '',
    password: ''
  });

  return (
    <>
      <div className="flex flex-col justify-center p-2">
        <span className="text-4xl tablet:text-6xl laptop:text-8xl p-2 font-script flex">
          Glad you
        </span>
        <span className="text-4xl tablet:text-6xl laptop:text-8xl p-2 font-script">
          are here
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
          value={formState.email}
          onChange={handleForm}
          placeholder="Email"
          className="p-2 m-2 w-3/4 text-md tablet:text-xl"
        />
        <input
          type="password"
          name="password"
          aria-label="Password"
          placeholder="Password"
          value={formState.password}
          onChange={handleForm}
          className="p-2 m-2 w-3/4 text-md tablet:text-xl"
        />
        <div className="p-3">
          <button
            type="submit"
            className="text-licorice border-2 border-white bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-sans font-bold rounded-lg text-md tablet:text-xl laptop:text-2xl desktop:text-4xl px-5 py-2.5 text-center mr-2 mb-2"
          >
            Submit
          </button>
        </div>
        <div id="sub-title-auth">
          <Link href="/auth/signup">First time? Sign Up!</Link>
        </div>
      </form>
    </>
  );
}
