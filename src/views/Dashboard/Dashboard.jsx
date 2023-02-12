import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTomo } from '../../context/TomoProvider';
import './Dashboard.css';

export default function Dashboard() {
  const { tomo } = useTomo();
  const navigateTo = useNavigate();

  // option to choose foods - button to direct to food recs
  const handleClick = () => {
    navigateTo('/food-recs');
  };

  return (
    <div id="dashboard-view-container">
      <div id="title-container">
        <h1>What shall we do today?</h1>
      </div>
      <div id="tomo-container">
        <img id="tomo-img" src={tomo.avatar} alt="hamtaro gif" />
      </div>
      <button onClick={handleClick}>Feed Me!</button>
    </div>
  );
}
