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
          <div className="w-3/12 flex justify-center z-50 absolute left-0 bottom-0 ml-28 mb-12">
            <AudioPlayer />
          </div>
        </>
     )
    }
    <button onClick={() => {setHelpView(!helpView)}} className="btn glass shadow-xl bg-white hover:bg-peach text-licorice flex justify-center z-50 absolute bottom-0 right-0 mr-12 mb-12">Help</button>
    </>
  )
}