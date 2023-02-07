import React from 'react';
import { GoogleButton } from 'react-google-button';
import { Link } from 'react-router-dom';
import { UserAuth } from '../../context/AuthContext';
import { createUserDocument } from '../../utils/user';

export default function SignUp() {
  const user = UserAuth();
  console.log('user', user);

  const handleGoogleSignUp = async () => {
    try {
      createUserDocument(user);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h1>Sign Up</h1>
      <GoogleButton onClick={handleGoogleSignUp} />
      <h2>Have an account?</h2>
      <Link to="/signin">Sign In</Link>
    </div>
  );
}
