'use client';

import { useEffect } from 'react';

/**
 * Error boundary for the authenticated route group.
 *
 * getCurrentUser throws when the backend can't be reached
 * (most often a Render free-tier cold start) which can take 30–60s.
 * The user's session is still valid, so we show a "waking up" message with a
 * retry instead of bouncing them to /login everytime.
 */
export default function ProtectedError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Protected route error:', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-dvh w-full p-8 text-center">
      <div className="bg-white/90 rounded-2xl shadow-lg p-8 max-w-md">
        <h1 className="font-script text-3xl text-licorice mb-3">
          Waking up the server…
        </h1>
        <p className="font-sans text-licorice/80 mb-6">
          The server may be starting up after being idle, which can take up to a
          minute. Your session is still active — give it a moment and try again.
        </p>
        <button
          onClick={reset}
          className="text-licorice border-2 border-white bg-white/80 transition duration-300 hover:bg-white font-sans font-bold rounded-lg text-lg px-6 py-3 shadow-md"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
