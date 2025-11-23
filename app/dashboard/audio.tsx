'use client'
import React, {useState, useEffect} from 'react'
// import useSound from 'use-sound'
// import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai";
// import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";
// import { IconContext } from "react-icons";
// TODO: Re-enable after backend audio endpoints are built
// import type { Database } from "../../types/supabase";
// import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";


export default function AudioPlayer() {
// TODO: Replace with backend API call
// const supabase = createPagesBrowserClient<Database>();
const [track, setTrack] = useState('');
// const [isPlaying, setIsPlaying] = useState(false);
// const [currTime, setCurrTime] = useState({
//     min: '',
//     sec: ''
// });
// const [seconds, setSeconds] = useState();

useEffect(() => {
    // TODO: Fetch from backend API or CDN
    // const fetchTracks = async () => {
    //     const {data: {
    //         publicUrl
    //     }} = supabase.storage.from('tracks').getPublicUrl('tracks/calmpiano.mp3');
    //     setTrack(publicUrl);
    // }
    // fetchTracks().catch((error) => {
    //     throw error;
    // })

    // Placeholder: No track for now
    setTrack('');
}, []);

// const [play, { pause, duration, sound }] = useSound(track);
// useEffect(() => {
//     const interval = setInterval(() => {
//       if (sound) {
//         setSeconds(sound.seek([]));
//         const min = Math.floor(sound.seek([]) / 60);
//         const sec = Math.floor(sound.seek([]) % 60);
//         setCurrTime({
//           min,
//           sec,
//         });
//       }
//     }, 1000);
//     return () => clearInterval(interval);
//   }, [sound]);

// })

// const playButtons = () => {
//     if (isPlaying) {
//         pause();
//         setIsPlaying(false);
//     } else {
//         play();
//         setIsPlaying(true);
//     }
// }

  return (
    <div className="w-5/6 h-1/2 flex bg-chick justify-center items-center">
        <div className="h-1/2">
            <audio src={track} controls />
        </div>
    </div>
  )
}
