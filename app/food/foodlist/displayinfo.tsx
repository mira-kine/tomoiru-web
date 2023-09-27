'use client'
import React from 'react'
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import type { Database } from "../../../types/supabase";
import type { Food } from '@/app/hooks/useFood';

interface DisplayFoodInfoProps {
  foodById: Food;
  showFood: boolean;
}


export default function DisplayInfo({showFood, foodById}: DisplayFoodInfoProps){
  const supabase = createPagesBrowserClient<Database>();

  console.log('foodById', foodById)
  // display default page first
  const handleAdd = async () => {
    // add food by Id to my food list on supabase my_foods list
    try {
      await supabase.from('my_foods').insert(foodById);
    } catch (error) {
      console.error('Error upserting data', error)
    }
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
          <button className="btn mt-8" onClick={() => {handleAdd()}}>Add to your wishlist</button>
      </div>
    </>
  )
}
