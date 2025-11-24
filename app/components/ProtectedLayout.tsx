'use client'
import React, { ReactNode } from 'react'
import AudioPlayer from './Audio/AudioPlayer'

interface ProtectedLayoutProps {
  children: ReactNode;
}

export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
  return (
    <>
      {/* Persistent audio player across authenticated pages */}
      <div className="fixed left-0 top-0 ml-4 mt-4 z-50">
        <AudioPlayer />
      </div>
      {children}
    </>
  )
}
