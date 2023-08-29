import React from "react";
import Image from "next/legacy/image";
import loading from '../public/assets/loading.png'

export default function Loading() {
  return (
    <div className="flex justify-center align-center items-center w-full h-full">
      <Image
        className="w-3/4 z-50"
        src={loading}
        alt="loading acorn png"
      />
    </div>
  );
}
