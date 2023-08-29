'use client'
import React from 'react'
import AudioPlayer from "../components/Audio/AudioPlayer";
import DashboardCarousel from '../components/DashboardCarousel';

export default function DashboardClient() {
  return (
    <>
          {/* <div className="absolute inset-0 z-0"> */}
          <div className="w-11/12 max-w-6xl rounded-2xl p-4 z-20 flex justify-center">
          <DashboardCarousel />
          </div>
          {/* </div> */}
          <div className="w-3/12 flex justify-center z-50 absolute left-0 bottom-0 ml-28 mb-12">
            <AudioPlayer />
          </div>
    </>
  )
}