/* eslint-disable */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Chat.css';
import Loading from '../components/Reusable/Loading';
// import buildPrompt from '../api/buildPrompt.ts';
// import { useForm } from '../hooks/useForm';

export default function Chat() {
  // const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(false);
  // const { formState, handleForm } = useForm({ query: '' });
  const [query, setQuery] = useState<string>('');
  const [response, setResponse] = useState('');
  const navigateTo = useNavigate();

  // MVP hardcode prompt here, but later on fix buildPrompt.ts to generate according to similarity

  const prompt = `You are a kind, gentle and sweet friend who lives in Japan. Answer the question based on the context below to the best of your ability, and if the question cannot be answered based on the context, say "Ah, sorry. I am not sure about that one, I will have to check it out!"\n\nQuestion: ${query}\nAnswer:`;

  const handleBack = () => {
    setLoading(true);
    navigateTo('/dashboard');
  };

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    e.preventDefault();
    setResponse('');
    setLoading(true);
<<<<<<< HEAD:src/pages/Chat.tsx
    // build prompt first

    const promptResp = await fetch('/api/buildPrompt', {
=======

    const chatResp = await fetch('/api/payload', {
>>>>>>> d2333940 (working on readable stream coming through to chat):src/views/Chat.tsx
      method: 'POST',
      headers: {
        'Content-Type': 'application.json'
      },
      body: JSON.stringify({
        prompt
      })
    });

    if (!chatResp.ok) {
      throw new Error(chatResp.statusText);
    }
    // Readable Stream data
    const data = chatResp.body;
    if (data === null) {
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
    setLoading(false);
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
            {response !== null && <div>Temp {response}</div>}
            <div className="chat-box">Chats go here</div>
            <form className="chat-form">
              <div className="chat-input">
                <label>You:</label>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                  }}
                  aria-label="user chat input"
                  name="query"
                  placeholder="write your message here"
                />
                <button
                  className="button chat__button"
                  onClick={(e) => handleSubmit(e)}
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
