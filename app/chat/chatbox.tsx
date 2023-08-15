"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function ChatBox() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const router = useRouter();

  //   handle for chat responses
  const handleChat = async (e: any) => {
    e.preventDefault();
    // set response with whatever previous answers were
    if (response.length < 1) {
      setResponse(response);
    }
    // fullChat.push({ You: message });
    // build contextualized prompt
    const promptResp = await fetch("/prompt/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: message,
      }),
    });
    const promptData = await promptResp.json();
    // send this prompt to chatGPT
    const chatResp = await fetch("/chat/api", {
      method: "POST",
      headers: {
        "Content-Type": "application.json",
      },
      body: JSON.stringify({
        prompt: promptData.prompt,
      }),
    });
    console.log("chatResp", chatResp);
    if (!chatResp.ok) {
      throw new Error(chatResp.statusText);
    }

    const data = chatResp.body;

    if (data) {
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
      // fullChat.push({ Tomomi: response });
    }
  };

  const handleBack = () => {
    router.push("/dashboard");
  };

  return (
    <div className="flex justify-center items-center w-4/5 h-3/4 absolute bg-licorice opacity-70 rounded-3xl shadow-xl shadow-black mt-16">
      <div className="flex flex-col justify-start items-center relative w-11/12 h-5/6 min-w-[75%] shadow-white bg-black rounded-3xl pb-8">
        <button onClick={handleBack}>
            <span className="text-white">{'<'}</span>
          </button>
        <div className="w-11/12 h-4/5 mt-6 bg-white relative rounded-xl p-12 font-sans overflow-y-auto font-bold">
          {/* map through responses here */}
          <div className="chat chat-start">
            {/* <span>Hi, ask me anything!</span> */}
            {response !== null && (
              <span className="chat-bubble">{response}</span>
            )}
          </div>
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
  );
}
