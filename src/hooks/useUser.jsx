import { useEffect, useState } from 'react';
import { getCurrentUser } from '../api/users';

// function of this hook is to just get data from local storage when necessary
// initial user data is stored in local storage after sign in, persists
// after sign up though, need to go back to sign in
// personalization = will require state management
export function useUser() {
  // data is set to local storage

  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('currentUser'));
    if (data) {
      setUserData(data);
    }
  }, []);
  return { userData };
}
