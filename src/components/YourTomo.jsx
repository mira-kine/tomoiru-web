import React from 'react';
import '../views/FoodRecs/FoodRecs.css';

export default function YourTomo({ tomo }) {
  return (
    <>
      <img id="tomo-img" src={tomo.avatar} alt="your tomo img" />
    </>
  );
}
