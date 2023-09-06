'use client'
import React, { useState, useEffect } from 'react'
import type { Database } from "../../../types/supabase";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";

interface Food {
    id: number;
    name: string;
    image: string;
    description: string;
}

export default function FoodList() {
const [foodList, setFoodList] = useState<any>([]);
const [showFood, setShowFood] = useState(false);
const supabase = createPagesBrowserClient<Database>();

// fetch foods
useEffect(() => {
    const fetchFood = async () => {
        const {data} = await supabase.from('food_recs').select('*');
        setFoodList(data);
    }
    fetchFood().catch(error => {
        throw error;
    })
}, [supabase])

const handleChooseFood = () => {
    setShowFood(!showFood);
    // show food description of id
}

  return (
    <div className="bg-white/50 rounded-2xl overflow-y-auto display flex flex-col items-center w-1/2 my-4 px-12 ml-20 mr-4">
        <span className="font-script text-5xl text-licorice py-8">Tomomi Recs</span>
    {foodList.map((food: Food) => (
        <>
        <div key={food.id} className="z-30">
            <button onClick={() => {handleChooseFood()}} className="
            text-licorice border-2 border-white bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-sans font-bold rounded-lg text-md tablet:text-xl laptop:text-2xl desktop:text-2xl px-5 py-2.5 text-center mr-2 mb-2 shadow-lg shadow-licorice/20">
                {food.name}
                {/* <span>
                    {foodList.filter((food) => (
                        food.id === 
                    ))}
                </span> */}
            </button>
        </div>
        </>
    ))}
    </div>
  )
}
