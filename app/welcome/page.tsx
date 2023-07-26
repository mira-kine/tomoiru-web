import WelcomeInput from './WelcomeInput';
import Image from 'next/legacy/image';
import React from 'react';
import type { Database } from '../../types/supabase';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export default async function Welcome() {
  // create supabase client first
  // const supabase = createPagesBrowserClient<Database>();
  // const [username, setUsername] = useState('');
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session }
  } = await supabase.auth.getSession();
  // create two modes of state that renders components depending on what is available
  // get user so you can update
  // set user to cookie

  // useEffect(() => {
  //   // declaring data fetching function
  //   const fetchUsername = async () => {
  //     const {
  //       data: { user }
  //     } = await supabase.auth.getUser();
  //     if (user) {
  //       const { data } = await supabase
  //         .from('users')
  //         .select('*')
  //         .match({ id: user.id });
  //       if (data) {
  //         setUsername(data.user_name);
  //       } else {
  //         setUsername('');
  //         alert('Please enter a username');
  //       }
  //     }
  //   };
  //   fetchUsername().catch(console.error);
  // }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div className="absolute inset-0">
        <Image
          src="/assets/welcome-bg.png"
          alt="drawn background of japanese style entrance"
          layout="fill"
          className="w-full h-full inset-0 object-cover absolute"
        />
      </div>
      <div className="flex flex-col w-1/3 z-5 justify-center items-center p-1 wrap rounded-lg mb-1 mt-2">
        <Image
          className="w-full"
          src="/assets/tomomi_open.png"
          width={375}
          height={335}
          alt="tomomi character animating talking"
        />
      </div>
      <WelcomeInput session={session} />
    </div>
  );
}
