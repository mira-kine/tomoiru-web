import React, { useEffect, useState } from 'react';
import { getFoods } from '../../api/foods';
import FoodList from '../../components/FoodList';
import './FoodRecs.css';

export default function FoodRecs() {
  const [foodsList, setFoodsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFoods = async () => {
      const resp = await getFoods();
      setFoodsList(resp);
    };
    fetchFoods();
    setLoading(false);
  }, []);

  if (loading) {
    <h1>Loading...</h1>;
  }

  return (
    <div className="food-container">
      <div className="food-container-bg">
        {/* <img
          className="food-recs-bg"
          alt="cute background for eating page"
        /> */}
        <div id="user-input-box">
          <FoodList foodsList={foodsList} />
        </div>
      </div>
    </div>
  );
}
