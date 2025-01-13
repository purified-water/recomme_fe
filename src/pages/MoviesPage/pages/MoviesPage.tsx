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
        return;
      } else {
        console.log("Filters:", filters); // TO DO check lại filter
        const response = await movieApi.getMovieWithFilters(
          filters.genres.map((g) => g.id),
          filters.releaseDates.from,
          filters.releaseDates.to,
          filters.userScore[0],
          filters.userScore[1],
          TOTAL_PAGE,
          currentPage
        );
        setSearchParams({ page: currentPage.toString() });
        setSearchParams({ genres: filters.genres.map((g) => g.id).join(",") });
        setSearchParams({ fromDate: filters.releaseDates.from });
        setSearchParams({ toDate: filters.releaseDates.to });
        setSearchParams({ fromScore: filters.userScore[0].toString() });
        setSearchParams({ toScore: filters.userScore[1].toString() });
        const data = response.data.result.results;

        // Ép kiểu từ movie detail sang movie type thôi

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
      <RenderPagination currentPage={currentPage} totalPages={TOTAL_PAGE} onPageChange={handlePageChange} />
      <AppFooter />
    </div>
  );
};
