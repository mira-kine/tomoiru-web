import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { eatFood } from '../../api/foods';
import { useUser } from '../../context/UserProvider';
import { useFood } from '../../hooks/useFood';

export default function SelectedFood() {
  // refactoring to set food display by ID
  const { id } = useParams();
  const { selectedFood } = useFood(id);
  const { currentUser } = useUser();
  const navigateTo = useNavigate();

  const handleBack = () => {
    navigateTo('/food-recs');
  };

  const handleEat = async () => {
    //   set some type of selectedFood
    await eatFood(currentUser, selectedFood);
    navigateTo(`/eating`);
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
            <button onClick={() => handleEat(selectedFood)}>Eat this!</button>
          </div>
        </div>
      </div>
    </>
  );
}
