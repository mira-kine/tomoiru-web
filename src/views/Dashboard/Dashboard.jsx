import React, { useEffect, useState } from 'react';
import { useTomo } from '../../context/TomoProvider';

export default function Dashboard() {
  const { tomo } = useTomo();

  return (
    <div>
      <h1>Tomo dashboard page</h1>
      <div id="tomo-container">
        <img src={tomo.avatar} alt="hamtaro gif" />
      </div>
    </div>
  );
}
