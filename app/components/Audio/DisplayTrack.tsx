import React from 'react'

export default function DisplayTrack(track: string) {
  return (
    <div>
      <audio src={track} />
    </div>
  )
}
