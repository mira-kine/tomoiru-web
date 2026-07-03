import toast from 'react-hot-toast';

const WAKE_TOAST_ID = 'server-wake';

/**
 * After `delayMs` of waiting on an auth call, tell the user the backend is
 * cold-starting (Render free tier). Returns a cleanup that cancels the timer
 * and dismisses the toast - call it in `finally`.
 */
export function showWakeNoticeAfterDelay(delayMs = 4000): () => void {
  const timer = setTimeout(() => {
    toast.loading(
      'Waking up the server… the first visit after a while can take up to a minute.',
      { id: WAKE_TOAST_ID }
    );
  }, delayMs);

  return () => {
    clearTimeout(timer);
    toast.dismiss(WAKE_TOAST_ID);
  };
}
