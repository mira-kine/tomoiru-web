import React, { useState } from 'react';
import { useForm } from '../../hooks/useForm';

export default function AuthForm({ onSubmit, label, isSigningUp }) {
  const { formState, handleForm, setFormError } = useForm({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  // onSubmit is the handleAuth from Auth.js, API call will depend on
  // which type of form it is (sign in or sign up)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formState;
    try {
      setLoading(true);
      await onSubmit(email, password);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div>
        {loading ? (
          'Loading'
        ) : (
          <div>
            <h2>{isSigningUp ? 'Nice to meet you!' : 'Hi Tomo!'}</h2>
            <form onSubmit={handleSubmit}>
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
                value={formState.password}
                placeholder="Password"
                onChange={handleForm}
              />
            </form>
          </div>
        )}
      </div>
    </>
  );
}
