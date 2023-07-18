'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Chat() {
  const [message, setMessage] = useState('');
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
    const promptResp = await fetch('/prompt/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        prompt: message
      })
    });

    const promptData = await promptResp.json();
    // send this prompt to chatGPT
    const chatResp = await fetch('/chat/api', {
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
    <div className="flex justify-center items-center content-center w-full h-full bg-periwinkle">
      <div className="flex justify-center items-center w-4/5 h-4/5 absolute top-24 bg-licorice opacity-70 rounded-3xl shadow-xl shadow-black">
        <div className="flex flex-col justify-start items-center relative w-11/12 h-5/6 min-w-[75%] shadow-white bg-black rounded-3xl pb-8">
          <button onClick={handleBack}>
            <span className="text-white">{'<'}</span>
          </button>
          <div className="w-10/12 h-4/5 bg-white relative rounded-xl p-12 font-sans overflow-y-auto">
            Chats go here
            {/* map through responses here */}
            {response !== null && <div>{response}</div>}
          </div>
          <form
            className="w-10/12 bg-pink flex justify-start mt-8"
            onSubmit={handleChat}
          >
            <div className="w-full">
              {/* <label className="font-sans text-white">You:</label> */}
              <input
                type="text"
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
                aria-label="user chat input"
                name="query"
                placeholder="write your message here"
                className="rounded-xl w-full p-4 truncate overflow-y-scroll"
              />
            </div>
            <button className="text-white p-2" onClick={handleChat}>
              Ask
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
