import { useMutation } from '@tanstack/react-query';
import { chatService, Message } from '@/services/chat';

/**
 * React Query mutation hook for sending messages to Tomomi
 *
 * Usage:
 *   const sendMessage = useSendMessage();
 *
 *   const response = await sendMessage.mutateAsync({
 *     message: "Where can I find ramen?",
 *     conversationHistory: messages,
 *   });
 *
 * Features:
 * - Automatic loading state (sendMessage.isPending)
 * - Error handling (sendMessage.error)
 * - Success callback support
 * - Integrates with conversation management (future)
 * - Default: 3 context documents from RAG (can be overridden)
 */
export function useSendMessage() {
  return useMutation({
    mutationFn: ({
      message,
      conversationHistory = [],
      numContextDocs = 3,
    }: {
      message: string;
      conversationHistory?: Message[];
      numContextDocs?: number;
    }) => chatService.sendMessage(message, conversationHistory, numContextDocs),

    // Optional: Can add onSuccess callback for side effects
    // onSuccess: (response) => {
    //   console.log('Tomomi responded:', response.response);
    // },
  });
}
