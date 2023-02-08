import React from 'react';
import { useHistory } from 'react-router-dom';
import { signUpUser } from '../../api/users';
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
      }
    } catch (error) {
      throw error;
    }
  };
  return (
    <div>
      <AuthForm />
    </div>
  );
}
