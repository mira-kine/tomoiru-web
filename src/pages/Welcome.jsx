import React from 'react';
import '../components/Buttons/HomeButton/HomeButton';
import TomomiWelcome from '../components/TomomiWelcome/TomomiWelcome';
import TextBox from '../components/Reusable/TextBox';

export default function Welcome() {
  // create two modes of state that renders components depending on what is available

  return (
    <div className="welcome-container">
      <TomomiWelcome />
      <TextBox />
    </div>
  );
}
