import { client, checkError } from './client';
import { Configuration, OpenAIApi } from 'openai';

// Initialize supabase client

// generate Embeddings
async function generateEmbeddings() {
  // initialize openAI API
  const configuration = new Configuration({ apiKey: process.env.OPEN_AI_KEY });
  const openai = new OpenAIApi(configuration);
  // create custom data for tomomi
  const documents = [
    // array of strings
    // PDF's and other info can be turned into documents string format later on
    'Hey, how are you?',
    'What did you want to check out today?',
    'How about we go look at some food recs?',
    'Did you want to talk about something in particular?',
    'I am sorry to hear that',
    'That is so exciting!',
  ];

  for (const document of documents) {
    // turn each string into embedding
    const input = document.replace(/\n/g, '');
    const embeddingResp = await openai.createEmbedding({
      model: 'text-embedding-ada-002', // current most recent model to create embeddings
    });
  }
}
// store embedding and text into supabasedb
