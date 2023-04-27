import React from 'react';
import './YourTomo.css';

export function YourTomo({ tomo, handleClick, handleHome }) {
  return (
    <>
      <div className="screen">
        <div className="screen__inner">
          <div className="tomo-img-div">
            <img id="tomo-img" src={tomo.avatar} alt="your tomo img" />
          </div>
        </div>

        <div className="buttons">
          <button className="dashbutton" id="button-a" onClick={handleHome}>
            Home
          </button>
          <button className="dashbutton" id="button-b" onClick={handleClick}>
            Feed
          </button>
          <div className="dashbutton" id="button-c"></div>
        </div>
      </div>
    </>
  );
}
