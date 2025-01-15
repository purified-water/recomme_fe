import { apiClient } from "./apiClient";
import { MoviesFilterRequestType } from "@/types/MoviesFilterRequestType.ts";

export const movieApi = {
  getAllMovies: async (page: number = 1, pageSize: number = 15) => {
    return apiClient.get(`/api/movies?page=${page}&pageSize=${pageSize}`);
  },
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
  addMovieToWatchlist: async (movieIds: string[]) => {
    return apiClient.post(`/api/movies/watchList`, { movieIds });
  },
  removeMovieFromWatchlist: async (movieIds: string[]) => {
    return apiClient.delete(`/api/movies/watchList`, { data: { movieIds } });
  },
  addMovieToFavorites: async (movieIds: string[]) => {
    return apiClient.post(`/api/movies/favorites`, { movieIds });
  },
  removeMovieFromFavorites: async (movieIds: string[]) => {
    return apiClient.delete(`/api/movies/favorites`, { data: { movieIds } });
  },
  getMovieTrailers: async () => {
    return apiClient.get(`/api/movies/latestTrailers`);
  },
  getMovieWithFilters: async (request: MoviesFilterRequestType) => {
    const params = Object.entries({
      genreIds: request.genreIds && request.genreIds.length > 0 ? request.genreIds.join(",") : null,
      objectIds: request.objectIds && request.objectIds.length > 0 ? request.objectIds.join(",") : null,
      fromDate: request.fromDate,
      toDate: request.toDate,
      fromScore: request.fromScore,
      toScore: request.toScore,
      pageSize: request.pageSize,
      page: request.page
    }).reduce((acc: { [key: string]: any }, [key, value]) => {
      if (value !== null && value !== undefined && value !== "") {
        acc[key] = value;
      }
      return acc;
    }, {});

    console.log("Params:", params);
    return apiClient.get("/api/movies", { params });
  }
};
