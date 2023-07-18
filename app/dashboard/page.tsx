'use client';
import React, { useState } from 'react';

export default function Dashboard() {
  // user id is already in session

  const [name, setName] = useState('temporary');
  console.log('setName', setName);
  // set name with whatever is in cookie
  return (
    <div className="home-container">
      <div className="dashboard-title-container">
        <h1>{name}&apos;s Home</h1>
      </div>
      <div className="home-container-bg">
        <div className="tomomi-house-container">
          <img
            className="tomomi-house-img"
            src={'../assets/tomoiru-room.png'}
            alt="built in spline 3D modeling of a corner of a room"
          />
        </div>
      </div>
    </div>
  );
}

// next attach events to elements on spline model
