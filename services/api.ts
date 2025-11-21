import axios, { AxiosInstance, AxiosError } from 'axios';
import { getAuthToken, removeAuthToken } from '@/utils/auth';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 seconds (important for chat which can be slow)
});

// Request interceptor: Automatically add JWT token to all requests
apiClient.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor: Handle 401 errors (expired/invalid token)
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Token expired or invalid - clear it and redirect to login
      removeAuthToken();

      // TODO: Save user progress before redirecting
      // - Save draft messages (chat input, journal drafts, etc.) to localStorage
      // - Store current route to redirect back after re-auth
      // - Consider showing a toast: "Session expired. Your progress has been saved."
      // Example: localStorage.setItem('draft_message', currentMessage);
      //          localStorage.setItem('return_url', window.location.pathname);

      if (typeof window !== 'undefined') {
        window.location.href = '/login?error=session_expired';
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
