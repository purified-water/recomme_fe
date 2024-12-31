import UNAVAILABLE_IMAGE from "@/assets/UNAVAILABLE_IMAGE.jpg";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { movieApi } from "@/lib/api/movieApi";
import { MovieDetailType } from "@/types/MovieDetailType";
import { AppFooter } from "@/components/AppFooter";
import { ActionButtons } from "../components/ActionButtons";

export const MovieDetail = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const [movie, setMovie] = useState<MovieDetailType>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const IMAGE_URL = import.meta.env.VITE_TMDB_IMAGE_URL;

  if (!movieId) {
    return <div>Movie info not found</div>;
  }

  const fetchMovieDetails = async () => {
    setIsLoading(true);
    try {
      const response = await movieApi.getMovieDetails(parseInt(movieId, 10));
      const data = response.data;
      const normalizedMovie = {
        ...data.result,
        poster_path: data.result.poster_path ? `${IMAGE_URL}${data.result.poster_path}` : null,
        backdrop_path: data.result.backdrop_path ? `${IMAGE_URL}${data.result.backdrop_path}` : null
      };

      setMovie(normalizedMovie);
    } catch (error) {
      console.error("Error fetching movie details:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovieDetails();
  }, [movieId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen">
      <div className="relative">
        {/* Backdrop Image */}
        <div className="min-h-[400px] max-h-[430px] overflow-hidden">
          {movie?.backdrop_path ? (
            <img src={movie.backdrop_path} alt={movie.title} className="object-cover w-full h-full" />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-t from-gray1 to-black" />
          )}
        </div>

        {/* Content Overlay */}
        <div className="absolute top-0 flex flex-col items-center w-full gap-8 p-8 mx-auto bg-gradient-to-t from-gray3 via-gray2/80 to-gray2/90 lg:flex-row lg:items-start">
          <div className="w-64 overflow-hidden rounded-lg shadow-lg h-96">
            <img
              src={movie?.poster_path || UNAVAILABLE_IMAGE}
              alt={movie?.title}
              className="object-cover w-full h-full"
            />
          </div>

          {/* Movie Info */}
          <div className="flex-1 text-gray-800">
            <h1 className="text-3xl font-bold text-white">
              {movie?.title} <span className="text-2xl font-normal">({movie?.release_date.split("-")[0]})</span>
            </h1>
            <div className="flex mt-2 text-sm text-gray6">
              <div>
                {movie?.original_language} • {movie?.release_date} •{" "}
              </div>
              <div>
                {movie?.genres.map((genre) => (
                  <span key={genre.id} className="ml-2">
                    {genre.name}
                  </span>
                ))}
              </div>
              <div className="ml-2">• {movie?.runtime} mins</div>
            </div>

            {/* User Score and Actions */}
            <div className="flex items-center gap-4 mt-4 text-white">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-12 h-12 text-sm font-bold text-white rounded-full bg-gradient-to-tr from-appPrimary to-purple-400">
                  {movie?.vote_average.toFixed(1)}
                </div>
                <span className="text-sm font-medium">Average Rating</span>
              </div>
            </div>

            {/* Action Icons */}
            <div className="flex items-center gap-4 mt-6">
              <ActionButtons />
            </div>

            {/* Tagline */}
            <p className="mt-6 italic text-gray6">{movie?.tagline || "N/A"}</p>

            {/* Overview */}
            <div className="mt-4 text-white">
              <h2 className="text-xl font-semibold">Overview</h2>
              <p className="mt-2 text-sm line-clamp-3">{movie?.overview}</p>
            </div>

            {/* Director Info */}
            <div className="mt-4 text-white">
              <p className="text-xl font-semibold">Produced by</p>
              <div className="flex gap-x-3">
                {movie?.production_companies.map((company) => (
                  <h3 key={company.id} className="text-sm text-gray4">
                    {company.name}
                  </h3>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <AppFooter />
    </div>
  );
};
