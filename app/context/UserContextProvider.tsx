'use client'
import { useState, useEffect, useContext, createContext, } from 'react';
import type {Dispatch, SetStateAction} from 'react';
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";


interface User {
    id: string;
    email: string;
    user_name: string;
}

interface UserProps {
    user: User;
    setUser: Dispatch<SetStateAction<User>>
}

const UserContext = createContext<UserProps>({
  user: {id: '', email: '', user_name: ''},
  setUser: () => {}
});

const UserContextProvider = ({children}: any) => {
  const supabase = createClientComponentClient();
    const [user, setUser] = useState<User>({
      id: '', email: '', user_name: ''
    });

    useEffect(() => {
        const fetchUser = async () => {
          const {
            data: { user },
          } = await supabase.auth.getUser();
          if(user) {
            await supabase.from('users').select().eq('id', user.id)
            setUser(user);
          }
        };
        fetchUser().catch((error) => {
          throw error;
        })
      }, [supabase]);

      return (
        <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>
      );
};

const useUser = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error('useUser must be defined within a UserContext Provider');
  }
  return context;
};

export { UserContextProvider, useUser };