import React from "react";
import Image from "next/legacy/image";
import loading from '../public/assets/loading.png'

export default function Loading() {
  return (
    <div className="flex justify-center content-center items-center w-1/2 h-full">
      <Image
        className="w-1/2 z-50"
        src={loading}
        alt="loading acorn png"
      />
    </div>
  );
}
