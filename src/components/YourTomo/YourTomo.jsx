import React from 'react';
import './YourTomo.css';

export function YourTomo({ tomo }) {
  return (
    <>
      <div className="screen">
        <div className="screen__inner">
          <div className="tomo-img-div">
            <img id="tomo-img" src={tomo.avatar} alt="your tomo img" />
          </div>
        </div>
      </div>
    </>
  );
}
