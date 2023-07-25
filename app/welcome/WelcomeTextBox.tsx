'use client';
import React, { useReducer, useState } from 'react';
import { welcomeText } from '../data/welcome-text.js';
import { useRouter } from 'next/navigation';

interface WelcomeProps {
  handleWelcome: () => void;
}
export default function WelcomeTextBox({ handleWelcome }: WelcomeProps) {
  const [userMode, setUserMode] = useState(false);
  const [username, setUsername] = useState('');
  const router = useRouter();

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
    if (state.index < 2 || state.index >= 3) {
      dispatch({ type: 'next' });
    }
    if (state.index === 1) {
      dispatch({ type: 'stop' });
    }
    if (state.index === welcomeText.length - 2) {
      router.push('/dashboard');
      router.refresh();
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await handleWelcome(username);
    dispatch({ type: 'next' });
    setUserMode(false);
  };
  console.log('state.index', state.index);
  return (
    <>
      {/* display only the first index */}
      {/* find where the state matches the current index */}
      <div className="text-2xl">{welcomeText.at(state.index).text}</div>
      {!userMode && (
        <div className="flex justify-end">
          <button
            className="text-licorice border-2 border-white bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-sans font-bold rounded-lg text-sm tablet:text-xl laptop:text-2xl desktop:text-2xl px-5 py-1 text-center mr-2 mb-2 shadow-md w-1/3 laptop:w-1/4"
            onClick={() => {
              handleUserInput();
            }}
          >
            {/* when click, increment index and display that next */}
            <span>Next</span>
          </button>
        </div>
      )}
      {userMode && (
        <div className="flex flex-col p-1 m-2">
          <form
            className="p-0 m-1 mt-1 flex flex-col items-center"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              aria-label="name"
              name="username"
              placeholder="what would you like to be called?"
              className="ring-peach rounded-lg ring-2 ring-inset m-3 p-2 shadow-md shadow-licorice/30 w-1/2 caret-peach"
            />
            <button
              type="submit"
              className="text-licorice border-2 border-white bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-sans font-bold rounded-lg text-sm tablet:text-xl laptop:text-2xl desktop:text-2xl px-5 py-1 text-center mr-2 mb-2 shadow-md w-1/3 laptop:w-1/4"
              onClick={handleSubmit}
            >
              <span>This is Me!</span>
            </button>
          </form>
        </div>
      )}
    </>
  );
}
