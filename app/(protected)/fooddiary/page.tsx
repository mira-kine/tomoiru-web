import React from 'react'
import Image from 'next/legacy/image';
import foodbg from '../../../public/assets/food-bg.png'


export default function FoodDiary() {
  return (
    <div className="flex relative w-full min-h-dvh justify-center items-center">
      <div className="absolute inset-0">
        <Image
            src={foodbg}
            alt="drawn background of the sky"
            layout="fill"
            className="w-full h-full inset-0 object-cover absolute -z-1"
            priority={true}
          />
    </div>
  </div>
  );
}
