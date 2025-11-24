'use client'
import React, { useState, useEffect } from 'react'
import { audioService, Track } from '@/services/audio'
import toast from 'react-hot-toast'

export default function AudioPlayer() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        setLoading(true);
        const data = await audioService.getTracks();
        setTracks(data);
        setError(null);
      } catch (err: any) {
        console.error('Failed to fetch tracks:', err);
        setError('Failed to load audio tracks');
        toast.error('Failed to load audio tracks');
      } finally {
        setLoading(false);
      }
    };

    fetchTracks();
  }, []);

  if (loading) {
    return (
      <div className="w-64 flex flex-col justify-center items-center z-30">
        <span className="loading loading-spinner loading-sm"></span>
        <p className="mt-2 text-white text-xs">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-64 flex flex-col justify-center items-center z-30">
        <p className="text-red-500 text-xs">{error}</p>
      </div>
    );
  }

  if (tracks.length == 0) {
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