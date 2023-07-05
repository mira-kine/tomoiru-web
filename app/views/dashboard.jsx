'use-client';
// This is a Client Component. It receives data as props and
// has access to state and effects just like Page components
// in the `pages` directory. It is the interactive side of the app
import React from 'react';
// import Loading from '../components/Reusable/Loading';

export default function Dashboard() {
  // option to choose foods - button to direct to food recs

  return (
    <div className="home-container">
      <div className="dashboard-title-container">
        <h1>Your Home</h1>
      </div>
      <div className="home-container-bg">
        <div className="tomomi-house-container">
          {/* <img
            className="tomomi-house-img"
            src={'../assets/tomoiru-room.png'}
            alt="built in spline 3D modeling of a corner of a room"
          /> */}
        </div>
      </div>
    </div>
  );
}

// next attach events to elements on spline model
