import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUpUser } from '../../api/users';
import { signInUser } from '../../api/users';
import AuthForm from '../../components/AuthForm/AuthForm';
import { useAuth } from '../../context/AuthProvider';
import './Auth.css';
import { useStateWithStorage } from '../../hooks/useStateWithStorage';
import { getCurrentUser } from '../../api/users';

export default function Auth({ isSigningUp = false }) {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [currentUser, setCurrentUser] = useStateWithStorage(
    null,
    'currentUser'
  );

  // change to hook, not state management context
  const { setAuthToken } = useAuth();
  const navigateTo = useNavigate();

  const handleAuth = async (email, password) => {
    try {
      if (isSigningUp) {
        setLoading(true);
        // sign up user
        await signUpUser(email, password);
        // wait for information to come -> have pop up, signed up! now sign in
        // navigate to welcome page
        navigateTo('/signin');
        // loading false
        setLoading(false);
      } else {
        setLoading(true);
        // sign in user
        const resp = await signInUser(email, password);
        if (resp) {
          const user = await getCurrentUser();
          console.log('user', user);
          setAuthToken(true);
          if (user) {
            setCurrentUser(JSON.stringify(user));
          }
          if (user.has_tomo) {
            navigateTo('/dashboard');
          } else {
            navigateTo('/welcome');
          }
        }
      }
    } catch (error) {
      setErrorMessage('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <div className="loading-page">Loading...</div>
      ) : (
        <div id="auth-view-container">
          <div id="auth-container">
            <div id="auth-title-container">
              <div id="auth-form-div" className="form-container">
                <AuthForm
                  onSubmit={handleAuth}
                  label={isSigningUp ? 'Sign Up!' : 'Meet your Tomo'}
                  isSigningUp={isSigningUp}
                  errorMessage={errorMessage}
                  setErrorMessage={setErrorMessage}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
