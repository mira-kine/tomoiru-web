import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

export default function Home() {
  return (
    <div id="home-view-container">
      <div id="home-container">
        <div id="title-container">
          <h2>Welcome to Tomoiru!</h2>
        </div>
        <div id="signin-container">
          <span className="signin-box">
            <Link to="/signin">Sign In?</Link>
          </span>
          <span className="signin-box">
            <Link to="/signup">Sign Up?</Link>
          </span>
        </div>
      </div>
    </div>
  );
}
