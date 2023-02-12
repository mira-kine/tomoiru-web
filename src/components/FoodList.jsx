import React, { useState } from 'react';
import '../views/FoodRecs/FoodRecs';
import '../views/FoodRecs/FoodRecs.css';

export default function FoodList({ foodsList }) {
  // handleClick -> if I click on food name, display will change to name with description + button to eat it
  const [showDisplay, setShowDisplay] = useState(false);
  const [foodId, setFoodId] = useState({});

  const handleDisplay = (item) => {
    setShowDisplay(!showDisplay);
  };

  const handleEat = (item) => {
    setFoodId(item.id);
  };

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
        <div id="foodlist-with-display">
          {foodsList.map((item) => {
            return (
              <div key={item.id}>
                <div id="button-container">
                  <span id="food-name">{item.name}</span>
                </div>
                {/* <img src={item.image} alt="item" /> */}
                <div id="food-description-container">
                  <span>{item.description}</span>
                </div>
                <div id="options-container">
                  <button onClick={handleDisplay}>Back to list</button>
                  <button onClick={() => handleEat(item.id)}>Eat this!</button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
