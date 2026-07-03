/**
 * Single source of truth for the backend URL.
 * NEXT_PUBLIC_ vars are inlined at build time, so this works in both
 * server and client code.
 */
export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

/**
 * Fire-and-forget ping to wake the backend (Render free tier spins down
 * after idle and cold starts take 30-60s). Call on pages the user lands
 * on before authenticating so the server is warm by the time they log in.
 */
export function warmUpBackend(): void {
  if (typeof window === 'undefined') return;
  fetch(`${API_URL}/health`).catch(() => {
    // Ignore failures - this is purely a warm-up ping
  });
}
