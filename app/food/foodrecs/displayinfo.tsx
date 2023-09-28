'use client'
import React from 'react'
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import type { Database } from "../../../types/supabase";
import type { Food } from '@/app/hooks/useFood';
import { useUser } from '@/app/context/UserContextProvider';
import toast from 'react-hot-toast'


interface DisplayFoodInfoProps {
  foodById: Food;
  showFood: boolean;
}


export default function DisplayInfo({showFood, foodById}: DisplayFoodInfoProps){
  const supabase = createPagesBrowserClient<Database>();
  const {user} = useUser();
  // display default page first
  const handleAdd = async ({id, name, image, description}: Food) => {
    // add food by Id to my food list on supabase my_foods list
    try {
      await supabase.from('my_foods').insert({
        food_id: id, name, image, description, uuid: user.id, 
      })
      toast.success('added to food diary!')
    } catch (error) {
      console.error('Error upserting data', error)
    }
  } 
      

  return (
    <>
      <div className="bg-white/50 rounded-2xl overflow-y-auto display flex flex-col items-center justify-center w-1/2 my-4 px-12 mr-20 ml-4">
        {!showFood ? (
          <div className="flex justify-center p-8">
            <span className="font-script text-2xl">Hi! Choose a recommendation to get started</span>
          </div>
        ) : (
        <>
        <div className="flex justify-center items-center wrap flex-col p-8 h-10/12">
          <span className="font-script text-2xl">{foodById.name}</span>
          <span className="font-sans w-full text-xl">{foodById.description}</span>
        </div>
          <button className="btn mt-8" onClick={() => handleAdd(foodById)}>Add to your wishlist</button>
      </>
        )}
        </div>
    </>
  )
}
