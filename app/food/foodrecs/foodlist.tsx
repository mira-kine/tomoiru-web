'use client'
import { useFood } from '@/app/hooks/useFood';
import React, { useState } from 'react'
import DisplayInfo from './displayinfo';
import type { Food } from '@/app/hooks/useFood';

export default function FoodList() {
const [showFood, setShowFood] = useState(false);
const {foodList, setFoodById, foodById} = useFood();

const handleChooseFood = (id: number) => {
    // match ID to foodList
    setShowFood(true);
    const foundFood = foodList.find((food: Food) => food.id === id);
    setFoodById(foundFood);
}

  return (
    <>
    {/* <div className="z-30 w-9/12">
        <button className="w-1/12 bg-chick mx-8">tabs</button>
        <button className="w-1/12 bg-chick mx-8">tabs</button>
        <button className="w-1/12 bg-chick mx-8">tabs</button>
    </div> */}
    <div className="z-40 flex bg-peach w-9/12 h-3/4">
    <div className="bg-white/50 rounded-2xl overflow-y-auto display flex flex-col items-center w-1/2 my-4 px-12 ml-20 mr-4">
        <span className="font-script text-5xl text-licorice py-8">Tomomi Recs</span>
    {foodList.map((food: Food) => (
        <>
        <div key={food.id} className="z-30">
            <button onClick={() => {handleChooseFood(food.id)}} className="
            text-licorice border-2 border-white bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-sans font-bold rounded-lg text-md tablet:text-xl laptop:text-2xl desktop:text-2xl px-5 py-2.5 text-center mr-2 mb-2 shadow-lg shadow-licorice/20">
                {food.name}
            </button>
        </div>
        </>
    ))}
    </div>
        <DisplayInfo showFood={showFood} foodById={foodById} />
    </div>
    </>
  )
}
