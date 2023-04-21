import React from 'react';
import '../views/FoodRecs/FoodRecs';
import '../views/FoodRecs/FoodRecs.css';
import { useNavigate } from 'react-router-dom';

export default function FoodList({ foodsList }) {
  // handleClick -> if I click on food name, display will change to name with description + button to eat it
  const navigateTo = useNavigate();

  const handleDisplay = (item) => {
    navigateTo(`/dashboard/food-recs/${item.id}`);
  };

  return (
    <>
      {foodsList ? (
        <>
          <h1>Pick something to eat!</h1>
          <div id="foodlist">
            {foodsList.map((item) => {
              return (
                <div key={item.id}>
                  <button id="foodlist-div" onClick={() => handleDisplay(item)}>
                    <span id="food-name">{item.name}</span>
                  </button>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <h1>Nothing here yet!</h1>
      )}
    </>
  );
}
