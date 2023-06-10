import React from 'react';
import './TomomiWelcome.css';

export default function TomomiWelcome() {
  return (
    <div id="tomomi-welcome-div">
      <img
        src={require('../../assets/tomomi_open.png')}
        alt="tomomi character animating talking"
      />
    </div>
  );
}
