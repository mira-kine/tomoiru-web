'use client'
import React from 'react'
import type { Food } from './foodlist';

interface DisplayFoodInfoProps {
  foodById: Food;
  showFood: boolean;
}

export default function DisplayInfo({foodById, showFood}: DisplayFoodInfoProps) {
  // display default page first
  const handleAdd = () => {
    // add food by Id to my food list on supabase
  }

  return (
    <>
      <div className="bg-white/50 rounded-2xl overflow-y-auto display flex flex-col items-center justify-center w-1/2 my-4 px-12 mr-20 ml-4">
        {!showFood && (
          <div className="flex justify-center bg-chick p-8">
            Hi! Choose a recommendation to get started
          </div>
        )}
        <div className="flex justify-center items-center wrap flex-col p-8 bg-chick h-10/12">
          <span className="font-script">{foodById.name}</span>
          <span className="font-sans bg-melon w-full">{foodById.description}</span>
        </div>
          <button className="btn mt-8" onClick={handleAdd}>Add to your wishlist</button>
      </div>
    </>
  )
}
