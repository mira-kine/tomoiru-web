'use-client';
// Will be rendered as the main component of this page

import React from 'react';
import HomeButton from './components/Buttons/HomeButton/HomeButton';
import Image from 'next/image';

export default function Title() {
  return (
    <div className="flex relative items-center justify-center w-screen h-screen">
      <div className="absolute inset-0">
        <Image
          src="/assets/auth_background.jpg"
          alt="drawn background of the sky"
          // width="1680"
          // height="250"
          layout="fill"
          // sizes="100vw"
          className="w-full h-full inset-0 object-cover absolute -z-1"
        />
      </div>
      <div className="flex flex-column items-center content-center m-8 h-1/2 w-3/5 bg-melon rounded-lg opacity-80 z-10">
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
