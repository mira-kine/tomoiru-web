import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTomo } from '../../hooks/useTomo';
import { YourTomo } from '../../components/YourTomo/YourTomo';
// import NavBar from '../../components/NavBar/NavBar';
import { useUser } from '../../context/UserProvider';
import './Dashboard.css';

export default function Dashboard() {
  const { currentUser } = useUser();
  const tomo = useTomo({ currentUser });
  const navigateTo = useNavigate();

  // option to choose foods - button to direct to food recs
  const handleClick = () => {
    navigateTo('/food-recs');
  };

  return (
    <div class="home-container">
      <div class="home-container-bg">
        <div class="tomo-container">
          <div class="tomo-div">
            <YourTomo tomo={tomo} handleClick={handleClick} />
          </div>
        </div>
        {/* <NavBar />
        <div id="dashboard-title-container">
          <h1>What shall we do today?</h1>
        </div> */}
        <div class="interactive-box">Chat box goes here</div>
      </div>
    </div>
  );
}
