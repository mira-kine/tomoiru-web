// set up user context to keep user consistent throughout app after signing in.
import { getCurrentUser } from '../api/users';
import { createContext, useContext, useEffect, useState } from 'react';

const UserContext = createContext();

function UserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(
    localStorage.setItem('authenticated', false) || false
  );

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getCurrentUser();
      if (authenticated === true) {
        setAuthenticated(true);
        setCurrentUser(user);
      }
    };
    fetchUser();
    setLoading(false);
  }, []);

  if (loading) {
    return <h1>loading...</h1>;
  }

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
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
