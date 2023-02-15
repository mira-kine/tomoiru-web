import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, signUpUser } from '../../api/users';
import { signInUser } from '../../api/users';
import AuthForm from '../../components/AuthForm/AuthForm';
import { useUser } from '../../context/UserProvider';
import './Auth.css';

export default function Auth({ isSigningUp = false }) {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigateTo = useNavigate();
  const { currentUser, setCurrentUser } = useUser();
  console.log('currentUser', currentUser);

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
        const resp = await getCurrentUser();
        await setCurrentUser({
          id: resp.id,
          email: resp.email,
          has_tomo: resp.has_tomo,
        });
        await new Promise((r) => setTimeout(r, 1500));
        if (currentUser.has_tomo) {
          navigateTo('/dashboard');
        } else {
          navigateTo('/welcome');
        }
        setLoading(false);
      }
    } catch (error) {
      setErrorMessage('Something went wrong. Please try again.');
    }
  };
  console.log('currrentUser', currentUser);

  return (
    <>
      {loading ? (
        <div className="loading-page">
          <img
            src={require(`../../assets/hamtaro.gif`)}
            alt="hamtaro loading prop"
          />
        </div>
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
