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
    method: "POST",
    headers: {
      Authorization: "Bearer " + apiKey,
   "Content-Type": "application/json"
    },
    body: JSON.stringify({
      query: query
    })
  }).then(res => res.json());
};

const createChatContext = async (question: string, maxLen = 1800) => {
  // search for similar response in embedbase
  const searchResp = await search(question);
  let currentLength = 0;
  const chatResp = [];
  // limit tokens
  // for each similar response in the search response after looking through embedbase
  for (const similarity of searchResp["similarities"]) {
    // for each sentence
    const sentence = similarity["data"];
    // count the tokens
    const numToken = encoding.encode(sentence).length;
    // one token roughly equals 4 chars, so update current length with encoded token length
    currentLength += numToken + 4;
    if (currentLength > maxLen) {
      break;
    }
    chatResp.push(sentence);
  }
  // joined with separators
  return chatResp.join("\n\n###\n\n")
}