import React, { useState } from 'react';
import './Welcome.css';
import '../../components/Buttons/HomeButton/HomeButton';
import TomomiWelcome from '../../components/TomomiWelcome/TomomiWelcome';
import TextBox from '../../components/Reusable/TextBox';

export default function Welcome() {
  // create two modes of state that renders components depending on what is available
  const [userMode, setUserMode] = useState(false);

  return (
    <div id="welcome-container">
      <TomomiWelcome userMode={userMode} />
      <TextBox userMode={userMode} setUserMode={setUserMode} />
    </div>
  );
}
