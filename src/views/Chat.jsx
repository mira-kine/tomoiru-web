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
        <div className="chat-box">
          {/* {responses ? responses.map((msg) => {
              <span>{msg}</span>
            })} */}
          <form className="chat-form">
            <div className="chat-input">
              <label>You:</label>
              <input
                type="text"
                value={formState.userInput}
                onChange={handleForm}
                aria-label="user chat input"
                name="userInput"
              />
            </div>
          </form>
          <button onClick={() => handleBack()}>go back</button>
        </div>
      )}
    </div>
  );
}

// starting chat openai api here
