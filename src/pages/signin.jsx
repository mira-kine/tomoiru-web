import React, { useState } from 'react';
import { signInUser, getCurrentUser } from './api/users';
import SignInForm from '../components/Forms/SignInForm';
import { useAuth } from '../context/AuthProvider';
import Loading from '../components/Reusable/Loading';
import { useRouter } from 'next/navigation';

export default function signin() {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // change to hook, not state management context
  const { setAuthToken } = useAuth();
  const router = useRouter();

  const handleSignIn = async (email, password) => {
    try {
      setLoading(true);
      // sign in user
      const resp = await signInUser(email, password);

      if (resp) {
        // get user data in parsed form
        const user = await getCurrentUser();
        // set user data to local storage
        // localStorage.setItem('userLocalStorageData', JSON.stringify(user));
        // set auth status to local storage
        setAuthToken(true);
        if (user.user_name) {
          router.push('/dashboard');
          router.push(0);
          // setLoading(false);
        } else {
          // show animation of introduction story and then send to welcome
          router.push('/welcome');
        }
      }
    } catch (error) {
      if (error.status === 400 || error.status === 401) {
        setErrorMessage('Invalid email or password. Please try again.');
      } else {
        setErrorMessage('Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div
          className="display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        width: 100%;
        background-image: url('../assets/auth_background.jpg');
        background-size: cover;
        background-position: center;"
        >
          <div className="auth-container">
            <div className="auth-title-container">
              <div id="auth-form-div" className="form-container">
                <SignInForm
                  onSubmit={handleSignIn}
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
// cleaned up eslint
