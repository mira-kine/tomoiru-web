import React, { useState } from 'react';
import { signUpUser } from './api/users';
import SignUpForm from '../components/Forms/SignUpForm';
import Loading from '../components/Reusable/Loading';
import { useRouter } from 'next/navigation';

export default function signup() {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // change to hook, not state management context
  const router = useRouter();
  const handleSignUp = async (email, password) => {
    try {
      setLoading(true);
      // sign up user
      await signUpUser(email, password);
      // wait for information to come -> have pop up, signed up! now sign in
      alert('Signed up!');
      // navigate to signin page
      router.push('/signin');
      // loading false
      setLoading(false);
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
                <SignUpForm
                  onSubmit={handleSignUp}
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
