import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { movieApi } from "@/lib/api/movieApi";
import { MovieDetailType } from "@/types/MovieDetailType";
import { Movie } from "@/types/MovieType";
import { AppFooter } from "@/components/AppFooter";
import { ActionButtons } from "../components/ActionButtons";
import { FaStar } from "rocketicons/fa";
import { RateMovieModal } from "../components/RateMovieModal";
import { RenderCast } from "../components/RenderCast";
import { RenderReviews } from "../components/RenderReviews";
import { RenderMoreDetail } from "../components/RenderMoreDetail";
import UNAVAILABLE_IMAGE from "@/assets/UNAVAILABLE_IMAGE.jpg";
import { MovieCard } from "@/components/Movies/MovieCard";
import { getUserIdFromLocalStorage } from "@/utils/UserLocalStorage";
import { useToast } from "@/hooks/use-toast";

export const MovieDetail = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const [movie, setMovie] = useState<MovieDetailType>();
  const [isRatingModalOpen, setIsRatingModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [recommendedMovies, setRecommendedMovies] = useState<Movie[]>([]);
  const IMAGE_URL = import.meta.env.VITE_TMDB_IMAGE_URL;
  const userId = getUserIdFromLocalStorage();
  const { toast } = useToast();

  if (!movieId) {
    return <div>Movie info not found</div>;
  }

  const handleRateMovie = () => {
    if (userId) {
      setIsRatingModalOpen(true);
    } else {
      toast({
        variant: "destructive",
        description: "Please login to rate the movie"
      });
    }
  };

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

  const fetchRecommendedMovies = async () => {
    try {
      const response = await movieApi.getRecommendByMovieDetail(parseInt(movieId, 10));
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
    }
  };
  useEffect(() => {
    fetchMovieDetails();
    fetchRecommendedMovies();
  }, [movieId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen">
      <RateMovieModal isOpen={isRatingModalOpen} movieId={movieId} onClose={() => setIsRatingModalOpen(false)} />
      <div className="relative">
        <div className="min-h-[300px] max-h-[420px] overflow-hidden">
          {movie?.backdrop_path ? (
            <img src={movie.backdrop_path} alt={movie.title} className="object-cover w-full h-full" />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-t from-gray1 to-black" />
          )}
        </div>
        <div className="absolute top-0 flex flex-col items-center w-full gap-8 p-8 mx-auto bg-gradient-to-t from-gray3 via-gray2/80 to-gray2/90 lg:flex-row lg:items-start">
          <div className="w-64 overflow-hidden rounded-lg shadow-lg h-96">
            <img
              src={movie?.poster_path || UNAVAILABLE_IMAGE}
              alt={movie?.title}
              className="object-cover w-full h-full"
            />
          </div>
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
            <div className="flex items-center gap-4 mt-4 text-white">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-12 h-12 text-sm font-bold text-white rounded-full bg-gradient-to-tr from-appPrimary to-purple-400">
                  {movie?.vote_average}
                </div>
                <span className="text-sm font-medium">Average Rating</span>
                <div
                  onClick={handleRateMovie}
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-white rounded-md cursor-pointer bg-gray1 hover:bg-gray2/70"
                >
                  <FaStar className="inline-block w-3 h-3 icon-white" />
                  <div>Rate Movie</div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4 mt-6">
              {movie?.id && <ActionButtons movieId={movie.id.toString()} />}
            </div>
            <p className="mt-6 italic text-gray6">{movie?.tagline || "N/A"}</p>
            <div className="mt-4 text-white">
              <h2 className="text-xl font-semibold">Overview</h2>
              <p className="mt-2 text-sm line-clamp-3">{movie?.overview}</p>
            </div>
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
      <div id="more_detail" className="flex mt-8 gap-x-4">
        <div className="w-[70%] ">
          <RenderCast casts={movie?.credits.cast || []} />
          <RenderReviews movieId={movie?.id} />
        </div>
        <div className="w-[30%]">{movie && <RenderMoreDetail movie={movie} />}</div>
      </div>
      <div className="px-12 mt-12">
        <h2 className="text-xl font-bold text-gray-900">Relevant Films</h2>
        <div className="flex gap-4 mt-4 overflow-x-auto">
          {recommendedMovies.length > 0 ? (
            recommendedMovies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
          ) : (
            <div>No recommendations available.</div>
          )}
        </div>
      </div>
      <AppFooter />
    </div>
  );
};
