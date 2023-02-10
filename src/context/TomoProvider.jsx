import { getTomo } from '../api/tomos';
import { createContext, useContext, useEffect, useState } from 'react';
import { useUser } from './UserProvider';

const TomoContext = createContext();

function TomoProvider({ children }) {
  const [tomo, setTomo] = useState({});
  const [loading, setLoading] = useState(true);
  const { currentUser } = useUser();
  console.log('currentUser', currentUser);

  useEffect(() => {
    const fetchTomo = async () => {
      const resp = await getTomo(currentUser.id);
      if (!resp) {
        return null;
      }
      setTomo(resp);
      setLoading(false);
    };
    fetchTomo();
  }, [currentUser.id]);

  if (loading) {
    return <h1>loading...</h1>;
  }

  return (
    <TomoContext.Provider value={{ tomo, setTomo }}>
      {children}
    </TomoContext.Provider>
  );
}

const useTomo = () => {
  const context = useContext(TomoContext);

  if (context === undefined) {
    throw new Error('useTomo must be inside the TomoProvider wrapper');
  }

  return context;
};

export { TomoProvider, useTomo };
