import { get_encoding } from '@dqbd/tiktoken';
// A helpful rule of thumb is that one token generally corresponds to ~4 characters of text for common English text. This translates to roughly ¾ of a word (so 100 tokens ~= 75 words).
import * as dotenv from 'dotenv';
dotenv.config();
// tokenizer works with embedding model
const encoding = get_encoding('cl100k_base');
const URL = 'https://api.embedbase.xyz';
const DATASET_ID = 'tomoiru-japan-data';
const apiKey = process.env.EMBEDBASE_API_KEY;

// search Embebase with a string query -> searching through the documents
const search = async (query: string) => {
  return fetch(`${URL}/v1/${DATASET_ID}/search`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + apiKey,
    },
    body: JSON.stringify({
      query: query,
    }),
  }).then((response) => response.json());
};

// create context here with similar data from our query from the db
const createContext = async (userInput: string, maxLen = 1800) => {
  const searchResp = await search(userInput);
  let currentLength = 0;
  const returns = [];

  // Have to add limit to tokens (length)

  for (const similarity of searchResp['similarities']) {
    // put similarities in data together
    const sentence = similarity['data'];
    //   count tokens
    const numTokens = encoding.encode(sentence).length;
    //   1 token is about 4 characters
    currentLength = +numTokens + 4;
    if (currentLength > maxLen) {
      break;
    }
    //   add sentence into resulting array "returns"
    returns.push(sentence);
    //   join the entries and return
  }
  // we join the entries we found with a separator to show it's different
  return returns.join('\n\n###\n\n');
};

// create endpoint that returns an answer to client
export default async function buildPrompt(req, res) {
  const prompt = req.body.prompt;
  const context = await createContext(prompt);
  const newPrompt = `You are a kind, gentle and sweet friend who lives in Japan. Answer the question based on the context below to the best of your ability, and if the question cannot be answered based on the context, say "Ah, sorry. I am not sure about that one, I will have to check it out!"\n\nContext: ${context}\n\n---\n\nQuestion: ${prompt}\nAnswer:`;
  res.status(200).json({ prompt: newPrompt });
}
