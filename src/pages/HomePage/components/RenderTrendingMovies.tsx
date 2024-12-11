import default_poster from "@/assets/Homepage/poster.jpg";
import { MovieCard } from "@/components/Movies/MovieCard";
import { useEffect } from "react";
import { useState } from "react";
import { Movie } from "@/types/MovieType";
import { movieApi } from "@/lib/api/movieApi";

interface TrendingMoviesProps {
  time_window: string;
}

export const RenderTrendingMovies = ({ time_window }: TrendingMoviesProps) => {
  const IMAGE_URL = import.meta.env.VITE_TMDB_IMAGE_URL;
  const [movies, setMovies] = useState<Movie[]>();
  const [isLoading, setIsLoading] = useState(false);

  const fetchTrendingMovies = async () => {
    setIsLoading(true);
    try {
      const response = await movieApi.getTrendingMovies(time_window);
      const data = response.data.result;

      const movieList = data.results.map((movie: Movie) => ({
        ...movie,
        poster_path: movie.poster_path ? `${IMAGE_URL}${movie.poster_path}` : default_poster,
        backdrop_path: movie.backdrop_path ? `${IMAGE_URL}${movie.backdrop_path}` : null
      }));
      setMovies(movieList);
    } catch (error) {
      console.error("Error fetching trending movies:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTrendingMovies();
  }, [time_window]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const RenderTrendingMovies = () => {
    return movies?.map((movie, index) => {
      return <MovieCard key={index} movie={movie} />;
    });
  };

  return (
    <>
      <RenderTrendingMovies />
    </>
  );
};
