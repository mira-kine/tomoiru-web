import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFood } from '../../hooks/useFood';

export default function SelectedFood() {
  // refactoring to set food display by ID
  const { id } = useParams();
  const { selectedFood } = useFood(id);
  const navigateTo = useNavigate();

  const handleBack = () => {
    navigateTo('/food-recs');
  };

  const handleEat = (item) => {
    //   set some type of selectedFood
  };

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
            <button onClick={handleBack}>Back to list</button>
            <button onClick={() => handleEat(selectedFood.id)}>
              Eat this!
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
