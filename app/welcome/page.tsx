import WelcomeInput from "./WelcomeInput";
import Image from "next/legacy/image";
import React from "react";

export default async function Welcome() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div className="absolute inset-0">
        <Image
          src="/assets/welcome-bg.png"
          alt="drawn background of japanese style entrance"
          layout="fill"
          className="w-full h-full inset-0 object-cover absolute"
        />
      </div>
      <div className="flex flex-col w-1/3 z-5 justify-center items-center p-1 wrap rounded-lg mb-1 mt-2">
        <Image
          className="w-full"
          src="/assets/tomomi_open.png"
          width={375}
          height={335}
          alt="tomomi character animating talking"
        />
      </div>
      <WelcomeInput />
    </div>
  );
}
