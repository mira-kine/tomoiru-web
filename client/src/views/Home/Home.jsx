import React from 'react';
import HomeButton from '../../components/Buttons/HomeButton/HomeButton';
import './Home.css';

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
