'use client';
import React, { useState } from 'react';
import SignUpForm from './SignUpForm';
import { useRouter } from 'next/navigation';
// Client Components can be used to trigger the authentication process from event handlers.
// ... aka createClientComponentClient from auth-helpers-nextjs
import type { Database } from '@/lib/database.types';

export default function SignUp() {
  const [errorMessage, setErrorMessage] = useState('');
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();

  const handleSignUp = async () => {
    await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`
      }
    });
    router.refresh();
  };

  return (
    <>
      <div
        className="flex
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
                handleSignUp={handleSignUp}
                errorMessage={errorMessage}
                setErrorMessage={setErrorMessage}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
