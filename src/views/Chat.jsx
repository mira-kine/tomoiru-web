import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Chat.css';
import Loading from '../components/Reusable/Loading';
import { useForm } from '../hooks/useForm';

export default function Chat() {
  // const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(false);
  const { formState, handleForm } = useForm({ query: '' });
  const [response, setResponse] = useState('');
  const navigateTo = useNavigate();
  const handleBack = () => {
    setLoading(true);
    navigateTo('/dashboard');
  };

  const handleSubmit = async (e) => {
    // e.preventDefault();
    const { query } = formState;
    console.log('query', query);
    setResponse('');
    // build prompt first
    const promptResp = await fetch('/api/buildPrompt', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: query,
      }),
    });
    console.log('promptResp', promptResp);
    const promptData = await promptResp.json();
    // send info through api search according to user query which is the value of the form in the build prompt
    console.log('promptData', promptData);
    // user query will be the const {query} = formState
    const chatResp = await fetch('/api/payload.js', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: promptData.prompt,
      }),
    });
    console.log('chatResp', chatResp);
    if (!chatResp.ok) {
      throw new Error(chatResp.statusText);
    }
    const data = chatResp.body;
    if (!data) {
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;
    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      // update client side with answer
      setResponse((prev) => prev + chunkValue);
    }
  };

  console.log('response', response);

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
            {response && <div>Temp {response}</div>}
            <div className="chat-box">Chats go here</div>
            <form className="chat-form" onSubmit={handleSubmit}>
              <div className="chat-input">
                <label>You:</label>
                <input
                  type="text"
                  value={formState.query}
                  onChange={handleForm}
                  aria-label="user chat input"
                  name="query"
                  placeholder="write your message here"
                />
                <button
                  className="button chat__button"
                  onClick={() => handleSubmit()}
                >
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
