import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getCurrentUser, signInWithGoogle } from '../../api/users';
import AuthForm from '../../components/AuthForm/AuthForm';
import { useUser } from '../../context/UserProvider';
import './Auth.css';

export default function Auth() {
  const { currentUser } = useUser();
  const history = useHistory();

  const handleAuth = async () => {
    try {
      await signInWithGoogle();
      if (currentUser.has_tomo === false) {
        // if boolean false, first time tomo
        history.push('/welcome');
      } else {
        // if boolean true, has tomo already
        history.push('/dashboard');
      }
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
