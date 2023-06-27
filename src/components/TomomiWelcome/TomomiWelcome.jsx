import React from 'react';
import '../../styles/TomomiWelcome.css';

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
          src={require('../../assets/tomomi_open.png')}
          alt="tomomi character animating talking"
        />
      )}
    </div>
  );
}
