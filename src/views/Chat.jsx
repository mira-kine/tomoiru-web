import React, { useState } from 'react';
import '../styles/Chat.css';
import Loading from '../components/Reusable/Loading';
import { useForm } from '../hooks/useForm';

export default function Chat() {
  // const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(false);
  const { formState, handleForm } = useForm({ userInput: '' });

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
        </div>
      )}
    </div>
  );
}
