import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { UserAuth } from '../../context/AuthContext';

export default function Home() {
  return (
    <div>
      <h1>Welcome to Tomoiru</h1>
      <Link to="/signin">Sign in?</Link>
      <Link to="/signup">Sign up?</Link>
    </div>
  );
}
