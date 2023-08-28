'use client'
import React, {useRef} from 'react'
import ReactPlayer from 'react-player'
import type { Track } from '@/app/dashboard/audio';

const firstlove = {
  id: 1,
  name: 'firstlove',
  publicUrl: 'https://wciqlbbrxhcmajzvlbwe.supabase.co/storage/v1/object/public/tracks/tracks/firstlove.mp3'
}

interface TracksProps {
  tracks: Track[] | null;
}

export default function Controls({tracks}: TracksProps | null) {
const playerRef = useRef<ReactPlayer | null>(null);

  return (
    <div className="w-full bg-peach flex items-center justify-center">
      <ReactPlayer ref={playerRef} url={tracks.publicUrl} />
  </div>
    );
}
