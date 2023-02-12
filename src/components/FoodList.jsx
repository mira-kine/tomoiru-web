import React, { useState } from 'react';
import '../views/FoodRecs/FoodRecs';
import '../views/FoodRecs/FoodRecs.css';
import { useFood } from '../hooks/useFood.jsx';
import SelectedFood from './SelectedFood';
import { useNavigate } from 'react-router-dom';

export default function FoodList({ foodsList }) {
  // handleClick -> if I click on food name, display will change to name with description + button to eat it
  // const [showDisplay, setShowDisplay] = useState(false);
  const [foodId, setFoodId] = useState({});
  const navigateTo = useNavigate();
  const { selectedFood, setSelectedFood } = useFood(foodId);

  const handleDisplay = (item) => {
    navigateTo(`/food-recs/${item.id}`);
    // setFoodId(item.id);
    // setSelectedFood(item.id);
  };

  console.log('selectedFood', selectedFood);
  const handleEat = (item) => {
    setFoodId(item.id);
  };

  return (
    <div>
      <div id="foodlist">
        {foodsList.map((item) => {
          return (
            <div key={item.id}>
              <button id="foodlist-div" onClick={() => handleDisplay(item)}>
                <span id="food-name">{item.name}</span>
              </button>

              {/* <img src={ } /> - add image accordingly */}
            </div>
          );
        })}
      </div>
    </div>
  );
}
