import React from 'react'
import FoodList from './foodlist'
import Image from 'next/legacy/image';
import sakurabg from '../../../public/assets/sakura-bg.png'

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
    <div className="z-20 flex flex-col items-center content-center justify-center w-11/12 h-full">
        <FoodList />
    </div>
  </div>
  )
}

// states: display/don't display information + default display 
// user events: on click, display correct information by id