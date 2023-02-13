import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from '../../api/users';

export default function NavBar() {
  const navigateTo = useNavigate();
  const handleSignOut = async () => {
    await signOut();
    localStorage.setItem('authenticated', false);
    navigateTo('/');
  };

  return (
    <div>
      <h1>NavBar</h1>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
}
