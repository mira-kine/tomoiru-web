import React from 'react';
import './TomomiWelcome.css';

export default function TomomiWelcome({ userMode }) {
  return (
    <div id="tomomi-welcome-div">
      {!userMode && (
        <img
          className="tomomi"
          src={require('../../assets/tomomi_close.png')}
          alt="tomomi character with closed mouth"
        />
      )}
      {userMode && (
        <img
          className="tomomi"
          src={require('../../assets/tomomi_talking.png')}
          alt="tomomi character animating talking"
        />
      )}
    </div>
  );
}
