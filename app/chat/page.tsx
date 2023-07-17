'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
// import buildPrompt from '../api/buildPrompt.ts';
// import { useForm } from '../hooks/useForm';

export default function Chat() {
  // const [responses, setResponses] = useState([]);
  // const { formState, handleForm } = useForm({ query: '' });
  const [query, setQuery] = useState<string>('');
  const [response, setResponse] = useState([]);
  const router = useRouter();
  // MVP hardcode prompt here, but later on fix buildPrompt.ts to generate according to similarity

  // const prompt = `You are a kind, gentle and sweet friend who lives in Japan. Answer the question based on the context below to the best of your ability, and if the question cannot be answered based on the context, say "Ah, sorry. I am not sure about that one, I will have to check it out!"\n\nQuestion: ${query}\nAnswer:`;

  const handleBack = () => {
    setLoading(true);
    router.push('/dashboard');
  };

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    e.preventDefault();
    setResponse('');
    setLoading(true);
    // build prompt first

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
      <div className="computer">
        <div className="chat-bg">
          <button onClick={handleBack}>
            <div>{'<'}</div>
          </button>
          {response !== null && <div>Temp {response}</div>}
          <div className="chat-box">Chats go here</div>
          <form className="chat-form" onSubmit={handleSubmit}>
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
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// starting chat openai api here
