"use client";
import React, { useState, useReducer } from "react";
import { useRouter } from "next/navigation";

// using useReducer for more complex state management
// Messages is array with objects content + whether isUser or not
// so Messages = [{content: message, isUser: boolean}]
interface Message {
  content: string;
  isUser: boolean;
}

// Has state of either messages or loading (chunks have not come through completely yet)
interface ConversationState {
  messages: Message[];  // final messages array
  responseContent: string;  // accumulated bot response content 
  loading: boolean;
}

// update user's input
interface UserMessageAction {
  type: 'ADD_USER_MESSAGE';
  content: string;
}

// updating accumulated response action
interface UpdateTomomiResponseAction {
  type: 'UPDATE_TOMOMI_RESPONSE';
  content: string; // new chunk of the response
}

// adding the updated response action
interface TomomiResponseAction {
  type: 'ADD_TOMOMI_RESPONSE';
  content: string;
}

// loading state to show that response is streaming in
interface TomomiTypingAction {
  type: 'TOMOMI_TYPING';
}

type ConversationAction = UserMessageAction | UpdateTomomiResponseAction | TomomiTypingAction | TomomiResponseAction;

function conversationReducer(state: ConversationState, action: ConversationAction): ConversationState {
  switch (action.type) {
  // case 1. add user message
    case 'ADD_USER_MESSAGE':
      return {...state, messages: [...state.messages, {content: action.content, isUser: true }]};
  // case 2. while chunks are still streaming, loading = true
    case 'TOMOMI_TYPING':
      return {...state, loading: true, responseContent: ''};
  // case 3. update response content string with streaming chunk 
    case 'UPDATE_TOMOMI_RESPONSE':
      return {...state, responseContent: state.responseContent + action.content};
  //  case 4. once chunk value while loop is done, add responseContent from state to content, set loading false, reset responseContent
    case 'ADD_TOMOMI_RESPONSE':
      return {...state, messages: [...state.messages, {content: state.responseContent, isUser: false}], loading: false, responseContent: ''}
    default:
      return state;
    // default: return state;
  }
}

export default function ChatBox() {
  const [message, setMessage] = useState("");
  // initialize to empty messages array and false loading
  const [conversationState, dispatch] = useReducer(conversationReducer, {messages: [{content: 'Hi! Ask me anything.', isUser: false}], responseContent: '', loading: false})
  const router = useRouter();

  //   handle for chat responses
  const handleChat = async (e: any) => {
    e.preventDefault();
    dispatch({type: 'TOMOMI_TYPING'});
    // set response with whatever previous answers were
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
        // update current chunk string
        dispatch({type: 'UPDATE_TOMOMI_RESPONSE', content: chunkValue});
        console.log('conversationState.responseContent', conversationState.responseContent)
      }
      // update interface with answer in responses
      if (done) {
        dispatch({ type: 'ADD_TOMOMI_RESPONSE', content: conversationState.responseContent});
      }
      console.log('conversationState.messages', conversationState.messages)
    }
  };

  const handleBack = () => {
    router.push("/dashboard");
  };

  return (
    <div className="flex justify-center items-center w-4/5 h-3/4 absolute bg-licorice opacity-70 rounded-3xl shadow-xl shadow-black mt-16">
      <div className="flex flex-col justify-start items-center relative w-11/12 h-5/6 min-w-[75%] shadow-white bg-black rounded-3xl pb-8">
        <div className="w-full">
        <button className="text-white btn glass btn-white ml-6 mt-2" onClick={handleBack}>
          Back
          </button>
        </div>
        <div className="w-11/12 h-4/5 mt-6 bg-white relative rounded-xl p-12 font-sans overflow-y-auto font-bold">
              {conversationState.messages.map((message, index) => (
                <div key={index} className="chat chat-start h-3/4 w-full overflow-y-auto">
                  <div className={message.isUser ? 'chat-bubble bg-periwinkle text-licorice' : 'chat-bubble bg-licorice text-white'}>
                    {message.content}
                  </div>
                </div>
              ))}
              {conversationState.loading && <div className="chat-bubble bg-perwinkle">...</div>}
        <form
          className="w-10/12 bg-pink flex justify-start mt-8"
          onSubmit={handleChat}
        >
          <div className="w-full form-control">
            <input
              type="text"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              aria-label="user chat input"
              name="query"
              placeholder="write your message here"
              className="rounded-xl w-full p-4 truncate overflow-y-scroll outline color-periwinkle"
            />
          </div>
          <button className="text-white btn bg-licorice glass ml-4 p-4" onClick={handleChat}>
            Ask
          </button>
        </form>
      </div>
    </div>
    </div>
  );
}

// 1. make sure that chunks are being accumulated properly
// 2. display user messages as well 