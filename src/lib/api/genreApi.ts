import { apiClient } from "./apiClient";

export const genreApi = {
  getAllGenres: async () => {
    return apiClient.get("/api/genres");
  }
};
