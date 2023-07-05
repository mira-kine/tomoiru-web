import React from 'react';
import { signOut } from '../pages/api/users';
import Link from 'next/link';
import { useUser } from '@supabase/auth-helpers-react';

export default function NavBar() {
  const user = useUser();

  const handleSignOut = async () => {
    await signOut();
    localStorage.clear();
    localStorage.setItem('authenticated', false);
    // router.push('/home');
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
          {user?.user_name ? (
            <>
              <li>
                <Link href="/dashboard">Home</Link>
              </li>
              <li>
                <Link href="/chat">Chat</Link>
              </li>
              <li>
                <Link href="/" onClick={() => handleSignOut()}>
                  Sign Out
                </Link>
              </li>
            </>
          ) : null}
          <li>
            <Link href="/about">About</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
