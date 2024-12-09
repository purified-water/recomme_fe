import { apiClient } from "./apiClient";

export const profileAPI = {
  getProfile: async (userId: string) => {
    return apiClient.get(`api/auth/user?userId=${userId}`);
  }
};
