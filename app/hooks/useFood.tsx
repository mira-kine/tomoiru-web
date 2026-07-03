import { useEffect, useState } from "react";

export interface Food {
    id: number;
    name: string;
    image: string;
    description: string;
}

export function useFood() {
    const [foodById, setFoodById] = useState<Food>({
        id: 0, name: '', image: '', description: ''
    });
    const [foodList, setFoodList] = useState<Food[]>([]);

    useEffect(() => {
        // TODO: Fetch food recs from backend once /api/v1/food endpoints exist
        // (previously read from a Supabase food_recs table).
        setFoodList([]);
    }, [])

  return { foodList, setFoodList, foodById, setFoodById };
}
