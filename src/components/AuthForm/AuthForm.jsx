import React, { useState } from 'react';
import GoogleButton from 'react-google-button';

export default function AuthForm({ onSubmit }) {
  const [loading, setLoading] = useState(false);

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
