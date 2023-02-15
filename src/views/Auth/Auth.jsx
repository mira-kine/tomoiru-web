import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, signUpUser } from '../../api/users';
import { signInUser } from '../../api/users';
import AuthForm from '../../components/AuthForm/AuthForm';
import { useAuth } from '../../context/AuthProvider';
import { useUser } from '../../context/UserProvider';
import './Auth.css';

export default function Auth({ isSigningUp = false }) {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { setCurrentUser } = useUser();
  const { setAuthToken } = useAuth();

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
        const resp = await signInUser(email, password);
        if (resp) {
          const user = await getCurrentUser();
          setAuthToken(true);
          setCurrentUser({
            id: user.id,
            email: user.email,
            has_tomo: user.has_tomo,
          });
          if (user.has_tomo) {
            navigateTo('/dashboard');
          } else {
            navigateTo('/welcome');
          }
        } else {
          // error message
          setErrorMessage('Something went wrong. Please try again.');
        }
        // useEffect?
        await new Promise((r) => setTimeout(r, 1500));
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
