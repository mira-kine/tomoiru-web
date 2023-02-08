import React from 'react';
import { useHistory } from 'react-router-dom';
import { signInUser, signInWithGoogle, signUpUser } from '../../api/users';
import AuthForm from '../../components/AuthForm/AuthForm';

export default function Auth() {
  const history = useHistory();

  // create handle that handles events depending on sign up vs sign in

  const handleAuth = async () => {
    try {
      await signInWithGoogle();
      history.replace('/dashboard');
      // history.replace because you don't want to go back to log in page after you logged in
    } catch (error) {
      throw error;
    }
  };
  return (
    <div>
      <AuthForm onSubmit={handleAuth} />
    </div>
  );
}
