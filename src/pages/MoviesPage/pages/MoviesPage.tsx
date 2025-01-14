import { RenderFilteredMovies } from "../components/RenderFilteredMovies";
import { FilterSection } from "../components/FilterSections";
import { AppFooter } from "@/components/AppFooter";
import { movieApi } from "@/lib/api/movieApi";
import { Movie } from "@/types/MovieType";
import { useState, useEffect } from "react";
import { RenderPagination } from "@/components/RenderPagination";
import { useSearchParams } from "react-router-dom";
import { FiltersType } from "../types/FiltersType";

export const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState<Movie[]>([]);
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const [filters, setFilters] = useState<FiltersType>();
  const [totalPages, setTotalPages] = useState<number>(0);
  const TOTAL_PAGE = 15;

  const handleSearch = (filters: FiltersType) => {
    setFilters(filters);
  };

  const fetchMoviesWithFilters = async () => {
    try {
      if (!filters) {
        const response = await movieApi.getAllMovies(currentPage);
        const data = response.data.result.results;

        setMovies(data);
        setTotalPages(response.data.result.results.length);
        return;
      } else {
        console.log("Filters:", filters);

        const request = {
          genreIds: filters.genres?.map((g) => g.id) || [],
          fromDate: filters.releaseDates?.from || "",
          toDate: filters.releaseDates?.to || "",
          fromScore: filters.userScore ? filters.userScore[0] : null,
          toScore: filters.userScore ? filters.userScore[1] : null,
          pageSize: TOTAL_PAGE,
          page: currentPage
        };

        const response = await movieApi.getMovieWithFilters(request);

        setSearchParams({
          page: currentPage.toString(),
          ...(filters.genres?.length && { genres: filters.genres.map((g) => g.id).join(",") }),
          ...(filters.releaseDates?.from && { fromDate: filters.releaseDates.from }),
          ...(filters.releaseDates?.to && { toDate: filters.releaseDates.to }),
          ...(filters.userScore && {
            fromScore: filters.userScore[0].toString(),
            toScore: filters.userScore[1].toString()
          })
        });

        const data = response.data.result.results;

        console.log("response:", response);
        setTotalPages(response.data.result.results.length);
        setMovies(data);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const handlePageChange = (page: number) => {
    setSearchParams({ page: page.toString() });
  };

  useEffect(() => {
    fetchMoviesWithFilters();
    console.log("Total Pages:", totalPages);
  }, [currentPage, filters]);

  return (
    <div className="w-full min-h-screen pt-8 bg-gray-100">
      <div className="mx-8 text-2xl font-bold text-appPrimary">Popular Movies</div>
      <div id="content" className="flex mx-8 mt-4 gap-x-6">
        <div className="flex-col w-1/5 filter-bar">
          <FilterSection onSearch={handleSearch} />
        </div>

        <div className="w-4/5 mb-4">
          <RenderFilteredMovies movies={movies} />
        </div>
      </div>
      <RenderPagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      <AppFooter />
    </div>
  );
};
