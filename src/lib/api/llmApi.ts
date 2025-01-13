import { apiClient } from "./apiClient";

export const llmApi = {
  navigate: async (query: string) => {
    return apiClient.get(`/api/llm/navigate`, { params: { query: query } });
  }
};
