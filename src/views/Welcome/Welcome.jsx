import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTomo } from '../../api/tomos';
import { useUser } from '../../context/UserProvider';

export default function Welcome() {
  const { currentUser } = useUser();
  const navigateTo = useNavigate();
  console.log('currentUser', currentUser);

  useEffect(() => {
    const fetchTomo = async () => {
      const tomo = await getTomo();
      if (!tomo) {
        // navigate to welcome page where you will make tomo
        navigateTo('/welcome');
      }
    };
    fetchTomo();
  }, [navigateTo]);

  return <div>Welcome!</div>;
}
