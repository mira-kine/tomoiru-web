"use client";

import { useState, useReducer, useRef, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import toast from 'react-hot-toast';
import { getAuthToken } from '@/utils/auth';

// Message with Tomomi branding
interface Message {
  content: string;
  role: 'user' | 'tomomi';
}

// Conversation state for streaming
interface ConversationState {
  messages: Message[];
  responseContent: string; // Accumulated streaming response
  loading: boolean;
}

// Action types for reducer
interface AddUserMessageAction {
  type: 'ADD_USER_MESSAGE';
  content: string;
}

interface TomomiTypingAction {
  type: 'TOMOMI_TYPING';
}

interface UpdateTomomiResponseAction {
  type: 'UPDATE_TOMOMI_RESPONSE';
  content: string; // New chunk
}

interface AddTomomiResponseAction {
  type: 'ADD_TOMOMI_RESPONSE';
}

interface ReplaceTomomiResponseAction {
  type: 'REPLACE_TOMOMI_RESPONSE';
  content: string;
}

interface ErrorAction {
  type: 'ERROR';
}

type ConversationAction =
  | AddUserMessageAction
  | TomomiTypingAction
  | UpdateTomomiResponseAction
  | AddTomomiResponseAction
  | ReplaceTomomiResponseAction
  | ErrorAction;

function conversationReducer(
  state: ConversationState,
  action: ConversationAction
): ConversationState {
  switch (action.type) {
    case 'ADD_USER_MESSAGE':
      return {
        ...state,
        messages: [...state.messages, { content: action.content, role: 'user' }]
      };

    case 'TOMOMI_TYPING':
      return {
        ...state,
        loading: true,
        responseContent: ''
      };

    case 'UPDATE_TOMOMI_RESPONSE':
      return {
        ...state,
        responseContent: state.responseContent + action.content
      };

    case 'REPLACE_TOMOMI_RESPONSE':
      return {
        ...state,
        responseContent: action.content
      };

    case 'ADD_TOMOMI_RESPONSE':
      return {
        ...state,
        messages: [
          ...state.messages,
          { content: state.responseContent, role: 'tomomi' }
        ],
        loading: false,
        responseContent: ''
      };

    case 'ERROR':
      return {
        ...state,
        loading: false,
        responseContent: ''
      };

    default:
      return state;
  }
}

export default function ChatBox() {
  const [message, setMessage] = useState("");
  const [conversationState, dispatch] = useReducer(conversationReducer, {
    messages: [{ content: 'Hi! Ask me anything about traveling in Japan.', role: 'tomomi' }],
    responseContent: '',
    loading: false
  });

  const router = useRouter();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversationState.messages, conversationState.loading, conversationState.responseContent]);

  const handleChat = async (e: FormEvent) => {
    e.preventDefault();

    if (!message.trim()) {
      toast.error("Please enter a message!");
      return;
    }

    // Add user message
    dispatch({ type: 'ADD_USER_MESSAGE', content: message });
    dispatch({ type: 'TOMOMI_TYPING' });

    const currentMessage = message;
    setMessage(''); // Clear input immediately

    try {
      const token = getAuthToken();
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

      if (!token) {
        toast.error('No authentication token found. Please log in again.');
        router.push('/login');
        return;
      }

      // Build conversation history in backend format (assistant instead of tomomi)
      const conversationHistory = conversationState.messages.map(msg => ({
        role: msg.role === 'tomomi' ? 'assistant' : msg.role,
        content: msg.content
      }));

      // Call backend streaming endpoint
      const response = await fetch(`${API_URL}/api/v1/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          message: currentMessage,
          conversation_history: conversationHistory,
          num_context_docs: 3,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Chat error response:', errorText);
        throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`);
      }

      const data = response.body;

      if (data) {
        const reader = data.getReader();
        const decoder = new TextDecoder();
        let done = false;
        let accumulatedText = '';

        // Read all response chunks
        while (!done) {
          const { value, done: doneReading } = await reader.read();
          done = doneReading;

          if (value) {
            const chunkValue = decoder.decode(value);
            accumulatedText += chunkValue;

            // Display chunks as they arrive (for true streaming)
            dispatch({ type: 'UPDATE_TOMOMI_RESPONSE', content: chunkValue });
          }
        }

        // After streaming completes, check if response is JSON and extract text
        if (done && accumulatedText) {
          try {
            const jsonResponse = JSON.parse(accumulatedText);
            if (jsonResponse.response) {
              // Backend sent JSON - replace accumulated response with just the text
              console.log('[Chat] Parsing JSON response, extracting text only');
              dispatch({ type: 'REPLACE_TOMOMI_RESPONSE', content: jsonResponse.response });
            }
          } catch {
            // Not JSON, keep the raw text response
            console.log('[Chat] Plain text response (not JSON)');
          }

          dispatch({ type: 'ADD_TOMOMI_RESPONSE' });
        }
      }

    } catch (error: any) {
      console.error('Chat error:', error);
      dispatch({ type: 'ERROR' });

      // Show appropriate error message
      if (error.message.includes('401')) {
        toast.error('Session expired. Please log in again.');
        router.push('/login?error=session_expired');
      } else {
        toast.error('Failed to get response. Please try again.');
      }
    }
  };

  const handleBack = () => {
    router.push("/dashboard");
  };

  return (
    <div className="flex justify-center items-center w-4/5 h-3/4 absolute bg-licorice/80 rounded-3xl shadow-xl shadow-black mt-32">
      <div className="flex flex-col items-center relative w-11/12 h-full min-w-[75%] shadow-white bg-black/70 rounded-3xl p-4">
        <div className="w-full">
          <button className="text-white btn glass ml-6 mt-2" onClick={handleBack}>
            Back
          </button>
        </div>

        <div className="w-11/12 flex-1 mt-6 bg-white rounded-xl p-6 overflow-y-auto">
          <div className="space-y-4">
            {conversationState.messages.map((msg, index) => (
              <div
                key={index}
                className={msg.role === 'user' ? "chat chat-end w-full" : "chat chat-start w-full"}
              >
                <div className={msg.role === 'user' ? 'chat-bubble bg-periwinkle text-licorice' : 'chat-bubble bg-grey text-white'}>
                  {msg.content}
                </div>
              </div>
            ))}

            {/* Show streaming response as it comes in */}
            {conversationState.loading && conversationState.responseContent && (
              <div className="chat chat-start w-full">
                <div className="chat-bubble bg-grey text-white">
                  {conversationState.responseContent}
                </div>
              </div>
            )}

            {/* Loading indicator when waiting for first chunk */}
            {conversationState.loading && !conversationState.responseContent && (
              <div className="chat chat-start w-full">
                <div className="chat-bubble bg-grey">
                  <span className="loading loading-dots loading-sm"></span>
                </div>
              </div>
            )}

            {/* Auto-scroll anchor */}
            <div ref={messagesEndRef} />
          </div>
        </div>

        <form
          className="w-11/12 flex justify-start mt-4"
          onSubmit={handleChat}
        >
          <div className="w-full form-control">
            <input
              type="text"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              disabled={conversationState.loading}
              aria-label="user chat input"
              name="query"
              placeholder="write your message here"
              className="rounded-xl w-full p-4 truncate overflow-y-scroll outline color-periwinkle disabled:opacity-50"
            />
          </div>
          <button
            type="submit"
            disabled={conversationState.loading}
            className="text-white btn bg-licorice glass ml-4 p-4 disabled:opacity-50"
          >
            {conversationState.loading ? 'Sending...' : 'Ask'}
          </button>
        </form>
      </div>
    </div>
  );
}

// TODO (Future enhancements):
// 1. Add conversation persistence (save/load from backend)
// 2. Add conversation title generation
// 3. Add ability to start new conversations
// 4. Add markdown rendering for Tomomi's responses
// 5. Add copy-to-clipboard for messages
// 6. Add rate limiting UI feedback
