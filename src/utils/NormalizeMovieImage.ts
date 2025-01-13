import { MovieDetailType } from "@/types/MovieDetailType";

export const normalizeMovieImage = (movieData: MovieDetailType) => {
  const IMAGE_URL = import.meta.env.VITE_TMDB_IMAGE_URL;

  return {
    ...movieData,
    poster_path: movieData.poster_path ? `${IMAGE_URL}${movieData.poster_path}` : "",
    backdrop_path: movieData.backdrop_path ? `${IMAGE_URL}${movieData.backdrop_path}` : ""
  };
};

export const normalizeImagePath = (imagePath: string) => {
  if (!imagePath) return "";
  const IMAGE_URL = import.meta.env.VITE_TMDB_IMAGE_URL;

  return `${IMAGE_URL}${imagePath}`;
};
