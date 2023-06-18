import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import Spline from '@splinetool/react-spline';

export default function Dashboard() {
  // const navigateTo = useNavigate();
  // option to choose foods - button to direct to food recs

  return (
    <div className="home-container">
      <div id="dashboard-title-container">
        <h1>Home</h1>
      </div>
      <div className="home-container-bg">
        <div className="tomomi-house-container">
          <Spline
            className="tomomi-house"
            scene="https://prod.spline.design/BUslBJhv5ZSWmILk/scene.splinecode"
          />
        </div>
      </div>
    </div>
  );
}

// next attach events to elements on spline model
