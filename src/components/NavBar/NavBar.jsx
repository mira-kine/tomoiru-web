import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from '../../api/users';
import './NavBar.css';

export default function NavBar() {
  const navigateTo = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    localStorage.setItem('authenticated', false);
    navigateTo('/');
  };

  return (
    <div id="nav-container">
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
}
