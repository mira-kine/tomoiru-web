import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Welcome.css';
import '../../components/Buttons/HomeButton/HomeButton';
import TomomiWelcome from '../../components/TomomiWelcome/TomomiWelcome';
import TextBox from '../../components/Reusable/TextBox';
import UserInputWelcome from '../../components/UserInputs/UserInputWelcome';
import { useUser } from '../../context/UserProvider';

export default function Welcome() {
  const navigateTo = useNavigate();
  const { currentUser, updateUserData } = useUser();
  // create two modes of state that renders components depending on what is available
  const [userMode, setUserMode] = useState(false);

  return (
    <div id="welcome-container">
      {!userMode && <TomomiWelcome />}
      {userMode && <UserInputWelcome />}
      <TextBox />
    </div>
  );
}
