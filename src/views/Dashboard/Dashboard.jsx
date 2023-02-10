import React, { useEffect, useState } from 'react';
import { useTomo } from '../../context/TomoProvider';
import './Dashboard.css';

export default function Dashboard() {
  const { tomo } = useTomo();

  return (
    <div id="dashboard-view-container">
      <div id="title-container">
        <h1>What shall we do today?</h1>
      </div>
      <div id="tomo-container">
        <img id="tomo-img" src={tomo.avatar} alt="hamtaro gif" />
      </div>
    </div>
  );
}
