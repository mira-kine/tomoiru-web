// set up user context to keep user consistent throughout app after signing in.
import { createContext, useContext, useEffect, useState } from 'react';

const UserContext = createContext();

function UserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(
    localStorage.getItem('userLocalStorageData') || null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // get user data from local storage
    setLoading(true);
    const storedUserData = localStorage.getItem('userLocalStorageData');

    // if it exists, set it in the context state
    if (storedUserData) {
      setCurrentUser(JSON.parse(storedUserData));
    }
    setLoading(false);
  }, []);

  const updateUserData = (newUserData) => {
    // update user with new data
    // setCurrentUser(newUserData);
    setCurrentUser((prevState) => {
      return { ...prevState, user_name: newUserData };
    });

    // store updated user data in local storage
    localStorage.setItem('userLocalStorageData', JSON.stringify(currentUser));
  };

  if (loading) {
    return <h1>loading...</h1>;
  }

  return (
    <UserContext.Provider value={{ currentUser, updateUserData }}>
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
