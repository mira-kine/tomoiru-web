'use client'
import React, {useCallback} from 'react'
import Particles from 'react-particles';
import {loadFull} from 'tsparticles'
import type { Container, Engine } from "tsparticles-engine";
import Image from "next/image";
import dashboardImg from '../../public/assets/dashboard.png'
// import { useRouter } from 'next/navigation';

export default function DashboardClient() {
    // const router = useRouter();
    const particlesInit = useCallback(async (engine: Engine) => {
      console.log(engine);

      // you can initialize the tsParticles instance (engine) here, adding custom shapes or presets
      // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
      // starting from v2 you can add only the features you need reducing the bundle size
      await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container: Container | undefined) => {
  }, []);

  return (
    <>
        <div className="w-11/12 bg-peach/40 rounded-2xl p-4 max-w-5xl">
          <div>
          <Particles id="tsparticles" init={particlesInit} loaded={particlesLoaded}/>
          <Image
              src={dashboardImg}
              alt="drawn background of a japanese style living room"
              sizes="(max-width: 1096px) 70vw"
              objectFit="cover"
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
