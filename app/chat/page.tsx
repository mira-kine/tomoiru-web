'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Chat() {
  const [query, setQuery] = useState<string>('');
  const [response, setResponse] = useState([]);
  const router = useRouter();

  // const prompt = `You are a kind, gentle and sweet friend who lives in Japan. Answer the question based on the context below to the best of your ability, and if the question cannot be answered based on the context, say "Ah, sorry. I am not sure about that one, I will have to check it out!"\n\nQuestion: ${query}\nAnswer:`;

  const handleBack = () => {
    setLoading(true);
    router.push('/dashboard');
  };

  const handleChat = async (e: any) => {
    e.preventDefault();
    // set response with whatever previous answers were
    if (response.length < 1) {
      setResponse('');
    }
    // build contextualized prompt
    const promptResp = await fetch('/api/buildPrompt', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        prompt: query
      })
    });

    const promptData = await promptResp.json();
    // send this prompt to chatGPT

    const chatResp = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application.json'
      },
      body: JSON.stringify({
        prompt: promptData.prompt
      })
    });
    if (!chatResp.ok) {
      throw new Error(chatResp.statusText);
    }
    const data = chatResp.body;

    // turning into readable stream
    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    // read the streaming chatGPT answer
    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      // getting read in chunks
      const chunkValue = decoder.decode(value);
      // update interface with answer in responses
      setResponse((prev) => prev + chunkValue);
    }
  };

  return (
    <div className="chat-container">
      <div className="computer">
        <div className="chat-bg">
          <button onClick={handleBack}>
            <div>{'<'}</div>
          </button>
          <div className="chat-box">
            Chats go here
            {response !== null && <div>Temp {response}</div>}
            <form className="chat-form" onSubmit={handleChat}>
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
    </div>
  );
}

// starting chat openai api here
