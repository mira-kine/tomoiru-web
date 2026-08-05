import { useQuery } from '@tanstack/react-query';
import { audioService, Track } from '@/services/audio';

/**
 * React Query hook for the audio tracks powering the persistent player.
 *
 * The track list is effectively static for a session, so it is cached with an
 * infinite stale time — this is what lets the AudioPlayer stay mounted across
 * navigations without re-fetching (and re-flashing its loading state) each time.
 */
export function useTracks() {
  return useQuery<Track[]>({
    queryKey: ['tracks'],
    queryFn: () => audioService.getTracks(),
    staleTime: Infinity,
  });
}
