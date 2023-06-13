import React, { useReducer } from 'react';
import './TextBox.css';
import { useUser } from '../../context/UserProvider';

const initialState = { index: 0 };
function reducer(state, action) {
  switch (action.type) {
    case 'next':
      return { index: state.index + 1 };
    case 'stop':
      return null;
    default:
      return { index: state.index };
  }
}

export default function TextBox({ userMode, setUserMode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { currentUser } = useUser();

  const welcomeText = [
    {
      id: 0,
      text: 'Hi there! My name is Tomomi. What is your name?',
    },
    {
      id: 1,
      text: `Awesome. Nice to meet you ${currentUser.name}!`,
    },
    {
      id: 2,
      text: 'Welcome to my humble home.',
    },
    {
      id: 3,
      text: 'Here we can chat and learn Japanese together!',
    },
  ];
  console.log('state', state);

  return (
    <div id="text-box-container">
      {/* display only the first index */}
      {/* find where the state matches the current index */}
      <p className="typed">{welcomeText.at(state.index).text}</p>
      <button onClick={() => dispatch({ type: 'next' })}>Next</button>
      {/* when click, increment index and display that next */}
      {/* go until the end where you cannot increment anymore, change to navigate to wherever */}
    </div>
  );
}
