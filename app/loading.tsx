import React from "react";
import Image from "next/legacy/image";
import loading from '../public/assets/loading.png'

export default function Loading() {
  return (
    <div className="flex flex-col justify-center content-center items-center w-full h-full">
      <Image
        className="w-full z-50 transform:'translate(-50%, -50%)"
        src={loading}
        alt="loading acorn png"
      />
    </div>
  );
}
