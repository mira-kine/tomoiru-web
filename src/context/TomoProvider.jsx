import { getTomo } from '../api/tomos';
import { createContext, useContext, useEffect, useState } from 'react';

const TomoContext = createContext();

function TomoProvider({ children }) {
  const [tomo, setTomo] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTomo = async () => {
      const resp = await getTomo();
      setTomo(resp);
      setLoading(false);
    };
    fetchTomo();
  }, []);

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
