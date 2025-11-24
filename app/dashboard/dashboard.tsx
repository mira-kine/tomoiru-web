'use client'
import React, {useState} from 'react'
import AudioPlayer from "../components/Audio/AudioPlayer";
import DashboardCarousel from '../components/DashboardCarousel';
import Help from '../components/Help';

export default function DashboardClient() {
  const [helpView, setHelpView] = useState(false);
  return (
    <>
    {
      helpView ? (
        <div className="w-11/12 max-w-6xl rounded-2xl p-4 z-20 flex justify-center">
            <Help />
        </div>
      ) : (
        <>
          <div className="w-11/12 max-w-6xl rounded-2xl p-4 z-20 flex justify-center">
          <DashboardCarousel />
          </div>
          <div className="flex justify-center z-50 absolute left-0 top-0 ml-4 mt-4">
            <AudioPlayer />
          </div>
        </>
     )
    }
    <button onClick={() => {setHelpView(!helpView)}} className="btn glass shadow-xl bg-white hover:bg-peach text-licorice flex justify-center z-50 absolute bottom-0 right-0 mr-12 mb-12 tablet:mb-4">Help</button>
    </>
  )
}