import React, { useState } from 'react';
import { useForm } from '../../hooks/useForm';
import Loading from '../Reusable/Loading';
import Link from 'next/link';

export default function SignInForm({
  errorMessage,
  setErrorMessage,
  onSubmit
}) {
  const [loading, setLoading] = useState(false);
  const { formState, handleForm } = useForm({
    email: '',
    password: ''
  });

  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formState;
    try {
      setLoading(true);
      await onSubmit(email, password);
    } catch (error) {
      setErrorMessage('Error Signing In. Try again.');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div id="auth-title">
        <span>Glad you are here</span>
      </div>
      {loading ? (
        <Loading />
      ) : (
        <form onSubmit={handleSignInSubmit}>
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
