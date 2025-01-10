import { apiClient } from "./apiClient";

export const castApi = {
  getAllCast: async (page: number) => {
    return apiClient.get(`/api/casts?page=${page}`);
  },
  getCastById: async (castId: string) => {
    return apiClient.get(`/api/casts/${castId}`);
  }
};
