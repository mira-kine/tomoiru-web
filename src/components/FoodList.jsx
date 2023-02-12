import React from 'react';
import '../views/FoodRecs/FoodRecs';

export default function FoodList({ foodsList }) {
  return (
    <div id="foodlist-container">
      {foodsList.map((item) => {
        return (
          <div key={item.id}>
            <h2>{item.name}</h2>
            <h4>{item.description}</h4>
          </div>
        );
      })}
    </div>
  );
}
