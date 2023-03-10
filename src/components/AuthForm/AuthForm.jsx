import React, { useState } from 'react';
import '../../views/Auth/Auth.css';
import { useForm } from '../../hooks/useForm';
import { Link } from 'react-router-dom';

export default function AuthForm({
  errorMessage,
  setErrorMessage,
  onSubmit,
  isSigningUp,
  label,
}) {
  const [loading, setLoading] = useState(false);
  const { formState, handleForm } = useForm({
    email: '',
    password: '',
  });

  const handleSubmit = async (e) => {
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
      {loading ? (
        'Loading'
      ) : (
        <>
          <div id="auth-title">
            <span>
              {isSigningUp ? 'Glad you are here' : 'Great to see you again'}
            </span>
          </div>
        </>
      )}
      <form onSubmit={handleSubmit}>
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
          className="button button--piyo"
        >
          <div className="button__wrapper">
            <div className="button__text">{label}</div>
          </div>
        </button>
        <div id="sub-title-auth">
          {!isSigningUp ? (
            <Link to="/signup">No account? Sign up!</Link>
          ) : (
            <Link to="/signin">Already have a Tomo? Sign in!</Link>
          )}
        </div>
      </form>
    </>
  );
}
