import { getAuthToken } from '@/utils/auth';
import { API_URL } from '@/lib/config';

// Frontend uses "tomomi" for branding
export interface Message {
  role: 'user' | 'tomomi';
  content: string;
}

// Backend expects OpenAI format with "assistant"
interface BackendMessage {
  role: 'user' | 'assistant';
  content: string;
}

/**
 * Events emitted while streaming a reply. 'chunk' appends decoded text as it
 * arrives (live typing); 'replace' overrides the accumulated text with the
 * authoritative final value when the backend sends the whole reply as JSON.
 * These map 1:1 to the chatbox reducer's UPDATE/REPLACE actions.
 */
export type ChatStreamEvent =
  | { type: 'chunk'; text: string }
  | { type: 'replace'; text: string };

/** Thrown when there is no token or the backend rejects it (401). */
export class ChatAuthError extends Error {}

/**
 * Transform frontend messages (with "tomomi") to backend format ("assistant").
 */
const toBackendMessages = (messages: Message[]): BackendMessage[] =>
  messages.map(msg => ({
    role: msg.role === 'tomomi' ? 'assistant' : msg.role,
    content: msg.content,
  }));

export const chatService = {
  /**
   * Stream a reply from Tomomi, yielding events as text arrives.
   *
   * Backend uses RAG (pgvector) to find relevant Japan-travel context, then
   * streams a personalized response. Multi-byte (Japanese) characters can be
   * split across chunks, so decoding uses { stream: true } with a final flush.
   *
   * Some backend paths return the whole reply as one JSON object instead of a
   * token stream; when that happens the parsed `response` field is emitted as a
   * 'replace' event so the UI shows the clean text rather than raw JSON.
   *
   * @throws ChatAuthError  when no token is present or the backend returns 401.
   */
  async *streamMessage(
    message: string,
    conversationHistory: Message[] = [],
    numContextDocs = 3,
  ): AsyncGenerator<ChatStreamEvent, void, unknown> {
    const token = getAuthToken();
    if (!token) {
      throw new ChatAuthError('No authentication token found.');
    }

    const response = await fetch(`${API_URL}/api/v1/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        message,
        conversation_history: toBackendMessages(conversationHistory),
        num_context_docs: numContextDocs,
      }),
    });

    if (response.status === 401) {
      throw new ChatAuthError('Session expired.');
    }
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }
    if (!response.body) return;

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let accumulated = '';

    for (;;) {
      const { value, done } = await reader.read();
      if (done) break;
      if (value) {
        const text = decoder.decode(value, { stream: true });
        accumulated += text;
        yield { type: 'chunk', text };
      }
    }

    // Flush any bytes still buffered in the decoder.
    const tail = decoder.decode();
    if (tail) {
      accumulated += tail;
      yield { type: 'chunk', text: tail };
    }

    // Whole-reply-as-JSON path: emit the parsed field as the final text.
    try {
      const parsed = JSON.parse(accumulated);
      if (parsed?.response && parsed.response !== accumulated) {
        yield { type: 'replace', text: parsed.response };
      }
    } catch {
      // Plain-text stream — the chunks already yielded are the response.
    }
  },

  // TODO: Conversation persistence (list/get/create/delete/rename). Blocked on
  // backend /api/v1/conversations endpoints. Messages loaded from the backend
  // must be transformed to frontend format (role "assistant" -> "tomomi"),
  // the inverse of toBackendMessages.
};
