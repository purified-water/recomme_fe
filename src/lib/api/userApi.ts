import { apiClient } from "./apiClient";
import { UserProfile } from "@/types/UserProfileType";

export const userAPI = {
  getProfile: async (userId: string) => {
    return apiClient.get(`api/auth/user?userId=${userId}`);
  },
  editProfile: async (userId: string, data: UserProfile) => {
    return apiClient.put(`/api/auth/update/user?userId=${userId}`, data);
  }
};
