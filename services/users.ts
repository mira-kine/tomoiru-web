import apiClient from './api';
import { User } from './auth';

export const userService = {
  /**
   * Update user profile
   *
   * Primary use: Setting user_name during welcome flow
   * When user completes welcome and enters their name, this updates the backend
   *
   * After update, user.user_name will no longer be null, so they won't see welcome flow again
   */
  updateProfile: async (data: { user_name?: string }): Promise<User> => {
    const response = await apiClient.patch<User>('/api/v1/users/me', data);
    return response.data;
  },
};
