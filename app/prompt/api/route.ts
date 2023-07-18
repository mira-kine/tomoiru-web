// createChatContex -> following embedbase documentation
// createChatContex -> following embedbase documentation
// A helpful rule of thumb is that one token generally corresponds to ~4 characters of text for common English text. This translates to roughly ¾ of a word (so 100 tokens ~= 75 words).
/* eslint-disable */
import { get_encoding } from '@dqbd/tiktoken';
import { NextResponse, NextRequest } from 'next/server';
// tokenizer works with embedding model
const encoding = get_encoding('cl100k_base');
const URL = 'https://api.embedbase.xyz';
const DATASET_ID = 'tomoiru-japan-data';
const apikey = process.env.EMBEDBASE_API_KEY;

// search Embebase with a string query -> searching through the documents
const search = async (query: string) => {
  return fetch(`${URL}/v1/${DATASET_ID}/search`, {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + apikey,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: query
    })
  }).then((response) => response.json());
};
// create context here with similar data from our query from the db aka user message

const createContext = async (message: string, maxLen = 1800) => {
  const searchResp = await search(message);
  let currentLength = 0;
  const returns = [];
  // Have to add limit to tokens (length)
  for (const similarity of searchResp['similarities']) {
    // put similarities in data together
    const sentence = similarity['data'];
    //   count tokens
    const numTokens = encoding.encode(sentence).length;
    //   1 token is about 4 characters
    currentLength += numTokens + 4;
    if (currentLength > maxLen) {
      break;
    }
    //   add sentence into resulting array "returns"
    returns.push(sentence);
  }
  //   join the entries and return the array
  return returns.join('\n\n###\n\n');
};

// create endpoint that returns an answer to client
export async function POST(req: Request): Promise<NextResponse> {
  // with new app router Nextjs 13, have to await req.json first
  const { prompt } = await req.json();

  if (req.body === null) {
    throw new Error('Missing body from request');
  }
  const context = await createContext(prompt);
  const newPrompt = `You are a kind, gentle and sweet friend who lives in Japan. You know all about Japan including it's culture, transportation techniques, food recommendation places, etc. Answer the question based on the context below to the best of your ability, and if the question cannot be answered based on the context, say "Ah, sorry. I am not sure about that one, I will have to check it out!"\n\nContext: ${context}\n\n---\n\nQuestion: ${prompt}\nAnswer:`;
  return NextResponse.json({ prompt: newPrompt });
}
// export {};
