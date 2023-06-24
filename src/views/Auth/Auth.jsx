import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUpUser } from '../../api/users';
import { signInUser } from '../../api/users';
import AuthForm from '../../components/AuthForm/AuthForm';
import { useAuth } from '../../context/AuthProvider';
import './Auth.css';
import { getCurrentUser } from '../../api/users';
import Loading from '../../components/Loading';

export default function Auth({ isSigningUp = false }) {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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
        alert('Signed up!');
        // navigate to signin page
        navigateTo('/signin');
        // loading false
        setLoading(false);
      } else {
        setLoading(true);
        // sign in user
        const resp = await signInUser(email, password);
        if (resp) {
          // get user data in parsed form
          const user = await getCurrentUser();
          // set user data to local storage
          localStorage.setItem('userLocalStorageData', JSON.stringify(user));
          // set auth status to local storage
          setAuthToken(true);
          if (user.user_name) {
            navigateTo('/dashboard');
            navigateTo(0);
            // setLoading(false);
          } else {
            // show animation of introduction story and then send to welcome
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
        <Loading />
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
