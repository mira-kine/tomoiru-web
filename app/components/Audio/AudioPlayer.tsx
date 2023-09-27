'use client'
import React, {useState, useEffect} from 'react'
import type { Database } from "../../../types/supabase";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
// import Controls from '../components/Audio/Controls';


export interface Track {
    id: number;
    track_name: string;
    publicUrl: string;
  }

export default function AudioPlayer() {
const supabase = createPagesBrowserClient<Database>();
const [tracks, setTracks] = useState<Track[]>([{
  id: 0,
  track_name: '',
  publicUrl: ''
}]);

useEffect(() => {
    const fetchTracks = async () => {
        const {data} = await supabase.from('tracks').select('*');
        console.log('data', data)
        if(data) {
            setTracks(data);
        }
    }
    fetchTracks().catch((error) => {
        throw error;
    })
}, [supabase]);
  return (
    <div className="w-5/6 h-1/2 flex flex-col justify-center items-center z-30">
      <audio src={tracks[0]?.publicUrl} controls/>
      {/* <Controls /> */}
    </div>
  )
}

// []: fetch tracks
// []: display first track, get by id: name, progress bar, play/pause toggle, next, back, seek
// play/pause toggle depending on onclick
// 