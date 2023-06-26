import React, { useReducer, useState } from 'react';
import { useUser } from '../../context/UserProvider';
import { useNavigate } from 'react-router-dom';
import { updateUserName } from '../../api/users';
import Loading from '../Reusable/Loading';
import { useForm } from '../../hooks/useForm';
import '../../styles/TextBox.css';
import { welcomeText } from '../../data/welcome-text.js';

export default function TextBox() {
  const { currentUser, updateUserData } = useUser();
  const navigateTo = useNavigate();
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
    if (state.index < 2) {
      dispatch({ type: 'next' });
    }
    if (state.index === 1) {
      dispatch({ type: 'stop' });
    }
    if (state.index === welcomeText.length - 1) {
      navigateTo('/dashboard');
    }
  };

  console.log('state', state);

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
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="text-box-container">
      {loading ? (
        <div className="loading-div">
          <Loading />
        </div>
      ) : (
        <>
          {userMode && (
            <form onSubmit={handleWelcome}>
              <input
                type="text"
                value={formState.userName}
                onChange={handleForm}
                aria-label="name"
                name="userName"
              />
              <button onClick={handleWelcome}>This is me!</button>
            </form>
          )}
          {/* display only the first index */}
          {/* find where the state matches the current index */}
          <div>
            <p className="typed">{welcomeText.at(state.index).text}</p>
          </div>
          {!userMode && <button onClick={() => handleUserInput()}>Next</button>}
          {/* when click, increment index and display that next */}
          {/* go until the end where you cannot increment anymore, change to navigate to wherever */}
        </>
      )}
    </div>
  );
}
