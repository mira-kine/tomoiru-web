// set up user context to keep user consistent throughout app after signing in.
import { getUser } from '../api/users';
import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

function UserProvider({ children }) {
  const currentUser = getUser();
  console.log('currentUser', currentUser);
  // temporary empy user object

  const [user, setUser] = useState(currentUser ? { id: currentUser.id } : {});

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

const useUser = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error('useUser must be inside the UserProvider wrapper');
  }

  return context;
};

export { UserProvider, useUser };
