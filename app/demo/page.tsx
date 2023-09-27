'use client'
import React from 'react'
import Image from "next/legacy/image";
import { useRouter } from "next/navigation";


export default function Demo() {
  const router = useRouter();
  const handleBackTitle = () => {
    router.push('/')
  }

  return (
    <>
      <div className="flex relative items-center align-center justify-center h-full w-full">
        <div className="absolute inset-0">
          <Image
            src="/assets/auth_background.jpg"
            alt="drawn background of the sky"
            layout="fill"
            className="w-full h-full inset-0 object-cover absolute -z-1"
            priority={true}
          />
          </div>
        <div className="flex flex-col items-center content-center justify-center m-8 h-3/4 w-5/6 mobile:w-3/5 tablet:w-4/5 bg-melon shadow-lg rounded-lg opacity-80 p-4">
        <button className="btn glass hover:bg-white" onClick={handleBackTitle}>Back</button>
          <div className="flex flex-col flex-wrap justify-center items-center">
            <div className="flex justify-center flex-wrap font-script text-7xl w-3/4 tablet:w-full p-2 m-2 items-center">
             <video controls src={'/assets/tomoiru-demo-09.mp4'} style={{width: "620px", height: "350px" }}/>
            </div>
            <div className="flex sub-title font-sans text-md tablet:text-xl font-bold justify-center pb-4">
            Current features include a cute welcome introduction, choosing username, comforting dashboard, and Tomomi chatbot.
            Developing features include Tomomi food recommendations, food diary and journal.
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
