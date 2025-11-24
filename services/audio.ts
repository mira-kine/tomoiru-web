import apiClient from './api';

export interface Track {
  id: number;
  track_name: string;
  publicUrl: string;
  created_at: string;
  updated_at: string;
}

export interface AudioResponse {
  tracks: Track[];
}

export const audioService = {
  getTracks: async (): Promise<Track[]> => {
    const response = await apiClient.get<Track[]>('/api/v1/tracks/');
    return response.data;
  },

  getTrack: async (trackId: number): Promise<Track> => {
    const response = await apiClient.get<Track>(`/api/v1/tracks/${trackId}`);
    return response.data;
  },

  getStreamUrl: (trackId: number): string => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
    return `${API_URL}/api/v1/audio/stream/${trackId}`;
  },
};
