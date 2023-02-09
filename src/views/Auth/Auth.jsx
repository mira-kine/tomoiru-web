import React, { useState } from 'react';
import { signInWithGoogle } from '../../api/users';
import AuthForm from '../../components/AuthForm/AuthForm';
import { useUser } from '../../context/UserProvider';

export default function Auth() {
  const { setCurrentUser } = useUser();
  const [authenticated, setAuthenticated] = useState(
    localStorage.getItem('authenticated') || false
  );

  const handleAuth = async () => {
    try {
      const resp = await signInWithGoogle();
      if (resp) {
        setCurrentUser(resp);
        setAuthenticated(true);
        localStorage.setItem('authenticated', true);
      }
      // history.replace because you don't want to go back to log in page after you logged in
    } catch (error) {
      throw error;
    }
  };
  return (
    <div>
      <AuthForm onSubmit={handleAuth} authenticated={authenticated} />
    </div>
  );
}
