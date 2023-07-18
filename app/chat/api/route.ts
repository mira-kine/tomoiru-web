// an endpoint to make streaming call to chatGPT from chat page
import { OpenAIStream } from '../../utils/OpenAIStream';
import type { OpenAIStreamPayload } from '../../utils/OpenAIStream';
export const runtime = 'edge';

// using Vercel deployment edge function for this endpoint

interface RequestPayload {
  prompt: string;
}

if (!process.env.OPENAI_API_KEY) {
  throw new Error('Missing env var from OpenAI');
}
// use native Request and Response for now, may need to use Next version instead
export async function POST(req: Request, res: Response): Promise<Response> {
  const { prompt } = (await req.json()) as RequestPayload;
  if (!prompt) {
    return new Response('No prompt in request', { status: 400 });
  }

  // define payload
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
