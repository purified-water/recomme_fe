import { apiClient } from "./apiClient";

export const userAPI = {
  getProfile: async () => {
    return apiClient.get(`/api/users/me`);
  },
  editProfile: async () => {
    return apiClient.put(`/api/users/me`);
  },
  getMyRatingList: async (userId: string) => {
    return apiClient.get(`/api/movies/rate/${userId}`);
  },
  getMyWatchList: async (userId: string) => {
    return apiClient.get(`/api/movies/watchList/${userId}`);
  },
  getMyFavList: async () => {
    return apiClient.get(`/api/movies/favorites`);
  }
};
