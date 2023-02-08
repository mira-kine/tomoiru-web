import React, { useState } from 'react';
// import { useForm } from '../../hooks/useForm';
import GoogleButton from 'react-google-button';

export default function AuthForm({ onSubmit }) {
  const [loading, setLoading] = useState(false);
  // onSubmit is the handleAuth from Auth.js, API call will depend on
  // which type of form it is (sign in or sign up)
  const handleSubmit = async () => {
    try {
      setLoading(true);
      await onSubmit();
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
            <GoogleButton onClick={() => handleSubmit()} />
          </div>
        )}
      </div>
    </>
  );
}
