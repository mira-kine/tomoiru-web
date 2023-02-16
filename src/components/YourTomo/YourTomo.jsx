import React from 'react';
import './YourTomo.css';

export function YourTomo({ tomo }) {
  return (
    <>
      <div className="tomo">
        <div class="loop"></div>

        <div className="tomo__inner">
          <div className="tomo__shadow">
            <div className="tomo__highlight"></div>
          </div>

          <div className="screen">
            <div className="crack crack--top"></div>
            <div className="crack, crack--right">
              <div className="crack__line"></div>
            </div>
            <div className="crack crack--bottom"></div>
            <div className="crack crack--left">
              <div className="crack__line"></div>
            </div>

            <div className="screen__inner">
              <div>
                <img id="tomo-img" src={tomo.avatar} alt="your tomo img" />
              </div>
            </div>

            <div className="buttons">
              <div className="dashbutton dashbutton--a"></div>
              <div className="dashbutton dashbutton--b"></div>
              <div className="dashbutton dashbutton--c"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
