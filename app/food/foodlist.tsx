'use client'
import React, { useState, useEffect } from 'react'
import type { Database } from "../../types/supabase";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
// import Image from 'next/legacy/image';

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
    <div className="bg-white/50 rounded-2xl p-4 overflow-y-auto display flex flex-col justify-center items-center w-3/4">
    {foodList.map((food: Food) => (
        <>
        <div key={food.id}>
            <button onClick={() => {handleChooseFood()}}className="btn btn-outline m-2 text-licorice hover:bg-chick hover:text-peach">
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
        <div>
            {/* {showFood ? (
                // <Image src={food.image} alt="image of chosen food" width={125} height={125}/>
                <div>
                    {food}
                </div>
            ) : null} */}
            
        </div>
    </div>
  )
}
