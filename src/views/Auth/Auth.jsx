import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUpUser } from '../../api/users';
import { signInUser } from '../../api/users';
import AuthForm from '../../components/AuthForm/AuthForm';
import { useUser } from '../../context/UserProvider';
import './Auth.css';

export default function Auth({ isSigningUp = false }) {
  const { currentUser, setCurrentUser } = useUser();
  const navigateTo = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleAuth = async (email, password) => {
    try {
      if (isSigningUp) {
        setLoading(true);
        await signUpUser(email, password);
        // await new Promise((r) => setTimeout(r, 1500));
        navigateTo('/signin');
      } else {
        setLoading(true);
        const resp = await signInUser(email, password);
        setCurrentUser({
          id: resp.id,
          email: resp.email,
          has_tomo: resp.has_tomo,
        });
        // await new Promise((r) => setTimeout(r, 1500));

        setLoading(false);
        if (currentUser.has_tomo) {
          navigateTo('/dashboard');
        } else {
          navigateTo('/welcome');
        }
      }
    } catch (error) {
      throw error;
    }
  };

  if (loading) {
    <h1>Loading...</h1>;
  }

  return (
    <div>
      {loading ? (
        <div id="loading-page">
          {/* <span id="loading-logo">Loading....</span> */}
          <img
            src={require(`../../assets/ol-sushi.GIF`)}
            alt="sushi loading prop"
          />
        </div>
      ) : (
        <div id="view-auth-container">
          <h2 id="signin-title">Meet your Tomo!</h2>
          <div id="google-button-div">
            <AuthForm
              onSubmit={handleAuth}
              label={isSigningUp ? 'Sign Up!' : 'Meet your Tomo'}
              isSigningUp={isSigningUp}
            />
          </div>
        </div>
      )}
    </div>
  );
}
