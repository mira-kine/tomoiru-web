import React from 'react';
import { useForm } from '../../hooks/useForm';
import Loading from '../Reusable/Loading';
import Link from 'next/link';
import onPromise from '../utils/onPromise';

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
      <div id="auth-title">
        <span>Glad you are here</span>
      </div>
      {loading ? (
        <Loading />
      ) : (
        <form onSubmit={onPromise(handleSubmit(handleSignIn))}>
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
