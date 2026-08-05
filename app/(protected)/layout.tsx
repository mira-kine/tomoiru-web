import { ReactNode } from 'react';
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
import { getCurrentUser } from '@/lib/serverAuth';
import AudioPlayer from '../components/Audio/AudioPlayer';

/**
 * Runs once per protected page load and:
 *  1. Validates the session server-side via getCurrentUser (redirects to
 *     /login on an invalid/missing token; throws on a backend network error,
 *     which error.tsx catches and offers a retry for).
 *  2. Seeds the fetched user into a dehydrated React Query cache so client
 *     components (NavBar, dashboard) read ['currentUser'] without re-fetching
 *     /auth/me on hydration.
 *  3. Renders the persistent audio player above the page content.
 */
export default async function ProtectedLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await getCurrentUser();

  const queryClient = new QueryClient();
  queryClient.setQueryData(['currentUser'], user);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="fixed left-0 top-0 ml-4 mt-4 z-50">
        <AudioPlayer />
      </div>
      {children}
    </HydrationBoundary>
  );
}
