import { useState, useEffect } from 'react';
import { getTomo } from '../api/tomos';

export function useTomo({ currentUser }) {
  const [tomo, setTomo] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTomo = async () => {
      if (!currentUser) {
        return null;
      }
      if (currentUser !== {} || currentUser !== null) {
        const resp = await getTomo(currentUser.id);
        setTomo(resp);
      }
      setLoading(false);
    };
    fetchTomo();
  }, [currentUser]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return { ...tomo };
}
