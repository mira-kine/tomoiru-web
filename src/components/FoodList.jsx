import React from 'react';

export default function FoodList({ foodsList }) {
  console.log('foodsList', foodsList);
  return (
    <div>
      {foodsList.map((item) => {
        return (
          <div key={item.id}>
            <h2>{item.name}</h2>
          </div>
        );
      })}
    </div>
  );
}
