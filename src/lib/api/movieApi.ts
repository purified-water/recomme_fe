import { apiClient } from "./apiClient";

export const movieApi = {
  getTrendingMovies: async (timeWindow: string, page: number = 1) => {
    return apiClient.get(`/api/movies/trending?timeWindow=${timeWindow}&page=${page}`);
  },
  getPopularMovies: async (page: number = 1) => {
    return apiClient.get(`/api/movies/popular?page=${page}`);
  },
  searchMovies: async (query: string, page: number = 1, isAdvancedSearch: boolean = false) => {
    return apiClient.get(`/api/movies/search?query=${query}&page=${page}&isAdvancedSearch=${isAdvancedSearch}`);
  },
  saveSearchHistory: async (query: string) => {
    return apiClient.post(`/api/movies/save-search?query=${query}`);
  },
  getMovieDetails: async (movieId: number) => {
    return apiClient.get(`/api/movies/details/${movieId}`);
  },
  rateMovie: async (movieId: string, rating: number) => {
    return apiClient.post(`/api/movies/rate`, { movieId, rating });
  },
  getRecommendByMovieDetail: async (movieId: number) => {
    return apiClient.get(`/api/recommend/movie/${movieId}`);
  },
  getRecommendByHistory: async () => {
    return apiClient.get(`/api/recommend/history`);
  },
  getReviewByMovieId: async (movieId: number) => {
    return apiClient.get(`/api/movies/${movieId.toString()}/reviews`);
  },
  postReviewByMovieId: async (movieId: number, review: any) => {
    return apiClient.post(`/api/movies/${movieId.toString()}/reviews`, review);
  },
};
