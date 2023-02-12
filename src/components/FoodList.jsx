import React from 'react';
import '../views/FoodRecs/FoodRecs';
import '../views/FoodRecs/FoodRecs.css';

export default function FoodList({ foodsList }) {
  // handleClick -> if I click on food name, display will change to name with description + button to eat it
  return (
    <div id="foodlist">
      {foodsList.map((item) => {
        return (
          <div key={item.id}>
            <ul id="foodlist-ul">
              <li id="food-name">{item.name}</li>
            </ul>
            {/* <img src={ } /> - add image accordingly */}
          </div>
        );
      })}
    </div>
  );
}
