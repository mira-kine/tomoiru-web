import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTomo } from '../../hooks/useTomo';
import { YourTomo } from '../../components/YourTomo/YourTomo';
import NavBar from '../../components/NavBar/NavBar';
import './Dashboard.css';
import { useUser } from '../../context/UserProvider';

export default function Dashboard() {
  const { currentUser } = useUser();
  const tomo = useTomo({ currentUser });
  const navigateTo = useNavigate();

  // option to choose foods - button to direct to food recs
  const handleClick = () => {
    navigateTo('/food-recs');
  };

  return (
    <div id="dashboard-view-container">
      <div id="dashboard-bg">
        <NavBar />
        <div id="dashboard-title-container">
          <h1>What shall we do today?</h1>
        </div>
        <div id="tomo-container">
          <YourTomo tomo={tomo} handleClick={handleClick} />
        </div>
      </div>
    </div>
  );
}
