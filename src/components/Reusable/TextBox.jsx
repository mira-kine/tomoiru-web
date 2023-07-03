import React, { useReducer, useState } from 'react';
import { updateUserName } from '../../api/users';
import Loading from '../Reusable/Loading';
import { useForm } from '../../hooks/useForm';
import { welcomeText } from '../../data/welcome-text.js';
import { useRouter } from 'next/navigation';

export default function TextBox() {
  const { currentUser, updateUserData } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { formState, handleForm } = useForm({ userName: '' });
  const [userMode, setUserMode] = useState(false);

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
    if (state.index === welcomeText.length - 1) {
      router.push('/dashboard');
    }
  };

  const handleWelcome = async (e) => {
    e.preventDefault();
    const { userName } = formState;
    try {
      setLoading(true);
      await updateUserName(userName, currentUser.id);
      // update local storage user data with userName
      updateUserData(userName);
      dispatch({ type: 'next' });
      setUserMode(false);
    } finally {
      setLoading(false);
    }
  };
  console.log('state', state);
  return (
    <div id="text-box-container">
      {loading ? (
        <div className="loading-div">
          <Loading />
        </div>
      ) : (
        <>
          {/* display only the first index */}
          {/* find where the state matches the current index */}
          <div className="text-container">
            <div className="text-box typed">
              {welcomeText.at(state.index).text}
            </div>
            {!userMode && (
              <button
                className="button button__welcome"
                onClick={() => handleUserInput()}
              >
                <div className="button__wrapper button__wrapper2">
                  <div className="button__text">Next</div>
                </div>
              </button>
            )}
            {userMode && (
              <form className="welcome-form" onSubmit={handleWelcome}>
                <input
                  type="text"
                  value={formState.userName}
                  onChange={handleForm}
                  aria-label="name"
                  name="userName"
                />
                <button
                  className="button button--yellow"
                  onClick={handleWelcome}
                >
                  <div className="button__wrapper button__wrapper2">
                    <div className="button__text">This is Me!</div>
                  </div>
                </button>
              </form>
            )}
          </div>
          {/* when click, increment index and display that next */}
          {/* go until the end where you cannot increment anymore, change to navigate to wherever */}
        </>
      )}
    </div>
  );
}
