'use client';
import TextBox from '../components/TextBox';
import Image from 'next/legacy/image';
import React, { useEffect, useState } from 'react';
import type { Database } from '../types/supabase';
import {
  type Session,
  createPagesBrowserClient
} from '@supabase/auth-helpers-nextjs';

export default function Welcome({ session }: { session: Session | null }) {
  // create supabase client first
  const supabase = createPagesBrowserClient<Database>();
  const [username, setUsername] = useState('');

  // create two modes of state that renders components depending on what is available
  // get user so you can update
  // set user to cookie

  useEffect(() => {
    // declaring data fetching function
    const fetchUsername = async () => {
      const {
        data: { user }
      } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from('users')
          .select('*')
          .match({ id: user.id });
        if (data) {
          setUsername(data.user_name);
        } else {
          setUsername('');
          alert('Please enter a username');
        }
      }
    };
    fetchUsername().catch(console.error);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div className="absolute inset-0">
        <Image
          src="/assets/welcome-bg.png"
          alt="drawn background of japanese style entrance"
          layout="fill"
          priority="true"
          className="w-full h-full inset-0 object-cover absolute"
        />
      </div>
      <div className="flex flex-col w-1/3 z-5 justify-center items-center p-1 wrap rounded-lg mb-1 mt-2">
        {/* <Image
          className="w-full"
          src="/assets/tomomi_open.png"
          priority="true"
          width="375px"
          height="300px"
          alt="tomomi character animating talking"
        /> */}
      </div>
      <TextBox setUsername={setUsername} username={username} />
    </div>
  );
}
