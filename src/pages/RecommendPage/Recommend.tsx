import { useState, useEffect } from "react";
import { movieApi } from "@/lib/api/movieApi";
import UNAVAILABLE_IMAGE from "@/assets/UNAVAILABLE_IMAGE.jpg";
import { MovieCard } from "@/components/Movies/MovieCard";

export const RecommendPage = () => {
  const [recommendedMovies, setRecommendedMovies] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const IMAGE_URL = import.meta.env.VITE_TMDB_IMAGE_URL;

  const fetchRecommendedMovies = async () => {
    setIsLoading(true);
    try {
      const response = await movieApi.getRecommendByHistory(); // API call to get recommendations based on history
      const normalizedMovies = response.data.result.results.map((item: any) => ({
        id: item.id,
        title: item.title || "Unknown Title",
        release_date: item.release_date || "Unknown Date",
        backdrop_path: item.backdrop_path ? `${IMAGE_URL}${item.backdrop_path}` : UNAVAILABLE_IMAGE,
        vote_average: item.vote_average || 0
      }));
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
    <div className="min-h-screen p-4">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="min-h-screen bg-gray-900 text-white">
          <h1 className="text-3xl font-bold text-center mt-8">Recommended Movies</h1>
          <div className="mt-6 flex flex-wrap justify-center gap-6">
            {/* Render movie cards */}
            {recommendedMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
