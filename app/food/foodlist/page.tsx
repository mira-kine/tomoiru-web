import React from 'react'
import FoodList from './foodlist'
import Image from 'next/legacy/image';
import sakurabg from '../../../public/assets/sakura-bg.png'
import DisplayInfo from './displayinfo';

export default function FoodListPage() {
  return (
    <div className="flex w-full h-full justify-center items-center">
      <div className="absolute inset-0">
        <Image
            src={sakurabg}
            alt="drawn background of the sky"
            layout="fill"
            className="w-full h-full inset-0 object-cover absolute -z-1"
            priority={true}
          />
    </div>
      <div className="z-40 flex bg-peach w-9/12 h-5/6">
        <FoodList />
        <DisplayInfo />
      </div>
  </div>
  )
}
