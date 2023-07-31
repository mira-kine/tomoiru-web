'use client';
// Will be rendered as the main component of this page

import React from 'react';
import Image from 'next/legacy/image';
import Link from 'next/link';

export default function Title() {
  return (
    <div className="flex relative items-center justify-center w-screen h-screen">
      <div className="absolute inset-0">
        <Image
          src="/assets/auth_background.jpg"
          alt="drawn background of the sky"
          layout="fill"
          className="w-full h-full inset-0 object-cover absolute -z-1"
          priority={true}
        />
      </div>
      <div className="flex flex-col items-center content-center justify-center m-8 h-1/2 w-5/6 mobile:w-3/5 tablet:w-3/5 bg-melon shadow-lg rounded-lg opacity-80 p-4">
        <div className="flex flex-col flex-wrap justify-center items-center">
          <div className="flex justify-center flex-wrap font-script text-7xl tablet:text-9xl p-2 m-2">
            {' '}
            Tomoiru
          </div>
          <div className="flex sub-title font-sans text-xl mobile:text-2xl tablet:text-3xl laptop:text-5xl justify-center pb-4">
            Travel to Japan with a friend
          </div>
          <div className="flex">
            <div className="text-licorice border-2 border-white bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-sans font-bold rounded-lg text-md px-5 py-2.5 mt-4 text-center mr-2 mb-2 shadow-md">
              <Link href="/login">Enter</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
