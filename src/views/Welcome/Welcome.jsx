import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Welcome.css';
import '../../components/Buttons/HomeButton/HomeButton';
import TomomiWelcome from '../../components/TomomiWelcome/TomomiWelcome';
import TextBox from '../../components/Reusable/TextBox';
import UserInputWelcome from '../../components/UserInputs/UserInputWelcome';

export default function Welcome() {
  const navigateTo = useNavigate();
  // create two modes of state that renders components depending on what is available

  return (
    <div id="welcome-container">
      <TomomiWelcome />
      <TextBox />
    </div>
  );
}
