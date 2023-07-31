'use client';
import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import Image from 'next/legacy/image';
import dashboardImg from '../../public/assets/tomoiru-temp-bg.png'
import Link from 'next/link';

export default function Dashboard() {
  // user id is already in session
  const [name, setName] = useState('temporary');
  // set name with whatever is in cookie
  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex w-full justify-end">
           {/* <Link href="/dashboard" className="flex items-center">
        <span className="self-center text-2xl font-semibold whitespace-nowrap text-licorice">Your Home</span>
    </Link> */}
      <NavBar />
      </div>
      <div className="relative inset-0 h-full">
      <Image
            src={dashboardImg}
            alt="drawn background of a japanese style living room"
            placeholder="blur"
            layout="fill"
            style={{objectFit: "fit"}}
            priority={true}
          />
      </div>
      {/* <div className="flex justify-center items-center font-script z-5 text-white bg-melon h-3/4 w-3/5">
        <h1>{name}&apos;s Home</h1>
      </div> */}
    </div>
  );
}

// next attach events to elements on spline model
