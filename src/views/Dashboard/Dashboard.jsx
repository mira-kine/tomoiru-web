import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTomo } from '../../hooks/useTomo';
import { YourTomo } from '../../components/YourTomo/YourTomo';
import NavBar from '../../components/NavBar/NavBar';
import { useUser } from '../../context/UserProvider';
import './Dashboard.css';

export default function Dashboard() {
  const { currentUser } = useUser();
  // const tomo = useTomo({ currentUser });
  const navigateTo = useNavigate();

  // option to choose foods - button to direct to food recs
  const handleFood = () => {
    navigateTo('/dashboard/food-recs');
  };

  const handleHome = () => {
    navigateTo('/dashboard');
  };

  return (
    <div class="home-container">
      <NavBar />
      <div id="dashboard-title-container">
        <h1>What shall we do today?</h1>
      </div>
      <div class="home-container-bg">
        <img
          className="home-bg-img"
          src={require('../../assets/temp-bg.jpg')}
          alt="background of tomoiru gif"
        />
        <div className="buttons" id="dashbutton-input">
          <button className="dashbutton" id="button-a" onClick={handleHome}>
            Home
          </button>
          <button className="dashbutton" id="button-b" onClick={handleFood}>
            Feed
          </button>
          <div className="dashbutton" id="button-c">
            Chat
          </div>
        </div>
      </div>
    </div>
  );
}
