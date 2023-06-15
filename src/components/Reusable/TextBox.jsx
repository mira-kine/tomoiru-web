import React, { useReducer, useState } from 'react';
import './TextBox.css';
import { useUser } from '../../context/UserProvider';
import UserInputWelcome from '../UserInputs/UserInputWelcome';

export default function TextBox() {
  const [userMode, setUserMode] = useState(false);
  const { currentUser } = useUser();

  const welcomeText = [
    {
      id: 0,
      text: 'Hi there!',
    },
    {
      id: 1,
      text: 'My name is Tomomi.',
    },
    {
      id: 2,
      text: ' What is your name?',
    },
    {
      id: 3,
      text: `Awesome. Nice to meet you ${currentUser.userName}!`,
    },
  ];

  const initialState = { index: 0 };
  function reducer(state, action) {
    switch (action.type) {
      case 'next':
        return { index: state.index + 1 };
      case 'stop':
        setUserMode(true);
        // once currentUser is updated in local storage then
        return { index: state.index + 1 };
      default:
        return { index: state.index };
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  const handleUserInput = () => {
    if (state.index === 2) {
      dispatch({ type: 'stop' });
      setUserMode(false);
    } else {
      dispatch({ type: 'next' });
    }
  };

  console.log('state', state);

  return (
    <div id="text-box-container">
      {/* display only the first index */}
      {/* find where the state matches the current index */}
      {userMode && <UserInputWelcome />}
      <p className="typed">{welcomeText.at(state.index).text}</p>
      <button onClick={() => handleUserInput()}>Next</button>
      {/* when click, increment index and display that next */}
      {/* go until the end where you cannot increment anymore, change to navigate to wherever */}
    </div>
  );
}
