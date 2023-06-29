import { OpenAIStream } from '../utils/OpenAIStream.js';
// should use an edge function for endpoint
// create endpoint here that will be a simple streaming call to chatGPT
// and then call it as /api/payload.js from the client side to receive that data
const responseHandler = async (req, res) => {
  const { prompt } = await req.json();
  if (!prompt) {
    return new res('No prompt requested', { status: 400 });
  }

  const payload = {
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }],
    stream: true,
  };

  const stream = await OpenAIStream(payload);
  return new res(stream);
};
export default responseHandler;
