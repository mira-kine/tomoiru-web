import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Chat.css';
import Loading from '../components/Reusable/Loading';
import { useForm } from '../hooks/useForm';

export default function Chat() {
  // const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(false);
  const { formState, handleForm } = useForm({ userInput: '' });
  const navigateTo = useNavigate();

  const handleBack = () => {
    setLoading(true);
    navigateTo('/dashboard');
  };

  return (
    <div className="chat-container">
      {loading ? (
        <Loading />
      ) : (
        <div className="computer">
          <div className="chat-bg">
            <button className="button chat__button" onClick={handleBack}>
              <div className="button__wrapper chat__button_wrapper">
                <div className="button__text">{'<'}</div>
              </div>
            </button>
            {/* {responses ? responses.map((msg) => {
              <span>{msg}</span>
            })} */}
            <div className="chat-box">Chats go here</div>
            <form className="chat-form">
              <div className="chat-input">
                <label>You:</label>
                <input
                  type="text"
                  value={formState.userInput}
                  onChange={handleForm}
                  aria-label="user chat input"
                  name="userInput"
                  placeholder="write your message here"
                />
                <button className="button chat__button" onClick={handleBack}>
                  <div className="button__wrapper chat__button_wrapper">
                    <div className="button__text">{'^'}</div>
                  </div>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// starting chat openai api here
