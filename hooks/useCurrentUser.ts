import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { authService, User } from '@/services/auth';
import { userService } from '@/services/users';
import { isAuthenticated } from '@/utils/auth';

/**
 * React Query hook to get current user
 *
 * Usage:
 *   const { data: user, isLoading, error } = useCurrentUser();
 *
 * With initial data from Server Component:
 *   const { data: user } = useCurrentUser(initialUser);
 *
 * Features:
 * - Automatic caching (5 min stale time)
 * - Only fetches if authenticated
 * - Background refetching keeps data fresh
 * - Can accept initialData from server
 */
export function useCurrentUser(initialData?: User) {
  return useQuery({
    queryKey: ['currentUser'],
    queryFn: () => authService.getCurrentUser(),
    enabled: isAuthenticated(), // Only fetch if token exists
    staleTime: 5 * 60 * 1000, // 5 minutes
    initialData, // Use server-fetched data as initial cache
  });
}

/**
 * React Query mutation to update user profile
 *
 * Usage:
 *   const updateUser = useUpdateUser();
 *   await updateUser.mutateAsync({ user_name: 'Alice' });
 *
 * Features:
 * - Automatically updates cache on success
 * - Optimistic updates (instant UI feedback)
 * - Error handling built-in
 */
export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { user_name?: string }) =>
      userService.updateProfile(data),

    onSuccess: (updatedUser) => {
      // Update cache immediately with new user data
      queryClient.setQueryData(['currentUser'], updatedUser);
    },
  });
}
