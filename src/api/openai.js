// const { Configuration, OpenAIApi } = require('openai');
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
export const openai = new OpenAIApi(configuration);

// const tomomiResp = await openai.createCompletion({
//   model: 'text-curie-001',
//   prompt: 'Tomomi: Hey, how are you?\n You:',
//   temperature: 0.5,
//   max_tokens: 60,
//   top_p: 1,
//   frequency_penalty: 0.5,
//   presence_penalty: 0,
//   stop: ['You:'],
// });
