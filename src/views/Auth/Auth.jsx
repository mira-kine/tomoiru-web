import React from 'react';
import { useHistory } from 'react-router-dom';
import { signInUser, signUpUser } from '../../api/users';
import AuthForm from '../../components/AuthForm/AuthForm';
import { useUser } from '../../context/UserProvider';

export default function Auth({ isSigningUp = false }) {
  const { setUser } = useUser();
  const history = useHistory();

  // create handle that handles events depending on sign up vs sign in

  const handleAuth = async (email, password) => {
    try {
      if (isSigningUp) {
        //call signUpUser fxn from users.js
        await signUpUser(email, password);
        history.replace('/signin');
      } else {
        // signIn by setting user through useUser hook in provider, redirect to dashboard
        const resp = await signInUser(email, password);
        setUser({ id: resp.id, email: resp.email });
        // history.replace because you don't want to go back to log in page after you logged in
        history.replace('/profile');
      }
    } catch (error) {
      throw error;
    }
  };
  return (
    <div>
      <AuthForm
        onSubmit={handleAuth}
        label={isSigningUp ? 'Sign Up' : 'Sign In'}
        isSigningUp={isSigningUp}
      />
    </div>
  );
}
