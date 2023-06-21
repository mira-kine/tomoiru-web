import React, { useReducer } from 'react';
import './TextBox.css';
import { useUser } from '../../context/UserProvider';
import UserInputWelcome from '../UserInputs/UserInputWelcome';
import { useNavigate } from 'react-router-dom';

export default function TextBox({ userMode, setUserMode }) {
  const { currentUser } = useUser();
  const navigateTo = useNavigate();

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
      text: `Awesome. Nice to meet you ${currentUser.user_name}!`,
    },
    {
      id: 4,
      text: 'Add more stories here and intro',
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
        return { index: state.index };
      default:
        return { index: state.index };
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  const handleUserInput = () => {
    if (state.index === 2) {
      dispatch({ type: 'stop' });
      setUserMode(false);
    }
    if (currentUser.user_name) {
      dispatch({ type: 'next' });
    }
    if (state.index === welcomeText.length - 1) {
      navigateTo('/dashboard');
    }
  };

  return (
    <div id="text-box-container">
      {/* display only the first index */}
      {/* find where the state matches the current index */}
      {userMode && <UserInputWelcome setUserMode={setUserMode} />}
      <p className="typed">{welcomeText.at(state.index).text}</p>
      <button onClick={() => handleUserInput()}>Next</button>
      {/* when click, increment index and display that next */}
      {/* go until the end where you cannot increment anymore, change to navigate to wherever */}
    </div>
  );
}
