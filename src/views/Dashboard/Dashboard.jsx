import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import Spline from '@splinetool/react-spline';

export default function Dashboard() {
  // const navigateTo = useNavigate();
  // option to choose foods - button to direct to food recs

  return (
    <div className="home-container">
      {/* <div id="dashboard-title-container">
        <h1>What shall we do today?</h1>
      </div> */}
      <div className="home-container-bg">
        <Spline scene="https://prod.spline.design/FIfTPXvz7GZEqg8E/scene.splinecode" />

        {/* <div className="buttons" id="dashbutton-input">
          <button className="dashbutton" id="button-a" onClick={handleHome}>
            Home
          </button>
          <button className="dashbutton" id="button-b" onClick={handleFood}>
            Feed
          </button>
          <div className="dashbutton" id="button-c">
            Chat
          </div>
        </div> */}
      </div>
    </div>
  );
}

// next attach events to elements on spline model
