import React from 'react';
import HomeButton from '../../components/Buttons/HomeButton/HomeButton';
import './Home.css';

export default function Home() {
  return (
    <div id="home-view-container">
      <div id="home-container">
        <div id="title-container">
          <span>Welcome to Tomoiru!</span>
          <div id="signin-container">
            <HomeButton />
          </div>
        </div>
      </div>
    </div>
  );
}
