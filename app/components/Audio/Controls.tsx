'use client'
import React, {useState} from 'react'
import useSound from 'use-sound'
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai";
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";
import { IconContext } from "react-icons";
import type { Track } from '@/app/dashboard/audio';

interface TrackProps {
  tracks: Track[] | null;
}

export default function Controls({tracks}: TrackProps | null) {
const [isPlaying, setIsPlaying] = useState(false);
let curr = 0;
const [currentTrack, setCurrentTrack] = useState(tracks[curr]);
const [play, { pause, duration, sound }] = useSound(currentTrack?.publicUrl);
const [currTime, setCurrTime] = useState({
  min: '',
  sec: ''
});


  const playButtons = () => {
    if (isPlaying) {
        pause();
        setIsPlaying(false);
    } else {
        play();
        setIsPlaying(true);
    }
}

const handleNext = () => {
  if (curr === 2) {
    setCurrentTrack(tracks[0]);
  } else {
    setCurrentTrack(tracks[curr+=1])
  }
}

const handlePrev = () => {
  if (curr-- === 0) {
    setCurrentTrack(tracks[0]);
  }
  setCurrentTrack(tracks[curr--]);
}

console.log('curr', curr);

  return (
    <div className="w-full bg-peach flex items-center justify-center">
    <button onClick={() => {handlePrev()}}>
      <IconContext.Provider value={{ size: "3em", color: "#27AE60" }}>
        <BiSkipPrevious />
      </IconContext.Provider>
    </button>
    {!isPlaying ? (
      <button className="playButton" onClick={playButtons}>
        <IconContext.Provider value={{ size: "3em", color: "#27AE60" }}>
          <AiFillPlayCircle />
        </IconContext.Provider>
      </button>
    ) : (
      <button className="playButton" onClick={playButtons}>
        <IconContext.Provider value={{ size: "3em", color: "#27AE60" }}>
          <AiFillPauseCircle />
        </IconContext.Provider>
      </button>
    )}
    <button className="playButton" onClick={() => {handleNext()}}>
      <IconContext.Provider value={{ size: "3em", color: "#27AE60" }}>
        <BiSkipNext />
      </IconContext.Provider>
    </button>
  </div>
    );
}
