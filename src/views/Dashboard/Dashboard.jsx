import React, { useEffect, useState } from 'react';
import hamtaro from '../../assets/hamtaro.gif';

export default function Dashboard() {
  return (
    <div>
      <h1>Tomo dashboard page</h1>
      <div id="tomo-container">
        <img src={hamtaro} alt="hamtaro gif" />
      </div>
    </div>
  );
}
