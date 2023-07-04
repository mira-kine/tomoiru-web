import React, { useState } from 'react';
import { signInUser, getCurrentUser } from './api/users';
import SignInForm from '../components/Forms/SignInForm';
import Loading from '../components/Reusable/Loading';
import { useRouter } from 'next/navigation';

export default function signin() {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // change to hook, not state management context
  const router = useRouter();

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
