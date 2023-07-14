'use client';
import React, { useState } from 'react';
import SignInForm from './SignInForm';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
// Client Components can be used to trigger the authentication process from event handlers.
// ... aka createClientComponentClient from auth-helpers-nextjs
import type { Database } from '@/lib/database.types';
import Image from 'next/image';

export default function SignIn() {
  const [errorMessage, setErrorMessage] = useState('');
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();

  const handleSignIn = async () => {
    await supabase.auth.signInWithPassword({
      email,
      password
    });
    router.refresh();
  };

  return (
    <>
      <div className="flex relative items-center align-center justify-center h-full w-full">
        <div className="absolute inset-0">
          <Image
            src="/assets/auth_background.jpg"
            alt="drawn background of the sky"
            layout="fill"
            className="w-full h-full inset-0 object-cover absolute -z-1"
          />
        </div>
        <div className="flex flex-col items-center justify-center m-2 h-3/4 w-3/4 z-2">
          <div className="flex flex-col align-center justify-center wrap m-2 h-5/6 w-5/6">
            <div className="flex flex-col justify-between wrap align-center mt-1 p-2 bg-melon rounded-lg opacity-80 p-4 items-center">
              <SignInForm
                handleSignIn={handleSignIn}
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
