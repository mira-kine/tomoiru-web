'use client'
import React from "react";
import Image from "next/legacy/image";
import tomomiImg from '../../public/assets/tomomi_closed.png'
import { useRouter } from "next/navigation";


export default function About() {
  const router = useRouter();

  const handleBack = () => {
    router.push('/');
  }

  return (
    <>
      <div className="flex flex-col relative items-center min-h-dvh w-full">
        <button className="z-50 absolute text-licorice border-2 border-white transition duration-300 hover:bg-white dark:focus:ring-red-400 font-sans font-bold rounded-lg text-lg px-6 py-2.5 mt-4 text-center shadow-md left-12 top-8" onClick={() => {handleBack()}}>
          Back
        </button>
        <div className="absolute inset-0">
          <Image
            src="/assets/sakura-bg.png"
            alt="wallpaper of blue background with pink hearts"
            layout="fill"
            className="w-full h-full inset-0 object-cover absolute -z-1"
            priority={true}
          />
          </div>
            <div className="z-30 w-1/3 tablet:w-1/5 flex justify-center mt-8">
        <Image
            src={tomomiImg}
            alt="image of tomomi as mira, the creator of this app"
            width={375}
            height={335}
            priority={true}
          />
        </div>
        <div className="flex flex-col m-8 p-12 h-3/4 w-5/6 bg-white shadow-lg rounded-lg opacity-80">
          <div className="flex flex-col flex-wrap">
            <div className="flex flex-wrap font-script text-licorice text-3xl mobile:text-4xl tablet:text-5xl p-2 m-2">
              <p>Tomoiru started because of my own tomos...</p>
            </div>
            <div className="flex flex-wrap sub-title font-sans text-lg mobile:text-2xl pb-4 px-2 mx-2 font-bold">
              <p>&apos;Tomo&apos; roughly means &apos;friend&apos; in Japanese. Recently, many people have asked me for recommendations and know-hows to get around my home country. However, I can&apos;t be awake all the time to answer questions, so I created Tomomi! Plus I know that traveling in a foreign country can be a lonely experience so I wanted a space where people could come and feel comforted. Tomomi is friendly and welcoming to all, including you!</p>
              <p>So I hope you enjoy, and safe travels!{' '}👋</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
