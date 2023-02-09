import React, { useState } from 'react';
import { signInWithGoogle } from '../../api/users';
import AuthForm from '../../components/AuthForm/AuthForm';
import { useUser } from '../../context/UserProvider';
import './Auth.css';

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
    } catch (error) {
      throw error;
    }
  };
  return (
    <div id="view-auth-container">
      <h2 id="signin-title">Meet your Tomo!</h2>
      <div id="google-button-div">
        <AuthForm onSubmit={handleAuth} authenticated={authenticated} />
      </div>
    </div>
  );
}
