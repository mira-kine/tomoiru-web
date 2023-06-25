import React, { useEffect, useState } from 'react';
import '../styles/Chat.css';
import { openai } from '../api/openai';
import Loading from '../components/Reusable/Loading';
import { useForm } from '../hooks/useForm';

export default function Chat() {
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(false);
  const { formState, handleForm } = useForm({ userInput: '' });

  // useEffect(() => {
  //   const fetchResponses = async () => {
  //     try {
  //       const tomomiResp = await openai.createCompletion({
  //         model: 'text-curie-001',
  //         prompt: 'Tomomi: Hey, how are you?\n You:',
  //         temperature: 0.5,
  //         max_tokens: 60,
  //         top_p: 1,
  //         frequency_penalty: 0.5,
  //         presence_penalty: 0,
  //         stop: ['You:'],
  //       });
  //       setResponses(tomomiResp);
  //       setLoading(false);
  //     } catch (error) {
  //       throw error;
  //     }
  //   };
  //   fetchResponses();
  // }, []);

  console.log('responses', responses);
  console.log('loading', loading);

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
