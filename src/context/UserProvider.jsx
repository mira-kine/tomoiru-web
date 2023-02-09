// set up user context to keep user consistent throughout app after signing in.
import { getUser } from '../api/users';
import { createContext, useContext, useEffect, useState } from 'react';

const UserContext = createContext();

function UserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(
    localStorage.getItem('authenticated') || false
  );

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUser();
      setCurrentUser(user);
      setAuthenticated(true);
      localStorage.setItem('authenticated', true);
    };
    fetchUser();
    setLoading(false);
  }, []);

  if (loading) {
    return <h1>loading...</h1>;
  }

  return (
    <UserContext.Provider
      value={{ currentUser, setCurrentUser, authenticated }}
    >
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
