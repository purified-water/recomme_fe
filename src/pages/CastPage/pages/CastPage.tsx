import { useState } from "react";
import { RenderFilteredCast } from "../components/RenderFilteredCast";

export const CastPage = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen pt-8 bg-gray-100">
      <div className="mx-6 mb-4 text-2xl font-bold text-appPrimary">Cast Members</div>
      <div className="">
        <RenderFilteredCast currentPage={currentPage} onPageChange={handlePageChange} />
      </div>
    </div>
  );
};
