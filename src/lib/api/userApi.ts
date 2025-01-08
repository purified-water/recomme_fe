import { apiClient } from "./apiClient";

export const userAPI = {
  getProfile: async () => {
    return apiClient.get(`api/users/me`);
  },
  editProfile: async () => {
    return apiClient.put(`api/users/me`);
  },
  getMyRatingList: async () => {
    return apiClient.get(`api/movies/rate`);
  }
};
