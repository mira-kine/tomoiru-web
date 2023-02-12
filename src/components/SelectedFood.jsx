import React from 'react';
import { useParams } from 'react-router-dom';
import { useFood } from '../hooks/useFood';

export default function SelectedFood() {
  // refactoring to set food display by ID
  const { id } = useParams();
  const { selectedFood, setSelectedFood } = useFood(id);

  return (
    <>
      <div id="foodlist-with-display">
        <div key={selectedFood.id}>
          <div id="button-container">
            <span id="food-name">{selectedFood.name}</span>
          </div>
          <div id="food-description-container">
            <span>{selectedFood.description}</span>
          </div>
          <div id="options-container">
            <button onClick={handleDisplay}>Back to list</button>
            <button onClick={() => handleEat(selectedFood.id)}>
              Eat this!
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
