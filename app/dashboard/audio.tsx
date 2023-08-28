'use client'
import React, {useState, useEffect} from 'react'
import type { Database } from "../../types/supabase";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import Controls from '../components/Audio/Controls';


export interface Track {
    id: number;
    name: string;
    publicUrl: string;
  }

export default function AudioPlayer() {
const supabase = createPagesBrowserClient<Database>();
const [tracks, setTracks] = useState<Track[]>([]);


useEffect(() => {
    const fetchTracks = async () => {
        const {data} = await supabase.from('tracks').select('*');
        if(data) {
            setTracks(data);
        }
    }
    fetchTracks().catch((error) => {
        throw error;
    })
}, [supabase]);


  return (
    <div className="w-5/6 h-1/2 flex flex-col bg-chick justify-center items-center z-30">
      <Controls tracks={tracks}/>
    </div>
  )
}
