'use client';
import React, { useState } from 'react';
import SignInForm from '../components/Forms/SignInForm';
import Loading from '../components/Reusable/Loading';
import { useRouter } from 'next/navigation';
// Client Components can be used to trigger the authentication process from event handlers.
// ... aka createClientComponentClient from auth-helpers-nextjs
import type { Database } from '@/lib/database.types';

export default function SignIn() {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();

  const handleSignIn = async () => {
    setLoading(true);
    await supabase.auth.signInWithPassword({
      email,
      password
    });
    setLoading(false);
    router.refresh();
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
                  handleSignIn={handleSignIn}
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
