import React from 'react';
import { GoogleButton } from 'react-google-button';
import { Link, useHistory } from 'react-router-dom';
import { UserAuth } from '../../context/AuthContext';

export default function SignIn() {
  const { googleSignIn, user } = UserAuth();
  const history = useHistory();

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
      if (user) {
        history.push('/dashboard');
      } else {
        history.push('/signup');
      }
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
