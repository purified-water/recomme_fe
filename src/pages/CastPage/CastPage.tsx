import { FilterSection } from "../MoviesPage/components/FilterSections";
import { RenderFilteredCast } from "./RenderFilteredCast";

export const CastPage = () => {
  const handleSearch = (filters: any) => {
    console.log(filters);
  };

  return (
    <div className="w-full min-h-screen p-8 bg-gray-100">
      <div className="text-2xl font-bold text-appPrimary">All Cast</div>
      <div id="content" className="flex mt-4 gap-x-6">
        <div className="flex-col w-1/5 filter-bar">
          <FilterSection onSearch={handleSearch} />
        </div>

        <div className="w-4/5">
          <RenderFilteredCast />
        </div>
      </div>
    </div>
  );
};
