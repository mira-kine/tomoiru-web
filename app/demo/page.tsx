import React from 'react'
import Image from "next/legacy/image";


export default function Demo() {
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
        <div className="flex flex-col items-center content-center justify-center m-8 h-1/2 w-5/6 mobile:w-3/5 tablet:w-3/5 bg-melon shadow-lg rounded-lg opacity-80 p-4">
          <div className="flex flex-col flex-wrap justify-center items-center">
            <div className="flex justify-center flex-wrap font-script text-7xl tablet:text-9xl p-2 m-2">
              {" "}
              Demo goes here
            </div>
            <div className="flex sub-title font-sans text-md mobile:text-2xl tablet:text-3xl laptop:text-5xl justify-center pb-4">
            Explain here
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
