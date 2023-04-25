import React from 'react';
import HomeButton from '../../components/Buttons/HomeButton/HomeButton';
import './Home.css';

export default function Home() {
  return (
    <div id="home-view-container">
      <div id="hello-container">
        <div id="title-container">
          <span id="title">Welcome to Tomoiru!</span>
          <div id="signin-container">
            <HomeButton />
          </div>
          <span id="sub-title">Where you can travel Japan with a friend</span>
        </div>
      </div>
    </div>
  );
}
