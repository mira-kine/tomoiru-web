import React from 'react';
import { signOut } from '../pages/api/users';
import { useUser } from '../context/UserProvider';
// import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NavBar() {
  // const router = useRouter();

  const { currentUser } = useUser();

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
          {currentUser?.user_name ? (
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
