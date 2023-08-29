'use client'
import React from 'react'
import AudioPlayer from "../components/Audio/AudioPlayer";
import DashboardCarousel from '../components/DashboardCarousel';
import Help from '../components/Help';

export default function DashboardClient() {
  return (
    <>
          <div className="w-11/12 max-w-6xl rounded-2xl p-4 z-20 flex justify-center">
          <DashboardCarousel />
          </div>
          <div className="w-3/12 flex justify-center z-50 absolute left-0 bottom-0 ml-28 mb-12">
            <AudioPlayer />
          </div>
          <div className="w-3/12 flex justify-center z-50 absolute right-0 bottom-0 mr-4 mb-12">
            <Help />
          </div>
    </>
  )
}