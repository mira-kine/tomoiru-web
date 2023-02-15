import React from 'react';
import { Link } from 'react-router-dom';
import './HomeButton.css';

export default function HomeButton() {
  return (
    <>
      <Link to="/signin" className="button button--piyo">
        <div className="button__wrapper">
          <span className="button__text">Sign In</span>
        </div>
      </Link>
      <Link to="/signup" className="button button--piyo">
        <div className="button__wrapper">
          <span className="button__text">Sign Up</span>
        </div>
        <div className="characterBox">
          <div className="character">
            <div className="character__face"></div>
          </div>
        </div>
      </Link>

      <div className="piyo">
        <div className="characterBox">
          <div className="character wakeup">
            <div className="character__face"></div>
          </div>
        </div>
      </div>
    </>
  );
}
