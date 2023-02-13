import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { eatFood } from '../../api/foods';
import { useUser } from '../../context/UserProvider';
import { useFood } from '../../hooks/useFood';
import './SelectedFood.css';

export default function SelectedFood() {
  // refactoring to set food display by ID
  const { id } = useParams();
  const { selectedFood } = useFood(id);
  const { currentUser } = useUser();
  const navigateTo = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleBack = () => {
    navigateTo('/food-recs');
  };

  const handleEat = async () => {
    //   set some type of selectedFood
    setLoading(true);
    await eatFood(currentUser, selectedFood);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    navigateTo('/dashboard');
  };

  return (
    <>
      {loading ? (
        <div id="loading-page">
          <img
            src={require(`../../assets/ol-sushi.GIF`)}
            alt="sushi loading prop"
          />
        </div>
      ) : (
        <div id="foodlist-with-display">
          <div key={selectedFood.id}>
            <div id="button-container">
              <span id="food-name">{selectedFood.name}</span>
            </div>
            <div id="food-description-container">
              <span>{selectedFood.description}</span>
            </div>
            <div id="button-options-container">
              <button onClick={handleBack}>Back to list</button>
              <button onClick={() => handleEat(selectedFood)}>Eat this!</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
