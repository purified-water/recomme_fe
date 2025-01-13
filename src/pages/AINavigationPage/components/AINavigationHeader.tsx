import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { llmApi } from "@/lib/api/llmApi.ts";
import { useToast } from "@/hooks/use-toast.ts";
import { movieApi } from "@/lib/api/movieApi.ts";
import { MoviesFilterRequestType } from "@/types/MoviesFilterRequestType.ts";


export const AINavigationHeader = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const regex = new RegExp(searchQuery, "i");
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const response = await llmApi.navigate(searchQuery);
      let data = await response.data;
      data = data.result.data;
      console.log(data);
      if (data.route === "CAST_PAGE") {
        await handleRedirectToCastPage(data);
      } else if (data.route === "MOVIE_PAGE") {
        await handleRedirectToMoviePage(data);
      } else if (data.route === "SEARCH_PAGE") {
        handleRedirectSearchPage(data);
      } else {
        toast({
          title: "Error",
          description: `Sorry, we couldn't find any results matching your query, please try another one`,
          type: "background"
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: `${error.response?.data?.message || "An unknown error occurred."}`,
        type: "background"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRedirectToCastPage = async (data: any) => {
    try {
      const objectIds = data.params.movie_ids;
      const request: MoviesFilterRequestType = {
        fromDate: null,
        fromScore: null,
        genreIds: null,
        page: 1,
        pageSize: 10,
        toDate: null,
        toScore: null,
        objectIds: objectIds
      };
      const response = await movieApi.getMovieWithFilters(request);
      const responseData = await response.data;
      const movies = responseData.result.results;

      for (const movie of movies) {
        if (regex.test(movie.original_title)) {
          console.log("Navigating to:", `/movie/${movie.tmdb_id}`);
          navigate(`/movie/${movie.tmdb_id}`);
          return; // Exit after navigating
        }
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: `${error.response?.data?.message || "An unknown error occurred."}`,
        type: "background"
      });
    }
  };

  const handleRedirectToMoviePage = async (data: any) => {
    try {
      const objectIds = data.params.movie_ids;
      const request: MoviesFilterRequestType = {
        fromDate: null,
        fromScore: null,
        genreIds: null,
        page: 1,
        pageSize: 10,
        toDate: null,
        toScore: null,
        objectIds: objectIds
      };
      const response = await movieApi.getMovieWithFilters(request);
      const responseData = await response.data;
      console.log(responseData);
      const movies = responseData.result.results;

      for (const movie of movies) {
        if (regex.test(movie.original_title)) {
          console.log("Navigating to:", `/movie/${movie.tmdb_id}`);
          navigate(`/movie/${movie.tmdb_id}`);
          return; // Exit after navigating
        }
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: `${error.response?.data?.message || "An unknown error occurred."}`,
        type: "background"
      });
    }
  };

  const handleRedirectSearchPage = (data: any) => {
    navigate(`/search?query=${data.params.keyword}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="relative flex-col w-full h-56">
      <div className="absolute inset-0 opacity-75 bg-gradient-to-r from-purple-500 via-pink-500 to-appPrimary"></div>

      <div className="relative flex flex-col justify-start h-full px-12 pt-12 text-white">
        <h1 className="text-4xl font-bold text-white">AI-Powered Navigation</h1>
        <p className="text-lg font-semibold text-white">Explore movies, casts, and more with AI-powered search.</p>
      </div>

      <div className="absolute bottom-0 right-0 flex justify-center p-6 mb-4 left-1">
        <input
          type="text"
          placeholder="Ask about a movie, cast..."
          className="w-3/4 px-4 py-2 text-black border border-gray-400 rounded-l-xl focus:ring-2 focus:ring-appPrimary focus:outline-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          className="p-2 text-white transition-all duration-300 ease-in-out transform w-28 bg-gray1 hover:bg-gray-700 hover:scale-105"
          onClick={handleSearch}
          disabled={isLoading}
        >
          {isLoading ? "Searching..." : "Search"}
        </button>
      </div>
    </div>
  );
};
