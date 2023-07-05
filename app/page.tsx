'use-client';
// Will be rendered as the main component of this page

import React from 'react';
import HomeButton from './components/Buttons/HomeButton/HomeButton';

export default function Title() {
  return (
    <div className="flex items-center justify-center h-screen w-screen bg-[url('../public/assets/auth_background.jpg')] bg-cover bg-center">
      <div className="flex flex-column items-center content-center m-8 h-1/2 w-3/5 bg-melon rounded-lg opacity-80">
        <div className="flex flex-column flex-wrap">
          <div className="flex justify-center flex-wrap font-sans">
            {' '}
            Tomoiru
          </div>
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
