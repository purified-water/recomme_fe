import { apiClient } from "./apiClient";

export const movieApi = {
  getTrendingMovies: async (timeWindow: string, page: number = 1) => {
    return apiClient.get(`/api/movies/trending?timeWindow=${timeWindow}&page=${page}`);
  },
  getPopularMovies: async (page: number = 1) => {
    return apiClient.get(`/api/movies/popular?page=${page}`);
  },
  searchMovies: async (query: string, page: number = 1) => {
    return apiClient.get(`/api/movies/search?query=${query}&page=${page}`);
  },
  getMovieDetails: async (movieId: number) => {
    return apiClient.get(`/api/movies/${movieId}`);
  }
};
