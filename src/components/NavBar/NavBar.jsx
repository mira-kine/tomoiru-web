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
    <div className="nav-container">
      <button
        className="button button--piyo"
        id="button-signout"
        onClick={() => handleSignOut()}
      >
        <div className="button__wrapper">Sign Out</div>
      </button>
    </div>
  );
}
