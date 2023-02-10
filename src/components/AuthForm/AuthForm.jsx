import React, { useState } from 'react';
import GoogleButton from 'react-google-button';
import '../../views/Auth/Auth.css';

export default function AuthForm({ onSubmit, authenticated }) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await onSubmit();
    } catch (error) {
      throw error;
    } finally {
      // navigateTo('/dashboard', { replace: true });
      setLoading(false);
    }
  };

  return (
    <>
      <div>
        {loading ? (
          'Loading'
        ) : (
          <div id="google-button">
            <GoogleButton onClick={handleSubmit} />
          </div>
        )}
      </div>
    </>
  );
}
