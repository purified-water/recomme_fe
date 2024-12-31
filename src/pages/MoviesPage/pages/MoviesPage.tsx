import { RenderFilteredMovies } from "../components/RenderFilteredMovies";
import { FilterSection } from "../components/FilterSections";

export const MoviesPage = () => {
  const handleSearch = (filters: any) => {
    console.log(filters);
  };

  return (
    <div className="w-full min-h-screen p-8 bg-gray-100">
      <div className="text-2xl font-bold text-appPrimary">Popular Movies</div>
      <div id="content" className="flex mt-4 gap-x-6">
        <div className="flex-col w-1/5 filter-bar">
          <FilterSection onSearch={handleSearch} />
        </div>

        <div className="flex w-4/5 min-h-screen filter-bar">
          <RenderFilteredMovies time_window="day" />
        </div>
      </div>
    </div>
  );
};
