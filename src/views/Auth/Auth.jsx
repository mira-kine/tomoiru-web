import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithGoogle } from '../../api/users';
import AuthForm from '../../components/AuthForm/AuthForm';
import { useUser } from '../../context/UserProvider';
import './Auth.css';

export default function Auth() {
  // const { setCurrentUser } = useUser();

  const handleAuth = async () => {
    try {
      await signInWithGoogle();
      // await setCurrentUser(resp);
    } catch (error) {
      throw error;
    }
  };
  return (
    <div id="view-auth-container">
      <h2 id="signin-title">Meet your Tomo!</h2>
      <div id="google-button-div">
        <AuthForm onSubmit={handleAuth} />
      </div>
    </div>
  );
}
