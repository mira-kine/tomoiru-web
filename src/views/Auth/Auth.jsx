import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUpUser } from '../../api/users';
import { signInUser } from '../../api/users';
import AuthForm from '../../components/AuthForm/AuthForm';
import './Auth.css';

export default function Auth({ isSigningUp = false }) {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigateTo = useNavigate();

  const handleAuth = async (email, password) => {
    try {
      if (isSigningUp) {
        setLoading(true);
        // sign up user
        await signUpUser(email, password);
        // wait for information to come
        await new Promise((r) => setTimeout(r, 1500));
        // navigate to welcome page
        navigateTo('/signin');
        // loading false
        setLoading(false);
      } else {
        setLoading(true);
        // sign in user
        await signInUser(email, password);
        await new Promise((r) => setTimeout(r, 1500));
        navigateTo('/dashboard');
        setLoading(false);
      }
    } catch (error) {
      setErrorMessage('Something went wrong. Please try again.');
    }
  };

  if (loading) {
    <h1>Loading...</h1>;
  }

  return (
    <>
      {loading ? (
        <div id="loading-page">
          <img
            src={require(`../../assets/hamtaro.gif`)}
            alt="hamtaro loading prop"
          />
        </div>
      ) : (
        <div id="auth-view-container">
          <div id="auth-container">
            <div id="auth-title-container">
              <div id="auth-form-div">
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
