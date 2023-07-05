import { OpenAIStream } from '../utils/OpenAIStream';
import type { OpenAIStreamPayload } from '../utils/OpenAIStream';
// should use an edge function for endpoint
// create endpoint here that will be a simple streaming call to chatGPT
// and then call it as /api/payload.js from the client side to receive that data
if (!process.env.OPENAI_API_KEY) {
  throw new Error('Missing env var from OpenAI');
}
// handle edge function
export async function responseHandler(query: string): Promise<Response> {
  // const { prompt } = (await req.json()) as {
  //   prompt?: string;
  // };
  const req = {
    method: 'POST',
    headers: {
      'Content-Type': 'application.json'
    },
    body: JSON.stringify({
      query
    })
  };
  const prompt = await buildPrompt(req);

  if (!prompt) {
    return new Response('No prompt in the request', { status: 400 });
  }

  const payload: OpenAIStreamPayload = {
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 1000,
    stream: true,
    n: 1
  };

  const stream = await OpenAIStream(payload);
  return new Response(stream);
}
// const responseHandler = async (req, res) => {
//   const { prompt } = await req.json();
//   if (!prompt) {
//     return new res('No prompt requested', { status: 400 });
//   }

//   const payload = {
//     model: 'gpt-3.5-turbo',
//     messages: [{ role: 'user', content: prompt }],
//     stream: true
//   };

//   const stream = await OpenAIStream(payload);
//   return new res(stream);
// };
export default responseHandler;
