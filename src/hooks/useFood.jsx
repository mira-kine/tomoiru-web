import { useEffect, useState } from 'react';
import { getFoodById } from '../api/foods';

export function useFood(foodId) {
  const [selectedFood, setSelectedFood] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFoodById = async () => {
      try {
        const resp = await getFoodById(foodId);
        console.log('resp', resp);
        setSelectedFood(resp);
        // setFoodId(resp);
        setLoading(false);
      } catch (error) {
        throw error;
      } finally {
        setLoading(false);
      }
    };
    fetchFoodById();
  }, []);

  if (loading) {
    <h1>Loading...</h1>;
  }

  return { selectedFood, setSelectedFood };
}
