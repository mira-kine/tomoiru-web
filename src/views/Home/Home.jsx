import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

export default function Home() {
  return (
    <div id="home-view-container">
      <div id="home-container">
        <div id="title-container">
          <span>Welcome to Tomoiru!</span>
          <div id="signin-container">
            <div className="signin-box">
              <Link to="/signin">Sign In?</Link>
            </div>
            <div className="signin-box">
              <Link to="/signup">Sign Up?</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
