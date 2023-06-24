import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from '../../api/users';
import './NavBar.css';
import { useUser } from '../../context/UserProvider';

export default function NavBar() {
  const navigateTo = useNavigate();
  const { currentUser } = useUser();

  const handleSignOut = async () => {
    await signOut();
    localStorage.clear();
    localStorage.setItem('authenticated', false);
    navigateTo('/');
    navigateTo(0);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container container">
        <input type="checkbox" name="" id="" />
        <div className="hamburger-lines">
          <span className="line line1"></span>
          <span className="line line2"></span>
          <span className="line line3"></span>
        </div>
        <ul className="menu-items">
          {currentUser?.user_name ? (
            <>
              <li>
                <Link to="/dashboard">Home</Link>
              </li>
              <li>
                <Link to="/dashboard/chat">Chat</Link>
              </li>
              <li>
                <Link onClick={() => handleSignOut()}>Sign Out</Link>
              </li>
            </>
          ) : null}
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
