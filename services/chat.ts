import apiClient from './api';

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

export interface ChatRequest {
  message: string;
  conversation_history?: BackendMessage[];
  num_context_docs?: number;
}

export interface ChatResponse {
  response: string;
  model: string;
  tokens_used: number;
}

// Optional: For future conversation persistence
export interface Conversation {
  id: string;
  user_id: string;
  title: string;
  created_at: string;
  updated_at: string;
}

export interface ConversationDetail {
  id: string;
  title: string;
  messages: Message[];
  created_at: string;
  updated_at: string;
}

/**
 * Transform frontend messages (with "tomomi") to backend format (with "assistant")
 */
const toBackendMessages = (messages: Message[]): BackendMessage[] => {
  return messages.map(msg => ({
    role: msg.role === 'tomomi' ? 'assistant' : msg.role,
    content: msg.content,
  }));
};


export const chatService = {
  /**
   * Send message to Tomomi chatbot
   *
   * Backend uses RAG (pgvector) to find relevant Japan travel context,
   * then generates personalized response via OpenAI GPT-4
   *
   * Note: Automatically transforms "tomomi" → "assistant" for backend compatibility
   */
  sendMessage: async (
    message: string,
    conversationHistory: Message[] = [],
    numContextDocs: number = 3
  ): Promise<ChatResponse> => {
    // Transform frontend messages to backend format
    const backendHistory = toBackendMessages(conversationHistory);

    const response = await apiClient.post<ChatResponse>('/api/v1/chat/', {
      message,
      conversation_history: backendHistory,
      num_context_docs: numContextDocs,
    });

    return response.data;
  },

  // TODO: Conversation persistence (list/get/create/delete/rename) using the
  // Conversation/ConversationDetail types above. Blocked on backend
  // /api/v1/conversations endpoints. Note: messages loaded from the backend
  // must be transformed to frontend format (role "assistant" → "tomomi"),
  // the inverse of toBackendMessages.
};
