import React from 'react';
import { GoogleButton } from 'react-google-button';
import { Link } from 'react-router-dom';
import { UserAuth } from '../../context/AuthContext';

export default function SignIn() {
  const { googleSignIn } = UserAuth();

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h1>Sign In</h1>
      <GoogleButton onClick={handleGoogleSignIn} />
      <h2>No account yet?</h2>
      <Link to="/signup">Sign up</Link>
    </div>
  );
}
