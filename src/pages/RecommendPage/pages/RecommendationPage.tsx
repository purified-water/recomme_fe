import { useState, useEffect } from "react";
import { movieApi } from "@/lib/api/movieApi";
import { MovieCard } from "@/components/Movies/MovieCard";
import { Movie } from "@/types/MovieType";
import { normalizeImagePath } from "@/utils/NormalizeMovieImage";
import { AppFooter } from "@/components/AppFooter";
import { LoadingPage } from "@/features/Search/components/PageLoading";

export const RecommendPage = () => {
  const [recommendedMovies, setRecommendedMovies] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchRecommendedMovies = async () => {
    setIsLoading(true);
    try {
      const response = await movieApi.getRecommendByHistory();
      const movies = response.data.result.results;
      const normalizedMovies = movies.map((movie: Movie) => {
        return {
          ...movie,
          backdrop_path: normalizeImagePath(movie.backdrop_path || ""),
          poster_path: normalizeImagePath(movie.poster_path || "")
        };
      });

      setRecommendedMovies(normalizedMovies);
    } catch (error) {
      console.error("Error fetching recommended movies:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRecommendedMovies();
  }, []);

  return (
    <div className="min-h-screen">
      {isLoading ? (
        <LoadingPage />
      ) : (
        <div className="flex-col items-center justify-center">
          <div className="mt-8 text-3xl font-bold text-center text-gray1">Based on your viewing history</div>
          <div className="mt-4 text-2xl font-semibold text-center text-transparent text-gray1 bg-gradient-to-r from-appPrimary via-pink-500 to-purple-400 bg-clip-text">
            We recommend you some movies below to watch
          </div>
          <div className="flex items-center">
            <div className="flex flex-wrap gap-6 pl-16 mt-6">
              {recommendedMovies?.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
            </div>
          </div>

          <AppFooter />
        </div>
      )}
    </div>
  );
};
