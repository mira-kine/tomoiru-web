import React, { useEffect, useState } from 'react';
import { getFoods } from '../../api/foods';
import FoodList from '../../components/FoodList';
import YourTomo from '../../components/YourTomo';
import './FoodRecs.css';

export default function FoodRecs() {
  const [foodsList, setFoodsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFoods = async () => {
      const resp = await getFoods();
      setFoodsList(resp);
      setLoading(false);
    };
    fetchFoods();
  }, []);

  if (loading) {
    <h1>Loading...</h1>;
  }

  return (
    <div id="foodlist-page-container">
      <div id="avatar">
        <YourTomo />
      </div>
      <div id="food-list-container">
        <FoodList foodsList={foodsList} />
      </div>
    </div>
  );
}