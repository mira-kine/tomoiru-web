'use client';
import React, { useState } from 'react';
import Image from 'next/legacy/image';
import dashboardImg from '../../public/assets/tomoiru-temp-bg.png'
import Link from 'next/link';

export default function Dashboard() {
  // user id is already in session
  const [name, setName] = useState('temporary');
  // set name with whatever is in cookie
  return (
    <>
    <div className="flex flex-col relative items-center align-center justify-center h-full w-full">
    {/* <NavBar /> */}
      <div className="absolute inset-0">
        <Image
            src={dashboardImg}
            alt="drawn background of a japanese style living room"
            placeholder="blur"
            layout="fill"
            // style={{objectFit: "cover", objectPosition: "center"}}
            className="w-full h-full inset-0 object-cover absolute -z-1"
            priority={true}
            objectFit="cover"
          />
        </div>
        <div className="flex flex-col items-center justify-center m-2 h-3/4 tablet:h-full w-5/6 tablet:w-11/12 z-5">
          <h1>{name}&apos;s Home</h1>
        </div>
    </div>
    </>
  );
}

// next attach events to elements on spline model
