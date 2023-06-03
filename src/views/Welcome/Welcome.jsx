import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Welcome.css';
import '../../components/Buttons/HomeButton/HomeButton';
import { useUser } from '../../context/UserProvider';

export default function Welcome() {
  const navigateTo = useNavigate();
  const { currentUser, updateUserData } = useUser();

  // currying - handler itself is the pointer, not an anonymous function ON the onClick event
  // state rerenders correct data asynchronously
  const handleCreate = () => {
    console.log('helloworld');
    try {
      navigateTo('/dashboard');
    } catch (error) {
      alert('sorry there was an error!');
    }
  };

  return (
    <div id="welcome-container">
      <div id="welcome-title-container">
        <h1>What is your name?</h1>
      </div>
      <div className="form-container">
        <form id="welcome-form" onSubmit={(e) => handleCreate(e)}>
          <div id="name-container">
            <input
              placeholder="name"
              value={currentUser.name}
              name="name"
              type="text"
              // onInput={(e) => updateTomo('name', e.target.value)}
            />
            <button
              className="button button--piyo"
              onClick={(e) => handleCreate(e)}
            >
              <span className="button__text">Ok</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
