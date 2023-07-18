import React from 'react';
// import '../components/Buttons/HomeButton/HomeButton';
import TomomiWelcome from './TomomiWelcome';
import TextBox from '../components/TextBox';

export default function Welcome() {
  // create two modes of state that renders components depending on what is available
  // get user so you can update
  return (
    <div className="welcome-container">
      <TomomiWelcome />
      <TextBox />
    </div>
  );
}
