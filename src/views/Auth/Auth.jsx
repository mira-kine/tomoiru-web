import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signUpUser } from '../../api/users';
import { signInUser } from '../../api/users';
import AuthForm from '../../components/AuthForm/AuthForm';
import { useUser } from '../../context/UserProvider';
import './Auth.css';

export default function Auth({ isSigningUp = false }) {
  const { currentUser, setCurrentUser } = useUser();
  const navigateTo = useNavigate();
  console.log('currentUser', currentUser);

  const handleAuth = async (email, password) => {
    try {
      if (isSigningUp) {
        await signUpUser(email, password);
        navigateTo('/signin');
      } else {
        const resp = await signInUser(email, password);
        setCurrentUser({
          id: resp.id,
          email: resp.email,
          has_tomo: resp.has_tomo,
        });
        if (currentUser.has_tomo === false) {
          // if boolean false, first time tomo
          navigateTo('/welcome');
        } else {
          // if boolean true, has tomo already
          navigateTo('/dashboard');
        }
      }
    } catch (error) {
      throw error;
    }
  };
  return (
    <div id="view-auth-container">
      <h2 id="signin-title">Meet your Tomo!</h2>
      <div id="google-button-div">
        <AuthForm
          onSubmit={handleAuth}
          label={isSigningUp ? 'Sign Up!' : 'Meet your Tomo'}
          isSigningUp={isSigningUp}
        />
      </div>
    </div>
  );
}
