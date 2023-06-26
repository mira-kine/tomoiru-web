import React from 'react';
import '../../styles/TomomiWelcome.css';

export default function TomomiWelcome() {
  return (
    <div id="tomomi-welcome-div">
      <img
        className="tomomi"
        src={require('../../assets/tomomi_open.png')}
        alt="tomomi character animating talking"
      />
    </div>
  );
}
