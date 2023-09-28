'use client'
import React from 'react'
import { useRouter } from 'next/navigation'

export default function FoodButtons() {
    const router = useRouter();

    const handleFoodRouter = (name: string) => {
        router.push(`/food/${name}`)
    }
  return (
    <div id="button-container" className="bg-white/50 rounded-2xl z-30 w-8/12 h-2/3 p-12 flex justify-center items-center">
    <div className="bg-melon/80 rounded-2xl py-12 flex w-3/4 flex-wrap justify-center z-50">
    <div className="mx-12 my-8" tabIndex={1}>
      <button className="btn glass btn-lg" onClick={() => {handleFoodRouter('fooddiary')}} >
        Food Diary
      </button>
    </div>
    <div className="mx-12 my-8" tabIndex={2}>
      <button className="btn glass btn-lg" onClick={() => {handleFoodRouter('foodrecs')}}>
        Tomomi Recs 
      </button>
    </div>
    <div className="mx-12 my-8 flex flex-col" tabIndex={3}>
        <button className="btn btn-disabled">
          Add Food
        </button>
    <span className="white">*Coming soon!*</span>
    </div>
    <div className="mx-12 my-8 flex flex-col" tabIndex={4}>
      <button className="btn btn-disabled">
        Location
      </button>
    <span className="white">*Coming soon!*</span>
    </div>
  </div>
</div>
  )
}
