import React from 'react';
import { useForm } from '../../hooks/useForm';
import Loading from '../Reusable/Loading';
import Link from 'next/link';
import onPromise from '../utils/onPromise';

export default function SignUpForm({
  errorMessage,
  setErrorMessage,
  handleSignUp
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
        <form onSubmit={onPromise(handleSubmit(handleSignUp))}>
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
                <label>Sign Up!</label>
              </div>
            </div>
          </button>
          <div id="sub-title-auth">
            <Link href="/signin">Already have a Tomo? Sign in!</Link>
          </div>
        </form>
      )}
    </>
  );
}
