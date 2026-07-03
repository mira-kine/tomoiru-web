"use client";
// Will be rendered as the main component of this page
import React, { useEffect } from "react";
import Image from "next/legacy/image";
import Link from "next/link";
import { warmUpBackend } from "@/lib/config";

export default function Title() {
  // Wake the free-tier backend while the user reads the landing page,
  // so login/demo doesn't hit a cold start.
  useEffect(() => {
    warmUpBackend();
  }, []);

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
      <div className="flex flex-col items-center content-center justify-center m-8 h-1/2 w-5/6 mobile:w-3/5 tablet:w-3/5 shadow-lg shadow-licorice/60 rounded-lg opacity-80 p-4">
        <div className="flex flex-col flex-wrap justify-center items-center">
          <div className="flex justify-center flex-wrap font-script text-7xl tablet:text-9xl p-2 m-2">
            Tomoiru
          </div>
          <div className="flex sub-title font-sans text-xl mobile:text-2xl tablet:text-3xl laptop:text-5xl justify-center pb-4">
            Travel to Japan with a friend
          </div>
          <div className="flex flex-col">
            <div className="text-licorice border-2 border-white bg-white/40 transition duration-300 hover:bg-white cursor-pointer font-sans font-bold rounded-lg shadow-lg shadow-licorice/40 text-md px-5 py-2.5 text-center mr-2 mb-2 shadow-md">
              <Link href="/login">Enter</Link>
            </div>
            <div className="flex">
              <div className="text-licorice border-2 border-white bg-white/40 transition duration-300 hover:bg-white cursor-pointer font-sans font-bold rounded-lg shadow-lg shadow-licorice/40 text-md px-5 py-2.5 text-center mr-2 mb-2 shadow-md">
                <Link href="/about">About</Link>
              </div>
                <div className="text-licorice border-2 border-white bg-white/40 transition duration-300 hover:bg-white font-sans font-bold rounded-lg shadow-lg shadow-licorice/40 text-md px-5 py-2.5 text-center mr-2 mb-2 shadow-md cursor-pointer">
                  <Link href="/demo">Demo</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
