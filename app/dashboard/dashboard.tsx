'use client'
import React from 'react'
import Image from "next/image";
import dashboardImg from '../../public/assets/dashboard.png'
import AudioPlayer from "./audio";
import { useRouter } from 'next/navigation';

export default function DashboardClient() {
    const router = useRouter();
  
    const handleNavChat = () => {
      router.push('/chat')
    }
  return (
    <>
          <div className="absolute inset-0 z-0">
          <Image
              src={dashboardImg}
              alt="drawn background of a japanese style living room"
              layout="fill"
              className="inset-0 object-cover absolute"
              priority={true}
            />
          </div>
          <div className="bg-melon w-1/12 flex justify-center z-20 absolute right-0 top-0 mr-12 mt-4">
            <AudioPlayer />
          </div>
          <div className="bg-white/50 rounded-full z-20 p-4 absolute tablet:bottom-52 tablet:right-48 hover:animate-bounce cursor-pointer">
            <div className="bg-white p-4 rounded-full">
              <span className="inline-block p-2 font-sans" onClick={() => {handleNavChat()}}>Chat</span>
            </div>
          </div>
    </>
  )
}