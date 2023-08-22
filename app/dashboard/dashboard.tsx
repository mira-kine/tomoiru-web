'use client'
import React from 'react'
import Image from "next/image";
import dashboardImg from '../../public/assets/dashboard.png'
// import { useRouter } from 'next/navigation';

export default function DashboardClient() {
    // const router = useRouter();

  return (
    <>
    <div className="absolute inset-0">
    <Image
        src={dashboardImg}
        alt="drawn background of a japanese style living room"
        sizes="(max-width: 1096px) 100vw"
        objectFit="cover"
        className="w-full h-full inset-0 absolute -z-1"
        priority={true}
      />
    </div>
    {/* <div className="absolute h-12 w-24 bottom-48 right-44 z-20">
        <button onClick={() => {handleChat()}}>
            Chat
        </button>
    </div> */}
        </>
  )
}
