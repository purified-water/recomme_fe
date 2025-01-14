import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { SearchBar } from "../components/SearchBar";
import { MovieCardLong } from "../components/MovieCardLong";
import { RenderPagination } from "../components/RenderPagination";
import { movieApi } from "@/lib/api/movieApi";
import { Movie } from "@/types/MovieType";
import { SearchFilter } from "../components/SearchFilter";
import { LoadingPage } from "../components/PageLoading";
import { Cast } from "@/types/CastType.ts";
import { CastCardLong } from "@/features/Search/components/CastCardLong.tsx";
import { castApi } from "@/lib/api/castApi.ts";

export const SearchResult = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTab, setSearchTab] = useState<string>("movies");
  const query = searchParams.get("query") || "";
  const isAiSearch = searchParams.get("isAdvancedSearch") === "true";
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  const [movies, setMovies] = useState<Movie[]>([]);
  const [casts, setCasts] = useState<Cast[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const IMAGE_URL = import.meta.env.VITE_TMDB_IMAGE_URL;
  // Fetch movies from backend
  const fetchMovies = async () => {
    setIsLoading(true);
    try {
      const response = await movieApi.searchMovies(query, currentPage, isAiSearch);
      const data = response.data;

      // Normalize the data
      const movieList = data.result.results.map((movie: Movie) => ({
        ...movie,
        poster_path: movie.poster_path ? `${IMAGE_URL}${movie.poster_path}` : null,
        backdrop_path: movie.backdrop_path ? `${IMAGE_URL}${movie.backdrop_path}` : null
      }));
      const totalPageFromData = data.result.total_pages;

      setMovies(movieList || []);
      setTotalPages(totalPageFromData || 0);
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCasts = async () => {
    setIsLoading(true);
    try {
      const response = await castApi.search(query, isAiSearch);
      const data = response.data;

      // Normalize the data
      const castList = data.result.results.map((cast: Cast) => ({
        ...cast,
        profile_path: cast.profile_path ? `${IMAGE_URL}${cast.profile_path}` : null
      }));
      const totalPageFromData = data.result.total_pages;

      setCasts(castList || []);
      setTotalPages(totalPageFromData || 0);
    } catch (error) {
      console.error("Error fetching casts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateResult = (filters: string) => {
    setSearchTab(filters);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (query) {
        await fetchMovies();
        await fetchCasts();
      }
    };
    fetchData();
  }, [query, currentPage]);

  const RenderSearchMovies = () => {
    console.log(movies);
    if (isLoading) {
      return <LoadingPage />;
    }
    if (movies.length === 0) {
      return <div>No movies found.</div>;
    }
    return movies.map((movie) => <MovieCardLong key={movie.id} movie={movie} />);
  };

  const RenderSearchCasts = () => {
    console.log(casts);
    if (isLoading) {
      return <LoadingPage />;
    }
    if (casts.length === 0) {
      return <div>No casts found.</div>;
    }
    return casts.map((cast) => <CastCardLong key={cast.id} cast={cast} />);
  };

  const handlePageChange = (page: number) => {
    setSearchParams({ query, page: page.toString() });
  };

  // TO DO: FIX THE SEARCH FILTER
  return (
    <div>
      <SearchBar />
      <div className="mx-6 mb-4 text-2xl font-bold text-appPrimary">Search Results</div>
      <div className="flex mx-8 overflow-y-scroll gap-x-4">
        <div className="flex-col w-1/5 filter-bar">
          <SearchFilter updateResult={updateResult} />
        </div>
        {searchTab === "movies" ? (
          <div className="flex-col w-4/5 min-h-screen filter-bar">
            <RenderSearchMovies />
          </div>
        ) : (
          <div className="flex-col w-4/5 min-h-screen filter-bar">
            <RenderSearchCasts />
          </div>
        )}
      </div>
      <RenderPagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  );
};
