import React, { useState } from 'react';
import '../views/FoodRecs/FoodRecs';
import '../views/FoodRecs/FoodRecs.css';

export default function FoodList({ foodsList }) {
  // handleClick -> if I click on food name, display will change to name with description + button to eat it
  const [showDisplay, setShowDisplay] = useState(false);
  const [foodId, setFoodId] = useState({});

  const handleDisplay = (item) => {
    setFoodId(item.id);
    setShowDisplay(!showDisplay);
  };

  console.log('foodId', foodId);

  return (
    <div>
      {showDisplay ? (
        <div id="foodlist">
          {foodsList.map((item) => {
            return (
              <div key={item.id}>
                <button id="foodlist-div" onClick={handleDisplay}>
                  <span id="food-name">{item.name}</span>
                </button>

                {/* <img src={ } /> - add image accordingly */}
              </div>
            );
          })}
        </div>
      ) : (
        <div>
          {foodsList.map((item) => {
            return (
              <div key={item.id}>
                <button onClick={handleDisplay}>{item.name}</button>
                <span>{item.description}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
