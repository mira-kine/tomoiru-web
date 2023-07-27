'use client';
import React, { useState } from 'react';
import Image from 'next/legacy/image';


export default function Dashboard() {
  // user id is already in session
  const [name, setName] = useState('temporary');
  // set name with whatever is in cookie
  return (
    <div className="flex flex-col h-full w-full">
      {/* <div className="absolute inset-0">
      <Image
            src="/assets/tomoiru-temp-bg.png"
            alt="drawn background of the sky"
            layout="fill"
            className="w-full h-full inset-0 object-cover relative"
          />
      </div> */}
      <div className="flex justify-center items-center font-script z-5 text-white bg-melon h-3/4 w-3/5">
        <h1>{name}&apos;s Home</h1>
      </div>
    </div>
  );
}

// next attach events to elements on spline model
