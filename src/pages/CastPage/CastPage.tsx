import { SearchBar } from "@/features/Search/components/SearchBar";
import { useState } from "react";
import { RenderFilteredCast } from "./RenderFilteredCast";

export const CastPage = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <SearchBar />
      <div className="mx-6 mb-4 text-2xl font-bold text-appPrimary">Cast Members</div>
      <div className="mx-8">
        <RenderFilteredCast currentPage={currentPage} onPageChange={handlePageChange} />
      </div>
    </div>
  );
};
