'use client'
import React from 'react'
import Image from "next/image";
import dashboardImg from '../../public/assets/dashboard.png'
// import { useRouter } from 'next/navigation';

export default function DashboardClient() {
    // const router = useRouter();
  
  return (
    <>
        <div className="w-3/4 bg-peach/40 rounded-2xl p-4 max-w-3xl">
          <div className="w-full">
          <Image
              src={dashboardImg}
              alt="drawn background of a japanese style living room"
              // sizes="(max-width: 1096px) 50vw"
              objectFit="contain"
              className="w-full h-full inset-0 -z-1"
              priority={true}
            />
          </div>
        </div>
    {/* <div className="absolute h-12 w-24 bottom-48 right-44 z-20">
        <button onClick={() => {handleChat()}}>
            Chat
        </button>
    </div> */}
    </>
  )
}
