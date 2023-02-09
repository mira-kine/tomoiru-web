import React, { useState } from 'react';
import GoogleButton from 'react-google-button';
import { useNavigate } from 'react-router-dom';

export default function AuthForm({ onSubmit, authenticated }) {
  const [loading, setLoading] = useState(false);
  const navigateTo = useNavigate();

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await onSubmit();
      if (authenticated === true) {
        navigateTo('/dashboard', { replace: true });
      }
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
            <GoogleButton onClick={handleSubmit} />
          </div>
        )}
      </div>
    </>
  );
}
