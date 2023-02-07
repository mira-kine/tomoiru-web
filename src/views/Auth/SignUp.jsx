import React from 'react';
import { GoogleButton } from 'react-google-button';
import { Link } from 'react-router-dom';
import { UserAuth } from '../../context/AuthContext';

export default function SignUp() {
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
      <h1>Sign Up</h1>
      <GoogleButton onClick={handleGoogleSignIn} />
      <h2>Have an account?</h2>
      <Link to="/signin">Sign In</Link>
    </div>
  );
}
