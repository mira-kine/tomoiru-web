// Will be rendered as the main component of this page
import React from 'react';
// import { AuthProvider } from '../context/AuthProvider';
import HomeButton from '../components/Buttons/HomeButton/HomeButton';

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
          <HomeButton />
        </div>
      </div>
    </div>
  );
}
