import { useEffect, useState } from "react";
// TODO: Re-enable after backend food endpoints are built
// import type { Database } from "../../types/supabase";
// import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";

// useFood to get foodById
// useFood to get all food
export interface Food {
    id: number;
    name: string;
    image: string;
    description: string;
}

export function useFood() {
    // TODO: Replace with backend API call
    // const supabase = createPagesBrowserClient<Database>();
    const [foodById, setFoodById] = useState<Food>({
        id: 0, name: '', image: '', description: ''
    });
    const [foodList, setFoodList] = useState<any>([]);


    useEffect(() => {
        // TODO: Fetch from backend API
        // const fetchFood = async () => {
        //     const {data} = await supabase.from('food_recs').select('*');
        //     setFoodList(data);
        // }
        // fetchFood().catch(error => {
        //     throw error;
        // })

        // Placeholder: Empty list for now
        setFoodList([]);
    }, [])




  return { foodList, setFoodList, foodById, setFoodById };
}

// set export Food type here and use hook instead of repeated code