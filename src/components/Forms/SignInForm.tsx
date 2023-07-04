'use client';

import React, { useState } from 'react';
import { useForm } from '../../hooks/useForm';
import Loading from '../Reusable/Loading';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import type { Database } from '@/lib/database.types';
import Link from 'next/link';

export default function SignInForm({ errorMessage, setErrorMessage }) {
  const [loading, setLoading] = useState(false);
  const { formState, handleForm } = useForm({
    email: '',
    password: ''
  });
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();

  function onPromise<T>(promise: (event: SyntheticEvent) => Promise<T>) {
    return (event: SyntheticEvent) => {
      if (promise) {
        promise(event).catch((error) => {
          console.log('Unexpected error', error);
        });
      }
    };
  }

  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formState;
    await supabase.auth.signInWithPassword({
      email,
      password
    });
    router.refresh();
  };

  return (
    <>
      <div id="auth-title">
        <span>Glad you are here</span>
      </div>
      {loading ? (
        <Loading />
      ) : (
        <form onSubmit={onPromise(handleSubmit(handleSignInSubmit))}>
          {errorMessage && <p>{errorMessage}</p>}
          <input
            type="email"
            name="email"
            aria-label="Email"
            value={formState.email}
            onChange={handleForm}
            placeholder="Email"
          />
          <input
            type="password"
            name="password"
            aria-label="Password"
            placeholder="Password"
            value={formState.password}
            onChange={handleForm}
          />
          <button
            type="submit"
            disabled={loading}
            className="button button--yellow"
          >
            <div className="button__wrapper">
              <div className="button__text">
                <label>Sign In!</label>
              </div>
            </div>
          </button>
          <div id="sub-title-auth">
            <Link href="/signup">First time? Sign Up!</Link>
          </div>
        </form>
      )}
    </>
  );
}
