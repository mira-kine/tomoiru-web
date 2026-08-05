'use client'
import React from 'react'
import { useTracks } from '@/hooks/useTracks'

export default function AudioPlayer() {
  const { data: tracks, isLoading, isError } = useTracks();

  if (isLoading) {
    return (
      <div className="w-64 flex flex-col justify-center items-center z-30">
        <span className="loading loading-spinner loading-sm"></span>
        <p className="mt-2 text-white text-xs">Loading...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-64 flex flex-col justify-center items-center z-30">
        <p className="text-red-500 text-xs">Failed to load audio tracks</p>
      </div>
    );
  }

  if (!tracks || tracks.length === 0) {
    return (
      <div className="w-64 flex flex-col justify-center items-center z-30">
        <p className="text-white text-xs">No tracks available</p>
      </div>
    );
  }

  const currentTrack = tracks[0];

  return (
    <div className="w-64 flex flex-col justify-center items-center z-30">
      <div className="w-full rounded-lg p-2 shadow-xl">
        <audio
          src={currentTrack.publicUrl}
          controls
          autoPlay
          className="w-full h-8"
        />
      </div>
    </div>
  )
}

// TODO (Future enhancements):
// - Display multiple tracks with navigation (next, back)
// - Add custom Controls component with play/pause toggle
// - Add progress bar with seek functionality
// - Add playlist management
