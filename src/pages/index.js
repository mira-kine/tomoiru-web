// Will be rendered as the main component of this page
import React from 'react';
import HomeButton from '../components/Buttons/HomeButton/HomeButton';
import AuthForm from '../components/Forms/AuthForm';

export default function Home() {
  return (
    <div className="home-view-container">
      <div className="hello-container">
        <div className="title-container">
          <div className="title tomoiru-title"> Tomoiru</div>
          <div className="sub-title">
            Where you can travel to Japan with a friend
          </div>
        </div>
        <div className="signin-container">
          <AuthForm />
          <HomeButton />
        </div>
      </div>
    </div>
  );
}
