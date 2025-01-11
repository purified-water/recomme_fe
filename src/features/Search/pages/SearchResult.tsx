import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { SearchBar } from "../components/SearchBar";
import { MovieCardLong } from "../components/MovieCardLong";
import { RenderPagination } from "../components/RenderPagination";
import { movieApi } from "@/lib/api/movieApi";
import { Movie } from "@/types/MovieType";
import { SearchFilter } from "../components/SearchFilter";
import { getUserIdFromLocalStorage } from "@/utils/UserLocalStorage";

export const SearchResult = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const isAiSearch = searchParams.get("isAdvancedSearch") === "true";
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  const [results, setResults] = useState<Movie[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const IMAGE_URL = import.meta.env.VITE_TMDB_IMAGE_URL;
  const userId = getUserIdFromLocalStorage();
  // Fetch movies from backend
  const fetchMovies = async () => {
    setIsLoading(true);
    try {
      const response = await movieApi.searchMovies(query, currentPage, isAiSearch);
      const data = response.data;
      if (userId){
        const saveSearchResponse = await movieApi.saveSearchHistory(query);
        console.log(saveSearchResponse);
      }
      // Normalize the data
      const movieList = data.result.results.map((movie: Movie) => ({
        ...movie,
        poster_path: movie.poster_path ? `${IMAGE_URL}${movie.poster_path}` : null,
        backdrop_path: movie.backdrop_path ? `${IMAGE_URL}${movie.backdrop_path}` : null
      }));
      const totalPageFromData = data.result.total_pages;

      setResults(movieList || []);
      setTotalPages(totalPageFromData || 0);
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateResult = (filters: string) => {
    console.log(filters);
  };

  useEffect(() => {
    if (query) fetchMovies();
  }, [query, currentPage]);

  const RenderSearchMovies = () => {
    if (isLoading) {
      return <div>Loading...</div>;
    }
    if (results.length === 0) {
      return <div>No results found.</div>;
    }
    return results.map((movie) => <MovieCardLong key={movie.id} movie={movie} />);
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

        <div className="flex-col w-4/5 min-h-screen filter-bar">
          <RenderSearchMovies />
        </div>
      </div>
      <RenderPagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  );
};
