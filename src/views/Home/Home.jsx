import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <>
      <div>
        <h2>Welcome to Tomoiru!</h2>
      </div>
      <div>
        <span>
          <Link to="/signin">Sign In?</Link>
        </span>
      </div>
    </>
  );
}
